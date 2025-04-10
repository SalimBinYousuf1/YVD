'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { 
  getAllResults, 
  getAllStudents, 
  getAllExams, 
  getAllSubjects,
  createResult,
  updateResult,
  deleteResult,
  getResultsByStudentAndExam
} from '@/lib/api';

export default function ResultsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [viewResults, setViewResults] = useState(null);
  const [formData, setFormData] = useState({
    student_id: '',
    exam_id: '',
    subject_id: '',
    marks: ''
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !loading) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all required data in parallel
        const [resultsData, studentsData, examsData, subjectsData] = await Promise.all([
          getAllResults(),
          getAllStudents(),
          getAllExams(),
          getAllSubjects()
        ]);
        
        setResults(resultsData.results || []);
        setStudents(studentsData.students || []);
        setExams(examsData.exams || []);
        setSubjects(subjectsData.subjects || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createResult(formData);
      
      // Refresh result list
      const data = await getAllResults();
      setResults(data.results || []);
      
      // Reset form and close modal
      setFormData({
        student_id: '',
        exam_id: '',
        subject_id: '',
        marks: ''
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding result:', err);
      setError('Failed to add result');
    } finally {
      setLoading(false);
    }
  };

  const handleEditResult = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateResult(currentResult.id, { marks: formData.marks });
      
      // Refresh result list
      const data = await getAllResults();
      setResults(data.results || []);
      
      // Reset form and close modal
      setCurrentResult(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating result:', err);
      setError('Failed to update result');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResult = async () => {
    try {
      setLoading(true);
      await deleteResult(currentResult.id);
      
      // Refresh result list
      const data = await getAllResults();
      setResults(data.results || []);
      
      // Reset and close modal
      setCurrentResult(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting result:', err);
      setError('Failed to delete result');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (result) => {
    setCurrentResult(result);
    setFormData({
      ...formData,
      marks: result.marks
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (result) => {
    setCurrentResult(result);
    setShowDeleteModal(true);
  };

  const handleViewResults = async () => {
    if (!selectedStudent || !selectedExam) {
      setError('Please select both student and exam');
      return;
    }

    try {
      setLoading(true);
      const data = await getResultsByStudentAndExam(selectedStudent, selectedExam);
      setViewResults(data);
      setShowViewModal(true);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter(result => {
    const studentName = result.student_name?.toLowerCase() || '';
    const rollNumber = result.roll_number?.toLowerCase() || '';
    const examName = result.exam_name?.toLowerCase() || '';
    const subjectName = result.subject_name?.toLowerCase() || '';
    const searchLower = searchTerm.toLowerCase();
    
    return studentName.includes(searchLower) || 
           rollNumber.includes(searchLower) || 
           examName.includes(searchLower) || 
           subjectName.includes(searchLower);
  });

  if (!isAuthenticated && !loading) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Result Management</h1>
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
        {loading && !results.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        ) : (
          <>
            {/* View Results Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">View Student Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Student
                  </label>
                  <select
                    id="student"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.roll_number} - {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="exam" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Exam
                  </label>
                  <select
                    id="exam"
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select an exam</option>
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.name} - {exam.class} ({exam.term} {exam.year})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleViewResults}
                    disabled={!selectedStudent || !selectedExam}
                    className={`w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 flex items-center justify-center ${
                      !selectedStudent || !selectedExam ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View Results
                  </button>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 flex items-center"
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
                Add New Result
              </button>
            </div>

            {/* Results Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Exam
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResults.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          No results found
                        </td>
                      </tr>
                    ) : (
                      filteredResults.map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.roll_number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.student_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.exam_name} ({result.term} {result.year})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.subject_name} ({result.subject_code})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.marks}/{result.full_marks}
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
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => openEditModal(result)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(result)}
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

      {/* Add Result Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Result</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddResult}>
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
                    Student *
                  </label>
                  <select
                    id="student_id"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.roll_number} - {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="exam_id" className="block text-sm font-medium text-gray-700">
                    Exam *
                  </label>
                  <select
                    id="exam_id"
                    name="exam_id"
                    value={formData.exam_id}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select an exam</option>
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.name} - {exam.class} ({exam.term} {exam.year})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subject_id" className="block text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <select
                    id="subject_id"
                    name="subject_id"
                    value={formData.subject_id}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code}) - {subject.class}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                    Marks *
                  </label>
                  <input
                    type="number"
                    id="marks"
                    name="marks"
                    value={formData.marks}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="100"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
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
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Result Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Result</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditResult}>
              <div className="p-5 space-y-4">
                <div>
                  <p className="block text-sm font-medium text-gray-700">
                    Student: <span className="font-normal">{currentResult?.student_name}</span>
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-gray-700">
                    Exam: <span className="font-normal">{currentResult?.exam_name} ({currentResult?.term} {currentResult?.year})</span>
                  </p>
                </div>
                <div>
                  <p className="block text-sm font-medium text-gray-700">
                    Subject: <span className="font-normal">{currentResult?.subject_name} ({currentResult?.subject_code})</span>
                  </p>
                </div>
                <div>
                  <label htmlFor="edit_marks" className="block text-sm font-medium text-gray-700">
                    Marks *
                  </label>
                  <input
                    type="number"
                    id="edit_marks"
                    name="marks"
                    value={formData.marks}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max={currentResult?.full_marks || 100}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Full marks: {currentResult?.full_marks}, Pass marks: {currentResult?.pass_marks}
                  </p>
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
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Result'}
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
                Are you sure you want to delete the result for student <span className="font-medium">{currentResult?.student_name}</span> in subject <span className="font-medium">{currentResult?.subject_name}</span> for exam <span className="font-medium">{currentResult?.exam_name}</span>? This action cannot be undone.
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
                onClick={handleDeleteResult}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Deleting...' : 'Delete Result'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Results Modal */}
      {showViewModal && viewResults && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium text-gray-900">Student Results</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase">Student Information</h4>
                  <p className="mt-2 text-gray-900">
                    <span className="font-medium">Name:</span> {viewResults.student.name}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Roll Number:</span> {viewResults.student.roll_number}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Class:</span> {viewResults.student.class}
                    {viewResults.student.section && ` - ${viewResults.student.section}`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase">Exam Information</h4>
                  <p className="mt-2 text-gray-900">
                    <span className="font-medium">Exam:</span> {viewResults.exam.name}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Term:</span> {viewResults.exam.term}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Year:</span> {viewResults.exam.year}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Subject Marks</h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marks
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
                      {viewResults.results.map((result) => (
                        <tr key={result.id}>
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

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Result Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Total Marks</p>
                    <p className="text-2xl font-bold text-gray-900">{viewResults.summary.totalMarks}/{viewResults.summary.totalFullMarks}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Percentage</p>
                    <p className="text-2xl font-bold text-gray-900">{viewResults.summary.percentage}%</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">Grade</p>
                    <p className="text-2xl font-bold text-gray-900">{viewResults.summary.grade}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500 mr-2">Overall Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      viewResults.summary.passStatus === 'PASS' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewResults.summary.passStatus}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      // TODO: Implement PDF generation in step 006
                      alert('PDF generation will be implemented in the next phase');
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Download Marksheet
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
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
