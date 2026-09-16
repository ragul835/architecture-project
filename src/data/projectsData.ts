import type { Project } from '@/lib/types';

const concept = (src: string, alt: string) => ({ src, alt, classification: 'concept-visualisation' as const });

export const PROJECTS_DATA: Project[] = [
  {
    id: 'concept-01', slug: 'coastal-courtyard-house-concept', title: 'Coastal Courtyard House',
    summary: 'A concept study for a shaded home organised around a protected courtyard and cross-ventilated living spaces.',
    categories: ['Architecture', 'Exterior'], status: 'concept', city: 'Location pending', state: 'India', locationVerified: false,
    propertyType: 'Independent house', scope: ['Concept architecture', 'Exterior language', 'Climate response'], focus: 'exterior',
    builtUpAreaSqFt: 4800, designStyle: 'Warm contemporary', materials: ['Terracotta screens', 'Kota stone', 'Lime-toned plaster'],
    coverImage: concept('/images/indian_hero.png', 'Concept visualisation of a shaded contemporary house with terracotta screens'),
    galleryImages: [concept('/images/indian_hero.png', 'Exterior concept with deep overhangs and terracotta screening'), concept('/images/indian_courtyard.png', 'Courtyard concept with filtered daylight and planting')],
    brief: 'This unbuilt study explores how a family home can balance privacy, daylight, outdoor living, and monsoon protection without relying on a fully glazed facade.',
    challenge: 'Reduce heat and glare while keeping the shared spaces visually connected to the outdoors.',
    solution: 'Deep reveals, shaded openings, a central court, and a limited material palette create layered thresholds and a clearer maintenance strategy.',
    featured: true, seo: { title: 'Coastal Courtyard House Concept | AURA', description: 'An honest concept study for a climate-responsive courtyard home in India.' },
  },
  {
    id: 'concept-02', slug: 'warm-indian-interior-concept', title: 'Stone & Timber Interior Study',
    summary: 'A full-home interior direction built around calm circulation, integrated storage, and tactile Indian materials.',
    categories: ['Interior'], status: 'concept', city: 'Location pending', state: 'India', locationVerified: false,
    propertyType: 'Villa interior', scope: ['Space planning', 'Interior concept', 'Material palette', 'Joinery intent'], focus: 'interior',
    builtUpAreaSqFt: 3200, designStyle: 'Material-led minimalism', materials: ['Indian stone', 'Timber veneer', 'Brushed brass', 'Lime plaster'],
    coverImage: concept('/images/indian_courtyard.png', 'Interior concept using warm stone, timber, and planted daylight'),
    galleryImages: [concept('/images/indian_courtyard.png', 'Warm interior concept with a planted courtyard edge'), concept('/images/loft_after.png', 'Concept view of a restrained living space after renovation')],
    brief: 'This concept package demonstrates a coherent interior process from planning and storage through materials, lighting, and custom joinery.',
    challenge: 'Create visual warmth without crowding the rooms or making maintenance difficult.',
    solution: 'Storage is consolidated into full-height joinery, while a small set of durable finishes repeats across rooms for continuity.',
    featured: true, seo: { title: 'Warm Indian Interior Design Concept | AURA', description: 'A concept interior study focused on space planning, storage, lighting, and natural materials.' },
  },
  {
    id: 'concept-03', slug: 'monsoon-ready-facade-concept', title: 'Monsoon-Ready Facade',
    summary: 'An exterior redesign study for a home needing better shade, rain protection, and a more composed street presence.',
    categories: ['Exterior', 'Renovation'], status: 'concept', city: 'Location pending', state: 'India', locationVerified: false,
    propertyType: 'Existing residence', scope: ['Facade redesign', 'Entrance and gate', 'Outdoor lighting', 'Material palette'], focus: 'exterior',
    designStyle: 'Contemporary tropical', materials: ['Weather-resistant plaster', 'Terracotta fins', 'Stone plinth', 'Powder-coated metal'],
    coverImage: concept('/images/hero_main.png', 'Exterior renovation concept with deep shade and weather-resistant finishes'),
    galleryImages: [concept('/images/hero_main.png', 'Facade concept showing shaded openings and layered planting'), concept('/images/villa_malibu.png', 'Alternative exterior massing reference used as a concept visual')],
    brief: 'This study shows how an existing elevation can be simplified while improving shade, rainwater control, lighting, and entry sequence.',
    challenge: 'Refresh the facade without unnecessary structural intervention or a high-maintenance finish palette.',
    solution: 'A lightweight screen layer, protected wall finishes, a robust plinth, and focused warm lighting give the exterior depth and durability.',
    featured: true,
    beforeAfter: { beforeImage: concept('/images/loft_before.png', 'Placeholder before visual for an exterior renovation study'), afterImage: concept('/images/loft_after.png', 'Placeholder after visual for an exterior renovation study'), beforeLabel: 'Placeholder: existing condition', afterLabel: 'Concept direction' },
    seo: { title: 'Exterior Elevation & Facade Concept | AURA', description: 'A concept facade redesign focused on monsoon detailing, shade, and durable exterior materials.' },
  },
  {
    id: 'concept-04', slug: 'compact-apartment-renovation-concept', title: 'Compact Apartment Reset',
    summary: 'A renovation concept that improves storage, natural light, and everyday circulation in a compact apartment.',
    categories: ['Interior', 'Renovation'], status: 'concept', city: 'Location pending', state: 'India', locationVerified: false,
    propertyType: 'Apartment', scope: ['Interior renovation', 'Kitchen', 'Storage', 'Lighting'], focus: 'interior',
    builtUpAreaSqFt: 1150, designStyle: 'Quiet contemporary', materials: ['Kota stone accents', 'Low-VOC paint', 'Wood veneer'],
    coverImage: concept('/images/loft_after.png', 'Concept visualisation of a compact apartment renovation'),
    galleryImages: [concept('/images/loft_before.png', 'Placeholder visual for an existing apartment condition'), concept('/images/loft_after.png', 'Concept visualisation for the renovated apartment')],
    brief: 'A compact-home exercise in reducing circulation waste and making storage part of the architecture.',
    challenge: 'Increase utility without making the apartment feel visually heavier.',
    solution: 'Continuous storage walls, sliding divisions, and layered task lighting keep the floor clear and the rooms adaptable.',
    featured: false, seo: { title: 'Compact Apartment Renovation Concept | AURA', description: 'A practical interior renovation concept for storage, light, and circulation.' },
  },
];

export const PROJECT_FILTERS = ['All', 'Architecture', 'Interior', 'Exterior', 'Residential', 'Commercial', 'Renovation'] as const;
