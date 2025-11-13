export const mockEmployee = {
  id: "EIL2024001",
  name: "John Doe"
};

export const mockLeaveBalances = [
  {
    id: "balance-1",
    leaveType: "paid",
    available: 18,
    total: 25,
    label: "Paid Leave",
    period: "Annual",
    color: "blue"
  },
  {
    id: "balance-2",
    leaveType: "sick",
    available: 10,
    total: 12,
    label: "Sick Leave",
    period: "Annual",
    color: "green"
  },
  {
    id: "balance-3",
    leaveType: "maternity",
    available: 180,
    total: 180,
    label: "Maternity Leave",
    period: "Lifetime",
    color: "purple"
  },
  {
    id: "balance-4",
    leaveType: "paternity",
    available: 15,
    total: 15,
    label: "Paternity Leave",
    period: "Lifetime",
    color: "orange"
  }
];

export const mockLeaveHistory = [
  {
    id: "request-1",
    leaveType: "paid",
    label: "Paid Leave",
    startDate: "2024-12-20",
    endDate: "2024-12-24",
    days: 5,
    status: "approved",
    appliedOn: "2024-12-15",
    reason: "Christmas vacation"
  },
  {
    id: "request-2",
    leaveType: "sick",
    label: "Sick Leave",
    startDate: "2024-11-10",
    endDate: "2024-11-12",
    days: 3,
    status: "pending",
    appliedOn: "2024-11-08",
    reason: "Medical treatment"
  },
  {
    id: "request-3",
    leaveType: "paid",
    label: "Paid Leave",
    startDate: "2024-10-05",
    endDate: "2024-10-07",
    days: 3,
    status: "rejected",
    appliedOn: "2024-10-01",
    reason: "Personal work"
  }
];

export const leaveTypeOptions = [
  { value: "paid", label: "Paid Leave" },
  { value: "unpaid", label: "Unpaid Leave" },
  { value: "maternity", label: "Maternity Leave" },
  { value: "paternity", label: "Paternity Leave" },
  { value: "sick", label: "Sick Leave" }
];
