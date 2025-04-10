// PDF generation utility functions
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getResultByStudentAndExam as getResultsByStudentAndExam } from './api';

// Function to generate PDF marksheet
export const generateMarksheetPDF = async (studentId, examId) => {
  try {
    // Fetch the result data
    const resultData = await getResultsByStudentAndExam(studentId, examId);
    
    if (!resultData) {
      throw new Error('No result data found');
    }
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 153);
    doc.text('Result Declaration System', 105, 15, { align: 'center' });
    
    // Add marksheet title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('MARKSHEET', 105, 25, { align: 'center' });
    
    // Add exam details
    doc.setFontSize(12);
    doc.text(`Exam: ${resultData.exam.name}`, 105, 35, { align: 'center' });
    doc.text(`Term: ${resultData.exam.term} - ${resultData.exam.year}`, 105, 42, { align: 'center' });
    
    // Add a line
    doc.setDrawColor(0, 51, 153);
    doc.setLineWidth(0.5);
    doc.line(14, 45, 196, 45);
    
    // Add student information
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Student Name: ${resultData.student.name}`, 14, 55);
    doc.text(`Roll Number: ${resultData.student.roll_number}`, 14, 62);
    doc.text(`Class: ${resultData.student.class}${resultData.student.section ? ' - ' + resultData.student.section : ''}`, 14, 69);
    
    // Add date
    const today = new Date();
    doc.text(`Date: ${today.toLocaleDateString()}`, 150, 55);
    
    // Add subject-wise marks table
    const tableColumn = ["Subject", "Subject Code", "Marks Obtained", "Full Marks", "Pass Marks", "Status"];
    const tableRows = [];
    
    resultData.results.forEach(result => {
      const status = result.marks >= result.pass_marks ? 'PASS' : 'FAIL';
      tableRows.push([
        result.subject_name,
        result.subject_code,
        result.marks.toString(),
        result.full_marks.toString(),
        result.pass_marks.toString(),
        status
      ]);
    });
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 75,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [0, 51, 153],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [0, 51, 153],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 25, halign: 'center' },
      },
      didDrawCell: (data) => {
        // Color the status cell based on pass/fail
        if (data.column.index === 5 && data.cell.section === 'body') {
          const status = data.cell.raw;
          if (status === 'PASS') {
            doc.setFillColor(200, 250, 200); // Light green
          } else {
            doc.setFillColor(250, 200, 200); // Light red
          }
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(0, 0, 0);
          doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center', baseline: 'middle' });
        }
      }
    });
    
    // Get the y position after the table
    const finalY = (doc.lastAutoTable.finalY || 75) + 15;
    
    // Add result summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Result Summary', 14, finalY);
    
    // Add a line under the summary title
    doc.setDrawColor(0, 51, 153);
    doc.setLineWidth(0.2);
    doc.line(14, finalY + 2, 60, finalY + 2);
    
    // Add summary details
    doc.setFontSize(11);
    doc.text(`Total Marks: ${resultData.summary.totalMarks}/${resultData.summary.totalFullMarks}`, 14, finalY + 12);
    doc.text(`Percentage: ${resultData.summary.percentage}%`, 14, finalY + 20);
    doc.text(`Grade: ${resultData.summary.grade}`, 14, finalY + 28);
    
    // Add overall status with colored background
    doc.setFillColor(resultData.summary.passStatus === 'PASS' ? 0 : 220, resultData.summary.passStatus === 'PASS' ? 180 : 0, 0);
    doc.roundedRect(150, finalY + 5, 40, 20, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(resultData.summary.passStatus, 170, finalY + 17, { align: 'center' });
    
    // Add footer
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('This is a computer-generated document. No signature is required.', 105, 280, { align: 'center' });
    
    // Save the PDF
    const fileName = `Marksheet_${resultData.student.roll_number}_${resultData.exam.name.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
