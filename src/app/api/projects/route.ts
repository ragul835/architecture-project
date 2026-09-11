import { NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/data/projectsData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q')?.toLowerCase();

  let filtered = [...PROJECTS_DATA];

  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.materials.some((m) => m.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    status: 200,
    count: filtered.length,
    data: filtered,
  });
}
