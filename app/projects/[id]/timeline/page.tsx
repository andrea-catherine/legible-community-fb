import ProjectTimelinePageClient from './page-client';

export function generateStaticParams() {
  return [
    { id: 'proj-1' },
    { id: 'proj-2' },
  ];
}

export default function ProjectTimelinePage({ params }: { params: { id: string } }) {
  return <ProjectTimelinePageClient params={params} />;
}
