'use client';

import { useEffect } from 'react';

// Responsive utility functions for the Result Declaration System
export const useResponsive = () => {
  // Add responsive classes to tables
  useEffect(() => {
    const tables = document.querySelectorAll('table:not(.table-responsive)');
    tables.forEach(table => {
      table.classList.add('table-responsive');
    });
  }, []);
  
  // Add touch-friendly classes to interactive elements on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      interactiveElements.forEach(element => {
        if (element.clientHeight < 44 || element.clientWidth < 44) {
          element.classList.add('touch-target');
        }
      });
    }
  }, []);
  
  // Handle orientation changes
  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        '--vh', 
        `${window.innerHeight * 0.01}px`
      );
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  return null;
};

// Responsive component to be included in layout
export default function ResponsiveProvider({ children }) {
  useResponsive();
  
  return <>{children}</>;
}
