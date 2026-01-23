import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Mail, Phone, MapPin, CreditCard, AlertTriangle, CheckCircle, Eye, ThumbsUp, Star, Stethoscope, Activity, GraduationCap, FileCheck, ExternalLink } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';

interface Credential {
  type: string;
  number: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  documentUrl: string;
}

interface DoctorDetail {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  facility: string;
  location: string;
  status: 'active' | 'suspended';
  subscription: {
    plan: 'Trial' | 'Monthly' | 'Annual';
    startDate: string;
    renewalDate: string;
    amount: string;
  };
  profileCompletion: number;
  profileViews: number;
  profileViewsThisWeek: number;
  recommendations: number;
  reviews: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  diagnosticCapabilities: number;
  clinicalServices: number;
  education: {
    medicalSchool: string;
    residencyProgram: string;
    yearsOfExperience: string;
  };
  credentials: Credential[];
}

// Mock data
const mockDoctorDetails: Record<string, DoctorDetail> = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    email: 'sjohnson@downtownmed.com',
    phone: '(212) 555-0199',
    facility: 'Downtown Medical Center',
    location: 'New York, NY',
    status: 'active',
    subscription: {
      plan: 'Annual',
      startDate: '2025-06-20',
      renewalDate: '2026-06-20',
      amount: '$499/year',
    },
    profileCompletion: 75,
    profileViews: 892,
    profileViewsThisWeek: 56,
    recommendations: 234,
    reviews: {
      five: 892,
      four: 248,
      three: 74,
      two: 25,
      one: 8,
    },
    diagnosticCapabilities: 3,
    clinicalServices: 4,
    education: {
      medicalSchool: 'Harvard Medical School',
      residencyProgram: 'Johns Hopkins Hospital',
      yearsOfExperience: '15+ years',
    },
    credentials: [
      {
        type: 'Medical License',
        number: 'MD-12345',
        issuer: 'State Medical Board',
        issuedDate: '2015-06-14',
        expiryDate: '2026-06-14',
        documentUrl: '/documents/medical-license-md12345.pdf',
      },
      {
        type: 'DEA Registration',
        number: 'DEA-987654',
        issuer: 'DEA',
        issuedDate: '2020-03-09',
        expiryDate: '2026-03-09',
        documentUrl: '/documents/dea-registration-987654.pdf',
      },
      {
        type: 'Board Certification',
        number: 'BC-56789',
        issuer: 'American Board of Internal Medicine',
        issuedDate: '2016-09-19',
        expiryDate: '2026-09-19',
        documentUrl: '/documents/board-cert-bc56789.pdf',
      },
      {
        type: 'CPR Certification',
        number: 'CPR-11223',
        issuer: 'American Heart Association',
        issuedDate: '2024-01-14',
        expiryDate: '2026-01-14',
        documentUrl: '/documents/cpr-cert-11223.pdf',
      },
    ],
  },
};

export function DoctorDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DoctorDetail | null>(null);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);

  useEffect(() => {
    if (id && mockDoctorDetails[id]) {
      setDoctor(mockDoctorDetails[id]);
    } else {
      navigate('/admin/doctors');
    }
  }, [id, navigate]);

  if (!doctor) return null;

  const handleActivate = () => {
    setDoctor({ ...doctor, status: 'active' });
    setShowActivateDialog(false);
  };

  const handleSuspend = () => {
    setDoctor({ ...doctor, status: 'suspended' });
    setShowSuspendDialog(false);
  };

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

  const totalReviews = doctor.reviews.five + doctor.reviews.four + doctor.reviews.three + doctor.reviews.two + doctor.reviews.one;

  const getReviewBarWidth = (count: number) => {
    return `${(count / totalReviews) * 100}%`;
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
                doctor.status === 'active' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Completion */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
            <p className="text-3xl font-bold text-gray-900">{doctor.profileCompletion}%</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${doctor.profileCompletion}%` }}
              ></div>
            </div>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Profile Views</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{doctor.profileViews.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+{doctor.profileViewsThisWeek} this week</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Recommendations</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{doctor.recommendations}</p>
            <p className="text-sm text-gray-500 mt-1">Times recommended to patients</p>
          </div>
        </div>

        {/* Review Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Review Summary</h3>
          </div>
          <div className="space-y-3">
            {[
              { stars: 5, count: doctor.reviews.five },
              { stars: 4, count: doctor.reviews.four },
              { stars: 3, count: doctor.reviews.three },
              { stars: 2, count: doctor.reviews.two },
              { stars: 1, count: doctor.reviews.one },
            ].map((review) => (
              <div key={review.stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-16">{review.stars} stars</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: getReviewBarWidth(review.count) }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-24 text-right">{review.count.toLocaleString()} reviews</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic & Clinical Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Diagnostic Capabilities</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{doctor.diagnosticCapabilities}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Clinical Services</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{doctor.clinicalServices}</p>
          </div>
        </div>

        {/* Education & Training */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Education & Training</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Medical School</p>
              <p className="font-medium text-gray-900">{doctor.education.medicalSchool}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Residency Program</p>
              <p className="font-medium text-gray-900">{doctor.education.residencyProgram}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Years of Experience</p>
              <p className="font-medium text-gray-900">{doctor.education.yearsOfExperience}</p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileCheck className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Credentials</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Number</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issuer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issued Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Expiry Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Document</th>
                </tr>
              </thead>
              <tbody>
                {doctor.credentials.map((credential, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{credential.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{credential.number}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{credential.issuer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(credential.issuedDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(credential.expiryDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(credential.documentUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Subscription</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        {/* Account Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <div className="flex flex-wrap gap-3">
            {doctor.status === 'suspended' ? (
              <Button
                onClick={() => setShowActivateDialog(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Activate Account
              </Button>
            ) : (
              <Button
                onClick={() => setShowSuspendDialog(true)}
                variant="destructive"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Suspend Account
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Activate Confirmation Dialog */}
      <AlertDialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate Doctor Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to activate the account for {doctor.name}? This will restore
              their access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleActivate}
              className="bg-green-600 hover:bg-green-700"
            >
              Activate Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend Confirmation Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend Doctor Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend the account for {doctor.name}? This will
              temporarily restrict their access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspend}
              className="bg-red-600 hover:bg-red-700"
            >
              Suspend Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
