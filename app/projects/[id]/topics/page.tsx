'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, MessageSquare, Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { getProject, getCommentsByTopic, getProjects } from '@/lib/store';
import type { Project, CommentGroup, Comment, MitigationStrategy } from '@/types';

export default function ProjectTopicsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [commentGroups, setCommentGroups] = useState<CommentGroup[]>([]);

  useEffect(() => {
    const proj = getProject(params.id);
    setProject(proj || null);
    
    if (proj) {
      const groups = getCommentsByTopic(proj.id);
      setCommentGroups(groups);
    }
  }, [params.id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Project not found</p>
          <Link href="/projects" className="text-primary-600 hover:underline mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'birds': 'Ecology - Birds',
      'water': 'Water Resources',
      'visual-impact': 'Visual Impact',
      'noise': 'Sound & Noise',
      'vegetation': 'Ecology - Vegetation',
      'archaeological': 'Archaeological & Cultural',
      'traffic': 'Traffic & Transportation',
      'other': 'Other',
    };
    return labels[category] || category.replace('-', ' ');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'birds': 'from-green-500 to-green-600',
      'water': 'from-blue-500 to-blue-600',
      'visual-impact': 'from-purple-500 to-purple-600',
      'noise': 'from-orange-500 to-orange-600',
      'vegetation': 'from-emerald-500 to-emerald-600',
      'archaeological': 'from-amber-500 to-amber-600',
      'traffic': 'from-gray-500 to-gray-600',
      'other': 'from-slate-500 to-slate-600',
    };
    return colors[category] || 'from-primary-500 to-primary-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'proposed':
        return 'bg-yellow-100 text-yellow-800';
      case 'implemented':
        return 'bg-blue-100 text-blue-800';
      case 'monitoring':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/projects/${project.id}`} className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Project
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Comments Organized by Topic</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {commentGroups.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No comments organized by topics yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {commentGroups.map((group) => (
              <div key={group.category} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${getCategoryColor(group.category)} px-6 py-4 text-white`}>
                  <h2 className="text-xl font-semibold">{getCategoryLabel(group.category)}</h2>
                  <p className="text-sm text-white/80 mt-1">
                    {group.comments.length} comment{group.comments.length !== 1 ? 's' : ''}
                    {group.mitigationStrategies.length > 0 && (
                      <span> • {group.mitigationStrategies.length} mitigation strateg{group.mitigationStrategies.length !== 1 ? 'ies' : 'y'}</span>
                    )}
                  </p>
                </div>

                <div className="p-6">
                  {/* Mitigation Strategies */}
                  {group.mitigationStrategies.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-primary-600" />
                        Mitigation Strategies
                      </h3>
                      <div className="space-y-4">
                        {group.mitigationStrategies.map((strategy) => (
                          <div
                            key={strategy.id}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-5"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{strategy.title}</h4>
                              <span className={`px-3 py-1 text-xs font-medium rounded capitalize ${getStatusColor(strategy.status)}`}>
                                {strategy.status}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{strategy.description}</p>
                            {strategy.effectiveness && (
                              <div className="bg-white rounded p-3 mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Expected Effectiveness:</p>
                                <p className="text-sm text-gray-600">{strategy.effectiveness}</p>
                              </div>
                            )}
                            {strategy.relatedCommentIds && strategy.relatedCommentIds.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-blue-200">
                                <p className="text-xs font-medium text-gray-600 mb-2">Related Comments:</p>
                                <div className="flex flex-wrap gap-2">
                                  {strategy.relatedCommentIds.map((commentId) => {
                                    const comment = group.comments.find(c => c.id === commentId);
                                    return comment ? (
                                      <Link
                                        key={commentId}
                                        href={`/comments/${commentId}`}
                                        className="text-xs text-primary-600 hover:underline flex items-center"
                                      >
                                        <LinkIcon className="w-3 h-3 mr-1" />
                                        Comment from {comment.stakeholderName}
                                      </Link>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comments */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
                      Comments
                    </h3>
                    <div className="space-y-4">
                      {group.comments.map((comment) => (
                        <Link
                          key={comment.id}
                          href={`/comments/${comment.id}`}
                          className={`block border-l-4 ${getPriorityColor(comment.priority)} bg-gray-50 rounded-r-lg p-4 hover:bg-gray-100 transition-colors`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {comment.status.replace('-', ' ')}
                              </span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{comment.stakeholderName}</span>
                            </div>
                            {comment.mitigationStrategyIds && comment.mitigationStrategyIds.length > 0 && (
                              <span className="flex items-center text-xs text-primary-600">
                                <Shield className="w-3 h-3 mr-1" />
                                {comment.mitigationStrategyIds.length} strateg{comment.mitigationStrategyIds.length !== 1 ? 'ies' : 'y'}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 line-clamp-2">{comment.content}</p>
                          {comment.response && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs font-medium text-green-700 mb-1">Response provided</p>
                              {comment.responseAuthor && (
                                <p className="text-xs text-gray-500">
                                  by {comment.responseAuthor.name}
                                  {comment.responseAuthor.organization && ` (${comment.responseAuthor.organization})`}
                                </p>
                              )}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

