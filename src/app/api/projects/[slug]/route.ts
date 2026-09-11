import { NextResponse } from 'next/server';
import { PROJECTS_DATA } from '@/data/projectsData';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return NextResponse.json(
      { status: 404, error: 'Project not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: 200,
    data: project,
  });
}
