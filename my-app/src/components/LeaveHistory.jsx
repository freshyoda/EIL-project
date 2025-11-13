import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ExportPDFButton from "./ExportPDFButton";
import { mockLeaveHistory } from "../data/mockData";

const LeaveHistory = () => {
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'default'; // green
      case 'pending':
        return 'secondary'; // yellow
      case 'rejected':
        return 'destructive'; // red
      default:
        return 'outline';
    }
  };

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <Card className="bg-white shadow-md mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
            <History className="text-eil-blue text-xl mr-3" />
            Leave History
          </CardTitle>
          <ExportPDFButton
            data={mockLeaveHistory}
            type="history"
            filename="EIL_Leave_History.pdf"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-eil-grey">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Leave Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Date Range
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Days
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Applied On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLeaveHistory.map(leave => (
                <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {leave.label}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatDateRange(leave.startDate, leave.endDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {leave.days}
                  </td>
                  <td className="px-4 py-4">
                    <Badge 
                      variant={getStatusVariant(leave.status)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(leave.status)}`}
                    >
                      {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatDate(leave.appliedOn)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveHistory;
