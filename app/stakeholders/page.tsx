'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, Mail, Building2, AlertCircle } from 'lucide-react';
import { getStakeholders } from '@/lib/store';
import type { Stakeholder } from '@/types';

export default function StakeholdersPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);

  useEffect(() => {
    setStakeholders(getStakeholders());
  }, []);

  const mandatoryStakeholders = stakeholders.filter(s => s.isMandatory);
  const pendingMandatory = mandatoryStakeholders.filter(s => !s.hasSubmitted);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Stakeholders</h1>
              <p className="text-sm text-gray-500 mt-1">
                Track mandatory commenters and submissions
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Stakeholders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stakeholders.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mandatory Commenters</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mandatoryStakeholders.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Submissions</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{pendingMandatory.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Mandatory Commenters */}
        {mandatoryStakeholders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mandatory Commenters</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mandatoryStakeholders.map((stakeholder) => (
                    <tr key={stakeholder.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{stakeholder.name}</div>
                            {stakeholder.organization && (
                              <div className="text-sm text-gray-500">{stakeholder.organization}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stakeholder.email && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-4 h-4 mr-2" />
                            {stakeholder.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stakeholder.submissionDeadline
                          ? stakeholder.submissionDeadline.toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stakeholder.hasSubmitted ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Stakeholders */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Stakeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{stakeholder.name}</h3>
                    {stakeholder.organization && (
                      <p className="text-sm text-gray-500 mt-1">{stakeholder.organization}</p>
                    )}
                  </div>
                  {stakeholder.isMandatory && (
                    <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                      Mandatory
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 capitalize">
                    Type: {stakeholder.type.replace('-', ' ')}
                  </p>
                  {stakeholder.email && (
                    <p className="text-gray-600 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {stakeholder.email}
                    </p>
                  )}
                  {stakeholder.submissionDeadline && (
                    <p className="text-gray-600">
                      Deadline: {stakeholder.submissionDeadline.toLocaleDateString()}
                    </p>
                  )}
                  {stakeholder.hasSubmitted !== undefined && (
                    <div className="pt-2">
                      {stakeholder.hasSubmitted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Submitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


