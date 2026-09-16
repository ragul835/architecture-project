import { NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/data/projectsData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q')?.toLowerCase();

  let filtered = [...PROJECTS_DATA];

  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.categories.some((item) => item.toLowerCase() === category.toLowerCase()));
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.materials.some((m) => m.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    status: 200,
    count: filtered.length,
    data: filtered,
  });
}
