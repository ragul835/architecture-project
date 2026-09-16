import type { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '@/data/projectsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/about', '/services', '/services/architecture', '/services/interior-design', '/services/exterior-design', '/portfolio', '/process', '/cost-estimator', '/contact', '/privacy', '/terms'];

  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const })),
    ...PROJECTS_DATA.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
