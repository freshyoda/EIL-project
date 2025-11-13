import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

const ExportPDFButton = ({ data, type, filename, variant = "default" }) => {
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Set up the document
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      
      if (type === 'history') {
        doc.text('EIL Leave History Report', 20, 30);
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text('Employee: John Doe (EIL2024001)', 20, 50);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 60);
        
        // Add table headers
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Leave Type', 20, 80);
        doc.text('Date Range', 60, 80);
        doc.text('Days', 120, 80);
        doc.text('Status', 140, 80);
        doc.text('Applied On', 170, 80);
        
        // Add line under headers
        doc.line(20, 82, 200, 82);
        
        // Add table data
        doc.setFont(undefined, 'normal');
        let yPos = 92;
        data.forEach(leave => {
          const dateRange = `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}`;
          const appliedDate = new Date(leave.appliedOn).toLocaleDateString();
          
          doc.text(leave.label || leave.leaveType, 20, yPos);
          doc.text(dateRange, 60, yPos);
          doc.text(leave.days.toString(), 120, yPos);
          doc.text(leave.status.toUpperCase(), 140, yPos);
          doc.text(appliedDate, 170, yPos);
          yPos += 10;
        });
        
      } else if (type === 'balance') {
        doc.text('EIL Leave Balance Report', 20, 30);
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text('Employee: John Doe (EIL2024001)', 20, 50);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 60);
        
        // Add balance data
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Current Leave Balances:', 20, 80);
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        let yPos = 100;
        data.forEach(balance => {
          const text = `${balance.label}: ${balance.available} days remaining (out of ${balance.total})`;
          doc.text(text, 20, yPos);
          yPos += 15;
        });
        
        // Add footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('This report is generated automatically from the EIL Leave Management System', 20, 250);
        doc.text('Engineers India Limited - Confidential Document', 20, 260);
      }
      
      // Save the PDF
      doc.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    }
  };

  return (
    <Button
      onClick={exportToPDF}
      variant={variant}
      className={`flex items-center space-x-2 ${
        variant === 'outline' 
          ? 'border-eil-blue text-eil-blue hover:bg-eil-blue hover:text-white' 
          : 'bg-green-600 hover:bg-green-700 text-white'
      }`}
    >
      {variant === 'outline' ? <Download className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
      <span>{type === 'history' ? 'Export PDF' : 'Download Balance Report'}</span>
    </Button>
  );
};

export default ExportPDFButton;
