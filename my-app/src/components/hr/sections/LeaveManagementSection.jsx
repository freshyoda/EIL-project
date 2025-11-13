import { useState } from 'react';
import { Calendar, Check, X, Clock, FileText } from "lucide-react";
import { useLocalStorage } from '../useLocalStorage';
import { initialLeaveRequests } from '../../../data/hrData';

export default function LeaveManagementSection() {
  const [leaveRequests, setLeaveRequests] = useLocalStorage("leaveRequests", initialLeaveRequests);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [adminComments, setAdminComments] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(req => req.status === "pending").length,
    approved: leaveRequests.filter(req => req.status === "approved").length,
    rejected: leaveRequests.filter(req => req.status === "rejected").length
  };

  const filteredRequests = leaveRequests.filter(request => {
    return statusFilter === "all" || request.status === statusFilter;
  });

  const handleLeaveAction = (leaveId, action, comments = "") => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: action, comments: comments, reviewedDate: new Date().toISOString().split('T')[0] }
          : leave
      )
    );
    setSelectedLeave(null);
    setAdminComments("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal Leave': return 'bg-purple-100 text-purple-800';
      case 'Emergency Leave': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Leave Management</h2>
            <p className="text-gray-600">Review and manage employee leave requests</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRequests.map(request => (
          <div key={request.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.employeeName}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                        {request.leaveType}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <div>
                      <div className="font-medium">Start Date</div>
                      <div>{request.startDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <div>
                      <div className="font-medium">End Date</div>
                      <div>{request.endDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div>{request.days} day{request.days > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Reason:</div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.reason}</div>
                </div>

                <div className="text-xs text-gray-500">
                  Applied on: {request.appliedDate}
                </div>

                {request.comments && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 mb-1">Admin Comments:</div>
                    <div className="text-sm text-blue-800">{request.comments}</div>
                  </div>
                )}
              </div>

              {request.status === "pending" && (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 ml-0 md:ml-6">
                  <button
                    onClick={() => setSelectedLeave(request)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleLeaveAction(request.id, "approved", "Approved by admin")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleLeaveAction(request.id, "rejected", "Rejected by admin")}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
            <p className="text-gray-600">
              {statusFilter === "all" 
                ? "There are no leave requests to display." 
                : `There are no ${statusFilter} leave requests.`}
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Leave Request</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-sm font-medium text-gray-700">Employee:</div>
                <div className="text-sm text-gray-900">{selectedLeave.employeeName}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Leave Type:</div>
                <div className="text-sm text-gray-900">{selectedLeave.leaveType}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Duration:</div>
                <div className="text-sm text-gray-900">{selectedLeave.startDate} to {selectedLeave.endDate} ({selectedLeave.days} days)</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Reason:</div>
                <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLeave.reason}</div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Comments:
              </label>
              <textarea
                value={adminComments}
                onChange={(e) => setAdminComments(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Add your comments here..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleLeaveAction(selectedLeave.id, "approved", adminComments || "Approved by admin")}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve
              </button>
              <button
                onClick={() => handleLeaveAction(selectedLeave.id, "rejected", adminComments || "Rejected by admin")}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </button>
            </div>
            
            <button
              onClick={() => {
                setSelectedLeave(null);
                setAdminComments("");
              }}
              className="w-full mt-3 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}