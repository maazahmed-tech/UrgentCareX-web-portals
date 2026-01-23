import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Phone, Mail, CreditCard, AlertTriangle, CheckCircle, Eye, ThumbsUp, Star } from 'lucide-react';
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

interface FacilityDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
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
  },
};

export function FacilityDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<FacilityDetail | null>(null);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);

  useEffect(() => {
    if (id && mockFacilityDetails[id]) {
      setFacility(mockFacilityDetails[id]);
    } else {
      navigate('/admin/facilities');
    }
  }, [id, navigate]);

  if (!facility) return null;

  const handleActivate = () => {
    setFacility({ ...facility, status: 'active' });
    setShowActivateDialog(false);
  };

  const handleSuspend = () => {
    setFacility({ ...facility, status: 'suspended' });
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

  const totalReviews = facility.reviews.five + facility.reviews.four + facility.reviews.three + facility.reviews.two + facility.reviews.one;

  const getReviewBarWidth = (count: number) => {
    return `${(count / totalReviews) * 100}%`;
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
                facility.status === 'active' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Completion */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
            <p className="text-3xl font-bold text-gray-900">{facility.profileCompletion}%</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${facility.profileCompletion}%` }}
              ></div>
            </div>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Profile Views</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{facility.profileViews.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+{facility.profileViewsThisWeek} this week</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-600">Recommendations</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{facility.recommendations}</p>
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
              { stars: 5, count: facility.reviews.five },
              { stars: 4, count: facility.reviews.four },
              { stars: 3, count: facility.reviews.three },
              { stars: 2, count: facility.reviews.two },
              { stars: 1, count: facility.reviews.one },
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

        {/* Account Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <div className="flex flex-wrap gap-3">
            {facility.status === 'suspended' ? (
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
            <AlertDialogTitle>Activate Facility Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to activate the account for {facility.name}? This will restore
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
            <AlertDialogTitle>Suspend Facility Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend the account for {facility.name}? This will
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
