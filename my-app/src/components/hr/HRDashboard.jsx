import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import HRSidebar from './HRSidebar';
import HRHeader from './HRHeader';
import DashboardSection from './sections/DashboardSection';
import EmployeesSection from './sections/EmployeesSection';
import AttendanceSection from './sections/AttendanceSection';
import LeaveManagementSection from './sections/LeaveManagementSection';
import JobAssignmentsSection from './sections/JobAssignmentsSection';
import CalendarSection from './sections/CalendarSection';
import ReportsSection from './sections/ReportsSection';

const sectionTitles = {
  dashboard: "Dashboard",
  employees: "Employee Management",
  attendance: "Attendance Tracking",
  "leave-management": "Leave Management",
  "job-assignments": "Job Assignments",
  calendar: "Calendar",
  reports: "Reports & Analytics"
};

export default function HRDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sectionHistory, setSectionHistory] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get admin user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleBack = () => {
    // Check if there's any history to go back to
    if (sectionHistory.length > 0) {
      // Pop the last section from the history
      const previousSection = sectionHistory[sectionHistory.length - 1];
      const newHistory = sectionHistory.slice(0, -1);
      
      setActiveSection(previousSection);
      setSectionHistory(newHistory);
    }
    // If history is empty, do nothing, preventing a return to the login page
  };

  const handleSectionChange = (newSection) => {
    // Only update history if the new section is different from the current one
    if (newSection !== activeSection) {
      setSectionHistory([...sectionHistory, activeSection]);
      setActiveSection(newSection);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection userData={userData} />;
      case 'employees':
        return <EmployeesSection userData={userData} />;
      case 'attendance':
        return <AttendanceSection userData={userData} />;
      case 'leave-management':
        return <LeaveManagementSection userData={userData} />;
      case 'job-assignments':
        return <JobAssignmentsSection userData={userData} />;
      case 'calendar':
        return <CalendarSection userData={userData} />;
      case 'reports':
        return <ReportsSection userData={userData} />;
      default:
        return <DashboardSection userData={userData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <HRSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <HRHeader 
          title={`${sectionTitles[activeSection]} - ${userData?.name || 'Admin'}`} 
          onBack={handleBack} 
          canGoBack={sectionHistory.length > 0}
        />
        <div className="flex-1 overflow-auto p-6">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}