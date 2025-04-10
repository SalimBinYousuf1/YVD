'use client';

import { useEffect } from 'react';

// Animation utility functions for the Result Declaration System
export const useAnimations = () => {
  // Apply fade-in animation to elements with data-animate attribute
  useEffect(() => {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute('data-animate');
          element.classList.add(animation);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animateElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  // Apply staggered animations to list items
  useEffect(() => {
    const staggerContainers = document.querySelectorAll('[data-stagger-container]');
    
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('[data-stagger-item]');
      const animation = container.getAttribute('data-stagger-animation') || 'fade-in';
      
      items.forEach((item, index) => {
        item.classList.add(animation);
        item.classList.add('stagger-item');
        item.style.opacity = '0';
        
        setTimeout(() => {
          item.style.opacity = '1';
        }, 100);
      });
    });
  }, []);
  
  // Add hover animations
  useEffect(() => {
    const hoverElements = document.querySelectorAll('[data-hover]');
    
    hoverElements.forEach(element => {
      const hoverEffect = element.getAttribute('data-hover');
      element.classList.add(hoverEffect);
    });
  }, []);
  
  // Add button animations
  useEffect(() => {
    const buttons = document.querySelectorAll('[data-btn-animate]');
    
    buttons.forEach(button => {
      const animation = button.getAttribute('data-btn-animate');
      button.classList.add(animation);
    });
  }, []);
  
  return null;
};

// Animation component to be included in layout
export default function AnimationProvider({ children }) {
  useAnimations();
  
  return <>{children}</>;
}
