import ProjectDetailPageClient from './page-client';

export function generateStaticParams() {
  return [
    { id: 'proj-1' },
    { id: 'proj-2' },
  ];
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailPageClient params={params} />;
}
