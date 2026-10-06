import React from 'react';
import { 
  Cpu, 
  Layers, 
  Repeat, 
  PenTool, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame,
  Award
} from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';

interface ServicesSectionProps {
  onSelectViewer: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectViewer }) => {
  return (
    <section id="servicios" className="py-20 lg:py-28 relative bg-[#090912] border-t border-purple-900/30">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <span>Capacidades de Fabricación</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Torrijos (Toledo)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight [text-wrap:balance]">
            Soluciones Integrales de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400">Prototipado Industrial</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminamos las barreras entre el diseño CAD y la pieza física final. Combinamos tecnologías FDM industrial, estereolitografía SLA y materiales poliméricos de ingeniería con entrega directa en España.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#0f1021] border border-purple-900/40 hover:border-purple-500/60 shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              Prototipado Rápido Funcional
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Validación ergonómica y pruebas de ajuste en 24h-48h. Materiales termoplásticos técnicos que replican las propiedades mecánicas de producción en serie.
            </p>
            <div className="pt-3 border-t border-purple-900/30 text-xs text-purple-300 font-mono flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Precisión dimensional ±0.1mm</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#0f1021] border border-purple-900/40 hover:border-cyan-500/60 shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              Resina SLA de Alta Precisión
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Acabados lisos milimétricos sin líneas de capa visibles. Ideal para moldes maestros de silicona, componentes micro-mecánicos, joyería y prototipos estéticos.
            </p>
            <div className="pt-3 border-t border-purple-900/30 text-xs text-cyan-300 font-mono flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Capas ultra-finas de 0.05mm</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#0f1021] border border-purple-900/40 hover:border-purple-500/60 shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
              <Repeat className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              Series Cortas & Repuestos
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Producción de 10 a 500+ piezas sin coste de moldes metálicos. Sustitución rápida de repuestos descatalogados para maquinaria industrial o automoción.
            </p>
            <div className="pt-3 border-t border-purple-900/30 text-xs text-purple-300 font-mono flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Descuentos escalables hasta -35%</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#0f1021] border border-purple-900/40 hover:border-cyan-500/60 shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              Diseño CAD & Ingeniería Inversa
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              ¿Tienes una pieza rota o solo un boceto en papel? Nuestro equipo modela y optimiza geometrías CAD 3D para su fabricación aditiva con tolerancias certificadas.
            </p>
            <div className="pt-3 border-t border-purple-900/30 text-xs text-cyan-300 font-mono flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Optimización topológica paramétrica</span>
            </div>
          </div>

        </div>

        {/* Industrial Prototyping Feature Spotlight */}
        <div id="prototipado" className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121326] via-[#0f1021] to-[#090912] border border-purple-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Especialidad Proyect 3D Torrijos</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                Nylon PA12 y Polímeros Reforzados para Piezas Bajo Máxima Exigencia
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Cuando una pieza de plástico convencional no basta, implementamos <strong className="text-white">Nylon PA12 industrial</strong>. Este material ofrece una resistencia a la tracción de hasta 90 MPa, capacidad de amortiguación de vibraciones y estabilidad química frente a aceites industriales y temperaturas continuas de hasta 120°C.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Alta tenacidad ante impactos repetitivos</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Resistencia térmica de hasta 120 °C</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Sustitución de piezas de aluminio / bronce</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Repeat className="w-4 h-4 text-emerald-400" />
                  <span>Excelente comportamiento al rozamiento y desgaste</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onSelectViewer}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Probar Visor 3D y Cotizar en Nylon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Industrial Photo Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-purple-500/40 relative shadow-2xl">
                <img
                  src="/src/assets/images/industrial_parts_1791199580374.jpg"
                  alt="Piezas industriales de nylon y resina impresas en Proyect 3D"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs text-slate-200">
                    <span className="font-bold text-white block">Piezas Mecánicas Funcionales</span>
                    <span className="text-[11px] text-purple-300 font-mono">Tolerancias comprobadas en nuestro taller de Torrijos</span>
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
