import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  RefreshCw, 
  FileCode, 
  Download, 
  HardDrive, 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  ExternalLink,
  LogOut,
  FolderOpen
} from 'lucide-react';
import { User } from 'firebase/auth';
import { googleSignIn, logout, getAccessToken } from '../services/firebaseAuth';
import { listDriveFiles, downloadDriveFileContent, DriveFileItem } from '../services/googleDrive';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  onLoadSTLFromDrive: (buffer: ArrayBuffer, filename: string) => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  onLoadSTLFromDrive
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [only3D, setOnly3D] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load files when user is authenticated or search/filter changes
  const fetchFiles = async () => {
    try {
      const token = await getAccessToken();
      if (!token) return;

      setIsLoadingFiles(true);
      setError(null);
      const items = await listDriveFiles(token, searchQuery, only3D);
      setFiles(items);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al conectar con Google Drive');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchFiles();
    }
  }, [isOpen, currentUser, only3D]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        onUserChange(result.user);
      }
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setError('Error al autenticar con Google. Por favor, asegúrate de permitir las ventanas emergentes.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onUserChange(null);
    setFiles([]);
  };

  const handleSelectFile = async (file: DriveFileItem) => {
    if (!file.name.toLowerCase().endsWith('.stl')) {
      setError('El visor interactivo actual admite archivos geométricos .STL. Selecciona un archivo con formato .stl');
      return;
    }

    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Sesión de Google Drive expirada. Vuelve a iniciar sesión.');

      setDownloadingFileId(file.id);
      setError(null);
      const buffer = await downloadDriveFileContent(file.id, token);
      onLoadSTLFromDrive(buffer, file.name);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError('No se pudo descargar el archivo desde Google Drive.');
    } finally {
      setDownloadingFileId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0c0d1c] border border-purple-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(168,85,247,0.3)] my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-purple-900/40">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <HardDrive className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Importar desde Google Drive
              <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800">
                Drive API v3
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Conecta tu cuenta de Google para cargar modelos 3D y piezas CAD directamente en el visor.
            </p>
          </div>
        </div>

        {/* Auth Check */}
        {!currentUser ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg">
              <FolderOpen className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h4 className="text-base font-bold text-white">
                Inicia sesión con tu cuenta de Google
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Permite a Proyect 3D acceder a tus archivos de Google Drive con permiso para cargar piezas .STL directamente en el motor 3D y calcular precios sin necesidad de descargarlas localmente.
              </p>
            </div>

            {/* Official Material Google Sign-In Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleLogin}
                disabled={isSigningIn}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer transform active:scale-95 disabled:opacity-50"
              >
                {/* Official Google 'G' Logo SVG */}
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{isSigningIn ? 'Conectando con Google...' : 'Iniciar sesión con Google'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* File Explorer when authenticated */
          <div className="py-5 space-y-4">
            
            {/* User Session Bar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs">
              <div className="flex items-center gap-2.5">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Google User'}
                    className="w-7 h-7 rounded-full border border-purple-400"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
                    {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-white block">
                    {currentUser.displayName || 'Usuario de Google'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {currentUser.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchFiles}
                  title="Actualizar archivos"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Salir</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar en tu Google Drive..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') fetchFiles(); }}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={() => setOnly3D(!only3D)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  only3D 
                    ? 'bg-purple-950/60 text-purple-300 border border-purple-500/50 shadow-sm' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>{only3D ? 'Solo archivos 3D (.stl)' : 'Todos los archivos'}</span>
              </button>
            </div>

            {/* Files List Container */}
            <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
              {isLoadingFiles ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400" />
                  <span className="text-xs">Buscando archivos en tu Google Drive...</span>
                </div>
              ) : files.length === 0 ? (
                <div className="py-10 text-center text-slate-400 space-y-2 border border-dashed border-purple-900/40 rounded-2xl p-6">
                  <FileCode className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-300">
                    No se encontraron archivos {only3D ? '3D (.stl)' : ''} en esta búsqueda.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Sube tu archivo .stl a Google Drive o desactiva el filtro para ver todo.
                  </p>
                </div>
              ) : (
                files.map((file) => {
                  const isStl = file.name.toLowerCase().endsWith('.stl');
                  const isDownloading = downloadingFileId === file.id;

                  return (
                    <div
                      key={file.id}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/50 flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${isStl ? 'bg-purple-950/70 text-purple-400 border border-purple-800' : 'bg-slate-800 text-slate-400'}`}>
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-white block truncate">
                            {file.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {file.size ? `${(parseInt(file.size) / (1024 * 1024)).toFixed(2)} MB` : 'Archivo'} · Modificado {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : ''}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectFile(file)}
                        disabled={isDownloading}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                          isStl 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm' 
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Cargando...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Cargar en Visor 3D</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
            <button onClick={() => setError(null)} className="text-red-300 hover:text-white font-bold text-xs">✕</button>
          </div>
        )}

      </div>
    </div>
  );
};
