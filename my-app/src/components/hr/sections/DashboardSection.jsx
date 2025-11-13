import { useState } from 'react';
import { Users, CheckCircle, Clock, Briefcase, Check, X, Trash2, TrendingUp } from "lucide-react";
import { useLocalStorage } from '../useLocalStorage';
import { initialEmployees, initialLeaveRequests, initialJobAssignments, initialAttendance } from '../../../data/hrData';

export default function DashboardSection() {
  
  const [employees] = useLocalStorage("employees", initialEmployees);
  const [leaveRequests, setLeaveRequests] = useLocalStorage("leaveRequests", initialLeaveRequests);
  const [jobAssignments, setJobAssignments] = useLocalStorage("jobAssignments", initialJobAssignments);
  const [attendance] = useLocalStorage("attendance", initialAttendance);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [adminComments, setAdminComments] = useState("");

  const stats = {
    totalEmployees: employees.length,
    presentToday: attendance.filter(a => a.status === "present").length,
    pendingLeaves: leaveRequests.filter(req => req.status === "pending").length,
    activeProjects: jobAssignments.filter(job => job.status !== "completed").length
  };

  const leaveData = {
    used: employees.reduce((sum, emp) => sum + emp.usedLeaves, 0),
    pending: leaveRequests.filter(req => req.status === "pending").length,
    available: employees.reduce((sum, emp) => sum + (emp.totalLeaves - emp.usedLeaves), 0)
  };

  const handleLeaveAction = (leaveId, action, comments = "") => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: action, comments: comments }
          : leave
      )
    );
    setSelectedLeave(null);
    setAdminComments("");
  };

  const deleteAssignment = (assignmentId) => {
    setJobAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "overdue": return "bg-red-100 text-red-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "not-started": return "bg-gray-100 text-gray-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getDaysUntilDeadline = (dueDate) => {
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.presentToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
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

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Leave Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Used Leaves</span>
              <span className="text-sm font-medium text-gray-900">{leaveData.used}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(leaveData.used / (leaveData.used + leaveData.available)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Leaves</span>
              <span className="text-sm font-medium text-gray-900">{leaveData.pending}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available Leaves</span>
              <span className="text-sm font-medium text-gray-900">{leaveData.available}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(leaveData.available / (leaveData.used + leaveData.available)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Requests</h3>
          <div className="space-y-3">
            {leaveRequests.filter(leave => leave.status === "pending").map(leave => (
              <div key={leave.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{leave.employeeName}</p>
                    <p className="text-sm text-gray-600">{leave.leaveType} • {leave.days} days</p>
                    <p className="text-sm text-gray-500">{leave.startDate} to {leave.endDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLeaveAction(leave.id, "approved", "Approved by admin")}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLeaveAction(leave.id, "rejected", "Rejected by admin")}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{leave.reason}</p>
              </div>
            ))}
            {leaveRequests.filter(leave => leave.status === "pending").length === 0 && (
              <p className="text-gray-500 text-center py-4">No pending leave requests</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Job Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Job Assignments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobAssignments.slice(0, 5).map(assignment => {
                const daysLeft = getDaysUntilDeadline(assignment.dueDate);
                const isOverdue = daysLeft < 0 && assignment.status !== "completed";
                
                return (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                        <div className="text-sm text-gray-500">{assignment.description.substring(0, 50)}...</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.assigneeName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.dueDate}
                      {daysLeft > 0 && <div className="text-xs text-gray-500">{daysLeft} days left</div>}
                      {isOverdue && <div className="text-xs text-red-500">Overdue by {Math.abs(daysLeft)} days</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(isOverdue ? "overdue" : assignment.status)}`}>
                        {isOverdue ? "Overdue" : assignment.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => deleteAssignment(assignment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}