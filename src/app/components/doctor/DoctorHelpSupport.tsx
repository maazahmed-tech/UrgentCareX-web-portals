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
    category: 'Account & Profile Management',
    question: 'How do I update my profile information?',
    answer: 'You can update your profile by navigating to the Profile section from the sidebar. Click on the "Basic Info" tab and then click "Edit Basic Info" to update your name, contact information, specialty, and bio. You can also update your photo and credentials from the respective tabs.'
  },
  {
    id: '2',
    category: 'Account & Profile Management',
    question: 'How do I manage my credentials and certifications?',
    answer: 'Go to your Profile page and click on the "Credentials" tab. You can add new credentials by clicking "Add Credential", or edit/delete existing ones. Make sure to keep your medical license, DEA registration, and board certifications up to date.'
  },
  {
    id: '3',
    category: 'Account & Profile Management',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to Settings > Security from the sidebar, then click on "Change Password". You\'ll need to enter your current password and create a new one. Alternatively, use the "Forgot Password" link on the login page if you can\'t remember your current password.'
  },
  {
    id: '4',
    category: 'Availability & Scheduling',
    question: 'How do I set my availability for appointments?',
    answer: 'Navigate to Availability Calendar from the sidebar. Click "Add Time Slot" to create recurring availability slots for specific days and times. You can set different hours for different days of the week, and patients will only be able to book during your available times.'
  },
  {
    id: '5',
    category: 'Availability & Scheduling',
    question: 'How do I mark time off or vacation days?',
    answer: 'Go to Availability Calendar and click the "Add Time Off" button. Select the date range you\'ll be unavailable and optionally add a reason. During this period, patients won\'t be able to book appointments with you, and any existing appointments will need to be rescheduled.'
  },
  {
    id: '6',
    category: 'Availability & Scheduling',
    question: 'Can I edit or delete my availability slots?',
    answer: 'Yes! In the Availability Calendar, each time slot has an "Edit" button that allows you to modify the day, time, or delete the slot entirely. Changes take effect immediately and will be reflected in the patient booking system.'
  },
  {
    id: '7',
    category: 'Appointments',
    question: 'How do I view and manage my appointments?',
    answer: 'Click on "Appointments" in the sidebar to see all your scheduled appointments. You can view Today\'s appointments, Upcoming appointments, Past appointments, or see everything in Calendar Week view. Each appointment can be filtered by status: Confirmed, Completed, or Cancelled.'
  },
  {
    id: '8',
    category: 'Appointments',
    question: 'What do the different appointment statuses mean?',
    answer: 'Confirmed (Blue): Appointment is scheduled and confirmed. Completed (Green): Patient visit has been completed. Cancelled (Red): Appointment was cancelled by either you or the patient. You can update appointment status from the appointment details page.'
  },
  {
    id: '9',
    category: 'Appointments',
    question: 'How do I view patient information before an appointment?',
    answer: 'Click on any appointment to see full details including patient name, contact information, appointment reason, and any special notes. You can also click "View Patient Profile" to see the patient\'s complete medical history and past appointments.'
  },
  {
    id: '10',
    category: 'Patient Reviews',
    question: 'How can I view my patient reviews and ratings?',
    answer: 'Navigate to "Reviews" from the sidebar to see all patient feedback. You can view your overall rating, read individual reviews with comments, and see when each review was submitted. Patient reviews help build your reputation on the platform.'
  },
  {
    id: '11',
    category: 'Subscription & Billing',
    question: 'What subscription plans are available for doctors?',
    answer: 'UrgentCareX offers three plans: 14-day Free Trial (100% features), Monthly Plan ($49/month, 100% features), and Yearly Plan ($499/year, 100% features - save 2 months). All plans include full access to all platform features including appointment management, availability calendar, and patient reviews.'
  },
  {
    id: '12',
    category: 'Subscription & Billing',
    question: 'How do I change my subscription plan?',
    answer: 'Go to Subscription from the sidebar, then click "Change Plan". You can upgrade or downgrade your plan at any time. If upgrading, you\'ll be charged a prorated amount. If downgrading, the change will take effect at the start of your next billing cycle.'
  },
  {
    id: '13',
    category: 'Technical Issues',
    question: 'What browsers are supported?',
    answer: 'UrgentCareX works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date for the best experience and security. The platform is also mobile-responsive for on-the-go access.'
  },
  {
    id: '14',
    category: 'Technical Issues',
    question: 'I\'m having trouble logging in. What should I do?',
    answer: 'First, ensure you\'re using the correct email and password. If you\'ve forgotten your password, use the "Forgot Password" link on the login page. Clear your browser cache and cookies if issues persist. If problems continue, contact our support team for assistance.'
  }
];

const ISSUE_CATEGORIES = [
  'Account & Login Issues',
  'Profile & Credentials',
  'Availability & Scheduling',
  'Appointments',
  'Patient Reviews',
  'Subscription & Payment',
  'Technical Issue',
  'Feature Request',
  'Other'
];

export function DoctorHelpSupport() {
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

    // Create new support ticket
    const newTicket = {
      id: `doctor-${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      subject: contactForm.subject,
      message: contactForm.message,
      source: 'doctor' as const,
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingTickets = localStorage.getItem('supportTickets');
    const tickets = existingTickets ? JSON.parse(existingTickets) : [];
    tickets.unshift(newTicket); // Add to beginning (newest first)
    localStorage.setItem('supportTickets', JSON.stringify(tickets));

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
    <DashboardLayout title="Help & Support" role="doctor">
      <div className="space-y-4 md:space-y-6 max-w-6xl">
        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-3 md:px-4 py-3 rounded-lg flex items-start gap-2 text-sm md:text-base">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>Your message has been submitted successfully! Our support team will get back to you within 24 hours.</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                How can we help you?
              </h2>
              <p className="text-sm md:text-base text-gray-700">
                Browse our frequently asked questions or contact our support team for personalized assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base text-gray-900">Email Support</h3>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-2">Get help via email</p>
            <a href="mailto:support@urgentcarex.com" className="text-xs md:text-sm text-blue-600 hover:underline break-all">
              support@urgentcarex.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base text-gray-900">Phone Support</h3>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-2">Call us directly</p>
            <a href="tel:+18005551234" className="text-xs md:text-sm text-blue-600 hover:underline">
              1-800-555-1234
            </a>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base text-gray-900">Support Hours</h3>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Mon-Fri: 8am - 8pm EST</p>
            <p className="text-xs md:text-sm text-gray-600">Sat-Sun: 10am - 6pm EST</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg md:text-xl font-semibold">Frequently Asked Questions</h2>
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
                  className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm md:text-base text-gray-900">{faq.question}</span>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-3" />
                  )}
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Send className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg md:text-xl font-semibold">Contact Support</h2>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
            Can't find what you're looking for? Submit a support request and our team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmitQuery} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  placeholder="Dr. John Doe"
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
                  placeholder="john.doe@example.com"
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

            <Button type="submit" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Submit Support Request
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}