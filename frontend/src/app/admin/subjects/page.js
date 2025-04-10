'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { getSubjects as getAllSubjects, createSubject, updateSubject, deleteSubject } from '@/lib/api';

export default function SubjectsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    full_marks: 100,
    pass_marks: 33,
    class: ''
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !loading) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const data = await getAllSubjects();
        setSubjects(data.subjects || []);
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError('Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSubjects();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createSubject(formData);
      
      // Refresh subject list
      const data = await getAllSubjects();
      setSubjects(data.subjects || []);
      
      // Reset form and close modal
      setFormData({
        name: '',
        code: '',
        full_marks: 100,
        pass_marks: 33,
        class: ''
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding subject:', err);
      setError('Failed to add subject');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateSubject(currentSubject.id, formData);
      
      // Refresh subject list
      const data = await getAllSubjects();
      setSubjects(data.subjects || []);
      
      // Reset form and close modal
      setCurrentSubject(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating subject:', err);
      setError('Failed to update subject');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async () => {
    try {
      setLoading(true);
      await deleteSubject(currentSubject.id);
      
      // Refresh subject list
      const data = await getAllSubjects();
      setSubjects(data.subjects || []);
      
      // Reset and close modal
      setCurrentSubject(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting subject:', err);
      setError('Failed to delete subject');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (subject) => {
    setCurrentSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      full_marks: subject.full_marks,
      pass_marks: subject.pass_marks,
      class: subject.class
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (subject) => {
    setCurrentSubject(subject);
    setShowDeleteModal(true);
  };

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated && !loading) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Subject Management</h1>
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
        {loading && !subjects.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 flex items-center"
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
                Add New Subject
              </button>
            </div>

            {/* Subjects Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Marks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pass Marks
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubjects.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No subjects found
                        </td>
                      </tr>
                    ) : (
                      filteredSubjects.map((subject) => (
                        <tr key={subject.id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {subject.code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subject.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subject.class}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subject.full_marks}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subject.pass_marks}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => openEditModal(subject)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(subject)}
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

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Subject</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddSubject}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Subject Code *
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., MATH101, PHY101, CHEM101"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., 9th, 12th, NEET"
                  />
                </div>
                <div>
                  <label htmlFor="full_marks" className="block text-sm font-medium text-gray-700">
                    Full Marks
                  </label>
                  <input
                    type="number"
                    id="full_marks"
                    name="full_marks"
                    value={formData.full_marks}
                    onChange={handleInputChange}
                    min="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="pass_marks" className="block text-sm font-medium text-gray-700">
                    Pass Marks
                  </label>
                  <input
                    type="number"
                    id="pass_marks"
                    name="pass_marks"
                    value={formData.pass_marks}
                    onChange={handleInputChange}
                    min="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
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
                  className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Subject</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditSubject}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="edit_name" className="block text-sm font-medium text-gray-700">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    id="edit_name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_code" className="block text-sm font-medium text-gray-700">
                    Subject Code *
                  </label>
                  <input
                    type="text"
                    id="edit_code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_full_marks" className="block text-sm font-medium text-gray-700">
                    Full Marks
                  </label>
                  <input
                    type="number"
                    id="edit_full_marks"
                    name="full_marks"
                    value={formData.full_marks}
                    onChange={handleInputChange}
                    min="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_pass_marks" className="block text-sm font-medium text-gray-700">
                    Pass Marks
                  </label>
                  <input
                    type="number"
                    id="edit_pass_marks"
                    name="pass_marks"
                    value={formData.pass_marks}
                    onChange={handleInputChange}
                    min="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
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
                  className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Subject'}
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
                Are you sure you want to delete the subject <span className="font-medium">{currentSubject?.name}</span> with code <span className="font-medium">{currentSubject?.code}</span>? This action cannot be undone and will also delete all associated results.
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
                onClick={handleDeleteSubject}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Deleting...' : 'Delete Subject'}
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
