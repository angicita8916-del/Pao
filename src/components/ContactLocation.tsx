import React from 'react';
import { 
  MapPin, 
  MessageSquare, 
  Mail, 
  Clock, 
  ExternalLink, 
  Building2, 
  Navigation, 
  Share2,
  CheckCircle,
  ThumbsUp
} from 'lucide-react';
import { COMPANY_INFO } from '../data/materials';

export const ContactLocation: React.FC = () => {
  return (
    <section id="ubicacion" className="py-20 lg:py-28 relative bg-[#090912] border-t border-purple-900/30">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <span>Instalaciones en Toledo</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Atención Directa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight [text-wrap:balance]">
            Visítanos o Contacta con <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400">Proyect 3D en Torrijos</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Nuestro taller principal de impresión y prototipado está ubicado estratégicamente en Torrijos (Toledo), facilitando la recogida directa y envíos express a toda la península.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#0f1021] border border-purple-900/40 hover:border-purple-500/50 transition-all shadow-xl space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Dirección de Taller y Recogidas</h3>
                  <p className="text-sm text-slate-200 mt-1 font-medium">
                    {COMPANY_INFO.address}
                  </p>
                  <p className="text-xs text-purple-300 mt-0.5">
                    {COMPANY_INFO.addressComplement}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-mono text-cyan-400">
                    45500 Torrijos, Toledo (España)
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-900/30">
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir cómo llegar en Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-[#0f1021] to-[#0f1021] border border-emerald-500/40 hover:border-emerald-400/70 transition-all shadow-xl space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Línea Directa WhatsApp</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Envíanos tus dudas técnicas o fichas STL directamente por chat para respuesta en menos de 2 horas.
                  </p>
                  <div className="mt-2">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hola Proyect 3D Torrijos, me gustaría hacer una consulta sobre fabricación 3D.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {COMPANY_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Facebook */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email */}
              <div className="p-5 rounded-2xl bg-[#0f1021] border border-purple-900/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">Correo Oficial</span>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-xs text-slate-300 hover:text-purple-300 break-all transition-colors block font-mono"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              {/* Facebook */}
              <div className="p-5 rounded-2xl bg-[#0f1021] border border-purple-900/40 space-y-2">
                <div className="flex items-center gap-2 text-blue-400">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">Facebook</span>
                </div>
                <a
                  href={COMPANY_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-300 hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Proyect 3D en Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Horario */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <strong>Horario de atención:</strong> {COMPANY_INFO.openingHours}
              </div>
            </div>

          </div>

          {/* Right: Map Visual Card & Facility Guide */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0f1021] shadow-2xl relative">
              
              {/* Interactive Visual Map Card with Torrijos Pin */}
              <div className="relative aspect-[16/9] w-full bg-[#0a0a14] overflow-hidden flex items-center justify-center p-6">
                
                {/* Tech Map Stylized Grid & Graphic */}
                <div className="absolute inset-0 opacity-40 tech-grid-bg"></div>
                
                {/* Stylized Map Canvas with Road Layout */}
                <div className="relative z-10 text-center max-w-md space-y-4 p-6 rounded-2xl bg-[#0e0f20]/90 backdrop-blur-md border border-purple-500/40 shadow-2xl">
                  
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">
                      Planta de Fabricación Aditiva Proyect 3D
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Av. de los Trabajadores, 22 · 45500 Torrijos (Toledo)
                    </p>
                    <p className="text-[11px] text-cyan-300 font-medium mt-0.5">
                      Frente al Vivero de Empresas Manuel Diaz Ruiz
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={COMPANY_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Cómo Llegar en GPS</span>
                    </a>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hola, deseo coordinar una visita a vuestro taller en Torrijos.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-purple-500 transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Avisar de Visita Presencial</span>
                    </a>
                  </div>

                </div>

                {/* Subtle location markers nearby */}
                <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 font-mono">
                  Torrijos, Castilla-La Mancha (A-40 / CM-4009)
                </div>
              </div>

              {/* Perks of local workshop */}
              <div className="p-6 bg-[#0c0d18] border-t border-purple-900/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Recogida sin esperas</strong>
                    <span>Recoge tus piezas en taller tan pronto finalice la impresión.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Asesoramiento cara a cara</strong>
                    <span>Trae tu muestra física o prototipo para inspección técnica.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Envíos Peninsulares 24h</strong>
                    <span>Empaquetado industrial protegido para transporte seguro.</span>
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
