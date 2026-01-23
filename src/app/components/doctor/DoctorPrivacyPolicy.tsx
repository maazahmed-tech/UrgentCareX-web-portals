import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function DoctorPrivacyPolicy() {
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
            <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">Privacy Policy</h1>
            <p className="text-gray-600 text-center">UrgentCareX Doctor Portal</p>
            <p className="text-sm text-gray-500 text-center mt-2">Last updated: January 28, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                UrgentCareX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how 
                we collect, use, disclose, and safeguard your information when you use our Doctor Portal platform. Please 
                read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access 
                the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Account Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">When you register for a Doctor Portal account, we collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email address and password</li>
                <li>Full name and professional credentials</li>
                <li>Medical license number and NPI</li>
                <li>Practice address and contact information</li>
                <li>Specialty and services offered</li>
                <li>Languages spoken</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Payment Information</h3>
              <p className="text-gray-700 leading-relaxed">
                We collect payment card information necessary to process your subscription. Payment processing is handled by 
                secure third-party payment processors. We do not store complete credit card numbers on our servers.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Usage Data</h3>
              <p className="text-gray-700 leading-relaxed mb-3">We automatically collect certain information when you use the platform:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and features used</li>
                <li>Appointment data and patient interactions</li>
                <li>Time and date of access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create and manage your provider account</li>
                <li>Process subscription payments and billing</li>
                <li>Facilitate patient-doctor matching</li>
                <li>Display your provider profile to patients</li>
                <li>Manage appointments and availability</li>
                <li>Send administrative notifications and updates</li>
                <li>Provide customer support</li>
                <li>Improve and optimize our platform</li>
                <li>Detect and prevent fraud or security issues</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. HIPAA Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                UrgentCareX is committed to compliance with the Health Insurance Portability and Accountability Act (HIPAA) 
                and other applicable healthcare privacy laws. All patient health information is encrypted and protected according 
                to industry standards. We never share protected health information without proper authorization.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We may share your information in the following situations:</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Public Display</h3>
              <p className="text-gray-700 leading-relaxed">
                Your provider profile (name, specialty, credentials, practice location, languages) is displayed publicly to 
                help patients find healthcare providers.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Service Providers</h3>
              <p className="text-gray-700 leading-relaxed">
                We may share information with third-party service providers who perform services on our behalf, such as payment 
                processing, data analytics, and customer service. All providers are bound by confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your information, including 
                encryption, secure socket layer technology (SSL), and regular security audits. However, no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">UrgentCareX Privacy Team</p>
                <p className="text-gray-700">Email: privacy@urgentcarex.com</p>
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
