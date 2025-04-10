'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getResultByStudentAndExam as getResultsByStudentAndExam } from '@/lib/api';
import { generateMarksheetPDF } from '@/lib/pdfGenerator';
import { useRouter } from 'next/navigation';
import { PerformanceVisualization } from '@/components/student/PerformanceCharts';

export default function ResultDetailPage({ params }) {
  const router = useRouter();
  const { studentId, examId } = params;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Call the API to get detailed results
        const data = await getResultsByStudentAndExam(studentId, examId);
        setResultData(data);
      } catch (err) {
        console.error('Error fetching result details:', err);
        setError('Failed to load result details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId && examId) {
      fetchResultData();
    }
  }, [studentId, examId]);

  const handlePrintMarksheet = async () => {
    try {
      setPdfGenerating(true);
      setPdfError(null);
      setShowPrintModal(true);
      
      // Generate and download the PDF
      await generateMarksheetPDF(studentId, examId);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      setPdfError('Failed to generate PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Result Details</h1>
            <p className="mt-1 text-sm text-gray-500">
              View your detailed exam results and performance
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/student/results"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Search
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : resultData ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Result Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-bold">Student Information</h2>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Name:</span> {resultData.student.name}</p>
                    <p><span className="font-medium">Roll Number:</span> {resultData.student.roll_number}</p>
                    <p><span className="font-medium">Class:</span> {resultData.student.class} {resultData.student.section && `- ${resultData.student.section}`}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Exam Information</h2>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Exam:</span> {resultData.exam.name}</p>
                    <p><span className="font-medium">Term:</span> {resultData.exam.term}</p>
                    <p><span className="font-medium">Year:</span> {resultData.exam.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject-wise Marks */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Subject-wise Marks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marks Obtained
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Marks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pass Marks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resultData.results.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.subject_name} ({result.subject_code})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.marks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.full_marks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.pass_marks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            result.marks >= result.pass_marks 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {result.marks >= result.pass_marks ? 'Pass' : 'Fail'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Result Summary */}
            <div className="p-6 bg-gray-50 border-t border-gray-200" data-animate="slide-in-bottom">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Result Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-stagger-container data-stagger-animation="scale-up">
                <div className="bg-white p-4 rounded-md shadow-sm hover-lift" data-hover="hover-lift" data-stagger-item>
                  <p className="text-sm text-gray-500">Total Marks</p>
                  <p className="text-2xl font-bold text-gray-900">{resultData.summary.totalMarks}/{resultData.summary.totalFullMarks}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm hover-lift" data-hover="hover-lift" data-stagger-item>
                  <p className="text-sm text-gray-500">Percentage</p>
                  <p className="text-2xl font-bold text-gray-900">{resultData.summary.percentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm hover-lift" data-hover="hover-lift" data-stagger-item>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="text-2xl font-bold text-gray-900">{resultData.summary.grade}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm hover-lift" data-hover="hover-lift" data-stagger-item>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`text-2xl font-bold ${
                    resultData.summary.passStatus === 'PASS' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {resultData.summary.passStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Visualization */}
            <div className="p-6 border-t border-gray-200" data-animate="fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Visualization</h3>
              <PerformanceVisualization resultData={resultData} />
            </div>

            {/* Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end" data-animate="slide-in-right">
              <button
                onClick={handlePrintMarksheet}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 btn-pulse"
                data-btn-animate="btn-pulse"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                Download Marksheet
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-gray-600">No result data found. Please go back and search again.</p>
          </div>
        )}
      </main>

      {/* Print Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Download Marksheet</h3>
              {pdfGenerating ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Generating your PDF marksheet...</p>
                </div>
              ) : pdfError ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {pdfError}
                </div>
              ) : (
                <div className="text-center py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 font-medium mb-2">PDF Generated Successfully!</p>
                  <p className="text-gray-500">Your marksheet has been downloaded to your device.</p>
                </div>
              )}
            </div>
            <div className="px-5 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              {pdfError && (
                <button
                  type="button"
                  onClick={handlePrintMarksheet}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
                >
                  Try Again
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
