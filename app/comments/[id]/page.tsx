import CommentDetailPageClient from './page-client';

export function generateStaticParams() {
  // Generate static params for all known comment IDs
  return [
    { id: 'comment-1' },
    { id: 'comment-2' },
    { id: 'comment-3' },
    { id: 'comment-4' },
    { id: 'comment-5' },
    { id: 'comment-6' },
    { id: 'comment-7' },
    { id: 'comment-8' },
    { id: 'comment-9' },
    { id: 'comment-10' },
    { id: 'comment-11' },
  ];
}

export default function CommentDetailPage({ params }: { params: { id: string } }) {
  return <CommentDetailPageClient id={params.id} />;
}
