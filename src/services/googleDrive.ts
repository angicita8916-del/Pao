export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  iconLink?: string;
  is3dModel?: boolean;
}

/**
 * List files from Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  searchQuery: string = '',
  only3D: boolean = false
): Promise<DriveFileItem[]> {
  let q = "trashed = false";
  
  if (only3D) {
    q += " and (name contains '.stl' or name contains '.STL' or name contains '.obj' or name contains '.step')";
  }
  
  if (searchQuery.trim()) {
    q += ` and name contains '${searchQuery.replace(/'/g, "\\'")}'`;
  }

  const url = `https://www.googleapis.com/drive/v3/files?pageSize=30&fields=files(id,name,mimeType,size,modifiedTime,iconLink)&q=${encodeURIComponent(q)}&orderBy=modifiedTime desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al listar archivos de Google Drive (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const files: DriveFileItem[] = (data.files || []).map((f: any) => {
    const is3d = f.name.toLowerCase().endsWith('.stl') || 
                 f.name.toLowerCase().endsWith('.obj') || 
                 f.name.toLowerCase().endsWith('.step');
    return {
      ...f,
      is3dModel: is3d
    };
  });

  return files;
}

/**
 * Download a file's binary content (ArrayBuffer) from Google Drive
 */
export async function downloadDriveFileContent(
  fileId: string,
  accessToken: string
): Promise<ArrayBuffer> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error al descargar el archivo de Google Drive (${response.status})`);
  }

  return await response.arrayBuffer();
}

/**
 * Upload a quote summary file to Google Drive
 */
export async function saveQuoteToDrive(
  filename: string,
  content: string,
  accessToken: string
): Promise<any> {
  const metadata = {
    name: filename,
    mimeType: 'text/markdown',
    description: 'Cotización técnica generada en Proyect 3D (Torrijos)'
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/markdown\r\n\r\n' +
    content +
    closeDelimiter;

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Error al guardar en Google Drive (${response.status}): ${err}`);
  }

  return await response.json();
}
