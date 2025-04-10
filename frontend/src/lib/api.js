// API utility functions for the Result Declaration System
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Get auth token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Admin login
export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Admin register
export const registerAdmin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Admin logout
export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// ========== STUDENTS ==========
export const getStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/api/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch student');
    return await response.json();
  } catch (error) {
    console.error('Error fetching student:', error);
    return null;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await fetch(`${API_URL}/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(studentData)
    });
    if (!response.ok) throw new Error('Failed to create student');
    return await response.json();
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(studentData)
    });
    if (!response.ok) throw new Error('Failed to update student');
    return await response.json();
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return await response.json();
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// ========== EXAMS ==========
export const getExams = async () => {
  try {
    const response = await fetch(`${API_URL}/api/exams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch exams');
    return await response.json();
  } catch (error) {
    console.error('Error fetching exams:', error);
    return [];
  }
};

export const getExamById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/exams/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch exam');
    return await response.json();
  } catch (error) {
    console.error('Error fetching exam:', error);
    return null;
  }
};

export const createExam = async (examData) => {
  try {
    const response = await fetch(`${API_URL}/api/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(examData)
    });
    if (!response.ok) throw new Error('Failed to create exam');
    return await response.json();
  } catch (error) {
    console.error('Error creating exam:', error);
    throw error;
  }
};

export const updateExam = async (id, examData) => {
  try {
    const response = await fetch(`${API_URL}/api/exams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(examData)
    });
    if (!response.ok) throw new Error('Failed to update exam');
    return await response.json();
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/exams/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete exam');
    return await response.json();
  } catch (error) {
    console.error('Error deleting exam:', error);
    throw error;
  }
};

// ========== SUBJECTS ==========
export const getSubjects = async () => {
  try {
    const response = await fetch(`${API_URL}/api/subjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch subjects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

// CREATE subject
export const createSubject = async (subjectData) => {
  try {
    const response = await fetch(`${API_URL}/api/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(subjectData)
    });
    if (!response.ok) throw new Error('Failed to create subject');
    return await response.json();
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
};

// UPDATE subject
export const updateSubject = async (id, subjectData) => {
  try {
    const response = await fetch(`${API_URL}/api/subjects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(subjectData)
    });
    if (!response.ok) throw new Error('Failed to update subject');
    return await response.json();
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
};

// DELETE subject
export const deleteSubject = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete subject');
    return await response.json();
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
};

// ========== RESULTS ==========
export const getResults = async () => {
  try {
    const response = await fetch(`${API_URL}/api/results`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch results');
    return await response.json();
  } catch (error) {
    console.error('Error fetching results:', error);
    return [];
  }
};

export const getResultByStudentAndExam = async (studentId, examId) => {
  try {
    const response = await fetch(`${API_URL}/api/results/student/${studentId}/exam/${examId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch result');
    return await response.json();
  } catch (error) {
    console.error('Error fetching result:', error);
    // Return mock data for dev
    return {
      student: { id: studentId, name: 'John Doe', roll_number: 'R12345', class: '10th' },
      exam: { id: examId, name: 'Final Examination', term: 'Term 2', year: '2023' },
      results: [
        { subject: 'Math', marks: 85, full_marks: 100, pass_marks: 35, pass_status: 'PASS' },
        { subject: 'Science', marks: 78, full_marks: 100, pass_marks: 35, pass_status: 'PASS' }
      ],
      summary: {
        totalMarks: 163,
        totalFullMarks: 200,
        percentage: 81.5,
        grade: 'A',
        passStatus: 'PASS'
      }
    };
  }
};

export const searchResults = async (query) => {
  try {
    const response = await fetch(`${API_URL}/api/results/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to search results');
    return await response.json();
  } catch (error) {
    console.error('Error searching results:', error);
    return [];
  }
};

// ========== ANNOUNCEMENTS ==========
export const getAnnouncements = async () => {
  try {
    const response = await fetch(`${API_URL}/api/announcements`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch announcements');
    return await response.json();
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

// ========== STATS ==========
export const getStats = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalStudents: 120,
      totalExams: 5,
      totalSubjects: 8,
      totalResults: 450,
      recentAnnouncements: []
    };
  }
};
// GET all results
export const getAllResults = async () => {
  try {
    const response = await fetch(`${API_URL}/api/results`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch results');
    return await response.json();
  } catch (error) {
    console.error('Error fetching results:', error);
    return [];
  }
};

// DELETE result by ID
export const deleteResult = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/results/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete result');
    return await response.json();
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
};

// GET result by studentId and examId
export const getResultsByStudentAndExam = async (studentId, examId) => {
  try {
    const response = await fetch(`${API_URL}/api/results/student/${studentId}/exam/${examId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch student exam result');
    return await response.json();
  } catch (error) {
    console.error('Error fetching result:', error);
    return null;
  }
};
// Get all subjects
export const getAllSubjects = async () => {
  try {
    const response = await fetch(`${API_URL}/api/subjects`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch subjects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

// Create a result
export const createResult = async (resultData) => {
  try {
    const response = await fetch(`${API_URL}/api/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(resultData)
    });
    if (!response.ok) throw new Error('Failed to create result');
    return await response.json();
  } catch (error) {
    console.error('Error creating result:', error);
    throw error;
  }
};

// Update a result
export const updateResult = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/api/results/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error('Failed to update result');
    return await response.json();
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
};