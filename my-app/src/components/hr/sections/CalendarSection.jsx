import { useState } from 'react';
import { Calendar, Clock, Users, Briefcase } from "lucide-react";
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { initialCalendarEvents, initialLeaveRequests, initialJobAssignments } from '../../../data/hrData';

export default function CalendarSection() {
  
  const [events] = useLocalStorage("calendarEvents", initialCalendarEvents);
  const [leaveRequests] = useLocalStorage("leaveRequests", initialLeaveRequests);
  const [jobAssignments] = useLocalStorage("jobAssignments", initialJobAssignments);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Combine all events
  const allEvents = [
    ...events.map(event => ({ ...event, category: 'event' })),
    ...leaveRequests
      .filter(leave => leave.status === 'approved')
      .map(leave => ({
        id: `leave-${leave.id}`,
        title: `Leave - ${leave.employeeName}`,
        date: leave.startDate,
        type: 'leave',
        category: 'leave',
        description: `${leave.leaveType} - ${leave.days} days`
      })),
    ...jobAssignments
      .filter(assignment => assignment.status !== 'completed')
      .map(assignment => ({
        id: `assignment-${assignment.id}`,
        title: `Deadline - ${assignment.title}`,
        date: assignment.dueDate,
        type: 'deadline',
        category: 'assignment',
        description: `Assigned to ${assignment.assigneeName}`
      }))
  ];

  const todayEvents = allEvents.filter(event => event.date === selectedDate);

  const getEventColor = (category, type) => {
    if (category === 'event') {
      switch (type) {
        case 'meeting': return 'bg-blue-100 text-blue-800';
        case 'deadline': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    if (category === 'leave') return 'bg-green-100 text-green-800';
    if (category === 'assignment') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getEventIcon = (category, type) => {
    if (category === 'event' && type === 'meeting') return Users;
    if (category === 'leave') return Calendar;
    if (category === 'assignment' || type === 'deadline') return Briefcase;
    return Clock;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Calendar</h2>
            <p className="text-gray-600">View events, deadlines, and leave schedules</p>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Event Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{allEvents.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meetings</p>
              <p className="text-2xl font-bold text-gray-900">
                {allEvents.filter(e => e.type === 'meeting').length}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deadlines</p>
              <p className="text-2xl font-bold text-gray-900">
                {allEvents.filter(e => e.type === 'deadline').length}
              </p>
            </div>
            <Briefcase className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leave Days</p>
              <p className="text-2xl font-bold text-gray-900">
                {allEvents.filter(e => e.category === 'leave').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Today's Events */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Events for {selectedDate}
        </h3>
        <div className="space-y-4">
          {todayEvents.length > 0 ? (
            todayEvents.map(event => {
              const IconComponent = getEventIcon(event.category, event.type);
              return (
                <div key={event.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventColor(event.category, event.type)}`}>
                        {event.type || event.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events for this date</h3>
              <p className="text-gray-600">Select a different date to view events</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {allEvents
            .filter(event => new Date(event.date) > new Date(selectedDate))
            .slice(0, 5)
            .map(event => {
              const IconComponent = getEventIcon(event.category, event.type);
              return (
                <div key={event.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{event.date}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventColor(event.category, event.type)}`}>
                          {event.type || event.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}