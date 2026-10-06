import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  HelpCircle,
  Phone,
  MapPin,
  Layers,
  Calculator,
  Minimize2
} from 'lucide-react';
import { COMPANY_INFO, MATERIALS } from '../data/materials';
import { ChatMessage } from '../types';

interface ChatbotMiloProps {
  onScrollToViewer: () => void;
  onScrollToMaterials: () => void;
  onScrollToLocation: () => void;
  onOpenDriveModal?: () => void;
}

export const ChatbotMilo: React.FC<ChatbotMiloProps> = ({
  onScrollToViewer,
  onScrollToMaterials,
  onScrollToLocation,
  onOpenDriveModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from Milo
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'milo',
      text: '¡Hola! Soy Milo, el asistente virtual de Proyect 3D. ¿En qué puedo ayudarte hoy?',
      timestamp: 'Ahora',
      quickReplies: [
        { label: 'Calcular precio de mi STL', actionId: 'calc_price' },
        { label: 'Información de Materiales', actionId: 'info_materials' },
        { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' },
        { label: 'Ubicación en Torrijos', actionId: 'torrijos_location' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const handleQuickAction = (actionId: string, label: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: label,
      timestamp: 'Ahora'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: ChatMessage;

      switch (actionId) {
        case 'calc_price':
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: '¡Por supuesto! Te he desplazado directamente a nuestro Visor 3D interactivo. Puedes arrastrar tu archivo .STL o probar con uno de los modelos demo para ver el cálculo de volumen, dimensiones y coste en tiempo real.',
            timestamp: 'Ahora',
            quickReplies: [
              { label: 'Información de Materiales', actionId: 'info_materials' },
              { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' }
            ]
          };
          onScrollToViewer();
          break;

        case 'info_materials':
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: `En Proyect 3D disponemos de 4 tecnologías principales:\n\n1. **PLA Premium**: Ideal para maquetas, prototipos visuales y piezas económicas de alta precisión.\n2. **Resina Estándar SLA**: Acabado superficial espejo sin líneas de capa, tolerancias de ±0.05 mm para geometrías milimétricas.\n3. **Nylon PA12 Industrial**: Gran tenacidad y resistencia mecánica hasta 120 °C, para piezas de repuesto o mecanismos con fricción.\n4. **Materiales Reciclables (rPETG)**: Sostenible con excelente resistencia química y a la intemperie.`,
            timestamp: 'Ahora',
            quickReplies: [
              { label: 'Calcular precio de mi STL', actionId: 'calc_price' },
              { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' }
            ]
          };
          onScrollToMaterials();
          break;

        case 'chat_whatsapp':
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: `Te conecto directamente con nuestro equipo técnico de Torrijos por WhatsApp en el ${COMPANY_INFO.phoneFormatted}. Haz clic en el enlace para abrir la conversación.`,
            timestamp: 'Ahora'
          };
          window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hola Milo y equipo de Proyect 3D, me gustaría realizar una consulta técnica.')}`, '_blank');
          break;

        case 'torrijos_location':
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: `Estamos ubicados en:\n\n📍 **${COMPANY_INFO.address}**\n(${COMPANY_INFO.addressComplement})\n45500 Torrijos, Toledo (España).\n\n⏰ Horario: ${COMPANY_INFO.openingHours}.\n\n¡Puedes recoger tus pedidos aquí o solicitarnos envío nacional!`,
            timestamp: 'Ahora',
            quickReplies: [
              { label: 'Ver en Google Maps', actionId: 'open_maps' },
              { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' }
            ]
          };
          onScrollToLocation();
          break;

        case 'open_maps':
          window.open(COMPANY_INFO.googleMapsUrl, '_blank');
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: '¡Abriendo mapa de Google Maps para llegar a Av. de los Trabajadores 22 en Torrijos!',
            timestamp: 'Ahora'
          };
          break;

        case 'open_drive':
          if (onOpenDriveModal) onOpenDriveModal();
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: '¡He abierto la ventana de Google Drive! Puedes buscar tus archivos 3D (.stl) y cargarlos directamente en el visor de Proyect 3D.',
            timestamp: 'Ahora'
          };
          break;

        default:
          botResponse = {
            id: `m-${Date.now()}`,
            sender: 'milo',
            text: `¿En qué más te puedo orientar? Recuerda que puedes contactarnos directamente al WhatsApp ${COMPANY_INFO.phoneFormatted} o escribir a ${COMPANY_INFO.email}.`,
            timestamp: 'Ahora'
          };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const query = inputMessage.trim();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Ahora'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const lower = query.toLowerCase();

    setTimeout(() => {
      let replyText = '';
      let quicks: { label: string; actionId: string }[] | undefined = undefined;

      if (lower.includes('precio') || lower.includes('coste') || lower.includes('cuanto') || lower.includes('stl') || lower.includes('cotizar') || lower.includes('presupuesto')) {
        replyText = 'Puedes calcular el precio estimado al instante arrastrando tu archivo .STL a nuestro visor 3D interactivo en la sección superior. ¿Quieres que te desplace allí?';
        quicks = [
          { label: 'Ir al Visor 3D', actionId: 'calc_price' },
          { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' }
        ];
      } else if (lower.includes('drive') || lower.includes('google drive')) {
        replyText = '¡Sí! Puedes importar tus archivos .STL directamente desde tu Google Drive. Pulsa el botón a continuación para abrir tu cuenta de Drive y seleccionar tu modelo.';
        quicks = [
          { label: 'Abrir Google Drive', actionId: 'open_drive' },
          { label: 'Calcular precio de mi STL', actionId: 'calc_price' }
        ];
      } else if (lower.includes('material') || lower.includes('nylon') || lower.includes('pla') || lower.includes('resina') || lower.includes('recicl')) {
        replyText = 'Trabajamos con PLA Premium (prototipado rápido), Resina SLA de alta definición, Nylon PA12 de máxima tenacidad y rPETG reciclable. ¿Sobre cuál te gustaría saber más?';
        quicks = [
          { label: 'Información de Materiales', actionId: 'info_materials' },
          { label: 'Calcular precio de mi STL', actionId: 'calc_price' }
        ];
      } else if (lower.includes('torrijos') || lower.includes('donde') || lower.includes('ubicacion') || lower.includes('direccion') || lower.includes('taller')) {
        replyText = `Estamos en Av. de los Trabajadores, 22, 45500 Torrijos, Toledo (frente al Vivero de Empresas Manuel Diaz Ruiz). ¿Deseas visitarnos o coordinar una entrega?`;
        quicks = [
          { label: 'Ubicación en Torrijos', actionId: 'torrijos_location' },
          { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' }
        ];
      } else if (lower.includes('plazo') || lower.includes('tiempo') || lower.includes('tarda') || lower.includes('urgente') || lower.includes('dias')) {
        replyText = 'Nuestro plazo habitual para prototipos rápidos es de 24 a 48 horas. Para tiradas medianas o series cortas acordamos la fecha de entrega exacta tras revisar la geometría.';
        quicks = [
          { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' },
          { label: 'Calcular precio de mi STL', actionId: 'calc_price' }
        ];
      } else if (lower.includes('hola') || lower.includes('buenas') || lower.includes('saludos')) {
        replyText = '¡Hola de nuevo! Estoy aquí para resolver cualquier duda sobre impresión 3D en Proyect 3D. ¿Tienes algún archivo que quieras cotizar?';
        quicks = [
          { label: 'Calcular precio de mi STL', actionId: 'calc_price' },
          { label: 'Información de Materiales', actionId: 'info_materials' },
          { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' }
        ];
      } else {
        // Conversational fallback
        replyText = `Entiendo tu consulta sobre "${query.length > 30 ? query.substring(0, 30) + '...' : query}". Para darte una respuesta técnica personalizada y verificar las tolerancias exactas de tu modelo, te recomiendo escribir directamente a nuestro equipo por WhatsApp al 666119849 o por email a angicita8916@gmail.com.`;
        quicks = [
          { label: 'Hablar por WhatsApp', actionId: 'chat_whatsapp' },
          { label: 'Ubicación en Torrijos', actionId: 'torrijos_location' }
        ];
      }

      const botMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'milo',
        text: replyText,
        timestamp: 'Ahora',
        quickReplies: quicks
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Trigger Button (when closed) */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="group relative flex items-center gap-3 p-2 pr-4 bg-[#0e0f22] border border-purple-500/50 hover:border-purple-400 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Abrir asistente virtual Milo"
        >
          {/* Avatar with glowing ring */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
            <img
              src="/src/assets/images/milo_avatar_1791199569313.jpg"
              alt="Milo Asistente Proyect 3D"
              className="w-full h-full object-cover"
            />
            {/* Online green indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0e0f22] rounded-full"></span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-wide">Milo</span>
              <span className="text-[10px] font-mono text-cyan-400">Online</span>
            </div>
            <span className="text-[11px] text-slate-300 block -mt-0.5">
              ¿Dudas sobre tu STL?
            </span>
          </div>

          {/* Unread notification ping */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] font-bold text-black items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-[#0c0d1a] border border-purple-500/40 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.35)] flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Chat Window Header */}
          <div className="p-4 bg-gradient-to-r from-[#14152e] via-[#101124] to-[#0c0d1a] border-b border-purple-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <img
                  src="/src/assets/images/milo_avatar_1791199569313.jpg"
                  alt="Milo Asistente Proyect 3D"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Milo
                  <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    Proyect 3D
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Asistente Virtual · Torrijos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-850 transition-colors cursor-pointer"
                title="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isMilo = msg.sender === 'milo';
              return (
                <div key={msg.id} className={`flex flex-col ${isMilo ? 'items-start' : 'items-end'}`}>
                  
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      isMilo
                        ? 'bg-[#15162c] text-slate-200 border border-purple-900/40 rounded-tl-sm shadow-md'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick Action Buttons attached to bot message */}
                  {isMilo && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.quickReplies.map((q) => (
                        <button
                          key={q.actionId}
                          onClick={() => handleQuickAction(q.actionId, q.label)}
                          className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 hover:border-purple-400 transition-all flex items-center gap-1 cursor-pointer text-left"
                        >
                          <span>{q.label}</span>
                          <ArrowRight className="w-3 h-3 text-cyan-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#15162c] border border-purple-900/40 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Direct WhatsApp bar */}
          <div className="px-3 py-1.5 bg-[#0e0f22] border-t border-purple-950 flex items-center justify-between text-[11px] text-slate-400">
            <span>¿Prefieres WhatsApp directo?</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hola Proyect 3D, vengo del asistente web Milo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>666 11 98 49</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Open text input form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#111226] border-t border-purple-900/40 flex items-center gap-2">
            <input
              type="text"
              placeholder="Pregúntale a Milo (ej: plazos, formatos, materiales)..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-900/90 border border-purple-900/40 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white transition-all cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
