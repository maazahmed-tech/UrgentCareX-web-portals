import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, FileText, Phone, Mail, HelpCircle, ShieldAlert, Trash2, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { ScrollArea } from '@/app/components/ui/scroll-area';

type PolicyType = 'privacy' | 'terms' | 'data' | 'disclaimer' | 'hipaa' | null;

const policyContent = {
  privacy: {
    title: '🔒 Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        heading: 'How We Use Your Information',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        heading: 'Data Security',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
      },
      {
        heading: 'Your Rights',
        content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }
    ]
  },
  terms: {
    title: '📄 Terms of Service',
    sections: [
      {
        heading: 'Acceptance of Terms',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor, erat sed dignissim posuere, mi nisi tincidunt nisi, nec aliquam magna lorem ac nunc.'
      },
      {
        heading: 'User Obligations',
        content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.'
      },
      {
        heading: 'Service Availability',
        content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.'
      },
      {
        heading: 'Termination',
        content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
      }
    ]
  },
  data: {
    title: '📋 How We Use Your Data',
    sections: [
      {
        heading: 'Data Collection Practices',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.'
      },
      {
        heading: 'Third-Party Sharing',
        content: 'Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae.'
      },
      {
        heading: 'Data Retention',
        content: 'Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero.'
      },
      {
        heading: 'Your Control Over Data',
        content: 'Praesent venenatis metus at tortor pulvinar varius. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus.'
      }
    ]
  },
  disclaimer: {
    title: '⚠️ Important Disclaimer',
    sections: [
      {
        heading: 'Medical Information Disclaimer',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The information provided through UrgentCareX is for informational purposes only and does not constitute medical advice. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        heading: 'No Professional Relationship',
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Use of this platform does not create a doctor-patient relationship. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        heading: 'Limitation of Liability',
        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        heading: 'Emergency Situations',
        content: 'In case of medical emergency, call 911 immediately. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.'
      }
    ]
  },
  hipaa: {
    title: '🏥 HIPAA Notice',
    sections: [
      {
        heading: 'HIPAA Compliance',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. UrgentCareX is committed to maintaining compliance with the Health Insurance Portability and Accountability Act (HIPAA). Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        heading: 'Protected Health Information',
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. We implement appropriate safeguards to protect your protected health information (PHI) from unauthorized access, use, or disclosure.'
      },
      {
        heading: 'Your HIPAA Rights',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. You have the right to access, amend, and request restrictions on the use and disclosure of your PHI. Excepteur sint occaecat cupidatat non proident.'
      },
      {
        heading: 'Security Measures',
        content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium. We employ administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and availability of electronic protected health information.'
      },
      {
        heading: 'Business Associates',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We ensure that all business associates who handle PHI on our behalf are compliant with HIPAA requirements through signed Business Associate Agreements (BAAs).'
      }
    ]
  }
};

export function DoctorSettings() {
  const navigate = useNavigate();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSuspendAccount = () => {
    localStorage.setItem('doctorAccountSuspended', 'true');
    // Dispatch custom event to notify DashboardLayout
    window.dispatchEvent(new Event('suspensionChange'));
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    // For now, we'll clear localStorage and redirect to login
    localStorage.clear();
    navigate('/doctor');
  };

  return (
    <DashboardLayout title="Settings" role="doctor">
      <div className="max-w-3xl space-y-6">
        {/* Security */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-600">Manage your password and security settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Last changed 45 days ago</p>
              </div>
              <Button
                onClick={() => navigate('/doctor/change-password')}
                variant="outline"
              >
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Sends a 6-digit OTP code to your registered email</p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Policies</h2>
              <p className="text-sm text-gray-600">View our terms and policies</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <p className="font-medium text-gray-900">Privacy Policy</p>
              </div>
              <Button
                onClick={() => setSelectedPolicy('privacy')}
                variant="outline"
              >
                View
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <p className="font-medium text-gray-900">Terms of Service</p>
              </div>
              <Button
                onClick={() => setSelectedPolicy('terms')}
                variant="outline"
              >
                View
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📋</span>
                <p className="font-medium text-gray-900">How We Use Your Data</p>
              </div>
              <Button
                onClick={() => setSelectedPolicy('data')}
                variant="outline"
              >
                View
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <p className="font-medium text-gray-900">Important Disclaimer</p>
              </div>
              <Button
                onClick={() => setSelectedPolicy('disclaimer')}
                variant="outline"
              >
                View
              </Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏥</span>
                <p className="font-medium text-gray-900">HIPAA Notice</p>
              </div>
              <Button
                onClick={() => setSelectedPolicy('hipaa')}
                variant="outline"
              >
                View
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Contact Support</h2>
              <p className="text-sm text-gray-600">Need help with your subscription or have questions? Reach out to our support team:</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 py-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Phone</p>
                <p className="text-gray-900">+1 (800) 555-1234</p>
                <p className="text-sm text-gray-600">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Email</p>
                <p className="text-gray-900">support@urgentcarex.com</p>
                <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Tools */}
        <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Testing Tools</h2>
              <p className="text-sm text-gray-600">Developer tools for testing account states</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Simulate Account Suspension</p>
                <p className="text-sm text-gray-600">Test the account suspension overlay and lockdown experience</p>
              </div>
              <Button
                onClick={handleSuspendAccount}
                variant="outline"
                className="bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700"
              >
                Suspend Account
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
              <p className="text-sm text-red-700">Irreversible and destructive actions</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-700">Permanently delete your doctor account and all associated data. This action cannot be undone.</p>
              </div>
              <Button
                onClick={() => setShowDeleteModal(true)}
                variant="outline"
                className="bg-white border-red-300 text-red-600 hover:bg-red-100 hover:border-red-400"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Delete Account?</h3>
                <p className="text-sm text-gray-600">This action is permanent</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 mb-3">
                <strong>Warning:</strong> This will permanently delete your doctor account including:
              </p>
              <ul className="text-sm text-red-700 space-y-1 ml-4 list-disc">
                <li>All profile and credential information</li>
                <li>Appointment history and patient records</li>
                <li>Availability schedule and settings</li>
                <li>Subscription and billing data</li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="font-bold text-red-600">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  deleteConfirmText === 'DELETE'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Dialog */}
      <Dialog open={selectedPolicy !== null} onOpenChange={() => setSelectedPolicy(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {policyContent[selectedPolicy as PolicyType]?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Please review the following information carefully
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {policyContent[selectedPolicy as PolicyType]?.sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold">{section.heading}</h3>
                  <p className="text-sm text-gray-600">{section.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
