import { useState } from 'react';
import { FileBarChart, Download, TrendingUp, Users, Clock, Calendar } from "lucide-react";
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { initialEmployees, initialAttendance, initialLeaveRequests, initialJobAssignments } from '../../../data/hrData';

export default function ReportsSection() {
  const [employees] = useLocalStorage("employees", initialEmployees);
  const [attendance] = useLocalStorage("attendance", initialAttendance);
  const [leaveRequests] = useLocalStorage("leaveRequests", initialLeaveRequests);
  const [jobAssignments] = useLocalStorage("jobAssignments", initialJobAssignments);
  const [selectedReport, setSelectedReport] = useState('overview');

  // Calculate statistics
  const stats = {
    totalEmployees: employees.length,
    avgAttendance: attendance.length > 0 ? ((attendance.filter(a => a.status === 'present').length / attendance.length) * 100).toFixed(1) : 0,
    totalLeaveRequests: leaveRequests.length,
    pendingLeaves: leaveRequests.filter(req => req.status === 'pending').length,
    completedAssignments: jobAssignments.filter(job => job.status === 'completed').length,
    totalAssignments: jobAssignments.length
  };

  // Department breakdown
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  // Leave type breakdown
  const leaveTypeStats = leaveRequests.reduce((acc, leave) => {
    acc[leave.leaveType] = (acc[leave.leaveType] || 0) + 1;
    return acc;
  }, {});

  const reports = [
    { id: 'overview', name: 'Overview Report', icon: FileBarChart },
    { id: 'attendance', name: 'Attendance Report', icon: Clock },
    { id: 'leaves', name: 'Leave Report', icon: Calendar },
    { id: 'assignments', name: 'Assignment Report', icon: TrendingUp }
  ];

  const exportData = (type) => {
    let data, filename;
    
    switch (type) {
      case 'employees':
        data = employees;
        filename = 'employees_report.json';
        break;
      case 'attendance':
        data = attendance;
        filename = 'attendance_report.json';
        break;
      case 'leaves':
        data = leaveRequests;
        filename = 'leave_requests_report.json';
        break;
      case 'assignments':
        data = jobAssignments;
        filename = 'job_assignments_report.json';
        break;
      default:
        data = { employees, attendance, leaveRequests, jobAssignments };
        filename = 'hr_complete_report.json';
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgAttendance}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingLeaves}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(departmentStats).map(([dept, count]) => (
            <div key={dept} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{dept}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">{count} employees</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-900 h-2 rounded-full" 
                    style={{ width: `${(count / stats.totalEmployees) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Type Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Type Distribution</h3>
        <div className="space-y-4">
          {Object.entries(leaveTypeStats).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{type}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">{count} requests</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(count / stats.totalLeaveRequests) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600">Generate and export HR reports</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => exportData('all')}
              className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-2">
          {reports.map(report => {
            const IconComponent = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedReport === report.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{report.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      <div className="report-content">
        {selectedReport === 'overview' && renderOverviewReport()}
        
        {selectedReport === 'attendance' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Report</h3>
              <button
                onClick={() => exportData('attendance')}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.map(record => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.employeeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.hoursWorked || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'leaves' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Leave Report</h3>
              <button
                onClick={() => exportData('leaves')}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalLeaveRequests}</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {leaveRequests.filter(req => req.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {leaveRequests.filter(req => req.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'assignments' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Assignment Report</h3>
              <button
                onClick={() => exportData('assignments')}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</div>
                <div className="text-sm text-gray-600">Total Assignments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completedAssignments}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {jobAssignments.filter(job => job.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}