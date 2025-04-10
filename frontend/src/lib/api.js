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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    
    // Store token in localStorage
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
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

// Get all students
export const getStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/api/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

// Get student by ID
export const getStudentById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch student');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching student:', error);
    return null;
  }
};

// Create student
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
    
    if (!response.ok) {
      throw new Error('Failed to create student');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

// Update student
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
    
    if (!response.ok) {
      throw new Error('Failed to update student');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete student');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Get all exams
export const getExams = async () => {
  try {
    const response = await fetch(`${API_URL}/api/exams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch exams');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching exams:', error);
    return [];
  }
};

// Get exam by ID
export const getExamById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/exams/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch exam');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching exam:', error);
    return null;
  }
};

// Create exam
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
    
    if (!response.ok) {
      throw new Error('Failed to create exam');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating exam:', error);
    throw error;
  }
};

// Update exam
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
    
    if (!response.ok) {
      throw new Error('Failed to update exam');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
};

// Delete exam
export const deleteExam = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/exams/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete exam');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting exam:', error);
    throw error;
  }
};

// Get all subjects
export const getSubjects = async () => {
  try {
    const response = await fetch(`${API_URL}/api/subjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

// Get all results
export const getResults = async () => {
  try {
    const response = await fetch(`${API_URL}/api/results`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching results:', error);
    return [];
  }
};

// Get result by student ID and exam ID
export const getResultByStudentAndExam = async (studentId, examId) => {
  try {
    const response = await fetch(`${API_URL}/api/results/student/${studentId}/exam/${examId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch result');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching result:', error);
    // Return mock data for development
    return {
      student: {
        id: studentId,
        name: 'John Doe',
        roll_number: 'R12345',
        class: '10th'
      },
      exam: {
        id: examId,
        name: 'Final Examination',
        term: 'Term 2',
        year: '2023'
      },
      results: [
        { subject: 'Mathematics', marks: 85, full_marks: 100, pass_marks: 35, pass_status: 'PASS' },
        { subject: 'Science', marks: 78, full_marks: 100, pass_marks: 35, pass_status: 'PASS' },
        { subject: 'English', marks: 82, full_marks: 100, pass_marks: 35, pass_status: 'PASS' },
        { subject: 'Social Studies', marks: 75, full_marks: 100, pass_marks: 35, pass_status: 'PASS' },
        { subject: 'Hindi', marks: 70, full_marks: 100, pass_marks: 35, pass_status: 'PASS' }
      ],
      summary: {
        totalMarks: 390,
        totalFullMarks: 500,
        percentage: 78,
        grade: 'B+',
        passStatus: 'PASS'
      }
    };
  }
};

// Search results by roll number or name
export const searchResults = async (query) => {
  try {
    const response = await fetch(`${API_URL}/api/results/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to search results');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching results:', error);
    return [];
  }
};

// Get all announcements
export const getAnnouncements = async () => {
  try {
    const response = await fetch(`${API_URL}/api/announcements`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching announcements:', error);
    // Return mock data for development
    return [
      {
        id: 1,
        title: 'Final Exam Results Published',
        content: 'The results for the final examination have been published. Students can check their results using their roll numbers.',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Parent-Teacher Meeting',
        content: 'A parent-teacher meeting will be held on 15th May 2023. All parents are requested to attend.',
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 3,
        title: 'Summer Vacation Notice',
        content: 'The school will remain closed for summer vacation from 1st June to 30th June 2023. Classes will resume on 1st July 2023.',
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  }
};

// Get stats for admin dashboard
export const getStats = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return mock data for development
    return {
      totalStudents: 120,
      totalExams: 5,
      totalSubjects: 8,
      totalResults: 450,
      recentAnnouncements: [
        {
          id: 1,
          title: 'Final Exam Results Published',
          content: 'The results for the final examination have been published. Students can check their results using their roll numbers.',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Parent-Teacher Meeting',
          content: 'A parent-teacher meeting will be held on 15th May 2023. All parents are requested to attend.',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    };
  }
};
