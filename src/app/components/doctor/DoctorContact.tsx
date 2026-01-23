import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function DoctorContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <DashboardLayout title="Contact Us" role="doctor">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-sm text-gray-600 mb-3">Our support team is here to help</p>
            <a href="mailto:support@urgentcarex.com" className="text-sm text-blue-600 hover:text-blue-700">
              support@urgentcarex.com
            </a>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-sm text-gray-600 mb-3">Mon-Fri, 9AM-6PM EST</p>
            <a href="tel:+18005551234" className="text-sm text-green-600 hover:text-green-700">
              +1 (800) 555-1234
            </a>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-sm text-gray-600 mb-3">Corporate Headquarters</p>
            <p className="text-sm text-gray-700">
              123 Healthcare Blvd<br />
              San Francisco, CA 94102
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
            <p className="text-gray-600 mt-1">We'll respond within 24 hours</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. John Doe"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 mt-1"
              >
                <option value="">Select a subject</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing & Subscription</option>
                <option value="account">Account Issues</option>
                <option value="feature">Feature Request</option>
                <option value="feedback">General Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your inquiry in detail..."
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 mt-1"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-gray-900 hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
              >
                Clear
              </Button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Response Time</h3>
          <p className="text-sm text-blue-800">
            Our support team typically responds to all inquiries within 24 hours during business days. 
            For urgent technical issues, please call our support hotline directly.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
