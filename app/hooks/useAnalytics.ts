"use client";

import { useState, useEffect } from 'react';

interface AnalyticsData {
  totalVisits: number;
  currentVisitors: number;
  averageSessionTime: number;
  currentSessionTime: number;
  pageViews: number;
  bounceRate: number;
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    currentVisitors: 1,
    averageSessionTime: 0,
    currentSessionTime: 0,
    pageViews: 1,
    bounceRate: 0,
  });

  const [sessionStartTime] = useState(Date.now());

  useEffect(() => {
    // Initialize analytics from localStorage
    const initializeAnalytics = () => {
      const stored = localStorage.getItem('portfolio-analytics');
      const storedData = stored ? JSON.parse(stored) : null;
      
      const newVisit = {
        totalVisits: (storedData?.totalVisits || 0) + 1,
        currentVisitors: Math.floor(Math.random() * 5) + 1, // Simulate concurrent visitors
        averageSessionTime: storedData?.averageSessionTime || 0,
        currentSessionTime: 0,
        pageViews: (storedData?.pageViews || 0) + 1,
        bounceRate: storedData?.bounceRate || 0,
      };

      setAnalytics(newVisit);
      
      // Store updated data
      localStorage.setItem('portfolio-analytics', JSON.stringify(newVisit));
    };

    initializeAnalytics();

    // Update session time every second
    const interval = setInterval(() => {
      const currentSessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
      
      setAnalytics(prev => {
        const updated = { ...prev, currentSessionTime };
        
        // Calculate average session time
        const sessions = JSON.parse(localStorage.getItem('portfolio-sessions') || '[]');
        const avgTime = sessions.length > 0 
          ? sessions.reduce((sum: number, time: number) => sum + time, 0) / sessions.length 
          : currentSessionTime;
        
        updated.averageSessionTime = Math.floor(avgTime);
        
        return updated;
      });
    }, 1000);

    // Save session time on page unload
    const handleBeforeUnload = () => {
      const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
      const sessions = JSON.parse(localStorage.getItem('portfolio-sessions') || '[]');
      sessions.push(sessionTime);
      
      // Keep only last 100 sessions
      if (sessions.length > 100) {
        sessions.splice(0, sessions.length - 100);
      }
      
      localStorage.setItem('portfolio-sessions', JSON.stringify(sessions));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionStartTime]);

  const trackPageView = (page: string) => {
    setAnalytics(prev => {
      const updated = { ...prev, pageViews: prev.pageViews + 1 };
      localStorage.setItem('portfolio-analytics', JSON.stringify(updated));
      return updated;
    });
  };

  return { analytics, trackPageView };
}