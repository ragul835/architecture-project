import type { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '@/data/projectsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/about', '/services', '/portfolio', '/testimonials', '/contact', '/privacy', '/terms'];

  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...PROJECTS_DATA.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
