import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle, 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  Share2, 
  Box, 
  Calendar,
  Building2,
  FileCheck,
  HardDrive,
  Loader2
} from 'lucide-react';
import { 
  ModelStats, 
  QuoteCalculation, 
  CustomerForm 
} from '../types';
import { COMPANY_INFO } from '../data/materials';
import { saveQuoteToDrive } from '../services/googleDrive';
import { getAccessToken, googleSignIn } from '../services/firebaseAuth';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ModelStats;
  quote: QuoteCalculation;
  form: CustomerForm;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  stats,
  quote,
  form
}) => {
  const [copied, setCopied] = useState(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [driveSavedSuccess, setDriveSavedSuccess] = useState(false);
  const [driveError, setDriveError] = useState<string | null>(null);

  const handleSaveToDrive = async () => {
    try {
      setIsSavingToDrive(true);
      setDriveError(null);
      let token = await getAccessToken();
      if (!token) {
        const signResult = await googleSignIn();
        if (signResult) {
          token = signResult.accessToken;
        } else {
          throw new Error('Es necesario autorizar el acceso a Google Drive.');
        }
      }

      const docName = `Cotizacion-Proyect3D-${stats.filename.replace('.stl', '')}-${quoteRefId}.md`;
      await saveQuoteToDrive(docName, whatsAppMessage, token);
      setDriveSavedSuccess(true);
      setTimeout(() => setDriveSavedSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setDriveError(err.message || 'Error al guardar en Google Drive');
    } finally {
      setIsSavingToDrive(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#06b6d4', '#ec4899', '#ffffff']
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate clean WhatsApp prefilled text
  const quoteRefId = `P3D-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const whatsAppMessage = `*SOLICITUD DE PRESUPUESTO — PROYECT 3D (TORRIJOS)*
Ref: ${quoteRefId}

*DATOS DEL CLIENTE:*
• Nombre: ${form.name}
• Teléfono: ${form.phone}
• Email: ${form.email}
${form.notes ? `• Notas: ${form.notes}\n` : ''}
*ESPECIFICACIONES DE LA PIEZA:*
• Archivo: ${stats.filename}
• Dimensiones: ${stats.dimensions.x} x ${stats.dimensions.y} x ${stats.dimensions.z} mm
• Volumen: ${stats.volumeCm3.toFixed(2)} cm³
• Peso aprox: ${stats.weightGrams} g
• Material: ${quote.material.name}
• Color: ${quote.selectedColor}
• Relleno: ${quote.infillPercent}%
• Cantidad: ${quote.quantity} unidad(es)

*PRECIO ESTIMADO:*
• Precio Unitario: ${quote.unitPrice.toFixed(2)} €
${quote.discountPercent > 0 ? `• Descuento volumen: -${quote.discountPercent}%\n` : ''}• Base Imponible: ${quote.subtotal.toFixed(2)} €
• IVA (21%): ${quote.vatAmount.toFixed(2)} €
• *TOTAL ESTIMADO: ${quote.totalEstimatedPrice.toFixed(2)} €*

Por favor, confirmen disponibilidad y fecha de fabricación para recogida o envío desde Torrijos.`;

  const whatsAppLink = `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(whatsAppMessage)}`;
  
  const mailSubject = `Solicitud de Presupuesto 3D - ${form.name} - Ref ${quoteRefId}`;
  const mailLink = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(whatsAppMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0e0f1f] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-purple-900/40">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] mb-3">
            <FileCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-widest">
            Referencia: {quoteRefId}
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-1">
            Presupuesto Preliminar Preparado
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto mt-1">
            Hemos procesado las características de tu modelo 3D. Elige cómo deseas enviar la solicitud a nuestro taller en Torrijos.
          </p>
        </div>

        {/* Summary Card */}
        <div className="py-6 space-y-5">
          
          {/* Customer & Piece Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block">
                Datos del Solicitante
              </span>
              <div className="text-xs text-slate-300 space-y-1">
                <div><strong className="text-white">Nombre:</strong> {form.name}</div>
                <div><strong className="text-white">WhatsApp:</strong> {form.phone}</div>
                <div><strong className="text-white">Email:</strong> {form.email}</div>
                {form.notes && (
                  <div className="text-[11px] text-slate-400 italic pt-1 border-t border-purple-900/20">
                    &ldquo;{form.notes}&rdquo;
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block">
                Detalles Técnicos
              </span>
              <div className="text-xs text-slate-300 space-y-1">
                <div className="truncate"><strong className="text-white">Archivo:</strong> {stats.filename}</div>
                <div><strong className="text-white">Material:</strong> {quote.material.name.split(' ')[0]}</div>
                <div><strong className="text-white">Color:</strong> {quote.selectedColor}</div>
                <div><strong className="text-white">Dimensiones:</strong> {stats.dimensions.x}×{stats.dimensions.y}×{stats.dimensions.z} mm</div>
                <div><strong className="text-white">Volumen:</strong> {stats.volumeCm3.toFixed(2)} cm³ · {quote.infillPercent}% relleno</div>
              </div>
            </div>

          </div>

          {/* Pricing Breakdown Box */}
          <div className="p-4 rounded-2xl bg-[#141528] border border-purple-500/30 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>Cantidad de fabricación:</span>
              <span className="font-mono font-bold text-white">{quote.quantity} unidad(es)</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Precio unitario estimado:</span>
              <span className="font-mono font-medium text-white">{quote.unitPrice.toFixed(2)} €</span>
            </div>
            {quote.discountPercent > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-400 font-medium">
                <span>Descuento por volumen ({quote.discountPercent}%):</span>
                <span className="font-mono">-{quote.discountAmount.toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Base imponible:</span>
              <span className="font-mono text-white">{quote.subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>IVA España (21%):</span>
              <span className="font-mono text-white">{quote.vatAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-purple-900/40 text-base font-bold text-white">
              <span className="text-purple-300">Total Presupuestado (Aprox.):</span>
              <span className="text-2xl font-mono text-cyan-300 tabular-nums">
                {quote.totalEstimatedPrice.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Facility location note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-950/30 border border-purple-900/30 text-xs text-slate-300">
            <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              Fabricado en <strong>Proyect 3D</strong> (Av. de los Trabajadores 22, Torrijos, Toledo). Recogida en planta o envío a toda España.
            </span>
          </div>

        </div>

        {/* Dispatch Action Buttons */}
        <div className="space-y-3 pt-2">
          
          {/* Primary: WhatsApp dispatch */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Enviar Pedido Directo a WhatsApp (+34 666 11 98 49)</span>
          </a>

          {/* Secondary: Email dispatch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={mailLink}
              className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Enviar por Correo Electrónico</span>
            </a>

            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado al portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>Copiar Ficha de Cotización</span>
                </>
              )}
            </button>
          </div>

          {/* Print / Save PDF & Google Drive Options */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs text-slate-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-slate-900 border border-slate-800"
            >
              <FileCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Imprimir / PDF Oficial</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToDrive}
              disabled={isSavingToDrive}
              className="text-xs text-purple-300 hover:text-white font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-purple-950/60 border border-purple-800/60"
            >
              {isSavingToDrive ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Guardando en Google Drive...</span>
                </>
              ) : driveSavedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Guardado en tu Google Drive!</span>
                </>
              ) : (
                <>
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Guardar Ficha en Google Drive</span>
                </>
              )}
            </button>
          </div>

          {driveError && (
            <div className="text-center text-[11px] text-red-400 mt-1">
              {driveError}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
