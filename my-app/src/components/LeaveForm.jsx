import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { mockEmployee, leaveTypeOptions } from "../data/mockData";

const LeaveForm = ({ onSubmitSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeName: mockEmployee.name,
    employeeId: mockEmployee.id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { employeeName, employeeId, leaveType, startDate, endDate, reason } = formData;
    
    if (!employeeName || !employeeId || !leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      toast({
        title: "Validation Error",
        description: "Start date cannot be in the past.",
        variant: "destructive"
      });
      return false;
    }

    if (end < start) {
      toast({
        title: "Validation Error",
        description: "End date cannot be before start date.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const days = calculateDays(formData.startDate, formData.endDate);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success!",
        description: "Your leave request has been submitted successfully. You will receive a confirmation email shortly."
      });

      // Reset form
      setFormData({
        employeeName: mockEmployee.name,
        employeeId: mockEmployee.id,
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
      });

      // Notify parent component
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit leave request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      employeeName: mockEmployee.name,
      employeeId: mockEmployee.id,
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: ""
    });
  };

  // Set minimum date for date inputs
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
          <CalendarPlus className="text-eil-blue text-xl mr-3" />
          Submit Leave Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="employeeName" className="text-sm font-medium text-gray-700 mb-2">
                Employee Name *
              </Label>
              <Input
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eil-blue focus:border-eil-blue"
                required
              />
            </div>

            <div>
              <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700 mb-2">
                Employee ID *
              </Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eil-blue focus:border-eil-blue"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="leaveType" className="text-sm font-medium text-gray-700 mb-2">
              Leave Type *
            </Label>
            <Select
              value={formData.leaveType}
              onValueChange={(value) => handleInputChange('leaveType', value)}
            >
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eil-blue focus:border-eil-blue">
                <SelectValue placeholder="Select Leave Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {leaveTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="date"
                min={today}
                value={formData.startDate}
                onChange={(e) => {
                  handleInputChange('startDate', e.target.value);
                  // Update end date minimum when start date changes
                  if (formData.endDate && e.target.value > formData.endDate) {
                    handleInputChange('endDate', '');
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eil-blue focus:border-eil-blue"
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2">
                End Date *
              </Label>
              <Input
                id="endDate"
                type="date"
                min={formData.startDate || today}
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eil-blue focus:border-eil-blue"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reason" className="text-sm font-medium text-gray-700 mb-2">
              Reason for Leave *
            </Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              rows={4}
              placeholder="Please provide a detailed reason for your leave request..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eil-blue focus:border-eil-blue resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-eil-blue text-white hover:bg-eil-blue-light flex items-center space-x-2"
            >
              <CalendarPlus className="h-4 w-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveForm;
