import React from 'react';
import { Box, ArrowDown, ShieldCheck, Zap, Gauge, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';

interface HeroProps {
  onScrollToViewer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToViewer }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-32 tech-grid-bg">
      {/* Glow ambient background lights (neon purple and cyan) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span>Torrijos, Toledo</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Centro de Fabricación Aditiva & Prototipado</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>España</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Proposition, Action CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] [text-wrap:balance]">
              Ingeniería en <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400">Impresión 3D</span> y Prototipado en Torrijos.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              En <strong className="text-white font-semibold">Proyect 3D</strong> transformamos tus archivos CAD y STL en componentes reales de alta precisión. Desde prototipos funcionales rápidos en PLA y Resina hasta repuestos industriales de alta exigencia en <span className="text-purple-300 font-medium">Nylon PA12</span> y materiales reciclables.
            </p>

            {/* Direct Action Area */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onScrollToViewer}
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 cursor-pointer transform active:scale-95"
              >
                <Box className="w-5 h-5 text-cyan-300 group-hover:rotate-45 transition-transform duration-300" />
                <span>Inspeccionar STL & Calcular Precio</span>
                <ArrowDown className="w-4 h-4 text-purple-200 group-hover:translate-y-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hola Proyect 3D, necesito consultar sobre un prototipo o pieza industrial.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-700/70 hover:border-purple-500/60 rounded-xl transition-all shadow-sm"
              >
                <span>Consultar por WhatsApp</span>
                <span className="text-xs text-purple-400 font-mono font-medium">666 11 98 49</span>
              </a>
            </div>

            {/* Proof metrics row */}
            <div className="pt-6 border-t border-purple-900/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <div className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums">±0.05<span className="text-purple-400 text-sm font-sans">mm</span></div>
                <div className="text-xs text-slate-400">Tolerancia SLA/Resina</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums">24-48<span className="text-cyan-400 text-sm font-sans">h</span></div>
                <div className="text-xs text-slate-400">Entrega prototipos</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums">PA12<span className="text-purple-400 text-sm font-sans">+CF</span></div>
                <div className="text-xs text-slate-400">Nylon grado industrial</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums">100<span className="text-emerald-400 text-sm font-sans">%</span></div>
                <div className="text-xs text-slate-400">Fabricado en España</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset + Interactive Indicator */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative border frame with neon glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 via-cyan-500/40 to-indigo-600/50 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-[#0d0e1c] shadow-2xl">
                
                {/* Hero 3D printing workshop image */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/src/assets/images/hero_3d_printer_1791199556761.jpg"
                    alt="Centro de Fabricación Aditiva Proyect 3D en Torrijos"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-[#090912]/20 to-transparent"></div>
                  
                  {/* Floating live indicator */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-mono font-medium text-slate-200">Taller Activo en Torrijos</span>
                  </div>
                </div>

                {/* Sub-card specs */}
                <div className="p-5 bg-[#0f101f] border-t border-purple-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Tecnología en Planta
                    </span>
                    <span className="text-xs text-slate-400 font-mono">FDM · SLA · SLS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 p-2 rounded-md bg-purple-950/20 border border-purple-900/30">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Inspección dimensional 1:1</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-md bg-purple-950/20 border border-purple-900/30">
                      <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Cálculo STL en tiempo real</span>
                    </div>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      onClick={onScrollToViewer}
                      className="w-full text-xs font-semibold text-purple-300 hover:text-white py-2 px-3 bg-purple-900/30 hover:bg-purple-900/60 border border-purple-500/40 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Cargar tu archivo .STL para cotización instantánea</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
