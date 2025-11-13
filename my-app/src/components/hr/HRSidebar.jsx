import { useState } from 'react';
import { Building2, LayoutDashboard, Users, Clock, CalendarCheck, Briefcase, Calendar, FileBarChart } from "lucide-react";

export default function HRSidebar({ activeSection, onSectionChange }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Users, label: "Employees", id: "employees" },
    { icon: Clock, label: "Attendance", id: "attendance" },
    { icon: CalendarCheck, label: "Leave Management", id: "leave-management" },
    { icon: Briefcase, label: "Job Assignments", id: "job-assignments" },
    { icon: Calendar, label: "Calendar", id: "calendar" },
    { icon: FileBarChart, label: "Reports", id: "reports" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Building2 className="text-blue-900 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">EIL HR</h1>
            <p className="text-blue-200 text-sm">Admin Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    isActive 
                      ? "bg-blue-700 text-white" 
                      : "hover:bg-blue-700 text-blue-100 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-medium">Admin User</p>
            <p className="text-blue-200 text-sm">HR Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}