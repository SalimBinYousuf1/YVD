'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as loginUser, logoutAdmin as logoutUser } from '@/lib/api';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      setUser({ token: data.token });
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Auth context value
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
