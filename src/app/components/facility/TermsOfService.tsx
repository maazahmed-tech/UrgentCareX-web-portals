import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">UC</span>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">Terms of Service</h1>
            <p className="text-gray-600 text-center">UrgentCareX Facility Portal</p>
            <p className="text-sm text-gray-500 text-center mt-2">Last updated: January 21, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using the UrgentCareX platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                UrgentCareX provides a comprehensive healthcare platform connecting urgent care facilities with patients. 
                The Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Facility profile management and listing services</li>
                <li>Subscription and billing management</li>
                <li>Operating hours and services information display</li>
                <li>Account and settings management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To use the Facility Portal, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be legally authorized to represent the facility you're registering</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Subscription Plans & Billing</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                UrgentCareX offers the following subscription plans:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>14-Day Trial:</strong> Free trial with full access to all features. Requires valid payment method.</li>
                <li><strong>Monthly Plan:</strong> $49/month, billed monthly</li>
                <li><strong>Yearly Plan:</strong> $499/year, billed annually</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                All plans include 100% of platform features. Payment information must be provided at signup to activate the trial. 
                You will be automatically charged at the end of your trial period unless you cancel. Subscriptions automatically 
                renew unless canceled before the renewal date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cancellation & Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                You may cancel your subscription at any time through the Facility Portal settings. Cancellations take effect at 
                the end of the current billing period. We do not provide refunds for partial months or years, except as required 
                by law. If you cancel during your free trial, you will not be charged.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Account Suspension & Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We reserve the right to suspend or terminate your account if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment fails or your account becomes past due</li>
                <li>You violate these Terms of Service</li>
                <li>You provide false or misleading information</li>
                <li>Your use of the Service poses a security risk</li>
                <li>You engage in fraudulent activity</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Upon suspension, access to the platform will be restricted until the issue is resolved. We will provide notice 
                before suspension when possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. HIPAA Compliance & Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                While UrgentCareX provides a platform for facility management, facilities are responsible for ensuring their own 
                HIPAA compliance. This platform is not intended for storing or transmitting Protected Health Information (PHI). 
                Facilities must maintain their own HIPAA-compliant systems for patient records and sensitive medical data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service and its original content, features, and functionality are owned by UrgentCareX and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property laws. You retain ownership 
                of content you upload, but grant us a license to use it in connection with providing the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall UrgentCareX, its directors, employees, partners, or suppliers be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, 
                use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or 
                use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes 
                by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service 
                after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Email:</strong> legal@urgentcarex.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 1-800-URGENT-X</p>
                <p className="text-gray-700"><strong>Address:</strong> UrgentCareX Legal Department, 123 Healthcare Blvd, San Francisco, CA 94102</p>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/facility/register')}
              className="flex-1 bg-gray-900 hover:bg-gray-800"
            >
              Continue to Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
