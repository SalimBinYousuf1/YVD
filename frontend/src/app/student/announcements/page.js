'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAnnouncements as getAllAnnouncements } from '@/lib/api';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Call the API to get announcements
        const data = await getAllAnnouncements();
        // Filter only active announcements for students
        const activeAnnouncements = data.announcements.filter(a => a.is_active === 1);
        setAnnouncements(activeAnnouncements || []);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Result Declaration System
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 transition duration-150"
              >
                Home
              </Link>
              <Link
                href="/student/results"
                className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 transition duration-150"
              >
                Check Results
              </Link>
              <Link
                href="/student/announcements"
                className="px-3 py-2 text-blue-600 font-medium hover:text-blue-800 transition duration-150"
              >
                Announcements
              </Link>
              <Link
                href="/admin/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
              >
                Admin Login
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-2 border-t border-gray-200">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/student/results"
                className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
              >
                Check Results
              </Link>
              <Link
                href="/student/announcements"
                className="block px-3 py-2 text-blue-600 font-medium hover:bg-gray-50 rounded-md"
              >
                Announcements
              </Link>
              <Link
                href="/admin/login"
                className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with the latest announcements and notifications
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="mt-4 text-gray-600">No announcements available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6" data-stagger-container data-stagger-animation="slide-in-bottom">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-yellow-500 transform transition duration-300 hover:shadow-lg hover:-translate-y-1 hover-lift"
                data-stagger-item
                data-hover="hover-lift"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-900">{announcement.title}</h2>
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4 prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{announcement.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Result Declaration System</h3>
              <p className="text-gray-400">
                A fast, secure, and easy way to access your academic results online.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition duration-150">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/student/results" className="text-gray-400 hover:text-white transition duration-150">
                    Check Results
                  </Link>
                </li>
                <li>
                  <Link href="/student/announcements" className="text-gray-400 hover:text-white transition duration-150">
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-gray-400 hover:text-white transition duration-150">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Contact</h3>
              <p className="text-gray-400">
                If you have any questions or need assistance, please contact the administrator.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Result Declaration System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
