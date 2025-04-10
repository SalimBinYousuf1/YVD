'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getResults as getAllResults } from '@/lib/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function AdminDashboardCharts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [examStats, setExamStats] = useState([]);
  const [classStats, setClassStats] = useState([]);
  const [passFailStats, setPassFailStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all results
        const data = await getAllResults();
        setResults(data.results || []);
        
        // Process data for visualizations
        processData(data.results || []);
      } catch (err) {
        console.error('Error fetching data for charts:', err);
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (resultsData) => {
    // Process exam statistics
    const examMap = new Map();
    resultsData.forEach(result => {
      const examKey = `${result.exam_name} (${result.term} ${result.year})`;
      if (!examMap.has(examKey)) {
        examMap.set(examKey, {
          name: examKey,
          totalStudents: new Set(),
          totalMarks: 0,
          maxPossibleMarks: 0,
          passCount: 0,
          failCount: 0
        });
      }
      
      const stats = examMap.get(examKey);
      stats.totalStudents.add(result.student_id);
      stats.totalMarks += result.marks;
      stats.maxPossibleMarks += result.full_marks;
      
      if (result.marks >= result.pass_marks) {
        stats.passCount += 1;
      } else {
        stats.failCount += 1;
      }
    });
    
    const examStatsArray = Array.from(examMap.values()).map(stat => ({
      name: stat.name,
      studentCount: stat.totalStudents.size,
      averagePercentage: Math.round((stat.totalMarks / stat.maxPossibleMarks) * 100),
      passRate: Math.round((stat.passCount / (stat.passCount + stat.failCount)) * 100)
    }));
    
    setExamStats(examStatsArray);
    
    // Process class statistics
    const classMap = new Map();
    resultsData.forEach(result => {
      if (!classMap.has(result.class)) {
        classMap.set(result.class, {
          name: result.class,
          totalStudents: new Set(),
          totalMarks: 0,
          maxPossibleMarks: 0
        });
      }
      
      const stats = classMap.get(result.class);
      stats.totalStudents.add(result.student_id);
      stats.totalMarks += result.marks;
      stats.maxPossibleMarks += result.full_marks;
    });
    
    const classStatsArray = Array.from(classMap.values()).map(stat => ({
      name: stat.name,
      studentCount: stat.totalStudents.size,
      averagePercentage: Math.round((stat.totalMarks / stat.maxPossibleMarks) * 100)
    }));
    
    setClassStats(classStatsArray);
    
    // Process pass/fail statistics
    const passCount = resultsData.filter(result => result.marks >= result.pass_marks).length;
    const failCount = resultsData.length - passCount;
    
    setPassFailStats([
      { name: 'Pass', value: passCount },
      { name: 'Fail', value: failCount }
    ]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No data available for visualization</p>
      </div>
    );
  }

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-8">
      {/* Exam Performance Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Exam Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={examStats}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                label={{ value: 'Student Count', angle: 90, position: 'insideRight' }}
                domain={[0, 'auto']}
              />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="averagePercentage" name="Average Percentage" fill="#4f46e5" />
              <Bar yAxisId="left" dataKey="passRate" name="Pass Rate %" fill="#10b981" />
              <Bar yAxisId="right" dataKey="studentCount" name="Student Count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Performance Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Class Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={classStats}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                yAxisId="left"
                orientation="left"
                label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                label={{ value: 'Student Count', angle: 90, position: 'insideRight' }}
                domain={[0, 'auto']}
              />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="averagePercentage" name="Average Percentage" fill="#8b5cf6" />
              <Bar yAxisId="right" dataKey="studentCount" name="Student Count" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pass/Fail Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Pass/Fail Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={passFailStats}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {passFailStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} results`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
