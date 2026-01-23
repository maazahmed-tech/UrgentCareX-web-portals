import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function PrivacyPolicy() {
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
            <p className="text-gray-600 text-center">UrgentCareX Facility Portal</p>
            <p className="text-sm text-gray-500 text-center mt-2">Last updated: January 21, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                UrgentCareX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how 
                we collect, use, disclose, and safeguard your information when you use our Facility Portal platform. Please 
                read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access 
                the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Account Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">When you register for a Facility Portal account, we collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email address and password</li>
                <li>Facility name and contact information</li>
                <li>Business address and phone number</li>
                <li>Operating hours and services offered</li>
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
                <li>Time and date of access</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create and manage your facility account</li>
                <li>Process subscription payments and billing</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Display your facility information to patients and users</li>
                <li>Send administrative notifications and updates</li>
                <li>Improve and optimize our platform</li>
                <li>Detect and prevent fraud or security issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We may share your information in the following situations:</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Public Display</h3>
              <p className="text-gray-700 leading-relaxed">
                Facility profile information (name, address, phone, hours, services) is displayed publicly to help patients 
                find urgent care services.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Service Providers</h3>
              <p className="text-gray-700 leading-relaxed">
                We may share information with third-party service providers who perform services on our behalf, such as payment 
                processing, data analytics, email delivery, hosting services, and customer service.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                We may disclose your information if required to do so by law or in response to valid requests by public 
                authorities (e.g., court orders or government agencies).
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of 
                that transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted storage of sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data privacy and security</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to 
                use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. HIPAA and Healthcare Data</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
                <p className="text-sm text-yellow-900 font-medium">Important Notice</p>
                <p className="text-sm text-yellow-800 mt-2">
                  The UrgentCareX Facility Portal is NOT intended for the storage or transmission of Protected Health Information 
                  (PHI) or patient medical records. Facilities must maintain their own HIPAA-compliant systems for handling PHI.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our platform is designed for facility management, profile updates, and operational information only. Any patient 
                health information must be handled through appropriate HIPAA-compliant channels outside of this platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your information for as long as your account is active or as needed to provide you services. We will 
                retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce 
                our agreements. After account termination, we may retain certain information for backup, archival, or audit purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request a copy of the information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your information (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to certain processing of your information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To exercise these rights, please contact us at privacy@urgentcarex.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
                do not accept cookies, you may not be able to use some portions of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform is not intended for use by children under the age of 18. We do not knowingly collect personal 
                information from children under 18. If you become aware that a child has provided us with personal information, 
                please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your state, province, 
                country, or other governmental jurisdiction where data protection laws may differ. We take steps to ensure that 
                your data is treated securely and in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically 
                for any changes. Changes are effective when posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700"><strong>Email:</strong> privacy@urgentcarex.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 1-800-URGENT-X</p>
                <p className="text-gray-700"><strong>Address:</strong> UrgentCareX Privacy Officer, 123 Healthcare Blvd, San Francisco, CA 94102</p>
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
