export type CoreService = 'architecture' | 'interior-design' | 'exterior-design';
export type ProjectCategory = 'Architecture' | 'Interior' | 'Exterior' | 'Renovation' | 'Commercial';
export type ProjectStatus = 'completed' | 'ongoing' | 'concept' | 'confidential';
export type ProjectFocus = 'interior' | 'exterior' | 'both';

export interface ProjectImage {
  src: string;
  alt: string;
  classification: 'concept-visualisation' | 'client-photograph' | 'placeholder';
}

export interface BeforeAfterData {
  beforeImage: ProjectImage;
  afterImage: ProjectImage;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  city: string;
  state: string;
  locationVerified: boolean;
  propertyType: string;
  scope: string[];
  focus: ProjectFocus;
  builtUpAreaSqFt?: number;
  plotAreaSqFt?: number;
  completionYear?: number;
  timeline?: string;
  designStyle: string;
  materials: string[];
  coverImage: ProjectImage;
  galleryImages: ProjectImage[];
  brief: string;
  challenge: string;
  solution: string;
  featured: boolean;
  beforeAfter?: BeforeAfterData;
  seo: { title: string; description: string };
}

export interface ServiceItem {
  id: CoreService;
  title: string;
  eyebrow: string;
  shortDescription: string;
  whoFor: string;
  problems: string[];
  scope: string[];
  deliverables: string[];
  process: string[];
  exclusions: string[];
  timeline: string;
  image: ProjectImage;
  faqs: Array<{ question: string; answer: string }>;
}

export interface InquiryPayload {
  fullName: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  city: string;
  state: string;
  pinCode: string;
  propertyType: string;
  requiredService: string;
  projectStage: 'new-construction' | 'renovation';
  area: string;
  budgetRange: string;
  desiredStartDate: string;
  message: string;
  whatsappConsent: boolean;
  privacyConsent: boolean;
  website: string;
}
