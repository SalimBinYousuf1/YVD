'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Component for subject-wise performance bar chart
export const SubjectPerformanceChart = ({ results }) => {
  if (!results || !results.length) return null;

  // Prepare data for the chart
  const data = results.map(result => ({
    subject: result.subject_name,
    marks: result.marks,
    fullMarks: result.full_marks,
    percentage: Math.round((result.marks / result.full_marks) * 100)
  }));

  return (
    <div className="w-full h-80 chart-responsive">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="subject" 
            angle={-45} 
            textAnchor="end" 
            height={70} 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Marks', angle: -90, position: 'insideLeft' }} 
            domain={[0, 'dataMax']}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'marks') return [`${value} marks`, 'Marks Obtained'];
              if (name === 'fullMarks') return [`${value} marks`, 'Full Marks'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="marks" fill="#4f46e5" name="Marks Obtained" />
          <Bar dataKey="fullMarks" fill="#94a3b8" name="Full Marks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component for pass/fail status pie chart
export const PassFailChart = ({ results }) => {
  if (!results || !results.length) return null;

  // Count passed and failed subjects
  const passCount = results.filter(result => result.marks >= result.pass_marks).length;
  const failCount = results.length - passCount;

  const data = [
    { name: 'Passed', value: passCount },
    { name: 'Failed', value: failCount }
  ];

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="w-full h-64 chart-responsive">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} subjects`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component for performance radar chart
export const PerformanceRadarChart = ({ results }) => {
  if (!results || !results.length) return null;

  // Prepare data for the radar chart - normalize all subjects to percentage
  const data = results.map(result => ({
    subject: result.subject_name,
    percentage: Math.round((result.marks / result.full_marks) * 100)
  }));

  return (
    <div className="w-full h-80 chart-responsive">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Performance"
            dataKey="percentage"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component for grade distribution chart
export const GradeDistributionChart = ({ results, summary }) => {
  if (!results || !results.length || !summary) return null;

  // Define grade ranges
  const gradeRanges = [
    { name: 'A+', min: 90, max: 100, color: '#10b981' },
    { name: 'A', min: 80, max: 89, color: '#22c55e' },
    { name: 'B+', min: 70, max: 79, color: '#84cc16' },
    { name: 'B', min: 60, max: 69, color: '#eab308' },
    { name: 'C+', min: 50, max: 59, color: '#f97316' },
    { name: 'C', min: 40, max: 49, color: '#ef4444' },
    { name: 'F', min: 0, max: 39, color: '#b91c1c' }
  ];

  // Count subjects in each grade range
  const gradeDistribution = gradeRanges.map(grade => {
    const count = results.filter(result => {
      const percentage = Math.round((result.marks / result.full_marks) * 100);
      return percentage >= grade.min && percentage <= grade.max;
    }).length;
    return {
      name: grade.name,
      count,
      color: grade.color
    };
  }).filter(grade => grade.count > 0); // Only include grades that have subjects

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={gradeDistribution}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => [`${value} subjects`, 'Count']} />
          <Legend />
          <Bar dataKey="count" name="Subjects">
            {gradeDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Main component that combines all charts
export const PerformanceVisualization = ({ resultData }) => {
  if (!resultData || !resultData.results || !resultData.results.length) {
    return (
      <div className="bg-gray-100 p-8 rounded-md flex items-center justify-center">
        <p className="text-gray-500">No data available for visualization</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-4">Subject-wise Performance</h4>
        <SubjectPerformanceChart results={resultData.results} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Pass/Fail Distribution</h4>
          <PassFailChart results={resultData.results} />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Grade Distribution</h4>
          <GradeDistributionChart results={resultData.results} summary={resultData.summary} />
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-4">Performance Radar</h4>
        <PerformanceRadarChart results={resultData.results} />
      </div>
    </div>
  );
};
