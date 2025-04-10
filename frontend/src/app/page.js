'use client';

import { useState } from 'react';
import Link from 'next/link';
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">Result Declaration System</div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="px-3 py-2 text-blue-600 font-medium hover:text-blue-800 transition duration-150"
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
                className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 transition duration-150"
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
                className="block px-3 py-2 text-blue-600 font-medium hover:bg-gray-50 rounded-md"
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
                className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
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

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Check Your Results <span className="text-blue-600">Anytime, Anywhere</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                A fast, secure, and easy way to access your academic results online. Get instant access to your marks, grades, and performance analytics.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/student/results"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150 text-center"
                >
                  Check Results
                </Link>
                <Link
                  href="/student/announcements"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition duration-150 text-center"
                >
                  View Announcements
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-90 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="text-5xl font-bold mb-4">95%</div>
                    <div className="text-xl font-medium">Students access results online</div>
                    <div className="mt-6 flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">24/7</div>
                        <div className="text-sm">Availability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">100%</div>
                        <div className="text-sm">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">Fast</div>
                        <div className="text-sm">Access</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our result declaration system provides everything you need to access and understand your academic performance.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Instant Results</h3>
              <p className="mt-2 text-gray-600">
                Access your results instantly after they are published. No more waiting in long queues or checking notice boards.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Performance Analytics</h3>
              <p className="mt-2 text-gray-600">
                Visualize your performance with charts and graphs. Understand your strengths and areas for improvement.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Downloadable Marksheets</h3>
              <p className="mt-2 text-gray-600">
                Download and print your marksheets in PDF format for official use or personal records.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Mobile Friendly</h3>
              <p className="mt-2 text-gray-600">
                Access your results on any device - desktop, tablet, or mobile. Our responsive design ensures a great experience everywhere.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Announcements</h3>
              <p className="mt-2 text-gray-600">
                Stay updated with the latest announcements from your institution. Never miss important information again.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Secure Access</h3>
              <p className="mt-2 text-gray-600">
                Your results are secure and can only be accessed with your unique roll number or credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Checking your results is simple and straightforward with our system.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-medium text-gray-900 mt-2">Enter Your Details</h3>
              <p className="mt-2 text-gray-600">
                Enter your roll number or name to search for your results.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-medium text-gray-900 mt-2">View Your Results</h3>
              <p className="mt-2 text-gray-600">
                See your subject-wise marks, total, percentage, grade, and pass/fail status.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-medium text-gray-900 mt-2">Download Marksheet</h3>
              <p className="mt-2 text-gray-600">
                Download or print your marksheet in PDF format for your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to check your results?</h2>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Access your academic performance instantly with our fast and secure result declaration system.
          </p>
          <div className="mt-8">
            <Link
              href="/student/results"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition duration-150 inline-block"
            >
              Check Results Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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
