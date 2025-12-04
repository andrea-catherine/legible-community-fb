'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, CheckCircle2, Clock, AlertCircle, MapPin, Users, FileText, Target, Gavel } from 'lucide-react';
import { getProject, getTimelineEvents, getPublicMeetings, getProjects } from '@/lib/store';
import type { Project, TimelineEvent, PublicMeeting } from '@/types';
import { format } from 'date-fns';

export default function ProjectTimelinePageClient({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [publicMeetings, setPublicMeetings] = useState<PublicMeeting[]>([]);

  useEffect(() => {
    const proj = getProject(params.id);
    setProject(proj || null);
    
    if (proj) {
      const events = getTimelineEvents(proj.id, true);
      setTimelineEvents(events);
      const meetings = getPublicMeetings(proj.id);
      setPublicMeetings(meetings);
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

  const now = new Date();
  const allEvents = [
    ...timelineEvents.map(e => ({ ...e, isMeeting: false })),
    ...publicMeetings.map(m => ({
      id: m.id,
      projectId: m.projectId,
      title: m.title,
      description: m.description,
      type: 'meeting' as const,
      date: m.date,
      status: m.date > now ? 'upcoming' as const : 'completed' as const,
      isPublic: true,
      isMeeting: true,
      location: m.location,
      format: m.format,
      meetingUrl: m.meetingUrl,
      agenda: m.agenda,
    })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <Target className="w-5 h-5" />;
      case 'deadline':
        return <Clock className="w-5 h-5" />;
      case 'meeting':
        return <Users className="w-5 h-5" />;
      case 'submission':
        return <FileText className="w-5 h-5" />;
      case 'decision':
        return <Gavel className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Completed
        </span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </span>;
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Upcoming
        </span>;
      case 'overdue':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Overdue
        </span>;
      default:
        return null;
    }
  };

  const getEventColor = (status: string, type: string) => {
    if (status === 'completed') return 'border-green-500 bg-green-50';
    if (status === 'in-progress') return 'border-blue-500 bg-blue-50';
    if (status === 'overdue') return 'border-red-500 bg-red-50';
    if (type === 'meeting') return 'border-purple-500 bg-purple-50';
    return 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/projects/${project.id}`} className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Project
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Project Timeline & Next Steps</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Current Phase</p>
              <p className="text-xl font-semibold text-gray-900 capitalize mt-1">
                {project.status.replace('-', ' ')}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Comment Period</p>
              <p className="text-sm text-gray-900 mt-1">
                {project.commentPeriodStart.toLocaleDateString()} - {project.commentPeriodEnd.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          <div className="space-y-8">
            {allEvents.map((event, index) => {
              const isPast = event.date < now;
              const isUpcoming = event.date >= now && event.date <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
              
              return (
                <div key={event.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white ${
                    isPast ? 'bg-green-500' : isUpcoming ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>

                  {/* Event card */}
                  <div className={`border-l-4 rounded-lg p-6 ${getEventColor(event.status, event.type)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          event.status === 'completed' ? 'bg-green-100' :
                          event.status === 'in-progress' ? 'bg-blue-100' :
                          event.type === 'meeting' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {format(event.date, 'MMMM d, yyyy')} • {format(event.date, 'EEEE')}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>

                    <p className="text-gray-700 mb-4">{event.description}</p>

                    {/* Meeting-specific details */}
                    {'isMeeting' in event && event.isMeeting && (
                      <div className="space-y-2 mb-4">
                        {'location' in event && event.location && (
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">{event.location as string}</p>
                              {'format' in event && event.format && (
                                <p className="text-xs text-gray-500 capitalize mt-1">
                                  {(event.format as string).replace('-', ' ')} format
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        {'agenda' in event && event.agenda && Array.isArray(event.agenda) && event.agenda.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Agenda:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {(event.agenda as string[]).map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Days until/ago */}
                    <div className="text-sm text-gray-500">
                      {isPast ? (
                        <span>{Math.floor((now.getTime() - event.date.getTime()) / (1000 * 60 * 60 * 24))} days ago</span>
                      ) : isUpcoming ? (
                        <span className="text-yellow-700 font-medium">
                          {Math.ceil((event.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days until this event
                        </span>
                      ) : (
                        <span>{Math.ceil((event.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days away</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What Happens Next Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900">1. Comment Period Closes</h3>
              <p className="text-sm text-gray-600 mt-1">
                All public comments must be submitted by {project.commentPeriodEnd.toLocaleDateString()}. 
                After this date, the development team will review and respond to all substantive comments.
              </p>
            </div>
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900">2. Public Meeting</h3>
              <p className="text-sm text-gray-600 mt-1">
                A public information meeting will be held to discuss concerns, present mitigation strategies, 
                and answer questions from the community.
              </p>
            </div>
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900">3. Response Preparation</h3>
              <p className="text-sm text-gray-600 mt-1">
                All comments will receive responses, and the EIA document will be updated with additional 
                information and clarifications.
              </p>
            </div>
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900">4. Final Submission</h3>
              <p className="text-sm text-gray-600 mt-1">
                The complete EIA document with all responses will be submitted to Skipulagsstofnun 
                (National Planning Agency) for final review.
              </p>
            </div>
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900">5. Decision</h3>
              <p className="text-sm text-gray-600 mt-1">
                Skipulagsstofnun will review the EIA and make a decision on the permit application. 
                This typically takes 2-3 months after submission.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

