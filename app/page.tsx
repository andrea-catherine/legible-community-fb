'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Users, Calendar, CheckCircle2, Share2 } from 'lucide-react';
import { getProjects, getComments, getMetrics } from '@/lib/store';
import type { Project, Metrics } from '@/types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const projs = getProjects();
    setProjects(projs);
    
    if (projs.length > 0) {
      const projectMetrics = getMetrics(projs[0].id);
      setMetrics(projectMetrics);
    }
  }, []);

  const activeProject = projects[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="mb-2">
            <span className="text-sm text-gray-500">Dashboard</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EIA Projects</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track all environmental impact assessment projects</p>
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
        {/* Projects Grid */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => {
              const projectMetrics = getMetrics(project.id);
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <p className="text-xs text-gray-500">Applicant: {project.developer}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                    <span className="capitalize">{project.status.replace('-', ' ')}</span>
                    <span className="text-primary-700 font-medium">
                      {projectMetrics.totalComments} comments
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Key Metrics */}
        {metrics && activeProject && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Comments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalComments}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Response Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {metrics.responseCompleteness.toFixed(0)}%
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Response Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {metrics.averageResponseTime > 0 
                      ? `${metrics.averageResponseTime.toFixed(1)}h`
                      : 'N/A'}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Mandatory</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {metrics.pendingMandatorySubmissions}
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary-600" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
