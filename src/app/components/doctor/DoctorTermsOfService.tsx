import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function DoctorTermsOfService() {
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
            <p className="text-gray-600 text-center">UrgentCareX Doctor Portal</p>
            <p className="text-sm text-gray-500 text-center mt-2">Last updated: January 28, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the UrgentCareX Doctor Portal ("the Platform"), you accept and agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-3">To use the Platform, you must:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Be a licensed medical professional in good standing</li>
                <li>Possess valid medical credentials and malpractice insurance</li>
                <li>Have the authority to enter into this agreement</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain current board certifications where required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-3">As a doctor using the Platform, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Keep your profile information current and accurate</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Verify and update your credentials regularly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Professional Standards</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Maintain the highest standards of professional conduct</li>
                <li>Comply with all applicable medical ethics and regulations</li>
                <li>Provide accurate information about your qualifications</li>
                <li>Honor all confirmed appointments</li>
                <li>Maintain appropriate professional boundaries with patients</li>
                <li>Comply with HIPAA and all privacy regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Subscription and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-3">The Platform operates on a subscription basis:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>14-day free trial for new users</li>
                <li>Monthly subscription: $49/month</li>
                <li>Annual subscription: $499/year</li>
                <li>Automatic renewal unless canceled</li>
                <li>No refunds for partial months</li>
                <li>Subscription required for all features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cancellation and Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You may cancel your subscription at any time through your account settings. Upon cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access continues until the end of the current billing period</li>
                <li>No refunds will be provided for unused time</li>
                <li>Your profile will be removed from public view</li>
                <li>Patient appointment history will be retained per legal requirements</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                We reserve the right to suspend or terminate accounts that violate these terms or applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of the Platform are owned by UrgentCareX and protected by 
                copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or 
                reverse engineer any part of the Platform without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                UrgentCareX provides a platform for connecting doctors with patients but does not provide medical services. 
                You are solely responsible for the medical care you provide. We are not liable for any claims arising from 
                your professional services, malpractice, or patient interactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless UrgentCareX from any claims, damages, losses, or expenses 
                (including legal fees) arising from your use of the Platform, violation of these terms, or provision 
                of medical services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may modify these Terms of Service at any time. We will notify you of material changes via email or 
                through the Platform. Continued use of the Platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">UrgentCareX Legal Team</p>
                <p className="text-gray-700">Email: legal@urgentcarex.com</p>
                <p className="text-gray-700">Phone: +1 (800) 555-1234</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
