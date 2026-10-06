import React from 'react';
import { Box, Mail, Phone, MapPin, ThumbsUp, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06070d] border-t border-purple-950/60 text-slate-400 py-14 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-purple-900/20">
          
          {/* Col 1: Brand & Summary */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center text-white border border-purple-500/40">
                <Box className="w-4 h-4" />
              </div>
              <span>
                Proyect <span className="text-purple-400">3D</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Centro de ingeniería aditiva, prototipado rápido y fabricación de piezas funcionales en Torrijos (Toledo).
            </p>
            <div className="text-[11px] text-purple-400 font-mono">
              FDM · SLA · SLS · Nylon PA12
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Navegación
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="hover:text-purple-300 transition-colors">Servicios de Prototipado</a>
              </li>
              <li>
                <a href="#visor-3d" className="hover:text-purple-300 transition-colors">Visor 3D y Calculadora STL</a>
              </li>
              <li>
                <a href="#prototipado" className="hover:text-purple-300 transition-colors">Fabricación en Nylon Industrial</a>
              </li>
              <li>
                <a href="#materiales" className="hover:text-purple-300 transition-colors">Catálogo de Materiales</a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-purple-300 transition-colors">Localización en Torrijos</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Materials & Specs */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Materiales Disponibles
            </span>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>PLA Premium Prototipado</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Resina SLA Alta Definición (0.05mm)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span>Nylon PA12 Grado Industrial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Polímeros Reciclados rPETG</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Torrijos Direct Contact */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Contacto Torrijos
            </span>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}, Torrijos (Toledo)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${COMPANY_INFO.phoneRaw}`} className="hover:text-emerald-300 font-mono">
                  {COMPANY_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-cyan-300 break-all font-mono">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={COMPANY_INFO.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                  Facebook: Proyect 3D
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} Proyect 3D. Todos los derechos reservados. Torrijos, Toledo, España.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-3 rounded-lg bg-slate-900 border border-slate-800"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
