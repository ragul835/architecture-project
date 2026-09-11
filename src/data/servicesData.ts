import { ServiceItem } from '@/lib/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'residential-architecture',
    title: 'Luxury Villa & Residential Architecture',
    category: 'Residential',
    shortDesc: 'Bespoke coastal and urban villas integrating Vastu Shastra geometry, Angan courtyards, and monsoon passive cooling.',
    fullDesc: 'We design luxury residences across India tailored to climate, micro-location, and lifestyle. From cantilevered coastal villas in Alibaug to urban courtyard estates in Bengaluru, our homes blend high-performance concrete with Kota stone, teakwood, and jaali solar screens.',
    iconName: 'Home',
    deliverables: [
      'Site Feasibility & Vastu Shastra Spatial Mapping',
      '3D Massing Renders & VR Walkthroughs',
      'Structural, Electrical & Plumbing (MEP) Engineering',
      'Municipal Building Permission Drawings (CoA Registered)',
      'On-Site Construction Quality Supervision'
    ],
    features: [
      'Open-to-sky central courtyard (Angan) light wells',
      'Terracotta & stone jaali passive cooling screens',
      '100,000L+ rainwater harvesting cisterns',
      'High-mass Kota & Jaisalmer thermal flooring'
    ],
    image: '/images/indian_hero.png'
  },
  {
    id: 'commercial-skyscrapers',
    title: 'Commercial Towers & IGBC Green Buildings',
    category: 'Commercial',
    shortDesc: 'High-density corporate headquarters and urban landmarks designed for IGBC Platinum green standards.',
    fullDesc: 'Our commercial architecture practice designs corporate towers that redefine Indian skyline aesthetics. Combining double-skin kinetic glass facades with indoor sky-gardens, we optimize floor plate efficiency while slashing HVAC power consumption.',
    iconName: 'Building',
    deliverables: [
      'High-Density FSI & Zoning Optimization',
      'IGBC / LEED Platinum Certification Filing',
      'Kinetic Double-Skin Glass Facade Engineering',
      'Biophilic Atrium & Air-Purifying Vegetation Masterplan'
    ],
    features: [
      'BIPV solar glass generating renewable power',
      'Greywater recycling & zero-liquid-discharge systems',
      'Column-free floor plates with structural steel cores'
    ],
    image: '/images/tower_seattle.png'
  },
  {
    id: 'heritage-restoration',
    title: 'Heritage Haveli & Adaptive Restoration',
    category: 'Adaptive Reuse',
    shortDesc: 'Restoring historic Rajasthani Haveli structures and colonial bungalows into contemporary luxury residences.',
    fullDesc: 'AURA specializes in historic architectural conservation across South Mumbai, Rajasthan, and Goa. We restore century-old lime plaster and carved stone arches while inserting discreet modern structural steel frames for seismic safety.',
    iconName: 'Hammer',
    deliverables: [
      'Heritage Conservation Committee (MHCC) Filings',
      'Traditional Lime Mortar & Stonework Restoration',
      'Hidden Structural Steel Retrofitting',
      'Adaptive Interior Space Planning'
    ],
    features: [
      'Breathable traditional lime plaster techniques',
      'Restored hand-carved stone jharokha balconies',
      'Integrated smart lighting & HVAC in heritage walls'
    ],
    image: '/images/loft_after.png'
  },
  {
    id: 'interior-architecture',
    title: 'Luxury Interior Architecture & Joinery',
    category: 'Interior Architecture',
    shortDesc: 'Bespoke spatial interiors featuring Kota stone, Jaisalmer marble, brass jaali screens, and custom teak joinery.',
    fullDesc: 'Our interior architecture department transforms raw volume into serene, tactile sanctuaries. We craft custom furniture, brass partition screens, and architectural lighting scenes using local Indian stones and hardwoods.',
    iconName: 'Palette',
    deliverables: [
      'Bespoke Teak & Walnut Joinery Working Drawings',
      'Stone & Marble Selection & Installation Supervision',
      'Custom Architectural Lighting & Automation Scenes',
      'Acoustic Paneling & Micro-Cement Surface Specs'
    ],
    features: [
      'Italian Travertine & Kota Stone book-matched slabs',
      'Laser-cut brass jaali privacy partitions',
      'Concealed shadow-gap ceiling lighting channels'
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: '3d-vr-digital-twins',
    title: '3D VR Digital Twins & Solar Simulation',
    category: 'Digital Innovation',
    shortDesc: 'Real-time 3D VR walkthroughs and parametric sun-path thermal simulations for pre-construction validation.',
    fullDesc: 'Experience your project in full 1:1 scale before ground is broken. We build interactive 3D digital twins and simulate annual solar heat gain, shadow movement, and monsoon wind vectors.',
    iconName: 'Sparkles',
    deliverables: [
      'Interactive 1:1 Scale Virtual Reality (VR) Models',
      'Parametric Sun-Path & Shadow Analysis Reports',
      'Real-Time Daylight & Thermal Radiation Maps',
      'High-Resolution 8K Architectural Renderings'
    ],
    features: [
      'Real-time material swap & lighting simulation',
      'Monsoon wind vector CFD airflow analysis',
      'Rooftop solar irradiance calculation'
    ],
    image: '/images/hero_main.png'
  }
];
