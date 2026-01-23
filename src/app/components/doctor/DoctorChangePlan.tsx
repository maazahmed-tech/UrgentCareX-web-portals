import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, Info } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';

export function DoctorChangePlan() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const plans = [
    {
      id: 'trial',
      name: '14-Day Trial',
      description: 'Try all features free for 14 days',
      price: 0,
      duration: '14 days',
      expired: true,
      features: [
        'All features included',
        'Complete provider profile',
        'Appointment management',
        'Patient matching algorithm',
        'Services & equipment listings',
        'Support',
      ],
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      description: 'All features, billed monthly',
      price: 49,
      duration: 'month',
      features: [
        'All features included',
        'Complete provider profile',
        'Appointment management',
        'Patient matching algorithm',
        'Services & equipment listings',
        'Support',
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      description: 'Save $89/year with annual billing',
      price: 499,
      duration: 'year',
      features: [
        'All features included',
        'Complete provider profile',
        'Appointment management',
        'Patient matching algorithm',
        'Services & equipment listings',
        'Support',
      ],
    },
  ];

  const currentPlan = plans.find(p => p.id === 'monthly');

  const handleChangePlan = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      navigate('/doctor/subscription');
    }, 4000);
  };

  return (
    <DashboardLayout title="Change Your Plan" role="doctor">
      <div className="space-y-6 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor/subscription')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Subscription</span>
        </button>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl p-6 border-2 relative ${
                selectedPlan === plan.id
                  ? 'border-blue-600 shadow-lg'
                  : 'border-gray-200'
              } ${plan.expired ? 'opacity-80' : ''}`}
            >
              {plan.expired && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                    Expired
                  </span>
                </div>
              )}

              {plan.id === currentPlan?.id && !plan.expired && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">
                    /{plan.duration}
                  </span>
                </div>
                {plan.savings && (
                  <p className="text-sm text-green-600 font-medium">
                    {plan.savings}
                  </p>
                )}
                {plan.note && (
                  <p className="text-sm text-gray-500 mt-2">
                    {plan.note}
                  </p>
                )}
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.expired
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : selectedPlan === plan.id
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : plan.id === currentPlan?.id
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
                disabled={plan.id === currentPlan?.id || plan.expired}
              >
                {plan.expired
                  ? 'Expired'
                  : plan.id === currentPlan?.id
                  ? 'Current Plan'
                  : selectedPlan === plan.id
                  ? 'Selected'
                  : 'Select Plan'}
              </Button>

              <div className="space-y-3">
                <p className="text-sm font-medium">Features included:</p>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Information Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">Plan Information</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All plans include 100% of features</li>
                <li>• Card required at signup to unlock 14-day trial</li>
                <li>• Yearly plan saves $89/year ($588 vs $499)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => navigate('/doctor/subscription')}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleChangePlan}
            disabled={selectedPlan === currentPlan?.id}
          >
            {selectedPlan === currentPlan?.id ? 'Already on this plan' : 'Confirm Change'}
          </Button>
        </div>

        {/* Success Message */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Plan Changed Successfully!</h3>
                <p className="text-gray-600">
                  Your subscription has been updated to the {plans.find(p => p.id === selectedPlan)?.name}. You will be charged for this plan in the next billing cycle.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
