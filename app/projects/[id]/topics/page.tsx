import ProjectTopicsPageClient from './page-client';

export function generateStaticParams() {
  return [
    { id: 'proj-1' },
    { id: 'proj-2' },
  ];
}

export default function ProjectTopicsPage({ params }: { params: { id: string } }) {
  return <ProjectTopicsPageClient params={params} />;
}
