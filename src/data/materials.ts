import { MaterialOption } from '../types';

export const MATERIALS: MaterialOption[] = [
  {
    id: 'pla',
    name: 'PLA Premium (Ácido Poliláctico)',
    category: 'FDM Fused Deposition',
    tagline: 'Ideal para prototipos visuales y maquetas de alta precisión',
    description: 'Termoplástico biodegradable derivado del almidón vegetal. Excelente acabado superficial, estabilidad dimensional y facilidad de post-procesado.',
    density: 1.24, // g/cm3
    basePricePerCm3: 0.16, // € / cm3
    finishingMultiplier: 1.0,
    tensileStrength: '50 - 65 MPa',
    heatResistance: 'Hasta 55 °C',
    accuracy: '±0.15 mm',
    recommendedFor: [
      'Prototipado rápido de concepto',
      'Maquetas arquitectónicas y carcasas',
      'Validación ergonómica y de ajuste',
      'Piezas decorativas y utillajes ligeros'
    ],
    colors: [
      { name: 'Negro Mate Industrial', hex: '#18181b', preview: 'bg-zinc-900 border-zinc-700' },
      { name: 'Púrpura Neón Proyect 3D', hex: '#a855f7', preview: 'bg-purple-600 border-purple-400' },
      { name: 'Cian Cibernético', hex: '#06b6d4', preview: 'bg-cyan-500 border-cyan-300' },
      { name: 'Gris Técnico Titanio', hex: '#64748b', preview: 'bg-slate-500 border-slate-400' },
      { name: 'Naranja Señalización', hex: '#f97316', preview: 'bg-orange-500 border-orange-300' },
      { name: 'Blanco Puro Técnico', hex: '#f8fafc', preview: 'bg-slate-100 border-slate-300' }
    ]
  },
  {
    id: 'resin',
    name: 'Resina Estándar SLA/DLP',
    category: 'Fotopolimerización SLA',
    tagline: 'Definición microscópica y superficie lisa tipo inyección',
    description: 'Curado foto-químico por láser UV de altísima resolución. Capas casi imperceptibles de 0.05 mm, ideal para geometrías intrincadas, joyería o miniaturas.',
    density: 1.15,
    basePricePerCm3: 0.32,
    finishingMultiplier: 1.25,
    tensileStrength: '40 - 50 MPa',
    heatResistance: 'Hasta 60 °C',
    accuracy: '±0.05 mm',
    recommendedFor: [
      'Modelos con detalles milimétricos',
      'Moldes maestros de silicona',
      'Piezas dentales y biomédicas estéticas',
      'Superficies lisas sin líneas de capa'
    ],
    colors: [
      { name: 'Gris Neutro Pro', hex: '#71717a', preview: 'bg-zinc-500 border-zinc-400' },
      { name: 'Púrpura Transparente UV', hex: '#9333ea', preview: 'bg-purple-700 border-purple-500' },
      { name: 'Negro Ónix Pulido', hex: '#09090b', preview: 'bg-black border-zinc-800' },
      { name: 'Blanco Marfil', hex: '#fafafa', preview: 'bg-zinc-100 border-zinc-300' }
    ]
  },
  {
    id: 'nylon',
    name: 'Nylon Técnico PA12 Industrial',
    category: 'Ingeniería Avanzada / SLS / FDM',
    tagline: 'Máxima tenacidad, resistencia al impacto y fatiga mecánica',
    description: 'Poliamida técnica de grado industrial. Soporta cargas dinámicas, fricción repetitiva y contacto con aceites e hidrocarburos. La elección reina para repuestos funcionales.',
    density: 1.02,
    basePricePerCm3: 0.44,
    finishingMultiplier: 1.4,
    tensileStrength: '75 - 90 MPa',
    heatResistance: 'Hasta 120 °C',
    accuracy: '±0.20 mm',
    recommendedFor: [
      'Engranajes y mecanismos sometidos a fricción',
      'Soportes estructurales bajo esfuerzo',
      'Sustitución de piezas metálicas en maquinaria',
      'Carcasas automotrices e industriales'
    ],
    colors: [
      { name: 'Negro Grafito Reforzado', hex: '#1e1e24', preview: 'bg-slate-900 border-slate-700' },
      { name: 'Gris Acero Mecánico', hex: '#475569', preview: 'bg-slate-600 border-slate-400' },
      { name: 'Púrpura Deep Carbon', hex: '#6b21a8', preview: 'bg-purple-900 border-purple-700' }
    ]
  },
  {
    id: 'recyclable',
    name: 'Materiales Reciclables (rPETG / Eco-Fil)',
    category: 'Eco-Ingeniería Sostenible',
    tagline: 'Economía circular certificada con resistencia química y climática',
    description: 'Fabricado a partir de residuos poliméricos posconsumo reciclados en la UE. Excelente adherencia entre capas, resistencia química, impermeable y reciclable en circuito cerrado.',
    density: 1.27,
    basePricePerCm3: 0.22,
    finishingMultiplier: 1.1,
    tensileStrength: '50 - 60 MPa',
    heatResistance: 'Hasta 75 °C',
    accuracy: '±0.18 mm',
    recommendedFor: [
      'Piezas para exteriores e intemperie',
      'Contenedores estancos y botellas técnicas',
      'Proyectos con huella de carbono reducida',
      'Prototipado duradero con conciencia ecológica'
    ],
    colors: [
      { name: 'Púrpura Galáctico Reciclado', hex: '#8b5cf6', preview: 'bg-purple-500 border-purple-300' },
      { name: 'Cian Eco-Océano', hex: '#0284c7', preview: 'bg-sky-600 border-sky-400' },
      { name: 'Negro Eco Carbono', hex: '#1c1917', preview: 'bg-stone-900 border-stone-700' },
      { name: 'Verde Pino Reclaimed', hex: '#15803d', preview: 'bg-green-700 border-green-500' }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'Proyect 3D',
  tagline: 'Ingeniería Aditiva & Prototipado Industrial',
  locationCity: 'Torrijos, Toledo (España)',
  address: 'Av. de los Trabajadores, 22, 45500 Torrijos, Toledo',
  addressComplement: 'Frente al Vivero de Empresas Manuel Diaz Ruiz',
  phone: '+34 666119849',
  phoneFormatted: '+34 666 11 98 49',
  phoneRaw: '34666119849',
  email: 'angicita8916@gmail.com',
  facebook: 'https://www.facebook.com/Proyect3D',
  googleMapsUrl: 'https://maps.google.com/?q=Av.+de+los+Trabajadores,+22,+45500+Torrijos,+Toledo',
  openingHours: 'Lunes a Viernes: 08:30 - 19:30 | Sábados con cita previa',
  leadTimes: '24h - 48h para prototipos urgentes'
};
