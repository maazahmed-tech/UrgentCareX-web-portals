import { useNavigate } from 'react-router';
import { CreditCard, Calendar, CheckCircle, Download, FileText, X, Phone, Mail } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

export function DoctorSubscriptionOverview() {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Mock subscription data
  const currentPlan = {
    name: 'Monthly',
    price: 49,
    billingCycle: 'monthly',
    nextBillingDate: 'Feb 20, 2026',
    status: 'active',
    startDate: 'Jan 20, 2026',
    trialEndsDate: 'Feb 3, 2026',
    features: [
      'Complete provider profile',
      'Appointment management',
      'Patient matching algorithm',
      'Services & equipment listings',
      'Priority support',
    ],
  };

  // Mock payment history
  const paymentHistory = [
    {
      id: '1',
      date: 'Jan 20, 2026',
      amount: 49,
      status: 'Paid',
      invoice: 'INV-2026-001',
    },
    {
      id: '2',
      date: 'Dec 20, 2025',
      amount: 49,
      status: 'Paid',
      invoice: 'INV-2025-012',
    },
    {
      id: '3',
      date: 'Nov 20, 2025',
      amount: 49,
      status: 'Paid',
      invoice: 'INV-2025-011',
    },
  ];

  const handleCancelSubscription = () => {
    // Handle cancellation logic here
    setShowCancelModal(false);
    // Could show a success message or navigate somewhere
  };

  return (
    <DashboardLayout title="Subscription & Billing" role="doctor">
      <div className="space-y-4 md:space-y-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left column - Current Plan */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Current Plan Card */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 md:mb-6">
                <div>
                  <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                    <h2 className="text-lg md:text-xl font-semibold">{currentPlan.name} Plan</h2>
                    <span className="px-2 md:px-3 py-1 bg-green-100 text-green-800 text-xs md:text-sm font-medium rounded-full">
                      {currentPlan.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">
                    ${currentPlan.price}
                    <span className="text-sm md:text-base font-normal text-gray-600">/month</span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/doctor/change-plan')}
                  className="w-full sm:w-auto text-sm md:text-base"
                >
                  Change Plan
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Next billing date</p>
                    <p className="text-sm md:text-base font-medium">{currentPlan.nextBillingDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Subscription started</p>
                    <p className="text-sm md:text-base font-medium">{currentPlan.startDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm md:text-base font-medium mb-3">Plan Features</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
              <h2 className="text-base md:text-lg font-semibold mb-4">Payment History</h2>

              {/* Mobile Card View */}
              <div className="block md:hidden space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{payment.date}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-lg font-semibold">${payment.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100">
                        <td className="py-4 px-4 text-sm">{payment.date}</td>
                        <td className="py-4 px-4 text-sm font-medium text-right">
                          ${payment.amount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column - Payment Method & Quick Actions */}
          <div className="space-y-4 md:space-y-6">
            {/* Payment Method Card */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <h3 className="text-sm md:text-base font-semibold">Payment Method</h3>
              </div>

              <div className="mb-4 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-600">Card ending in</span>
                  <span className="text-xs md:text-sm font-medium">4242</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-600">Card type</span>
                  <span className="text-xs md:text-sm font-medium">VISA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Expires</span>
                  <span className="text-xs md:text-sm font-medium">12/27</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full text-sm md:text-base"
                onClick={() => navigate('/doctor/payment-method')}
              >
                Update Payment Method
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
              <h3 className="text-sm md:text-base font-semibold mb-4">Need Help?</h3>
              <div className="space-y-2 md:space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  size="sm"
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  size="sm"
                  onClick={() => navigate('/doctor/change-plan')}
                >
                  View Pricing Plans
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                  size="sm"
                  onClick={() => setShowCancelModal(true)}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold">Contact Support</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Need help with your subscription or have questions? Reach out to our support team:
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Phone</p>
                  <a href="tel:+18005551234" className="text-sm md:text-base font-medium text-blue-600 hover:text-blue-700">
                    +1 (800) 555-1234
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Email</p>
                  <a href="mailto:support@urgentcarex.com" className="text-sm md:text-base font-medium text-blue-600 hover:text-blue-700 break-all">
                    support@urgentcarex.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6">
              <Button
                className="w-full text-sm md:text-base"
                onClick={() => setShowContactModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold">Cancel Subscription</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm md:text-base text-gray-600 mb-4">
              Are you sure you want to cancel your subscription?
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <p className="text-xs md:text-sm text-yellow-800">
                <strong>Important:</strong> Your subscription will remain active until the end of your current billing period ({currentPlan.nextBillingDate}). After that, you'll lose access to all premium features.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="flex-1 text-sm md:text-base"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Subscription
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-sm md:text-base"
                onClick={handleCancelSubscription}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}