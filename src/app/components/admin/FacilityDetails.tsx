import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Calendar, CreditCard } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';

interface FacilityDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: 'active' | 'inactive';
  subscription: {
    plan: 'Trial' | 'Monthly' | 'Annual';
    startDate: string;
    renewalDate: string;
    amount: string;
  };
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  doctors: Array<{
    id: string;
    name: string;
    specialty: string;
    email: string;
  }>;
  stats: {
    totalAppointments: number;
    avgWaitTime: string;
    patientsSeen: number;
  };
}

// Mock data
const mockFacilityDetails: Record<string, FacilityDetail> = {
  '1': {
    id: '1',
    name: 'Downtown Medical Center',
    email: 'contact@downtownmed.com',
    phone: '(212) 555-0123',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    status: 'active',
    subscription: {
      plan: 'Annual',
      startDate: '2025-06-15',
      renewalDate: '2026-06-15',
      amount: '$999/year',
    },
    operatingHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '10:00 AM - 4:00 PM',
    },
    services: ['General Medicine', 'Pediatrics', 'X-Ray', 'Lab Tests', 'Vaccinations', 'Minor Surgery'],
    doctors: [
      { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Family Medicine', email: 'sjohnson@downtownmed.com' },
      { id: '2', name: 'Dr. Michael Chen', specialty: 'Pediatrics', email: 'mchen@downtownmed.com' },
      { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Internal Medicine', email: 'erodriguez@downtownmed.com' },
    ],
    stats: {
      totalAppointments: 1247,
      avgWaitTime: '15 min',
      patientsSeen: 892,
    },
  },
};

export function FacilityDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const facility = id ? mockFacilityDetails[id] : null;

  useEffect(() => {
    if (!facility) {
      navigate('/admin/facilities');
    }
  }, [facility, navigate]);

  if (!facility) return null;

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'Trial':
        return 'bg-yellow-500';
      case 'Monthly':
        return 'bg-gray-900';
      case 'Annual':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Facility Details" role="admin">
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/facilities')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Facilities
        </Button>

        {/* Header Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{facility.name}</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {facility.address}, {facility.city}, {facility.state} {facility.zip}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{facility.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{facility.phone}</span>
                </div>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
                facility.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Total Appointments</p>
            <p className="text-3xl font-bold mt-1">{facility.stats.totalAppointments}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Avg Wait Time</p>
            <p className="text-3xl font-bold mt-1">{facility.stats.avgWaitTime}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Patients Seen</p>
            <p className="text-3xl font-bold mt-1">{facility.stats.patientsSeen}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Subscription</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getSubscriptionColor(
                    facility.subscription.plan
                  )} mt-1`}
                >
                  {facility.subscription.plan}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-sm font-medium text-gray-900">{facility.subscription.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(facility.subscription.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Renewal Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(facility.subscription.renewalDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Operating Hours</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(facility.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{day}</span>
                  <span className="font-medium text-gray-900">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
          <div className="flex flex-wrap gap-2">
            {facility.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-gray-100 text-gray-900 text-sm rounded-lg"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Doctors ({facility.doctors.length})</h3>
          <div className="space-y-3">
            {facility.doctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/admin/doctors/${doctor.id}`)}
                >
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}