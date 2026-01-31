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
        expiryDate: '2025-01-14',
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

  const isCredentialExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const isCredentialExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiry > today && expiry <= thirtyDaysFromNow;
  };

  const getCredentialStatus = (expiryDate: string) => {
    if (isCredentialExpired(expiryDate)) return 'expired';
    if (isCredentialExpiringSoon(expiryDate)) return 'expiring';
    return 'valid';
  };

  const hasExpiredCredentials = doctor.credentials.some(c => isCredentialExpired(c.expiryDate));

  return (
    <DashboardLayout title="Doctor Details" role="admin">
      <div className="space-y-4 md:space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/admin/doctors')} className="mb-2 md:mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </Button>

        {/* Header Card */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <span
                  className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium text-white ${
                    doctor.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                </span>
              </div>
              <p className="text-base md:text-lg text-gray-600 mt-1">{doctor.specialty}</p>
              <div className="mt-3 md:mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm md:text-base text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {doctor.facility}, {doctor.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Profile Completion */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.profileCompletion}%</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${doctor.profileCompletion}%` }}
              ></div>
            </div>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Profile Views</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.profileViews.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+{doctor.profileViewsThisWeek} this week</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Recommendations</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.recommendations}</p>
            <p className="text-sm text-gray-500 mt-1">Times recommended to patients</p>
          </div>
        </div>

        {/* Review Summary */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-gray-600" />
            <h3 className="text-base md:text-lg font-semibold">Review Summary</h3>
          </div>
          <div className="space-y-3">
            {[
              { stars: 5, count: doctor.reviews.five },
              { stars: 4, count: doctor.reviews.four },
              { stars: 3, count: doctor.reviews.three },
              { stars: 2, count: doctor.reviews.two },
              { stars: 1, count: doctor.reviews.one },
            ].map((review) => (
              <div key={review.stars} className="flex items-center gap-2 md:gap-3">
                <span className="text-xs md:text-sm text-gray-600 w-12 md:w-16">{review.stars} stars</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: getReviewBarWidth(review.count) }}
                  ></div>
                </div>
                <span className="text-xs md:text-sm text-gray-600 w-16 md:w-24 text-right">{review.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic & Clinical Services */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-gray-600" />
              <p className="text-xs md:text-sm text-gray-600">Diagnostic Capabilities</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.diagnosticCapabilities}</p>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <p className="text-xs md:text-sm text-gray-600">Clinical Services</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.clinicalServices}</p>
          </div>
        </div>

        {/* Education & Training */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-gray-600" />
            <h3 className="text-base md:text-lg font-semibold">Education & Training</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Medical School</p>
              <p className="text-sm md:text-base font-medium text-gray-900">{doctor.education.medicalSchool}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Residency Program</p>
              <p className="text-sm md:text-base font-medium text-gray-900">{doctor.education.residencyProgram}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Years of Experience</p>
              <p className="text-sm md:text-base font-medium text-gray-900">{doctor.education.yearsOfExperience}</p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className={`bg-white rounded-xl p-4 md:p-6 border ${hasExpiredCredentials ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <FileCheck className={`w-5 h-5 ${hasExpiredCredentials ? 'text-red-500' : 'text-gray-600'}`} />
              <h3 className="text-base md:text-lg font-semibold">Credentials</h3>
            </div>
            {hasExpiredCredentials && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Expired Credential</span>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3">
            {doctor.credentials.map((credential, index) => {
              const status = getCredentialStatus(credential.expiryDate);
              const isExpired = status === 'expired';
              const isExpiring = status === 'expiring';

              return (
                <div
                  key={index}
                  className={`rounded-lg p-3 space-y-2 ${
                    isExpired
                      ? 'border-2 border-red-300 bg-red-50'
                      : isExpiring
                        ? 'border-2 border-yellow-300 bg-yellow-50'
                        : 'border border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 text-sm">{credential.type}</p>
                        {isExpired && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                            Expired
                          </span>
                        )}
                        {isExpiring && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                            Expiring Soon
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{credential.number}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(credential.documentUrl, '_blank')}
                      className="h-7 text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600">{credential.issuer}</p>
                  <div className={`flex justify-between text-xs pt-1 border-t ${isExpired ? 'border-red-200' : isExpiring ? 'border-yellow-200' : 'border-gray-100'}`}>
                    <span className="text-gray-500">Issued: {new Date(credential.issuedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    <span className={isExpired ? 'text-red-600 font-medium' : isExpiring ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
                      Expires: {new Date(credential.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Number</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issuer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issued Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Expiry Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Document</th>
                </tr>
              </thead>
              <tbody>
                {doctor.credentials.map((credential, index) => {
                  const status = getCredentialStatus(credential.expiryDate);
                  const isExpired = status === 'expired';
                  const isExpiring = status === 'expiring';

                  return (
                    <tr
                      key={index}
                      className={`border-b last:border-b-0 ${
                        isExpired
                          ? 'bg-red-50 border-red-100'
                          : isExpiring
                            ? 'bg-yellow-50 border-yellow-100'
                            : 'border-gray-100'
                      }`}
                    >
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
                      <td className={`py-3 px-4 text-sm ${isExpired ? 'text-red-600 font-medium' : isExpiring ? 'text-yellow-600 font-medium' : 'text-gray-600'}`}>
                        {new Date(credential.expiryDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4">
                        {isExpired ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            <AlertTriangle className="w-3 h-3" />
                            Expired
                          </span>
                        ) : isExpiring ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            <AlertTriangle className="w-3 h-3" />
                            Expiring Soon
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            Valid
                          </span>
                        )}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h3 className="text-base md:text-lg font-semibold">Subscription</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <p className="text-xs md:text-sm font-medium text-gray-900">
                {new Date(doctor.subscription.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Renewal Date</p>
              <p className="text-xs md:text-sm font-medium text-gray-900">
                {new Date(doctor.subscription.renewalDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <h3 className="text-base md:text-lg font-semibold mb-4">Account Actions</h3>
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
