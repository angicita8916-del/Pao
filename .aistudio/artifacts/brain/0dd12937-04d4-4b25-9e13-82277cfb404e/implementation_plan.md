# Proyect 3D — Industrial 3D Printing & Prototyping Platform

A modern, high-tech industrial landing page and interactive platform for **Proyect 3D** (Torrijos, Spain). The application features an interactive Three.js STL file viewer with instant volume/dimension calculation, real-time parametric price estimator, automated quote generator linked directly to WhatsApp & Email, and an interactive virtual assistant named "Milo".

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Visual direction aligned with your preference: A **deep industrial dark theme** featuring **electric neon purple/violet** primary accents paired with **cyber neon highlights** (neon cyan & electric violet), high-contrast engineering typography, and zero washed-out tones.

- **Visual Palette**: Deep obsidian/charcoal backdrop (`#09090F`, `#12121E`), electric neon purple (`#A855F7`, `#9333EA`), and sharp cyber neon accents (`#06B6D4`, `#E879F9`).
- **Interactive 3D Engine**: Three.js WebGL canvas with custom binary/ASCII STL parser, real-time volume & bounding box measurement, studio 3-point lighting, and material shaders.
- **Demo STL Library**: Built-in sample models (Industrial Spur Gear, Heavy-Duty Mounting Bracket, Precision Caliper Component) available alongside user drag-and-drop file upload.
- **Quote Dispatch Strategy**: Direct pre-formatted WhatsApp quote dispatch (`+34 666119849`) plus automatic mailto draft (`angicita8916@gmail.com`) with a transparent cost breakdown modal.
- **Virtual Assistant "Milo"**: Floating bottom-right interactive assistant with friendly tech avatar, quick reply options, and conversational intelligence for material advice, Torrijos location, and instant WhatsApp handoff.

---

## 1. Overview & Core Concept

- **What It Does**: Showcases Proyect 3D's advanced additive manufacturing and industrial prototyping capabilities located at Av. de los Trabajadores, 22, Torrijos. Enables mechanical engineers, industrial designers, and hobbyists to drag-and-drop 3D .STL files, inspect them in 360°, inspect physical dimensions, calculate precise volume, and receive an instant estimated quote based on material and quantity.
- **Target Audience / Persona**: Industrial engineers, product developers, architects, automotive & machinery workshops, and local businesses in Castilla-La Mancha / Madrid / Spain needing rapid prototyping and additive manufacturing.
- **Key Value**: Eliminates the slow 24-48h email quoting cycle with instant 3D model visualization and real-time parameter-driven cost estimation, backed by direct local WhatsApp communication.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Discovery & Exploration**: Users land on a cinematic hero showcasing industrial additive manufacturing, rapid prototyping badges, and a direct CTA "Subir archivo STL / Calcular Precio" that smoothly scrolls to the 3D tool.
2. **Interactive 3D Inspection & Instant Quoting**:
   - The user drags a `.stl` file onto the dropzone or selects one of the 3 pre-loaded industrial models.
   - The Three.js viewer immediately renders the model with OrbitControls (rotate, pan, zoom, wireframe toggle, reset view).
   - Real-time dimensional metrics calculate: Dimensions $X \times Y \times Z$ in mm, bounding volume in $\text{cm}^3$, and polygon triangle count.
   - User configures Material (PLA, Standard Resin, Engineering Nylon PA12, Recyclable PETG), Quality/Infill preset, Color (Neon Violet, Cyber Cyan, Matte Black, Engineering Grey, Signal Orange), and Quantity.
   - Instant calculation updates the estimated price breakdown in Euros (€).
3. **Budget Finalization & WhatsApp Handoff**:
   - User fills in their contact details (Name, Spanish-formatted WhatsApp `+34 ...`, Email, Notes).
   - Clicking "Enviar para Presupuesto Definitivo" displays an itemized quotation breakdown and provides one-click dispatch to WhatsApp (+34 666119849) and Email (angicita8916@gmail.com).
4. **Milo Virtual Assistant Support**:
   - Floating avatar on the bottom-right expands into an interactive chat widget.
   - Quick options for "Calcular precio de mi STL", "Información de Materiales", "Hablar por WhatsApp", and "Ubicación en Torrijos".
   - Open input query with intelligent Spanish NLP fallback explaining prototyping turnaround, resolution, materials, and facility visits.

### Visual Identity & Theme

- **Aesthetic Direction**: Industrial Precision Engineering & Cyber Additive Manufacturing.
- **Color Palette (60-30-10 Rule)**:
  - `60% Neutral Canvas`: Deep obsidian black `#09090F` and slate background `#0F101A`.
  - `30% Structural Surfaces`: Dark graphite panels `#171827`, translucent frosted cards with hairline borders (`border-purple-900/30`), and muted titanium text `#94A3B8`.
  - `10% Neon Accent Budget`: Electric neon purple (`#A855F7`, `#C084FC`) and cyber cyan (`#06B6D4`), reserved strictly for primary interactive states, glow rings, and CTAs.
- **Typography & Hierarchy**:
  - Display & Headings: Bold geometric sans (`Plus Jakarta Sans` / `Syne` inspiration) with tight letter tracking (`tracking-tight`).
  - Technical Data & Metrics: Monospace tabular numerals (`font-mono tabular-nums`) for dimensions, volume, price, and coordinates.
- **Interactive Feedback**:
  - 3D viewport canvas with coordinate grid floor, ambient occlusion shading, and responsive resize handling.
  - Hover glow rings and smooth cubic-bezier transitions.

---

## 3. Key Product Decisions & Trade-Offs

- **Three.js with Native STL Loader**:
  - *Chosen Approach*: Lightweight Three.js with `STLLoader` parsing binary and ASCII STL files in memory.
  - *Why*: Instant client-side parsing without requiring heavy external server processing; zero latency for users.
  - *Alternatives Considered*: Server-side rendering (slow, requires GPU server) or heavy external viewer iframes (unreliable, ads, poor styling).
- **Physical Volume Calculation Algorithm**:
  - *Chosen Approach*: Signed tetrahedron volume algorithm across all mesh triangles ($\sum \frac{v_1 \cdot (v_2 \times v_3)}{6}$), allowing exact volume calculation of watertight STL meshes.
  - *Why*: Provides mathematically accurate $\text{cm}^3$ volume for realistic filament/resin pricing calculations.
- **Client-Side Assistant Milo with Structured Dialogue & Open NLP**:
  - *Chosen Approach*: Fast, responsive virtual assistant with pre-programmed decision trees for instant answers and context-aware responses.
  - *Why*: Zero lag, 100% reliable within sandbox environments, instant redirection to the viewer or Torrijos contact info.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Proyect 3D Landing Page                         │
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Top Bar: Logo "Proyect 3D", Navigation, CTA "Solicitar Cotización" │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Hero Section: Torrijos & Spain Leader, Prototyping Badges, CTA     │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 3D STL Viewer & Dynamic Price Calculator:                          │ │
│ │  ┌──────────────────────────────┐ ┌──────────────────────────────┐ │ │
│ │  │ Three.js Canvas:             │ │ Parameter Controls:          │ │ │
│ │  │ - OrbitControls (rotate/zoom)│ │ - Material (PLA/Resin/Nylon) │ │ │
│ │  │ - Preset demo models         │ │ - Color & Infill Preset      │ │ │
│ │  │ - Drag-and-Drop Zone         │ │ - Quantity selector          │ │ │
│ │  │ - Mesh Metrics (X, Y, Z, cm³)│ │ - Live Price Quote (€)       │ │ │
│ │  └──────────────────────────────┘ └──────────────────────────────┘ │ │
│ │  ┌───────────────────────────────────────────────────────────────┐ │ │
│ │  │ Form: Name, Spanish WhatsApp (+34), Email, Notes, Dispatch    │ │ │
│ │  └───────────────────────────────────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Services & Prototyping: FDM, SLA, Industrial Nylon, CAD Design     │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Materials Showcase: PLA, Resin, Nylon PA12, Recycled Eco-Polymers   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Location & Contact: Av. de los Trabajadores, 22, Torrijos          │ │
│ │ Direct WhatsApp (+34 666119849), Email, Facebook link, Map View    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Floating Chatbot Widget "Milo":                                    │ │
│ │ - Animated Character Avatar                                        │ │
│ │ - Quick Options (Price, Materials, WhatsApp, Torrijos location)    │ │
│ │ - Conversational Fallback & Direct Contact Handoff                 │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown
- `src/components/Navbar.tsx`: 3-zone Top Bar compliant with Anti-Slop constitution.
- `src/components/Hero.tsx`: High-impact industrial hero with CTA to the 3D tool.
- `src/components/Viewer3D.tsx`: Three.js WebGL canvas, `STLLoader`, volume calculator, bounding box metrics.
- `src/components/PriceCalculator.tsx`: Material density, infill matrix, dynamic price estimator, and budget request form.
- `src/components/ServicesSection.tsx`: Industrial prototyping capabilities, FDM/SLA specifications, tolerance metrics.
- `src/components/MaterialsGuide.tsx`: Detailed material specifications, tensile strength, heat resistance.
- `src/components/ContactLocation.tsx`: Torrijos facility details, Google Maps integration preview, WhatsApp and email action triggers.
- `src/components/ChatbotMilo.tsx`: Virtual assistant widget with friendly tech avatar, quick replies, and natural responses.
- `src/components/QuoteModal.tsx`: Transparent quote breakdown modal with 1-click WhatsApp & email triggers.
