import { PieChart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExportPDFButton from "./ExportPDFButton";
import { mockLeaveBalances } from "../data/mockData";

const LeaveSummary = () => {
  const getColorClass = (color, type = 'bg') => {
    const colorMap = {
      blue: type === 'bg' ? 'bg-eil-blue' : 'text-eil-blue',
      green: type === 'bg' ? 'bg-green-600' : 'text-green-600',
      purple: type === 'bg' ? 'bg-purple-600' : 'text-purple-600',
      orange: type === 'bg' ? 'bg-orange-600' : 'text-orange-600'
    };
    return colorMap[color] || (type === 'bg' ? 'bg-gray-600' : 'text-gray-600');
  };

  const getPercentage = (available, total) => {
    return Math.round((available / total) * 100);
  };

  return (
    <Card className="bg-white shadow-md sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-900">
          <PieChart className="text-eil-blue text-xl mr-3" />
          Leave Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLeaveBalances.map(balance => {
            const percentage = getPercentage(balance.available, balance.total);
            
            return (
              <div key={balance.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{balance.label}</span>
                  <span className="text-sm text-eil-grey-dark">{balance.period}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className={`text-2xl font-bold ${getColorClass(balance.color, 'text')}`}>
                    {balance.available}
                  </div>
                  <div className="text-sm text-eil-grey-dark">
                    {balance.leaveType === 'maternity' || balance.leaveType === 'paternity' 
                      ? 'days available' 
                      : 'days remaining'
                    }
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`${getColorClass(balance.color)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <ExportPDFButton
              data={mockLeaveBalances}
              type="balance"
              filename="EIL_Leave_Balance.pdf"
              variant="outline"
            />
            <Button 
              variant="outline" 
              className="w-full text-sm text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Leave Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveSummary;
