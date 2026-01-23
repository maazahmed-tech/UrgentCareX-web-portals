import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, Award, Star } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';

interface DoctorDetail {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  bio: string;
  facility: string;
  location: string;
  status: 'active' | 'inactive';
  subscription: {
    plan: 'Trial' | 'Monthly' | 'Annual';
    startDate: string;
    renewalDate: string;
    amount: string;
  };
  credentials: Array<{
    type: string;
    number: string;
    issueDate: string;
    expiryDate: string;
  }>;
  stats: {
    patientsSeen: number;
    totalAppointments: number;
    avgRating: number;
    totalReviews: number;
  };
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  recentReviews: Array<{
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

// Mock data
const mockDoctorDetails: Record<string, DoctorDetail> = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    email: 'sjohnson@downtownmed.com',
    phone: '(212) 555-0199',
    bio: 'Board-certified family medicine physician with over 10 years of experience. Specialized in preventive care, chronic disease management, and patient education.',
    facility: 'Downtown Medical Center',
    location: 'New York, NY',
    status: 'active',
    subscription: {
      plan: 'Annual',
      startDate: '2025-06-20',
      renewalDate: '2026-06-20',
      amount: '$599/year',
    },
    credentials: [
      {
        type: 'Medical License',
        number: 'NY-12345678',
        issueDate: '2015-03-15',
        expiryDate: '2026-03-15',
      },
      {
        type: 'NPI Number',
        number: '1234567890',
        issueDate: '2015-03-20',
        expiryDate: 'N/A',
      },
      {
        type: 'Board Certification',
        number: 'ABFM-987654',
        issueDate: '2015-06-10',
        expiryDate: '2025-06-10',
      },
    ],
    stats: {
      patientsSeen: 342,
      totalAppointments: 389,
      avgRating: 4.8,
      totalReviews: 156,
    },
    availability: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 3:00 PM',
      saturday: 'Not Available',
      sunday: 'Not Available',
    },
    recentReviews: [
      {
        id: '1',
        patientName: 'John D.',
        rating: 5,
        comment: 'Dr. Johnson is fantastic! Very thorough and takes time to explain everything.',
        date: '2026-01-18',
      },
      {
        id: '2',
        patientName: 'Mary S.',
        rating: 5,
        comment: 'Great experience. Professional and caring.',
        date: '2026-01-15',
      },
      {
        id: '3',
        patientName: 'Robert T.',
        rating: 4,
        comment: 'Very knowledgeable doctor. Would recommend.',
        date: '2026-01-12',
      },
    ],
  },
};

export function DoctorDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = id ? mockDoctorDetails[id] : null;

  useEffect(() => {
    if (!doctor) {
      navigate('/admin/doctors');
    }
  }, [doctor, navigate]);

  if (!doctor) return null;

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <DashboardLayout title="Doctor Details" role="admin">
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/admin/doctors')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </Button>

        {/* Header Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
              <p className="text-lg text-gray-600 mt-1">{doctor.specialty}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {doctor.facility}, {doctor.location}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
                doctor.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
            </span>
          </div>

          {/* Bio */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">About</h3>
            <p className="text-gray-900">{doctor.bio}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Patients Seen</p>
            <p className="text-3xl font-bold mt-1">{doctor.stats.patientsSeen}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Total Appointments</p>
            <p className="text-3xl font-bold mt-1">{doctor.stats.totalAppointments}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Average Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-3xl font-bold">{doctor.stats.avgRating}</p>
              <span className="text-yellow-500 text-2xl">★</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Total Reviews</p>
            <p className="text-3xl font-bold mt-1">{doctor.stats.totalReviews}</p>
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
                    doctor.subscription.plan
                  )} mt-1`}
                >
                  {doctor.subscription.plan}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-sm font-medium text-gray-900">{doctor.subscription.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(doctor.subscription.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Renewal Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(doctor.subscription.renewalDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Availability</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(doctor.availability).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{day}</span>
                  <span className="font-medium text-gray-900">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Credentials & Licenses</h3>
          </div>
          <div className="space-y-4">
            {doctor.credentials.map((credential, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{credential.type}</p>
                    <p className="text-sm text-gray-600 mt-1">Number: {credential.number}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Issued: {new Date(credential.issueDate).toLocaleDateString()}</span>
                      <span>
                        Expires:{' '}
                        {credential.expiryDate === 'N/A'
                          ? 'N/A'
                          : new Date(credential.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Valid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Recent Reviews</h3>
          </div>
          <div className="space-y-4">
            {doctor.recentReviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{review.patientName}</p>
                    <div className="flex items-center gap-1 mt-1">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}