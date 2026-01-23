import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Search, Filter, Eye, Clock, User, FileText } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  age: number;
  gender: string;
  type: string;
  reason: string;
  status: 'Scheduled' | 'Confirmed';
}

export function AppointmentsUpcoming() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  const [appointments] = useState<Appointment[]>([
    {
      id: '6',
      date: '2026-01-21',
      time: '09:00',
      patientName: 'Sarah Williams',
      age: 35,
      gender: 'Female',
      type: 'New Patient',
      reason: 'Annual physical exam',
      status: 'Confirmed',
    },
    {
      id: '7',
      date: '2026-01-21',
      time: '10:00',
      patientName: 'Michael Brown',
      age: 52,
      gender: 'Male',
      type: 'Follow-up',
      reason: 'Hypertension follow-up',
      status: 'Scheduled',
    },
    {
      id: '8',
      date: '2026-01-22',
      time: '14:00',
      patientName: 'Emily Davis',
      age: 28,
      gender: 'Female',
      type: 'Urgent',
      reason: 'Persistent cough',
      status: 'Confirmed',
    },
    {
      id: '9',
      date: '2026-01-23',
      time: '11:00',
      patientName: 'James Martinez',
      age: 40,
      gender: 'Male',
      type: 'Follow-up',
      reason: 'Medication review',
      status: 'Scheduled',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Upcoming Appointments" role="doctor">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Appointments scheduled for future dates
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/doctor/appointments/today')}
              className="border border-gray-300 text-gray-700 px-4 h-10 rounded-lg hover:bg-gray-50"
            >
              Today's Schedule
            </button>
            <button
              onClick={() => navigate('/doctor/appointments/past')}
              className="border border-gray-300 text-gray-700 px-4 h-10 rounded-lg hover:bg-gray-50"
            >
              View Past
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/doctor/appointments/${apt.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {apt.time}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">
                          {apt.patientName}, {apt.age} yrs, {apt.gender}
                        </h3>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">{apt.type}</p>
                          <p>{apt.reason}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/appointments/${apt.id}`);
                      }}
                      className="text-sm text-gray-900 hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No upcoming appointments</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}