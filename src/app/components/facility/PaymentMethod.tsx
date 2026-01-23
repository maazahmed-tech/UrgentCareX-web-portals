import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function PaymentMethod() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Current saved card info (masked)
  const savedCard = {
    last4: '4242',
    type: 'VISA',
    expiryMonth: '12',
    expiryYear: '27',
    holderName: 'Downtown Medical Center',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Payment method updated successfully!');
    // Reset form
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setNameOnCard('');
  };

  return (
    <DashboardLayout title="Payment Method" role="facility">
      <div className="space-y-6 max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/facility/subscription')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Subscription</span>
        </button>

        {/* Current Payment Method */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Current Payment Method</h2>
              <p className="text-sm text-gray-600 mt-1">Your default payment method for subscriptions</p>
            </div>
            <CreditCard className="w-6 h-6 text-gray-400" />
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              {/* Card Info Display */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Cardholder Name</span>
                  <span className="text-sm font-medium">{savedCard.holderName}</span>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Card Number</span>
                  <span className="text-sm font-medium font-mono">•••• •••• •••• {savedCard.last4}</span>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Card Type</span>
                  <span className="text-sm font-medium">{savedCard.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expiry Date</span>
                  <span className="text-sm font-medium">{savedCard.expiryMonth}/{savedCard.expiryYear}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  Update Payment Method
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  Save Payment Method
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Secure Payment Processing</p>
              <p className="text-sm text-blue-800">
                Your payment information is encrypted and securely stored. We never store your full card number or CVV.
              </p>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Billing History</h2>
          
          <div className="space-y-3">
            {[
              { date: 'Jan 20, 2026', amount: '$49.00', status: 'Paid', plan: 'Monthly Plan' },
              { date: 'Dec 20, 2025', amount: '$49.00', status: 'Paid', plan: 'Monthly Plan' },
              { date: 'Nov 20, 2025', amount: '$49.00', status: 'Paid', plan: 'Monthly Plan' },
              { date: 'Oct 20, 2025', amount: '$0.00', status: 'Trial', plan: '14-Day Trial' },
            ].map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium">{payment.plan}</p>
                  <p className="text-sm text-gray-600">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
