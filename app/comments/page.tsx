'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Filter, Search, MessageSquare, AlertCircle, CheckCircle2, Clock, Users } from 'lucide-react';
import { getComments, getProjects } from '@/lib/store';
import type { Comment, CommentStatus, EnvironmentalCategory, CommentType } from '@/types';

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allComments = getComments();
    setComments(allComments);
    setFilteredComments(allComments);
  }, []);

  useEffect(() => {
    let filtered = comments;

    if (selectedProject !== 'all') {
      filtered = filtered.filter(c => c.projectId === selectedProject);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.environmentalCategory === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.stakeholderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredComments(filtered);
  }, [comments, selectedProject, selectedStatus, selectedCategory, searchTerm]);

  const getStatusIcon = (status: CommentStatus) => {
    switch (status) {
      case 'final':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'draft-response':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'assigned':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const projects = getProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Comment Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending-review">Pending Review</option>
              <option value="assigned">Assigned</option>
              <option value="draft-response">Draft Response</option>
              <option value="final">Final</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="birds">Birds</option>
              <option value="water">Water</option>
              <option value="visual-impact">Visual Impact</option>
              <option value="noise">Noise</option>
              <option value="archaeological">Archaeological</option>
              <option value="vegetation">Vegetation</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <Link
              key={comment.id}
              href={`/comments/${comment.id}`}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow block"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(comment.status)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {comment.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(comment.priority)}`}>
                      {comment.priority}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded capitalize">
                      {comment.environmentalCategory.replace('-', ' ')}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded capitalize">
                      {comment.commentType.replace('-', ' ')}
                    </span>
                    {comment.flaggedForPublicMeeting && (
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        Public Meeting
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3 line-clamp-2">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{comment.stakeholderName}</span>
                    <span>•</span>
                    <span>{comment.createdAt.toLocaleDateString()}</span>
                    {comment.assignedTo && (
                      <>
                        <span>•</span>
                        <span>Assigned to: {comment.assignedTo}</span>
                      </>
                    )}
                  </div>
                </div>
                {comment.response && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 ml-4" />
                )}
              </div>
            </Link>
          ))}

          {filteredComments.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No comments found matching your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


