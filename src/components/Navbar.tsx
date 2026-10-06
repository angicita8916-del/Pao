import React, { useState } from 'react';
import { Menu, X, Box, MessageSquare, HardDrive } from 'lucide-react';
import { User } from 'firebase/auth';
import { COMPANY_INFO } from '../data/materials';

interface NavbarProps {
  onOpenQuoteSection: () => void;
  onOpenDriveModal?: () => void;
  currentUser?: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuoteSection,
  onOpenDriveModal,
  currentUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090912]/90 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element with glowing tech accent) */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 flex items-center justify-center border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_22px_rgba(168,85,247,0.6)] transition-all">
                <Box className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-extrabold tracking-tight">
                Proyect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">3D</span>
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollTo('servicios')} 
              className="hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollTo('visor-3d')} 
              className="hover:text-purple-400 transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Visor 3D & Cotizador
            </button>
            <button 
              onClick={() => scrollTo('prototipado')} 
              className="hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              Prototipado Industrial
            </button>
            <button 
              onClick={() => scrollTo('materiales')} 
              className="hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              Materiales
            </button>
            <button 
              onClick={() => scrollTo('ubicacion')} 
              className="hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              Ubicación Torrijos
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenDriveModal && (
              <button
                onClick={onOpenDriveModal}
                className="text-xs font-semibold text-purple-300 hover:text-white px-3 py-2 rounded-lg bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                <span>{currentUser ? (currentUser.displayName?.split(' ')[0] || 'Drive') : 'Google Drive'}</span>
              </button>
            )}

            <a 
              href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hola Proyect 3D, me gustaría consultar sobre un presupuesto de impresión 3D.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700/60 hover:border-purple-500/50 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.phoneFormatted}</span>
            </a>

            <button 
              onClick={() => {
                onOpenQuoteSection();
                scrollTo('visor-3d');
              }}
              className="relative px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Solicitar Cotización
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => {
                onOpenQuoteSection();
                scrollTo('visor-3d');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-md"
            >
              Cotizar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-[#0d0d1a] px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => scrollTo('servicios')} 
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-200 hover:bg-purple-950/40 rounded-md"
          >
            Servicios
          </button>
          <button 
            onClick={() => scrollTo('visor-3d')} 
            className="w-full text-left py-2 px-3 text-sm font-medium text-purple-300 hover:bg-purple-950/40 rounded-md"
          >
            Visor 3D & Calculador STL
          </button>
          <button 
            onClick={() => scrollTo('prototipado')} 
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-200 hover:bg-purple-950/40 rounded-md"
          >
            Prototipado Industrial
          </button>
          <button 
            onClick={() => scrollTo('materiales')} 
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-200 hover:bg-purple-950/40 rounded-md"
          >
            Materiales (PLA, Resina, Nylon)
          </button>
          <button 
            onClick={() => scrollTo('ubicacion')} 
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-200 hover:bg-purple-950/40 rounded-md"
          >
            Ubicación en Torrijos
          </button>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a 
              href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 text-xs font-semibold text-center text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: {COMPANY_INFO.phoneFormatted}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
