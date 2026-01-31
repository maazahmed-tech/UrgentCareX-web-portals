import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Eye, EyeOff, Lock, Check, X, CheckCircle2, XCircle } from 'lucide-react';
import { DoctorLayout } from '@/app/components/layouts/DoctorLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function DoctorChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength indicators
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword !== '';

  const allRequirementsMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const getPasswordStrength = () => {
    const requirements = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar];
    const metRequirements = requirements.filter(Boolean).length;

    if (metRequirements === 0) return { label: '', color: '' };
    if (metRequirements <= 2) return { label: 'Weak', color: 'text-red-500' };
    if (metRequirements <= 4) return { label: 'Medium', color: 'text-yellow-500' };
    return { label: 'Strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRequirementsMet) {
      alert('Please meet all password requirements');
      return;
    }

    if (!passwordsMatch) {
      alert('Passwords do not match');
      return;
    }

    // Simulate password change
    alert('Password changed successfully!');
    navigate('/doctor/settings');
  };

  return (
    <DoctorLayout title="Change Password">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <button
              onClick={() => navigate('/doctor/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Change Your Password</h2>
              <p className="text-xs md:text-sm text-gray-600">Ensure your password is strong and secure</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.label === 'Weak'
                            ? 'w-1/3 bg-red-500'
                            : passwordStrength.label === 'Medium'
                            ? 'w-2/3 bg-yellow-500'
                            : passwordStrength.label === 'Strong'
                            ? 'w-full bg-green-500'
                            : 'w-0'
                        }`}
                      />
                    </div>
                    <span className={`text-sm font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm font-medium text-gray-900 mb-2 md:mb-3">Password Requirements:</p>
              <div className="space-y-1.5 md:space-y-2">
                <RequirementItem met={hasMinLength} text="At least 8 characters" />
                <RequirementItem met={hasUpperCase} text="One uppercase letter" />
                <RequirementItem met={hasLowerCase} text="One lowercase letter" />
                <RequirementItem met={hasNumber} text="One number" />
                <RequirementItem met={hasSpecialChar} text="One special character (!@#$%^&*)" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-sm md:text-base"
                disabled={!allRequirementsMet || !passwordsMatch || !currentPassword}
              >
                Change Password
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/doctor/settings')}
                className="text-sm md:text-base"
              >
                Cancel
              </Button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs md:text-sm text-blue-800">
              <strong>Security Tip:</strong> Use a unique password that you don't use for other accounts.
              Consider using a password manager to keep track of your passwords securely.
            </p>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}

// Helper component for password requirements
function RequirementItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
      ) : (
        <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 flex-shrink-0" />
      )}
      <span className={`text-xs md:text-sm ${met ? 'text-green-700' : 'text-gray-600'}`}>{text}</span>
    </div>
  );
}