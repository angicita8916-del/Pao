import React from 'react';
import { 
  Check, 
  Layers, 
  ShieldCheck, 
  Flame, 
  Crosshair, 
  ArrowUpRight,
  Recycle,
  Sparkles
} from 'lucide-react';
import { MATERIALS } from '../data/materials';
import { MaterialOption } from '../types';

interface MaterialsGuideProps {
  onSelectMaterial: (m: MaterialOption) => void;
}

export const MaterialsGuide: React.FC<MaterialsGuideProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materiales" className="py-20 lg:py-28 relative bg-[#07070d] border-t border-purple-900/30">
      
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <span>Guía Técnica</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Polímeros & Resinas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight [text-wrap:balance]">
            Materiales Certificados para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400">Cada Aplicación</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Cada proyecto exige características específicas de dureza, acabado superficial o resistencia térmica. Conoce nuestra gama de materiales disponibles en Torrijos.
          </p>
        </div>

        {/* 4 Detailed Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MATERIALS.map((mat) => {
            const isNylon = mat.id === 'nylon';
            const isRecycled = mat.id === 'recyclable';
            const isResin = mat.id === 'resin';

            return (
              <div
                key={mat.id}
                className={`p-6 sm:p-8 rounded-3xl bg-[#0d0e1d] border transition-all duration-300 flex flex-col justify-between ${
                  isNylon 
                    ? 'border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.2)]' 
                    : isRecycled
                    ? 'border-emerald-500/40'
                    : isResin
                    ? 'border-cyan-500/40'
                    : 'border-purple-900/40'
                }`}
              >
                <div>
                  {/* Top category label */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider">
                      {mat.category}
                    </span>
                    {isNylon && (
                      <span className="text-[11px] font-semibold text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                        Grado Máximo Esfuerzo
                      </span>
                    )}
                    {isRecycled && (
                      <span className="text-[11px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1">
                        <Recycle className="w-3 h-3" /> Eco Sostenible
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                    {mat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {mat.description}
                  </p>

                  {/* 3 Physical Metric Tags */}
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-black/40 border border-purple-900/30 mb-6">
                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-purple-400" />
                        <span>Tracción</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">
                        {mat.tensileStrength}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span>Térmica</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">
                        {mat.heatResistance}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Crosshair className="w-3 h-3 text-cyan-400" />
                        <span>Tolerancia</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">
                        {mat.accuracy}
                      </div>
                    </div>
                  </div>

                  {/* Recommended uses list */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Aplicaciones Típicas:
                    </span>
                    <ul className="space-y-1.5">
                      {mat.recommendedFor.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom CTA to load into viewer */}
                <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">
                    Desde <strong className="text-white font-bold">{mat.basePricePerCm3.toFixed(2)}€</strong> / cm³
                  </div>
                  <button
                    onClick={() => {
                      onSelectMaterial(mat);
                      const el = document.getElementById('visor-3d');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Seleccionar en Cotizador</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
