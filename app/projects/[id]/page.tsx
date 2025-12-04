'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Building2, MessageSquare, CheckCircle2, Clock, MapPin, Share2, User } from 'lucide-react';
import { getProject, getComments, getMetrics, getTimelineEvents, getPublicMeetings, getCommentsByTopic } from '@/lib/store';
import type { Project, Comment, Metrics } from '@/types';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const proj = getProject(params.id);
    setProject(proj || null);
    
    if (proj) {
      const projectComments = getComments(proj.id);
      setComments(projectComments);
      setMetrics(getMetrics(proj.id));
    }
  }, [params.id]);

  const timelineEvents = project ? getTimelineEvents(project.id, true) : [];
  const publicMeetings = project ? getPublicMeetings(project.id) : [];
  const commentGroups = project ? getCommentsByTopic(project.id) : [];
  const now = new Date();
  const upcomingEvents = [
    ...timelineEvents.filter(e => e.date >= now && e.status !== 'completed'),
    ...publicMeetings.filter(m => m.date >= now),
  ].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);

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

  // Get current month for calendar
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Sample team members (would come from project data in real app)
  const teamMembers = [
    { name: 'J. Hopkins', role: 'Project Manager', avatar: '👩' },
    { name: 'P. Robbison', role: 'Environmental Consultant', avatar: '👨' },
    { name: 'S. Petterson', role: 'Community Engagement Lead', avatar: '👩' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="mb-2">
            <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-700">
              Projects
            </Link>
            <span className="text-sm text-gray-500 mx-2">/</span>
            <span className="text-sm text-gray-900 font-medium">{project.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-500 mt-1">Applicant: {project.developer}</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Top Row - Three Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Project Description Card */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium text-gray-900">Category {project.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-gray-900 capitalize">{project.status.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-gray-500">Comment Period</p>
                <p className="font-medium text-gray-900">
                  {project.commentPeriodStart.toLocaleDateString()} - {project.commentPeriodEnd.toLocaleDateString()}
                </p>
              </div>
              {project.consultant && (
                <div>
                  <p className="text-gray-500">Consultant</p>
                  <p className="font-medium text-gray-900">{project.consultant}</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="relative z-10 text-center">
                <MapPin className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Project Location</p>
                <p className="text-xs text-gray-500 mt-1">Iceland</p>
              </div>
              {/* Map marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-6 h-6 bg-primary-700 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topics Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Topics</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">NAME</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">OWNER</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">PROGRESS</th>
                  </tr>
                </thead>
                <tbody>
                  {commentGroups.slice(0, 6).map((group, index) => {
                    const commentCount = group.comments.length;
                    const respondedCount = group.comments.filter(c => c.response).length;
                    const progress = commentCount > 0 ? (respondedCount / commentCount) * 100 : 0;
                    const owners = ['A. Barry', 'E. Smith', 'J. Hopkins', 'P. Robbison'][index % 4];
                    
                    return (
                      <tr key={group.category} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900 capitalize">
                          {group.category.replace('-', ' ')}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{owners}</td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-700 h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Link
              href={`/projects/${project.id}/topics`}
              className="block mt-4 text-sm text-primary-700 hover:text-primary-800 font-medium"
            >
              View all topics →
            </Link>
          </div>

          {/* Upcoming Milestones Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Milestones</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{currentMonth}</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="text-gray-500">‹</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="text-gray-500">›</span>
                  </button>
                </div>
              </div>
              {/* Calendar */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              {/* Simple calendar view */}
              <div className="text-center text-sm text-gray-600 mb-4">
                Calendar view - {upcomingEvents.length} upcoming events
              </div>
            </div>
            {/* Upcoming events list */}
            <div className="space-y-3">
              {upcomingEvents.slice(0, 3).map((event: any) => (
                <div key={event.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={`/projects/${project.id}/timeline`}
              className="block mt-4 text-sm text-primary-700 hover:text-primary-800 font-medium"
            >
              View full timeline →
            </Link>
          </div>
        </div>

        {/* Team Card - Additional Row */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
