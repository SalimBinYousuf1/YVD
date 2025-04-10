'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { getAllExams, createExam, updateExam, deleteExam } from '@/lib/api';

export default function ExamsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    class: '',
    year: new Date().getFullYear(),
    term: ''
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !loading) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const data = await getAllExams();
        setExams(data.exams || []);
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Failed to load exams');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchExams();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createExam(formData);
      
      // Refresh exam list
      const data = await getAllExams();
      setExams(data.exams || []);
      
      // Reset form and close modal
      setFormData({
        name: '',
        description: '',
        class: '',
        year: new Date().getFullYear(),
        term: ''
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding exam:', err);
      setError('Failed to add exam');
    } finally {
      setLoading(false);
    }
  };

  const handleEditExam = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateExam(currentExam.id, formData);
      
      // Refresh exam list
      const data = await getAllExams();
      setExams(data.exams || []);
      
      // Reset form and close modal
      setCurrentExam(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating exam:', err);
      setError('Failed to update exam');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = async () => {
    try {
      setLoading(true);
      await deleteExam(currentExam.id);
      
      // Refresh exam list
      const data = await getAllExams();
      setExams(data.exams || []);
      
      // Reset and close modal
      setCurrentExam(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting exam:', err);
      setError('Failed to delete exam');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (exam) => {
    setCurrentExam(exam);
    setFormData({
      name: exam.name,
      description: exam.description || '',
      class: exam.class,
      year: exam.year,
      term: exam.term
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (exam) => {
    setCurrentExam(exam);
    setShowDeleteModal(true);
  };

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated && !loading) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && !exams.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create New Exam
              </button>
            </div>

            {/* Exams Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Term
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredExams.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No exams found
                        </td>
                      </tr>
                    ) : (
                      filteredExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {exam.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {exam.class}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {exam.term}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {exam.year}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {exam.description || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => openEditModal(exam)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(exam)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Create New Exam</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddExam}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Exam Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Final Exam, Term 1, NEET, JEE"
                  />
                </div>
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                    Class *
                  </label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 9th, 12th, NEET"
                  />
                </div>
                <div>
                  <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                    Term *
                  </label>
                  <input
                    type="text"
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Term 1, Final, Annual"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                    Year *
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2000"
                    max="2100"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Optional description about the exam"
                  ></textarea>
                </div>
              </div>
              <div className="px-5 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating...' : 'Create Exam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Exam Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Exam</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditExam}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="edit_name" className="block text-sm font-medium text-gray-700">
                    Exam Name *
                  </label>
                  <input
                    type="text"
                    id="edit_name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_class" className="block text-sm font-medium text-gray-700">
                    Class *
                  </label>
                  <input
                    type="text"
                    id="edit_class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_term" className="block text-sm font-medium text-gray-700">
                    Term *
                  </label>
                  <input
                    type="text"
                    id="edit_term"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_year" className="block text-sm font-medium text-gray-700">
                    Year *
                  </label>
                  <input
                    type="number"
                    id="edit_year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2000"
                    max="2100"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="edit_description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>
              </div>
              <div className="px-5 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Exam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-500">
                Are you sure you want to delete the exam <span className="font-medium">{currentExam?.name}</span> for class <span className="font-medium">{currentExam?.class}</span>? This action cannot be undone and will also delete all associated results.
              </p>
            </div>
            <div className="px-5 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteExam}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Deleting...' : 'Delete Exam'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Result Declaration System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
