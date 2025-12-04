'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, AlertCircle, Users, Mail, Building2, CheckSquare, Square } from 'lucide-react';
import { getComments, updateComment } from '@/lib/store';
import type { Comment } from '@/types';

export default function CommentDetailPage({ params }: { params: { id: string } }) {
  const [comment, setComment] = useState<Comment | null>(null);

  useEffect(() => {
    const allComments = getComments();
    const foundComment = allComments.find(c => c.id === params.id);
    setComment(foundComment || null);
  }, [params.id]);

  const handleTogglePublicMeeting = () => {
    if (!comment) return;
    const updated = updateComment(comment.id, {
      flaggedForPublicMeeting: !comment.flaggedForPublicMeeting,
    });
    if (updated) {
      setComment(updated);
    }
  };

  const handleSetMeetingDate = (date: string) => {
    if (!comment) return;
    const updated = updateComment(comment.id, {
      publicMeetingDate: date ? new Date(date) : undefined,
      flaggedForPublicMeeting: !!date,
    });
    if (updated) {
      setComment(updated);
    }
  };

  if (!comment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Comment not found</p>
          <Link href="/comments" className="text-primary-600 hover:underline mt-4 inline-block">
            Back to Comments
          </Link>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/comments" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Comments
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded capitalize">
                    {comment.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded border ${getPriorityColor(comment.priority)}`}>
                    {comment.priority} Priority
                  </span>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded capitalize">
                    {comment.environmentalCategory.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {comment.createdAt.toLocaleDateString()}
                  </div>
                  <span>•</span>
                  <span className="capitalize">{comment.source}</span>
                  {comment.assignedTo && (
                    <>
                      <span>•</span>
                      <span>Assigned to: {comment.assignedTo}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Stakeholder</h3>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{comment.stakeholderName}</p>
                  <p className="text-sm text-gray-500 capitalize">{comment.stakeholderType.replace('-', ' ')}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Comment</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>

            {/* Tags */}
            {comment.tags && comment.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {comment.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Comment Type</h3>
                <p className="text-gray-900 capitalize">{comment.commentType.replace('-', ' ')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Environmental Category</h3>
                <p className="text-gray-900 capitalize">{comment.environmentalCategory.replace('-', ' ')}</p>
              </div>
            </div>

            {/* Public Meeting Flag */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleTogglePublicMeeting}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {comment.flaggedForPublicMeeting ? (
                      <CheckSquare className="w-5 h-5 text-primary-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                    <span>Flag for public meeting discussion</span>
                  </button>
                </div>
                {comment.flaggedForPublicMeeting && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-primary-600">Scheduled for public meeting</span>
                  </div>
                )}
              </div>
              {comment.flaggedForPublicMeeting && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Meeting Date
                  </label>
                  <input
                    type="date"
                    value={comment.publicMeetingDate ? comment.publicMeetingDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleSetMeetingDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {comment.publicMeetingDate && (
                    <p className="mt-2 text-sm text-gray-500">
                      Meeting scheduled for: {comment.publicMeetingDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Response */}
            {comment.response ? (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Response</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap mb-4">{comment.response}</p>
                  
                  {/* Response Author Information */}
                  {comment.responseAuthor && (
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Response Author</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700 font-medium">
                            {comment.responseAuthor.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {comment.responseAuthor.role}
                            {comment.responseAuthor.organization && `, ${comment.responseAuthor.organization}`}
                          </span>
                        </div>
                        {comment.responseAuthor.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <a
                              href={`mailto:${comment.responseAuthor.email}`}
                              className="text-sm text-primary-600 hover:underline"
                            >
                              {comment.responseAuthor.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {comment.responseDate && (
                    <p className="mt-4 text-sm text-gray-500">
                      Response date: {comment.responseDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">No response yet</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


