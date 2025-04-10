'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { getStats } from '@/lib/api';
import DashboardCharts from '@/components/admin/DashboardCharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalExams: 0,
    totalSubjects: 0,
    totalResults: 0,
    recentAnnouncements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger-container data-stagger-animation="scale-up">
            {/* Total Students */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover-lift" data-hover="hover-lift" data-stagger-item>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3 pulse" data-animate="pulse">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {loading ? (
                            <div className="animate-pulse h-6 w-12 bg-gray-200 rounded shimmer"></div>
                          ) : (
                            stats.totalStudents
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/students" className="font-medium text-indigo-600 hover:text-indigo-900">
                    View all students
                  </Link>
                </div>
              </div>
            </div>

            {/* Total Exams */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Exams</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {loading ? (
                            <div className="animate-pulse h-6 w-12 bg-gray-200 rounded"></div>
                          ) : (
                            stats.totalExams
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/exams" className="font-medium text-indigo-600 hover:text-indigo-900">
                    View all exams
                  </Link>
                </div>
              </div>
            </div>

            {/* Total Subjects */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Subjects</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {loading ? (
                            <div className="animate-pulse h-6 w-12 bg-gray-200 rounded"></div>
                          ) : (
                            stats.totalSubjects
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/subjects" className="font-medium text-indigo-600 hover:text-indigo-900">
                    View all subjects
                  </Link>
                </div>
              </div>
            </div>

            {/* Total Results */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Results</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {loading ? (
                            <div className="animate-pulse h-6 w-12 bg-gray-200 rounded"></div>
                          ) : (
                            stats.totalResults
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/results" className="font-medium text-indigo-600 hover:text-indigo-900">
                    View all results
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Announcements</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {loading ? (
                  Array(3).fill().map((_, index) => (
                    <li key={index} className="px-6 py-4">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : stats.recentAnnouncements.length > 0 ? (
                  stats.recentAnnouncements.map((announcement) => (
                    <li key={announcement.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">{announcement.title}</p>
                          <p className="mt-1 text-sm text-gray-500 truncate">{announcement.content.substring(0, 100)}...</p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {new Date(announcement.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-6 py-4 text-center text-gray-500">No recent announcements</li>
                )}
              </ul>
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <Link href="/admin/announcements" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  View all announcements
                </Link>
              </div>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Performance Analytics</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md p-6">
              <DashboardCharts />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
