export const initialEmployees = [
  {
    id: 1,
    name: "Rajesh Sharma",
    email: "rajesh.sharma@engineersindia.com",
    department: "Engineering",
    position: "Senior Engineer",
    joinDate: "2019-03-15",
    employeeId: "EMP-001",
    phone: "+91-9876543210",
    totalLeaves: 24,
    usedLeaves: 8,
    pendingLeaves: 2,
    status: "active"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@engineersindia.com",
    department: "Quality Assurance",
    position: "QA Manager",
    joinDate: "2020-07-22",
    employeeId: "EMP-002",
    phone: "+91-9876543211",
    totalLeaves: 24,
    usedLeaves: 12,
    pendingLeaves: 1,
    status: "active"
  },
  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun.kumar@engineersindia.com",
    department: "Project Management",
    position: "Project Manager",
    joinDate: "2018-11-10",
    employeeId: "EMP-003",
    phone: "+91-9876543212",
    totalLeaves: 24,
    usedLeaves: 5,
    pendingLeaves: 0,
    status: "active"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@engineersindia.com",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "2021-05-18",
    employeeId: "EMP-004",
    phone: "+91-9876543213",
    totalLeaves: 24,
    usedLeaves: 6,
    pendingLeaves: 1,
    status: "active"
  }
];

export const initialAttendance = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Rajesh Sharma",
    date: "2025-07-30",
    checkIn: "09:00",
    checkOut: "17:30",
    status: "present",
    hoursWorked: 8.5
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Priya Patel",
    date: "2025-07-30",
    checkIn: "08:45",
    checkOut: "17:15",
    status: "present",
    hoursWorked: 8.5
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Arjun Kumar",
    date: "2025-07-30",
    checkIn: null,
    checkOut: null,
    status: "absent",
    hoursWorked: 0
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: "Sneha Reddy",
    date: "2025-07-30",
    checkIn: "09:15",
    checkOut: "18:00",
    status: "present",
    hoursWorked: 8.75
  }
];

export const initialLeaveRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Rajesh Sharma",
    leaveType: "Annual Leave",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    days: 3,
    reason: "Family vacation",
    status: "pending",
    appliedDate: "2025-07-25",
    comments: ""
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Priya Patel",
    leaveType: "Sick Leave",
    startDate: "2025-08-05",
    endDate: "2025-08-06",
    days: 2,
    reason: "Medical checkup",
    status: "approved",
    appliedDate: "2025-07-20",
    comments: "Approved for medical reasons"
  },
  {
    id: 3,
    employeeId: 4,
    employeeName: "Sneha Reddy",
    leaveType: "Personal Leave",
    startDate: "2025-08-20",
    endDate: "2025-08-22",
    days: 3,
    reason: "Personal work",
    status: "pending",
    appliedDate: "2025-07-28",
    comments: ""
  },
  {
    id: 4,
    employeeId: 3,
    employeeName: "Arjun Kumar",
    leaveType: "Annual Leave",
    startDate: "2025-08-25",
    endDate: "2025-08-26",
    days: 2,
    reason: "Family function",
    status: "pending",
    appliedDate: "2025-08-01",
    comments: ""
  },
  {
    id: 5,
    employeeId: 1,
    employeeName: "Rajesh Sharma",
    leaveType: "Sick Leave",
    startDate: "2025-09-02",
    endDate: "2025-09-03",
    days: 2,
    reason: "Dental appointment",
    status: "pending",
    appliedDate: "2025-08-03",
    comments: ""
  },
  {
    id: 6,
    employeeId: 2,
    employeeName: "Priya Patel",
    leaveType: "Personal Leave",
    startDate: "2025-08-28",
    endDate: "2025-08-29",
    days: 2,
    reason: "Personal emergency",
    status: "pending",
    appliedDate: "2025-08-04",
    comments: ""
  }
];

export const initialJobAssignments = [
  {
    id: 1,
    title: "Refinery Equipment Inspection",
    description: "Conduct comprehensive inspection of refinery equipment for Q3 maintenance schedule",
    assigneeId: 1,
    assigneeName: "Rajesh Sharma",
    priority: "High",
    dueDate: "2025-08-15",
    status: "in-progress",
    assignedDate: "2025-07-20"
  },
  {
    id: 2,
    title: "Quality Assurance Report",
    description: "Prepare monthly QA report for petrochemical processes",
    assigneeId: 2,
    assigneeName: "Priya Patel",
    priority: "Medium",
    dueDate: "2025-08-10",
    status: "not-started",
    assignedDate: "2025-07-25"
  },
  {
    id: 3,
    title: "Project Timeline Review",
    description: "Review and update project timelines for ongoing refinery expansion",
    assigneeId: 3,
    assigneeName: "Arjun Kumar",
    priority: "High",
    dueDate: "2025-08-05",
    status: "completed",
    assignedDate: "2025-07-15"
  },
  {
    id: 4,
    title: "Budget Analysis",
    description: "Analyze Q3 budget allocation for engineering projects",
    assigneeId: 4,
    assigneeName: "Sneha Reddy",
    priority: "Medium",
    dueDate: "2025-08-20",
    status: "not-started",
    assignedDate: "2025-07-28"
  }
];

export const initialCalendarEvents = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2025-08-01",
    type: "meeting",
    description: "Monthly team sync"
  },
  {
    id: 2,
    title: "Project Deadline",
    date: "2025-08-05",
    type: "deadline",
    description: "Project Timeline Review due"
  },
  {
    id: 3,
    title: "Annual Leave - Rajesh",
    date: "2025-08-15",
    type: "leave",
    description: "Rajesh Sharma on vacation"
  }
];