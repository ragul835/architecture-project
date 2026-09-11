export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Interior' | 'Renovation';

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface BeforeAfterData {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  year: string;
  areaSqFt: string;
  timeline: string;
  client: string;
  materials: string[];
  coverImage: string;
  galleryImages: string[];
  description: string;
  concept: string;
  challenge: string;
  solution: string;
  featured: boolean;
  beforeAfter?: BeforeAfterData;
  hotspots?: Hotspot[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  features: string[];
  image: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  estimatedBudget: string;
  timeline: string;
  message: string;
}

export interface EstimatorSelection {
  serviceType: string;
  sizeSqFt: string;
  finishLevel: string;
  additionalServices: string[];
}
