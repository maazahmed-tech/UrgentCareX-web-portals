import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Filter } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { getCurrentUser } from '@/lib/auth';

interface Appointment {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  patientName: string;
  age: number;
  gender: string;
  doctorName: string;
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export function FacilityAppointmentsCalendar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'facility') {
      navigate('/facility');
      return;
    }
    // Check if facility accepts appointments
    const acceptsAppointments = localStorage.getItem('facilityAcceptsAppointments');
    if (acceptsAppointments === 'false') {
      navigate('/facility/dashboard');
    }
  }, [user, navigate]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState(new Date()); // For mobile day view

  // Mock appointments data for facility
  const appointments: Appointment[] = [
    // January 20 (Monday)
    {
      id: '1',
      date: '2026-01-20',
      startTime: '09:00',
      endTime: '09:30',
      patientName: 'John Smith',
      age: 45,
      gender: 'Male',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Completed',
    },
    {
      id: '2',
      date: '2026-01-20',
      startTime: '09:30',
      endTime: '10:00',
      patientName: 'Mary Wilson',
      age: 32,
      gender: 'Female',
      doctorName: 'Dr. Michael Chen',
      status: 'Completed',
    },
    {
      id: '3',
      date: '2026-01-20',
      startTime: '10:00',
      endTime: '10:30',
      patientName: 'Bob Johnson',
      age: 58,
      gender: 'Male',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Completed',
    },
    // January 21 (Tuesday)
    {
      id: '4',
      date: '2026-01-21',
      startTime: '10:30',
      endTime: '11:00',
      patientName: 'Lisa Park',
      age: 28,
      gender: 'Female',
      doctorName: 'Dr. Emily Davis',
      status: 'Cancelled',
    },
    {
      id: '5',
      date: '2026-01-21',
      startTime: '14:00',
      endTime: '14:30',
      patientName: 'David Chen',
      age: 42,
      gender: 'Male',
      doctorName: 'Dr. Michael Chen',
      status: 'Pending Confirmation',
    },
    // January 22 (Wednesday) - TODAY
    {
      id: '6',
      date: '2026-01-22',
      startTime: '09:00',
      endTime: '09:30',
      patientName: 'Sarah Anderson',
      age: 35,
      gender: 'Female',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Confirmed',
    },
    {
      id: '7',
      date: '2026-01-22',
      startTime: '11:00',
      endTime: '11:30',
      patientName: 'Michael Brown',
      age: 50,
      gender: 'Male',
      doctorName: 'Dr. Emily Davis',
      status: 'Pending Confirmation',
    },
    {
      id: '7a',
      date: '2026-01-22',
      startTime: '15:30',
      endTime: '16:00',
      patientName: 'Grace Thompson',
      age: 27,
      gender: 'Female',
      doctorName: 'Dr. Michael Chen',
      status: 'Confirmed',
    },
    // January 23 (Thursday)
    {
      id: '8',
      date: '2026-01-23',
      startTime: '15:00',
      endTime: '15:30',
      patientName: 'Emily Davis',
      age: 29,
      gender: 'Female',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Confirmed',
    },
    {
      id: '9',
      date: '2026-01-23',
      startTime: '16:00',
      endTime: '16:30',
      patientName: 'Robert Martinez',
      age: 55,
      gender: 'Male',
      doctorName: 'Dr. Emily Davis',
      status: 'Confirmed',
    },
    // January 24 (Friday)
    {
      id: '10',
      date: '2026-01-24',
      startTime: '10:00',
      endTime: '10:30',
      patientName: 'James Wilson',
      age: 62,
      gender: 'Male',
      doctorName: 'Dr. Michael Chen',
      status: 'Confirmed',
    },
    {
      id: '11',
      date: '2026-01-24',
      startTime: '13:00',
      endTime: '13:30',
      patientName: 'Patricia Taylor',
      age: 41,
      gender: 'Female',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Pending Confirmation',
    },
    // January 25 (Saturday)
    {
      id: '12',
      date: '2026-01-25',
      startTime: '09:00',
      endTime: '09:30',
      patientName: 'Christopher Lee',
      age: 37,
      gender: 'Male',
      doctorName: 'Dr. Emily Davis',
      status: 'Confirmed',
    },
    {
      id: '12a',
      date: '2026-01-25',
      startTime: '11:00',
      endTime: '11:30',
      patientName: 'Sophia Rodriguez',
      age: 24,
      gender: 'Female',
      doctorName: 'Dr. Michael Chen',
      status: 'Confirmed',
    },
    // January 26 (Sunday)
    {
      id: '13',
      date: '2026-01-26',
      startTime: '10:00',
      endTime: '10:30',
      patientName: 'Jennifer White',
      age: 33,
      gender: 'Female',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Confirmed',
    },
    // January 27 (Monday - Week 2)
    {
      id: '14',
      date: '2026-01-27',
      startTime: '08:00',
      endTime: '08:30',
      patientName: 'Daniel Harris',
      age: 48,
      gender: 'Male',
      doctorName: 'Dr. Emily Davis',
      status: 'Confirmed',
    },
    {
      id: '15',
      date: '2026-01-27',
      startTime: '14:00',
      endTime: '14:30',
      patientName: 'Nancy Clark',
      age: 52,
      gender: 'Female',
      doctorName: 'Dr. Michael Chen',
      status: 'Pending Confirmation',
    },
    // January 28 (Tuesday)
    {
      id: '16',
      date: '2026-01-28',
      startTime: '09:00',
      endTime: '09:30',
      patientName: 'Kevin Lewis',
      age: 39,
      gender: 'Male',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Confirmed',
    },
    {
      id: '17',
      date: '2026-01-28',
      startTime: '11:30',
      endTime: '12:00',
      patientName: 'Amanda Walker',
      age: 26,
      gender: 'Female',
      doctorName: 'Dr. Emily Davis',
      status: 'Confirmed',
    },
    // January 29 (Wednesday)
    {
      id: '18',
      date: '2026-01-29',
      startTime: '10:00',
      endTime: '10:30',
      patientName: 'Steven Hall',
      age: 44,
      gender: 'Male',
      doctorName: 'Dr. Michael Chen',
      status: 'Pending Confirmation',
    },
    {
      id: '19',
      date: '2026-01-29',
      startTime: '15:00',
      endTime: '15:30',
      patientName: 'Michelle Young',
      age: 31,
      gender: 'Female',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Confirmed',
    },
    // January 30 (Thursday)
    {
      id: '20',
      date: '2026-01-30',
      startTime: '09:30',
      endTime: '10:00',
      patientName: 'Brian King',
      age: 56,
      gender: 'Male',
      doctorName: 'Dr. Emily Davis',
      status: 'Confirmed',
    },
    {
      id: '21',
      date: '2026-01-30',
      startTime: '13:00',
      endTime: '13:30',
      patientName: 'Karen Wright',
      age: 47,
      gender: 'Female',
      doctorName: 'Dr. Michael Chen',
      status: 'Confirmed',
    },
    // January 31 (Friday)
    {
      id: '22',
      date: '2026-01-31',
      startTime: '08:30',
      endTime: '09:00',
      patientName: 'Richard Lopez',
      age: 59,
      gender: 'Male',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Pending Confirmation',
    },
    {
      id: '23',
      date: '2026-01-31',
      startTime: '14:30',
      endTime: '15:00',
      patientName: 'Barbara Hill',
      age: 38,
      gender: 'Female',
      doctorName: 'Dr. Emily Davis',
      status: 'Confirmed',
    },
    // February 1 (Saturday)
    {
      id: '24',
      date: '2026-02-01',
      startTime: '10:00',
      endTime: '10:30',
      patientName: 'Thomas Scott',
      age: 43,
      gender: 'Male',
      doctorName: 'Dr. Michael Chen',
      status: 'Confirmed',
    },
    // February 2 (Sunday)
    {
      id: '25',
      date: '2026-02-02',
      startTime: '09:00',
      endTime: '09:30',
      patientName: 'Elizabeth Green',
      age: 36,
      gender: 'Female',
      doctorName: 'Dr. Sarah Johnson',
      status: 'Confirmed',
    },
  ];

  // Get week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(new Date());
  };

  // Mobile day navigation
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDay);
    newDate.setDate(selectedDay.getDate() - 1);
    setSelectedDay(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDay);
    newDate.setDate(selectedDay.getDate() + 1);
    setSelectedDay(newDate);
  };

  // Format date string
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return appointments
      .filter((apt) => apt.date === dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Confirmation':
        return 'bg-[#6B7280] border-[#6B7280]';
      case 'Confirmed':
        return 'bg-[#3B82F6] border-[#2563EB]';
      case 'Completed':
        return 'bg-[#10B981] border-[#059669]';
      case 'Cancelled':
        return 'bg-[#EF4444] border-[#DC2626]';
      default:
        return 'bg-[#6B7280] border-[#6B7280]';
    }
  };

  // Time slots for the calendar (8 AM to 6 PM)
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <DashboardLayout title="Appointments Calendar" role="facility">
      <div className="space-y-4 md:space-y-6">
        {/* Desktop Header with Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Explore
              </button>
              <button
                onClick={goToNextWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="Pending Confirmation">Pending Confirmation</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Header - Stacked Layout */}
        <div className="md:hidden space-y-3">
          {/* Date Navigation */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={viewMode === 'week' ? goToPreviousDay : goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200"
            >
              Explore
            </button>
            <button
              onClick={viewMode === 'week' ? goToNextDay : goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Date Display */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {viewMode === 'week'
                ? selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : `Week of ${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              }
            </h2>
            {viewMode === 'week' && (
              <p className="text-sm text-gray-600 mt-1">
                {getAppointmentsForDate(selectedDay).length} appointment{getAppointmentsForDate(selectedDay).length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Filter and View Toggle */}
          <div className="flex items-center gap-2">
            {/* Filter */}
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="Pending Confirmation">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Week View */}
        {viewMode === 'week' && (
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Week Header */}
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-4 text-xs font-medium text-gray-600 uppercase tracking-wider bg-gray-50">
                Time
              </div>
              {weekDates.map((date, index) => (
                <div
                  key={index}
                  className={`p-4 text-center border-l border-gray-200 ${
                    isToday(date) ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div
                    className={`mt-1 text-lg font-semibold ${
                      isToday(date) ? 'text-blue-600' : 'text-gray-900'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="overflow-y-auto max-h-[600px]">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
                  {/* Time Label */}
                  <div className="p-3 text-xs font-medium text-gray-500 bg-gray-50 border-r border-gray-200">
                    {time}
                  </div>

                  {/* Day Columns */}
                  {weekDates.map((date, dayIndex) => {
                    const dayAppointments = getAppointmentsForDate(date).filter((apt) => {
                      const aptTime = apt.startTime;
                      return aptTime >= time && aptTime < timeSlots[timeIndex + 1];
                    });

                    return (
                      <div
                        key={dayIndex}
                        className={`p-2 border-l border-gray-200 ${
                          isToday(date) ? 'bg-blue-50/30' : ''
                        } hover:bg-gray-50 transition-colors`}
                      >
                        {dayAppointments.map((apt) => (
                          <button
                            key={apt.id}
                            onClick={() => navigate(`/facility/appointments/${apt.id}`)}
                            onMouseEnter={() => setSelectedAppointment(apt)}
                            onMouseLeave={() => setSelectedAppointment(null)}
                            className={`w-full text-left p-2 rounded-lg border-l-4 ${getStatusColor(
                              apt.status
                            )} hover:shadow-md transition-all mb-1`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate">
                                  {apt.startTime} - {apt.endTime}
                                </p>
                                <p className="text-xs font-medium truncate mt-0.5">{apt.patientName}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Day View */}
        {viewMode === 'week' && (
          <div className="md:hidden bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Day Header */}
            <div className={`px-4 py-3 border-b border-gray-200 ${isToday(selectedDay) ? 'bg-blue-50' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${isToday(selectedDay) ? 'text-blue-900' : 'text-gray-900'}`}>
                    {selectedDay.toLocaleDateString('en-US', { weekday: 'long' })}
                  </h3>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {selectedDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                {isToday(selectedDay) && (
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Today
                  </span>
                )}
              </div>
            </div>

            {/* Time Slots */}
            <div className="divide-y divide-gray-200">
              {timeSlots.map((time, timeIndex) => {
                const dayAppointments = getAppointmentsForDate(selectedDay).filter((apt) => {
                  const aptTime = apt.startTime;
                  return aptTime >= time && aptTime < timeSlots[timeIndex + 1];
                });

                return (
                  <div key={time} className="flex min-h-[72px]">
                    {/* Time Label */}
                    <div className="w-20 flex-shrink-0 p-3 bg-gray-50 border-r border-gray-200">
                      <p className="text-sm font-medium text-gray-600">{time}</p>
                    </div>

                    {/* Appointments */}
                    <div className="flex-1 p-3">
                      {dayAppointments.length > 0 ? (
                        <div className="space-y-2">
                          {dayAppointments.map((apt) => (
                            <button
                              key={apt.id}
                              onClick={() => navigate(`/facility/appointments/${apt.id}`)}
                              className={`w-full text-left p-3 rounded-lg border-l-4 ${getStatusColor(
                                apt.status
                              )} active:opacity-70 transition-all`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    {apt.patientName}
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {apt.startTime} - {apt.endTime}
                                  </p>
                                </div>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(
                                    apt.status
                                  )} whitespace-nowrap`}
                                >
                                  {apt.status === 'Pending Confirmation' ? 'Pending' : apt.status}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 py-2">No appointments</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {(() => {
              // Get all appointments for the current week, grouped by day
              const weekAppointments = weekDates.map(date => ({
                date: date,
                appointments: getAppointmentsForDate(date)
                  .filter(apt => filterStatus === 'all' || apt.status === filterStatus)
              })).filter(day => day.appointments.length > 0);

              if (weekAppointments.length === 0) {
                return (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <p className="text-gray-500">No appointments scheduled for this week</p>
                  </div>
                );
              }

              return weekAppointments.map(({ date, appointments }) => (
                <div key={formatDate(date)} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className={`px-4 md:px-6 py-3 border-b border-gray-200 ${isToday(date) ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold text-sm md:text-base ${isToday(date) ? 'text-blue-900' : 'text-gray-900'}`}>
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      {isToday(date) && <span className="ml-2 text-sm font-normal text-blue-600">(Today)</span>}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {appointments.map((apt) => (
                      <button
                        key={apt.id}
                        onClick={() => navigate(`/facility/appointments/${apt.id}`)}
                        className="w-full p-4 md:p-6 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                      >
                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center gap-2 min-w-[80px]">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">
                                {apt.startTime}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold text-gray-900">
                                  {apt.patientName}, {apt.age} yrs
                                </h4>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                    apt.status
                                  )}`}
                                >
                                  {apt.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-900 hover:underline whitespace-nowrap">
                            View Details
                          </span>
                        </div>

                        {/* Mobile Layout */}
                        <div className="md:hidden space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {apt.patientName}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {apt.age} yrs, {apt.gender}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(
                                apt.status
                              )} whitespace-nowrap`}
                            >
                              {apt.status === 'Pending Confirmation' ? 'Pending' : apt.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{apt.startTime} - {apt.endTime}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}

        {/* Floating Appointment Detail Preview - Desktop Only */}
        {selectedAppointment && viewMode === 'week' && (
          <div className="hidden md:block fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{selectedAppointment.patientName}</h3>
                <p className="text-sm text-gray-600">
                  {selectedAppointment.age} yrs, {selectedAppointment.gender}
                </p>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                x
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {selectedAppointment.startTime} - {selectedAppointment.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                    selectedAppointment.status
                  )}`}
                >
                  {selectedAppointment.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/facility/appointments/${selectedAppointment.id}`)}
              className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              View Full Details
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
