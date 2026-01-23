import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, User, Phone, MapPin, FileText, Eye } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

interface Appointment {
  id: string;
  time: string;
  patientName: string;
  age: number;
  gender: string;
  type: string;
  reason: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

export function AppointmentsToday() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      time: '09:00',
      patientName: 'John Smith',
      age: 45,
      gender: 'Male',
      type: 'Follow-up',
      reason: 'Blood pressure check',
      status: 'Completed',
    },
    {
      id: '2',
      time: '09:30',
      patientName: 'Mary Wilson',
      age: 32,
      gender: 'Female',
      type: 'New Patient',
      reason: 'General checkup',
      status: 'In Progress',
    },
    {
      id: '3',
      time: '10:00',
      patientName: 'Bob Johnson',
      age: 58,
      gender: 'Male',
      type: 'Follow-up',
      reason: 'Diabetes management',
      status: 'Scheduled',
    },
    {
      id: '4',
      time: '10:30',
      patientName: 'Lisa Park',
      age: 28,
      gender: 'Female',
      type: 'Urgent',
      reason: 'Flu symptoms',
      status: 'Scheduled',
    },
    {
      id: '5',
      time: '11:00',
      patientName: 'David Chen',
      age: 42,
      gender: 'Male',
      type: 'Follow-up',
      reason: 'Lab results review',
      status: 'Scheduled',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Today's Appointments" role="doctor">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/doctor/appointments/upcoming')}
              className="border border-gray-300 text-gray-700 px-4 h-10 rounded-lg hover:bg-gray-50"
            >
              View Upcoming
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
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No appointments scheduled for today</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}