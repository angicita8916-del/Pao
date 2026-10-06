import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, 
  Eye, 
  Maximize2, 
  Grid, 
  UploadCloud, 
  FileCode, 
  AlertCircle,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Cpu,
  HardDrive
} from 'lucide-react';
import { ModelStats, MaterialOption } from '../types';
import { 
  parseSTLFile, 
  extractModelStats, 
  SAMPLE_MODELS, 
  SampleModelItem 
} from '../utils/stlGeometry';

interface Viewer3DProps {
  currentStats: ModelStats;
  onStatsChange: (newStats: ModelStats) => void;
  selectedColorHex: string;
  selectedMaterial: MaterialOption;
  onOpenDriveModal?: () => void;
  externalSTLBuffer?: { buffer: ArrayBuffer; filename: string } | null;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({
  currentStats,
  onStatsChange,
  selectedColorHex,
  selectedMaterial,
  onOpenDriveModal,
  externalSTLBuffer
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const boxHelperRef = useRef<THREE.BoxHelper | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showBoundingBox, setShowBoundingBox] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('gear');

  // Load a geometry into the scene
  const loadGeometryIntoScene = useCallback((geometry: THREE.BufferGeometry, filename: string, isSample = false) => {
    if (!sceneRef.current) return;

    // Remove existing mesh and box helper
    if (meshRef.current) {
      sceneRef.current.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material.forEach(m => m.dispose());
      } else {
        meshRef.current.material.dispose();
      }
      meshRef.current = null;
    }

    if (boxHelperRef.current) {
      sceneRef.current.remove(boxHelperRef.current);
      boxHelperRef.current.dispose();
      boxHelperRef.current = null;
    }

    // Compute stats
    const stats = extractModelStats(geometry, filename, selectedMaterial.density);
    onStatsChange(stats);

    // Create realistic PBR material
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColorHex),
      roughness: selectedMaterial.id === 'resin' ? 0.25 : 0.65,
      metalness: selectedMaterial.id === 'nylon' ? 0.15 : 0.05,
      wireframe: isWireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sceneRef.current.add(mesh);
    meshRef.current = mesh;

    // Create bounding box helper if enabled
    const boxHelper = new THREE.BoxHelper(mesh, 0x06b6d4); // neon cyan
    boxHelper.visible = showBoundingBox;
    sceneRef.current.add(boxHelper);
    boxHelperRef.current = boxHelper;

    // Adjust camera to fit geometry nicely
    geometry.computeBoundingSphere();
    const sphere = geometry.boundingSphere;
    if (sphere && cameraRef.current && controlsRef.current) {
      const radius = Math.max(20, sphere.radius);
      const dist = radius * 2.8;
      cameraRef.current.position.set(dist * 0.8, dist * 0.7, dist * 1.1);
      cameraRef.current.lookAt(0, 0, 0);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }

    setIsLoading(false);
    setErrorMessage(null);
  }, [selectedColorHex, selectedMaterial, isWireframe, showBoundingBox, onStatsChange]);

  // Load sample model
  const handleSelectSample = (sample: SampleModelItem) => {
    setSelectedSampleId(sample.id);
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const geom = sample.generator();
      loadGeometryIntoScene(geom, `${sample.name}.stl`, true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error al generar modelo de prueba');
      setIsLoading(false);
    }
  };

  // Handle file reading
  const processSTLFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.stl')) {
      setErrorMessage('Por favor, selecciona un archivo válido con extensión .stl');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSelectedSampleId('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        if (!buffer || buffer.byteLength === 0) {
          throw new Error('Archivo STL vacío o dañado');
        }
        const geometry = parseSTLFile(buffer);
        loadGeometryIntoScene(geometry, file.name);
      } catch (err) {
        console.error(err);
        setErrorMessage('No se pudo procesar el archivo STL. Verifica que sea un archivo STL binario o ASCII válido.');
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Error al leer el archivo desde el disco.');
      setIsLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSTLFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSTLFile(e.target.files[0]);
    }
  };

  // Process external STL loaded from Google Drive
  useEffect(() => {
    if (externalSTLBuffer) {
      setIsLoading(true);
      setErrorMessage(null);
      setSelectedSampleId('');
      try {
        const geometry = parseSTLFile(externalSTLBuffer.buffer);
        loadGeometryIntoScene(geometry, externalSTLBuffer.filename);
      } catch (err) {
        console.error(err);
        setErrorMessage('Error al parsear el archivo STL desde Google Drive.');
        setIsLoading(false);
      }
    }
  }, [externalSTLBuffer, loadGeometryIntoScene]);

  // Update material color / properties when selectedColorHex or isWireframe changes
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(selectedColorHex);
      mat.wireframe = isWireframe;
      mat.roughness = selectedMaterial.id === 'resin' ? 0.25 : 0.65;
      mat.metalness = selectedMaterial.id === 'nylon' ? 0.15 : 0.05;
      mat.needsUpdate = true;
    }
  }, [selectedColorHex, isWireframe, selectedMaterial]);

  // Update grid visibility
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  // Update box helper visibility
  useEffect(() => {
    if (boxHelperRef.current) {
      boxHelperRef.current.visible = showBoundingBox;
    }
  }, [showBoundingBox]);

  // Update controls auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 1.6;
    }
  }, [autoRotate]);

  // Reset camera view
  const handleResetCamera = () => {
    if (meshRef.current && cameraRef.current && controlsRef.current) {
      const geometry = meshRef.current.geometry;
      geometry.computeBoundingSphere();
      const sphere = geometry.boundingSphere;
      if (sphere) {
        const radius = Math.max(20, sphere.radius);
        const dist = radius * 2.8;
        cameraRef.current.position.set(dist * 0.8, dist * 0.7, dist * 1.1);
        cameraRef.current.lookAt(0, 0, 0);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  };

  // Initialize Three.js Scene once mounted
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0d18); // deep tech dark
    scene.fog = new THREE.FogExp2(0x0c0d18, 0.003);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(90, 75, 110);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 800;
    controls.minDistance = 10;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.6;
    controlsRef.current = controls;

    // Studio 3-point lighting setup
    // 1. Ambient Light (cool bluish/slate)
    const ambientLight = new THREE.AmbientLight(0x4b5563, 1.2);
    scene.add(ambientLight);

    // 2. Key Light (warm-violet overhead directional)
    const keyLight = new THREE.DirectionalLight(0xd8b4fe, 2.0); // light violet
    keyLight.position.set(80, 140, 80);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // 3. Fill Light (cyan tint)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-80, 60, -80);
    scene.add(fillLight);

    // 4. Rim / Backlight (vivid neon purple)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    rimLight.position.set(0, -50, -100);
    scene.add(rimLight);

    // Grid Floor
    const grid = new THREE.GridHelper(240, 24, 0x9333ea, 0x1e1b4b);
    grid.position.y = -20;
    scene.add(grid);
    gridHelperRef.current = grid;

    // Initial load: Spur gear sample model
    const initialGeom = SAMPLE_MODELS[0].generator();
    loadGeometryIntoScene(initialGeom, 'Engranaje Helicoidal 18D.stl', true);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0c0d18] border border-purple-900/40 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* Top Bar inside Viewer: Status, Sample Selectors & Actions */}
      <div className="p-3 sm:p-4 bg-[#0f101f] border-b border-purple-900/30 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Sample selector pill group */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Modelos Demo:
          </span>
          {SAMPLE_MODELS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedSampleId === sample.id
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-purple-950/60 hover:text-white border border-slate-800'
              }`}
            >
              {sample.name.split(' ')[0]} {sample.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Action Buttons: Local Upload & Google Drive */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".stl"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 hover:border-cyan-400 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            <span>Subir .STL</span>
          </button>

          {onOpenDriveModal && (
            <button
              onClick={onOpenDriveModal}
              className="px-3 py-1.5 text-xs font-semibold text-purple-300 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 hover:border-purple-400 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <HardDrive className="w-4 h-4 text-purple-400" />
              <span>Google Drive</span>
            </button>
          )}
        </div>

      </div>

      {/* Main 3D Canvas Area with Drag & Drop Layer */}
      <div
        className={`relative flex-1 min-h-[380px] sm:min-h-[440px] w-full transition-all ${
          isDragging ? 'ring-2 ring-cyan-400 bg-purple-950/30' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Three.js viewport dom element attaches here */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Drag Over Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-purple-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-none border-2 border-dashed border-cyan-400">
            <UploadCloud className="w-16 h-16 text-cyan-400 animate-bounce mb-3" />
            <h4 className="text-xl font-bold text-white">Suelta tu archivo .STL aquí</h4>
            <p className="text-sm text-cyan-200 mt-1">Calcularemos automáticamente dimensiones, volumen y precio.</p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#0c0d18]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 pointer-events-none">
            <RefreshCw className="w-10 h-10 text-purple-400 animate-spin mb-3" />
            <span className="text-sm font-semibold text-slate-200">Procesando geometría STL...</span>
          </div>
        )}

        {/* Floating Viewer Controls HUD (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 p-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-purple-500/20 shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Detener rotación' : 'Activar auto-rotación'}
            className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
              autoRotate ? 'bg-purple-600/40 text-purple-300' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Vista de malla (Wireframe)"
            className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
              isWireframe ? 'bg-purple-600/40 text-purple-300' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Mostrar / Ocultar retícula"
            className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
              showGrid ? 'bg-purple-600/40 text-purple-300' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowBoundingBox(!showBoundingBox)}
            title="Mostrar caja contenedora (Bounding Box)"
            className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
              showBoundingBox ? 'bg-cyan-600/40 text-cyan-300' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Centrar y reajustar cámara"
            className="p-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Quick Hint (Bottom Right) */}
        <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/5 text-[11px] text-slate-400 pointer-events-none">
          <span>Arrastra para rotar · Rueda para zoom · Clic der. para desplazar</span>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="absolute top-4 left-4 right-4 bg-red-950/90 border border-red-500/50 text-red-200 text-xs p-3 rounded-xl flex items-start gap-2.5 shadow-lg z-30">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block">Aviso del visor:</span>
              <span>{errorMessage}</span>
            </div>
            <button 
              onClick={() => setErrorMessage(null)} 
              className="text-red-300 hover:text-white font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

      </div>

      {/* Calculated Physical Metrics Panel */}
      <div className="p-4 bg-[#0d0e1c] border-t border-purple-900/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
              {currentStats.filename}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Geometría Verificada</span>
          </div>
        </div>

        {/* 4 Quantitative Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          
          <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/30">
            <div className="text-[11px] text-slate-400">Dimensiones (X·Y·Z)</div>
            <div className="text-sm font-mono font-bold text-white tracking-tight tabular-nums mt-0.5">
              {currentStats.dimensions.x} × {currentStats.dimensions.y} × {currentStats.dimensions.z}
              <span className="text-[10px] text-slate-400 font-sans ml-1">mm</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/30">
            <div className="text-[11px] text-slate-400">Volumen Calculado</div>
            <div className="text-sm font-mono font-bold text-purple-300 tracking-tight tabular-nums mt-0.5">
              {currentStats.volumeCm3.toFixed(2)}
              <span className="text-[10px] text-purple-400 font-sans ml-1">cm³</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/30">
            <div className="text-[11px] text-slate-400">Peso Estimado ({selectedMaterial.name.split(' ')[0]})</div>
            <div className="text-sm font-mono font-bold text-cyan-300 tracking-tight tabular-nums mt-0.5">
              {currentStats.weightGrams}
              <span className="text-[10px] text-cyan-400 font-sans ml-1">g</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/30">
            <div className="text-[11px] text-slate-400">Triángulos STL</div>
            <div className="text-sm font-mono font-bold text-white tracking-tight tabular-nums mt-0.5">
              {currentStats.triangleCount.toLocaleString()}
              <span className="text-[10px] text-slate-400 font-sans ml-1">tris</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
