import { AlertTriangle, Phone, Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface AccountSuspensionOverlayProps {
  onUnsuspend?: () => void;
}

export function AccountSuspensionOverlay({ onUnsuspend }: AccountSuspensionOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-3 md:p-4">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full p-5 md:p-8 text-center">
        {/* Warning Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
        </div>

        {/* Header */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
          Account Suspended
        </h1>

        <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-8">
          Your account has been temporarily suspended. Please contact our support team immediately to resolve this issue and restore access to your account.
        </p>

        {/* Support Contact Info */}
        <div className="space-y-3 md:space-y-4 mb-5 md:mb-8">
          <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-900">Phone Support</p>
                <p className="text-base md:text-lg font-semibold text-gray-900">+1 (800) 555-1234</p>
                <p className="text-xs text-gray-600">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-900">Email Support</p>
                <p className="text-sm md:text-lg font-semibold text-gray-900 break-all">support@urgentcarex.com</p>
                <p className="text-xs text-gray-600">24-hour response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Toggle - Only visible in development */}
        {onUnsuspend && (
          <div className="pt-4 md:pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2 md:mb-3">Testing Mode</p>
            <Button
              onClick={onUnsuspend}
              variant="outline"
              className="w-full text-sm md:text-base"
            >
              Remove Suspension (Test Mode)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}