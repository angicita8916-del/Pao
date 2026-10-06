import React, { useState } from 'react';
import { 
  Calculator, 
  Send, 
  Layers, 
  Paintbrush, 
  Hash, 
  Clock, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Check, 
  HelpCircle,
  Percent,
  Sparkles
} from 'lucide-react';
import { 
  MaterialOption, 
  ModelStats, 
  QuoteCalculation, 
  CustomerForm 
} from '../types';
import { MATERIALS } from '../data/materials';

interface PriceCalculatorProps {
  stats: ModelStats;
  selectedMaterial: MaterialOption;
  onSelectMaterial: (m: MaterialOption) => void;
  selectedColorHex: string;
  onSelectColorHex: (hex: string) => void;
  quote: QuoteCalculation;
  onUpdateQuoteParams: (qty: number, infill: number, layer: number) => void;
  onSubmitQuote: (form: CustomerForm) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  stats,
  selectedMaterial,
  onSelectMaterial,
  selectedColorHex,
  onSelectColorHex,
  quote,
  onUpdateQuoteParams,
  onSubmitQuote
}) => {
  // Form fields
  const [form, setForm] = useState<CustomerForm>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    acceptTerms: true
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof CustomerForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    // ensure Spanish prefix format
    if (!raw.startsWith('+34')) {
      raw = '+34 ' + raw.replace(/^\+?34\s?/, '');
    }
    handleInputChange('phone', raw);
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!form.name.trim()) {
      errors.name = 'Por favor, introduce tu nombre';
    }
    
    // Check Spanish phone: +34 followed by 9 digits
    const cleanedDigits = form.phone.replace(/\D/g, '');
    if (cleanedDigits.length < 9) {
      errors.phone = 'Introduce un número de teléfono válido (ej: +34 666 11 98 49)';
    }

    if (!form.email.trim() || !form.email.includes('@') || !form.email.includes('.')) {
      errors.email = 'Introduce un correo electrónico válido';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSubmitQuote(form);
  };

  // Color selection list for current material
  const currentColor = selectedMaterial.colors.find(c => c.hex.toLowerCase() === selectedColorHex.toLowerCase()) 
    || selectedMaterial.colors[0];

  return (
    <div className="bg-[#0c0d18] border border-purple-900/40 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between space-y-7">
      
      {/* Header title */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Calculadora de Precio Estimado
              </h3>
              <p className="text-xs text-slate-400">
                Parámetros técnicos de fabricación aditiva
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">
              Volumen Base
            </span>
            <span className="text-sm font-mono font-bold text-white tabular-nums">
              {stats.volumeCm3.toFixed(2)} cm³
            </span>
          </div>
        </div>
      </div>

      {/* 1. Material Selection (Interactive dropdown / selector) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            1. Selección de Material
          </span>
          <span className="text-[11px] text-purple-400 font-mono">
            {selectedMaterial.category}
          </span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          {MATERIALS.map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => {
                  onSelectMaterial(mat);
                  onSelectColorHex(mat.colors[0].hex);
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-purple-800/60 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {mat.name.split(' ')[0]} {mat.name.split(' ')[1] || ''}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {mat.tagline}
                </div>
                <div className="text-[10px] text-purple-400 font-mono mt-1.5 font-medium">
                  Resistencia: {mat.tensileStrength}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Paintbrush className="w-3.5 h-3.5 text-cyan-400" />
            2. Color y Acabado ({currentColor.name})
          </span>
        </label>

        <div className="flex items-center gap-2.5 flex-wrap">
          {selectedMaterial.colors.map((color) => {
            const isSelected = selectedColorHex.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onSelectColorHex(color.hex)}
                title={color.name}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${
                  isSelected 
                    ? 'ring-2 ring-purple-400 scale-110 shadow-[0_0_12px_rgba(168,85,247,0.7)]' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check className={`w-4 h-4 ${color.hex === '#f8fafc' || color.hex === '#fafafa' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Infill & Quantity Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-purple-400" />
              Cantidad de piezas
            </span>
            {quote.discountPercent > 0 && (
              <span className="text-[11px] text-emerald-400 font-mono font-bold">
                -{quote.discountPercent}% descuento
              </span>
            )}
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdateQuoteParams(Math.max(1, quote.quantity - 1), quote.infillPercent, quote.layerHeightMm)}
              className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="500"
              value={quote.quantity}
              onChange={(e) => onUpdateQuoteParams(parseInt(e.target.value) || 1, quote.infillPercent, quote.layerHeightMm)}
              className="flex-1 h-10 rounded-lg bg-slate-900 border border-purple-900/40 text-center font-mono font-bold text-white text-base focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => onUpdateQuoteParams(quote.quantity + 1, quote.infillPercent, quote.layerHeightMm)}
              className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Infill Density Slider */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-cyan-400" />
              Relleno Estructural
            </span>
            <span className="text-xs font-mono font-bold text-purple-300">
              {quote.infillPercent}%
            </span>
          </label>

          <div className="pt-2">
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={quote.infillPercent}
              onChange={(e) => onUpdateQuoteParams(quote.quantity, parseInt(e.target.value), quote.layerHeightMm)}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>15% Ligero</span>
              <span>40% Estándar</span>
              <span>100% Sólido</span>
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Price Box (Real-time update) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-[#131326] to-[#0c0d18] border border-purple-500/40 shadow-xl space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Precio Aproximado
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {quote.quantity} ud{quote.quantity > 1 ? 's' : ''} · {selectedMaterial.name.split(' ')[0]} ({quote.infillPercent}% infill)
            </span>
          </div>
          <div className="text-right">
            <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 tabular-nums">
              {quote.totalEstimatedPrice.toFixed(2)}€
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              IVA incl. (21%) · {quote.unitPrice.toFixed(2)}€/ud
            </div>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fabricación estimada: <strong>~{stats.estimatedPrintTimeHours * quote.quantity > 24 ? `${Math.ceil((stats.estimatedPrintTimeHours * quote.quantity) / 8)} días` : `${(stats.estimatedPrintTimeHours * quote.quantity).toFixed(1)} h`}</strong></span>
          </div>
          {quote.discountAmount > 0 && (
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Ahorras: {quote.discountAmount.toFixed(2)}€
            </span>
          )}
        </div>
      </div>

      {/* Form: Enviar para Presupuesto Definitivo */}
      <form onSubmit={validateAndSubmit} className="space-y-4 pt-2 border-t border-purple-900/30">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Confirmar Datos de Contacto
          </h4>
        </div>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Nombre completo o Empresa *"
                value={form.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors ${
                  formErrors.name ? 'border-red-500' : 'border-slate-800'
                }`}
              />
            </div>
            {formErrors.name && (
              <span className="text-[10px] text-red-400 block mt-1">{formErrors.name}</span>
            )}
          </div>

          {/* WhatsApp & Email (Two columns on sm) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="WhatsApp (+34 666...) *"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors ${
                    formErrors.phone ? 'border-red-500' : 'border-slate-800'
                  }`}
                />
              </div>
              {formErrors.phone && (
                <span className="text-[10px] text-red-400 block mt-1">{formErrors.phone}</span>
              )}
            </div>

            <div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="Correo electrónico *"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-slate-800'
                  }`}
                />
              </div>
              {formErrors.email && (
                <span className="text-[10px] text-red-400 block mt-1">{formErrors.email}</span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <textarea
              rows={2}
              placeholder="Notas, tolerancias especiales o indicaciones de acabado (opcional)..."
              value={form.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.98]"
        >
          <Send className="w-4 h-4 text-cyan-300" />
          <span>Enviar para Presupuesto Definitivo</span>
        </button>

        <div className="text-center">
          <span className="text-[11px] text-slate-500">
            Respuesta y validación técnica garantizada en menos de 2 horas laborables.
          </span>
        </div>
      </form>

    </div>
  );
};
