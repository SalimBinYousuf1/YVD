'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '@/lib/api';

export default function AnnouncementsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_active: true
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !loading) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await getAllAnnouncements();
        setAnnouncements(data.announcements || []);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAnnouncements();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAnnouncement(formData);
      
      // Refresh announcement list
      const data = await getAllAnnouncements();
      setAnnouncements(data.announcements || []);
      
      // Reset form and close modal
      setFormData({
        title: '',
        content: '',
        is_active: true
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding announcement:', err);
      setError('Failed to add announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAnnouncement = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateAnnouncement(currentAnnouncement.id, formData);
      
      // Refresh announcement list
      const data = await getAllAnnouncements();
      setAnnouncements(data.announcements || []);
      
      // Reset form and close modal
      setCurrentAnnouncement(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating announcement:', err);
      setError('Failed to update announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async () => {
    try {
      setLoading(true);
      await deleteAnnouncement(currentAnnouncement.id);
      
      // Refresh announcement list
      const data = await getAllAnnouncements();
      setAnnouncements(data.announcements || []);
      
      // Reset and close modal
      setCurrentAnnouncement(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting announcement:', err);
      setError('Failed to delete announcement');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (announcement) => {
    setCurrentAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      is_active: announcement.is_active === 1
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (announcement) => {
    setCurrentAnnouncement(announcement);
    setShowDeleteModal(true);
  };

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated && !loading) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Announcement Management</h1>
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
        {loading && !announcements.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
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
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 flex items-center"
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
                Add New Announcement
              </button>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {filteredAnnouncements.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                  No announcements found
                </div>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                      announcement.is_active ? 'border-yellow-500' : 'border-gray-300'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Posted on {new Date(announcement.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(announcement)}
                            className="p-1 text-indigo-600 hover:text-indigo-900 transition duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => openDeleteModal(announcement)}
                            className="p-1 text-red-600 hover:text-red-900 transition duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{announcement.content}</p>
                      </div>
                      <div className="mt-4 flex items-center">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            announcement.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {announcement.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Add Announcement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Announcement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddAnnouncement}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Announcement title"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Announcement content"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Active (visible to students)
                  </label>
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
                  className={`px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Announcement Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Announcement</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditAnnouncement}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="edit_title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="edit_title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_content" className="block text-sm font-medium text-gray-700">
                    Content *
                  </label>
                  <textarea
                    id="edit_content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edit_is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="edit_is_active" className="ml-2 block text-sm text-gray-700">
                    Active (visible to students)
                  </label>
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
                  className={`px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Announcement'}
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
                Are you sure you want to delete the announcement <span className="font-medium">"{currentAnnouncement?.title}"</span>? This action cannot be undone.
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
                onClick={handleDeleteAnnouncement}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Deleting...' : 'Delete Announcement'}
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
