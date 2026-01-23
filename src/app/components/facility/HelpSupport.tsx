import { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MessageSquare,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQ[] = [
  {
    id: '1',
    category: 'Account & Registration',
    question: 'How do I update my facility information?',
    answer: 'You can update your facility information by going to the Profile section from the sidebar menu. Click the "Edit" button to make changes to your facility details, operating hours, and contact information.'
  },
  {
    id: '2',
    category: 'Account & Registration',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to Settings > Security, then click on "Change Password". You\'ll need to enter your current password and then create a new one. Alternatively, you can use the "Forgot Password" link on the login page.'
  },
  {
    id: '3',
    category: 'Insurance & Billing',
    question: 'How do I add or remove accepted insurance plans?',
    answer: 'Navigate to Insurance & Payers from the sidebar menu. You can check or uncheck insurance providers to update which plans your facility accepts. Changes are saved automatically and will be visible to patients immediately.'
  },
  {
    id: '4',
    category: 'Insurance & Billing',
    question: 'What are NPI and TIN numbers?',
    answer: 'NPI (National Provider Identifier) is a unique 10-digit identification number for healthcare providers. TIN (Tax Identification Number) is used for billing and tax purposes. You can update these in the Insurance & Payers section under Facility Identifiers.'
  },
  {
    id: '5',
    category: 'Doctor Management',
    question: 'How do I add doctors to my facility?',
    answer: 'Go to the Doctors section from the sidebar. Click "Add Doctor" and fill in their information including credentials, specializations, and contact details. Doctors will receive an invitation to join your facility\'s roster.'
  },
  {
    id: '6',
    category: 'Doctor Management',
    question: 'Can doctors manage their own schedules?',
    answer: 'Yes, doctors have their own portal where they can manage their availability calendar, add time slots, and mark time off. They can also view and manage their appointments independently.'
  },
  {
    id: '7',
    category: 'Appointments',
    question: 'How do I view and manage appointments?',
    answer: 'Click on Appointments in the sidebar to see all scheduled appointments. You can filter by status (Pending, Confirmed, Completed, Cancelled), search by patient name, and view appointment details.'
  },
  {
    id: '8',
    category: 'Appointments',
    question: 'What do the different appointment statuses mean?',
    answer: 'Pending Confirmation: New appointment awaiting review. Confirmed: Appointment has been confirmed and scheduled. Completed: Patient visit has been completed. Cancelled: Appointment was cancelled by either party.'
  },
  {
    id: '9',
    category: 'Subscription & Billing',
    question: 'What subscription plans are available?',
    answer: 'UrgentCareX offers three plans: 14-day Free Trial (100% features), Monthly Plan ($49/month, 100% features), and Yearly Plan ($499/year, 100% features - save 2 months). All plans include full access to all platform features.'
  },
  {
    id: '10',
    category: 'Subscription & Billing',
    question: 'How do I change my subscription plan?',
    answer: 'Go to Subscription from the sidebar, then click "Change Plan". You can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.'
  },
  {
    id: '11',
    category: 'Technical Issues',
    question: 'What browsers are supported?',
    answer: 'UrgentCareX works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date for the best experience and security.'
  },
  {
    id: '12',
    category: 'Technical Issues',
    question: 'I\'m having trouble logging in. What should I do?',
    answer: 'First, ensure you\'re using the correct email and password. If you\'ve forgotten your password, use the "Forgot Password" link. Clear your browser cache and cookies if issues persist. If problems continue, contact our support team.'
  }
];

const ISSUE_CATEGORIES = [
  'Account & Login Issues',
  'Insurance & Billing',
  'Doctor Management',
  'Appointments',
  'Subscription & Payment',
  'Technical Issue',
  'Feature Request',
  'Other'
];

export function HelpSupport() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitSuccess(true);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <DashboardLayout title="Help & Support" role="facility">
      <div className="space-y-6 max-w-6xl">
        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Your message has been submitted successfully! Our support team will get back to you within 24 hours.
          </div>
        )}

        {/* Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                How can we help you?
              </h2>
              <p className="text-gray-700">
                Browse our frequently asked questions or contact our support team for personalized assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Support</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Get help via email</p>
            <a href="mailto:support@urgentcarex.com" className="text-sm text-blue-600 hover:underline">
              support@urgentcarex.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone Support</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Call us directly</p>
            <a href="tel:+18005551234" className="text-sm text-blue-600 hover:underline">
              1-800-555-1234
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Support Hours</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Mon-Fri: 8am - 8pm EST</p>
            <p className="text-sm text-gray-600">Sat-Sun: 10am - 6pm EST</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {FAQ_DATA.map(faq => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  )}
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Send className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Contact Support</h2>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Can't find what you're looking for? Submit a support request and our team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmitQuery} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                rows={6}
                placeholder="Please provide detailed information about your issue or question..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Submit Support Request
            </Button>
          </form>
        </div>

        {/* Additional Resources */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> For urgent technical issues affecting patient care, please call our emergency support line at <a href="tel:+18005559999" className="text-blue-600 hover:underline">1-800-555-9999</a> (available 24/7).
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}