'use client';

import { useState } from 'react';
import Link from 'next/link';
import { searchResults } from '@/lib/api';

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('roll_number');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Call the API to search for results
      const data = await searchResults(searchType, searchTerm);
      setSearchResults(data.results || []);
      setHasSearched(true);
    } catch (err) {
      console.error('Error searching results:', err);
      setError('Failed to search results. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

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
                className="px-3 py-2 text-blue-600 font-medium hover:text-blue-800 transition duration-150"
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
                className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/student/results"
                className="block px-3 py-2 text-blue-600 font-medium hover:bg-gray-50 rounded-md"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h1 className="text-2xl font-bold">Check Your Results</h1>
            <p className="mt-2">
              Enter your roll number or name to search for your results.
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">
                  Search By
                </label>
                <select
                  id="searchType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="roll_number">Roll Number</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">
                  {searchType === 'roll_number' ? 'Roll Number' : 'Name'}
                </label>
                <input
                  type="text"
                  id="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchType === 'roll_number' ? 'Enter your roll number' : 'Enter your name'}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    'Search Results'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Search Results</h2>
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-gray-600">No results found. Please check your search criteria and try again.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Exam
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.roll_number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.student_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.class}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.exam_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/student/results/${result.student_id}/${result.exam_id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Result
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
