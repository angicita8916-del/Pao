import React, { useState, useMemo, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Viewer3D } from './components/Viewer3D';
import { PriceCalculator } from './components/PriceCalculator';
import { QuoteModal } from './components/QuoteModal';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsGuide } from './components/MaterialsGuide';
import { ContactLocation } from './components/ContactLocation';
import { ChatbotMilo } from './components/ChatbotMilo';
import { Footer } from './components/Footer';

import { MATERIALS } from './data/materials';
import { 
  MaterialOption, 
  ModelStats, 
  CustomerForm 
} from './types';
import { calculateQuote } from './utils/pricing';
import { initAuth } from './services/firebaseAuth';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Google Auth User state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [driveModalOpen, setDriveModalOpen] = useState<boolean>(false);
  const [externalDriveSTL, setExternalDriveSTL] = useState<{ buffer: ArrayBuffer; filename: string } | null>(null);

  // Initialize Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Default material and color (Electric Neon Purple Proyect 3D)
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(MATERIALS[0]);
  const [selectedColorHex, setSelectedColorHex] = useState<string>(MATERIALS[0].colors[1].hex); // #a855f7

  // Active Model Stats (initial placeholder updated upon initial 3D load)
  const [stats, setStats] = useState<ModelStats>({
    filename: 'Engranaje Helicoidal 18D.stl',
    dimensions: { x: 40.0, y: 40.0, z: 18.0 },
    volumeCm3: 36.2,
    triangleCount: 4890,
    weightGrams: 44.9,
    estimatedPrintTimeHours: 2.8
  });

  // Manufacturing parameters
  const [quantity, setQuantity] = useState<number>(1);
  const [infillPercent, setInfillPercent] = useState<number>(25);
  const [layerHeightMm, setLayerHeightMm] = useState<number>(0.20);

  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<CustomerForm>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    acceptTerms: true
  });

  // Real-time calculated quote
  const quote = useMemo(() => {
    return calculateQuote(
      stats,
      selectedMaterial,
      selectedMaterial.colors.find(c => c.hex.toLowerCase() === selectedColorHex.toLowerCase())?.name || 'Color Personalizado',
      quantity,
      infillPercent,
      layerHeightMm
    );
  }, [stats, selectedMaterial, selectedColorHex, quantity, infillPercent, layerHeightMm]);

  // Handle quote submission
  const handleSubmitQuote = (form: CustomerForm) => {
    setSubmittedForm(form);
    setQuoteModalOpen(true);
  };

  // Smooth scroll helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080f] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
      {/* 1. Header / Navbar with Google Drive button */}
      <Navbar 
        onOpenQuoteSection={() => scrollTo('visor-3d')}
        onOpenDriveModal={() => setDriveModalOpen(true)}
        currentUser={currentUser}
      />

      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero onScrollToViewer={() => scrollTo('visor-3d')} />

        {/* 3. 3D STL Viewer & Price Calculator Section */}
        <section id="visor-3d" className="py-16 sm:py-24 relative bg-[#090914] border-t border-purple-900/30 tech-grid-bg">
          
          {/* Ambient lighting glows */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Title */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Herramienta Interactiva</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Proyect 3D Torrijos</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight [text-wrap:balance]">
                Visor STL & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400">Calculadora en Tiempo Real</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Arrastra tu modelo <span className="font-mono text-purple-300 font-semibold">.STL</span> o impórtalo desde <strong className="text-white">Google Drive</strong> para rotar e inspeccionar en 360°. Nuestro motor volumétrico calcula dimensiones milimétricas y precio estimado con descuentos por cantidad inmediatos.
              </p>
            </div>

            {/* Split Grid: 3D Canvas on Left, Configurator & Form on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* 3D STL Viewer (7 Cols) */}
              <div className="lg:col-span-7 h-[580px] sm:h-[650px]">
                <Viewer3D
                  currentStats={stats}
                  onStatsChange={setStats}
                  selectedColorHex={selectedColorHex}
                  selectedMaterial={selectedMaterial}
                  onOpenDriveModal={() => setDriveModalOpen(true)}
                  externalSTLBuffer={externalDriveSTL}
                />
              </div>

              {/* Price Calculator & Contact Form (5 Cols) */}
              <div className="lg:col-span-5">
                <PriceCalculator
                  stats={stats}
                  selectedMaterial={selectedMaterial}
                  onSelectMaterial={setSelectedMaterial}
                  selectedColorHex={selectedColorHex}
                  onSelectColorHex={setSelectedColorHex}
                  quote={quote}
                  onUpdateQuoteParams={(q, infill, layer) => {
                    setQuantity(q);
                    setInfillPercent(infill);
                    setLayerHeightMm(layer);
                  }}
                  onSubmitQuote={handleSubmitQuote}
                />
              </div>

            </div>

          </div>
        </section>

        {/* 4. Industrial Services */}
        <ServicesSection onSelectViewer={() => scrollTo('visor-3d')} />

        {/* 5. Technical Materials Guide */}
        <MaterialsGuide 
          onSelectMaterial={(mat) => {
            setSelectedMaterial(mat);
            setSelectedColorHex(mat.colors[0].hex);
          }} 
        />

        {/* 6. Contact & Torrijos Location Section */}
        <ContactLocation />

      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Interactive Budget Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        stats={stats}
        quote={quote}
        form={submittedForm}
      />

      {/* 9. Google Drive File Browser Modal */}
      <GoogleDriveModal
        isOpen={driveModalOpen}
        onClose={() => setDriveModalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        onLoadSTLFromDrive={(buffer, filename) => {
          setExternalDriveSTL({ buffer, filename });
          scrollTo('visor-3d');
        }}
      />

      {/* 10. Milo Interactive Virtual Assistant Chatbot (Floating bottom-right) */}
      <ChatbotMilo
        onScrollToViewer={() => scrollTo('visor-3d')}
        onScrollToMaterials={() => scrollTo('materiales')}
        onScrollToLocation={() => scrollTo('ubicacion')}
        onOpenDriveModal={() => setDriveModalOpen(true)}
      />

    </div>
  );
}
