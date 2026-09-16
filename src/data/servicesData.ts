import type { ServiceItem } from '@/lib/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'architecture', title: 'Architectural Design', eyebrow: 'Plan the whole property',
    shortDescription: 'Site-led homes and renovations shaped around climate, circulation, approvals, and the way you live.',
    whoFor: 'Homeowners planning a new villa or independent house, an addition, or a substantial renovation.',
    problems: ['Unclear plot potential', 'Poor daylight or ventilation', 'Disconnected consultants', 'Late design changes on site'],
    scope: ['Residential architecture', 'Villas and independent homes', 'Renovations and additions', 'Space planning', 'Working drawings', 'Approval coordination', 'Site supervision'],
    deliverables: ['Site and brief analysis', 'Concept plans and massing', '3D design views', 'Design-development drawings', 'Coordinated working drawings', 'Material direction and site review notes'],
    process: ['Discovery and site study', 'Concept options', 'Design development', 'Consultant coordination', 'Working drawings', 'Site-stage support'],
    exclusions: ['Statutory approval fees', 'Structural and specialist consultant fees unless included in the proposal', 'Construction labour and materials'],
    timeline: 'Typically 12–32 weeks for design and documentation, depending on size, approvals, and decision cycles.',
    image: { src: '/images/indian_hero.png', alt: 'Concept visualisation of a climate-responsive contemporary Indian home', classification: 'concept-visualisation' },
    faqs: [
      { question: 'Can you help with local approvals?', answer: 'Approval coordination can be included. The exact authority, consultant, documentation, and fee responsibilities are confirmed in the proposal.' },
      { question: 'Can Vastu be considered?', answer: 'Yes. Vastu-sensitive planning can be treated as a client preference alongside daylight, ventilation, structure, circulation, and site constraints.' },
    ],
  },
  {
    id: 'interior-design', title: 'Interior Design', eyebrow: 'Make every room work harder',
    shortDescription: 'Practical, material-aware interiors—from planning and storage to lighting, joinery, and coordinated services.',
    whoFor: 'Apartment, villa, and independent-home owners furnishing a new space or renovating an existing one.',
    problems: ['Inefficient layouts', 'Insufficient storage', 'Uncoordinated lighting and services', 'Material decisions without a clear budget'],
    scope: ['Full-home and apartment interiors', 'Villa interiors', 'Modular kitchens', 'Wardrobes and storage', 'Living, bedroom, and bathroom design', 'False ceiling and lighting', 'Furniture and custom joinery', 'Material selection', 'Electrical and plumbing coordination', 'Renovation interiors'],
    deliverables: ['Furniture and circulation plans', 'Room-wise concepts', '3D visualisations', 'Ceiling, lighting, electrical, and plumbing layouts', 'Joinery drawings', 'Finish and fixture schedules'],
    process: ['Measure and brief', 'Layout planning', 'Look-and-feel direction', 'Detailed room design', 'Technical coordination', 'Selection and site support'],
    exclusions: ['Turnkey execution unless explicitly agreed', 'Appliances and loose furniture procurement', 'Civil or structural changes not documented in scope'],
    timeline: 'Typically 8–24 weeks for design; execution duration is assessed separately after scope and site condition are known.',
    image: { src: '/images/indian_courtyard.png', alt: 'Concept visualisation showing warm stone, timber, and filtered daylight in an Indian interior', classification: 'concept-visualisation' },
    faqs: [
      { question: 'Do you offer turnkey interiors?', answer: 'Turnkey execution is not advertised as a standard service. It can be confirmed only after the studio verifies delivery capability for your location and scope.' },
      { question: 'Can you design only a kitchen or selected rooms?', answer: 'Yes. A focused scope can be considered when the room interfaces, services, and site access are clear.' },
    ],
  },
  {
    id: 'exterior-design', title: 'Exterior Design', eyebrow: 'Give the building a durable public face',
    shortDescription: 'Elevations, facades, entrances, terraces, and outdoor edges resolved for proportion, weather, and maintenance.',
    whoFor: 'Owners of new or existing homes who need a cohesive front elevation, facade upgrade, or better-connected outdoor spaces.',
    problems: ['Generic or unresolved elevation', 'Heat and glare', 'Rain staining and water ingress risk', 'Mismatched gates, balconies, lighting, and finishes'],
    scope: ['Exterior elevation design', 'Facade redesign', 'Residential front elevation', 'Balcony and terrace design', 'Boundary walls and entrance gates', 'Outdoor lighting', 'Material and paint palettes', 'Landscape coordination', 'Driveways and hardscape', 'Pergolas and shaded outdoor spaces', 'Weather-resistant detailing', 'Existing-building exterior renovation', '3D exterior visualisation'],
    deliverables: ['Elevation options', '3D day and evening views', 'Material and colour palette', 'Facade intent drawings', 'Key weathering and junction details', 'Lighting and landscape coordination intent'],
    process: ['Existing-condition or site review', 'Facade concept options', 'Material and maintenance study', '3D visualisation', 'Technical intent package', 'Vendor and site coordination'],
    exclusions: ['Landscape architecture as a standalone professional service', 'Structural certification', 'Waterproofing warranties and product guarantees', 'Execution unless separately contracted'],
    timeline: 'Typically 4–14 weeks for design, depending on whether the project is a new facade or an occupied-building renovation.',
    image: { src: '/images/hero_main.png', alt: 'Concept exterior visualisation with deep shading and a restrained stone palette', classification: 'concept-visualisation' },
    faqs: [
      { question: 'Can you redesign an existing house facade?', answer: 'Yes. The first step is documenting the current structure, openings, services, waterproofing risks, and any society or local restrictions.' },
      { question: 'Do you coordinate landscape work?', answer: 'Landscape coordination can be included, but specialist landscape architecture is not represented as an in-house service unless confirmed in writing.' },
    ],
  },
];

export function getService(id: string) {
  return SERVICES_DATA.find((service) => service.id === id);
}
