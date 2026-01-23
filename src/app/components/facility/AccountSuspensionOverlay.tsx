import { AlertTriangle, Phone, Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface AccountSuspensionOverlayProps {
  onUnsuspend?: () => void;
}

export function AccountSuspensionOverlay({ onUnsuspend }: AccountSuspensionOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Account Suspended
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your account has been temporarily suspended. Please contact our support team immediately to resolve this issue and restore access to your account.
        </p>

        {/* Support Contact Info */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Phone Support</p>
                <p className="text-lg font-semibold text-gray-900">+1 (800) 555-1234</p>
                <p className="text-xs text-gray-600">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Support</p>
                <p className="text-lg font-semibold text-gray-900">support@urgentcarex.com</p>
                <p className="text-xs text-gray-600">24-hour response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Toggle - Only visible in development */}
        {onUnsuspend && (
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Testing Mode</p>
            <Button
              onClick={onUnsuspend}
              variant="outline"
              className="w-full"
            >
              Remove Suspension (Test Mode)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}