import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function ChangePassword() {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log('📍 Current Screen: Admin Change Password');
  }, []);

  // Password strength validation
  const passwordRequirements = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordStrong =
    passwordRequirements.minLength &&
    passwordRequirements.hasUppercase &&
    passwordRequirements.hasLowercase &&
    passwordRequirements.hasNumber &&
    passwordRequirements.hasSpecial;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate current password
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // Validate new password
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!isPasswordStrong) {
      newErrors.newPassword = 'Password does not meet requirements';
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors[newErrors.length - 1]);
      return;
    }

    // In real app, this would make an API call
    setError('');
    setSuccess(true);
    
    // Reset form after 2 seconds and navigate back
    setTimeout(() => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/admin/settings');
    }, 2000);
  };

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={met ? 'text-green-600' : 'text-gray-600'}>{text}</span>
    </div>
  );

  return (
    <DashboardLayout title="Change Password" role="admin">
      <div className="max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/settings')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            Password changed successfully!
          </div>
        )}

        {/* Change Password Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Change Your Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter current password"
                  className={error ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter new password"
                  className={error ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}

              {/* Password Requirements */}
              {newPassword && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Password Requirements:
                  </p>
                  <RequirementItem
                    met={passwordRequirements.minLength}
                    text="At least 8 characters"
                  />
                  <RequirementItem
                    met={passwordRequirements.hasUppercase}
                    text="One uppercase letter"
                  />
                  <RequirementItem
                    met={passwordRequirements.hasLowercase}
                    text="One lowercase letter"
                  />
                  <RequirementItem
                    met={passwordRequirements.hasNumber}
                    text="One number"
                  />
                  <RequirementItem
                    met={passwordRequirements.hasSpecial}
                    text="One special character"
                  />
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Confirm new password"
                  className={error ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
              {confirmPassword &&
                newPassword === confirmPassword && (
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Passwords match
                  </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit">Change Password</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/settings')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Security Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Password Security Tips</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Use a unique password you don't use anywhere else</li>
            <li>• Avoid using personal information in your password</li>
            <li>• Consider using a password manager</li>
            <li>• Change your password regularly (every 90 days recommended)</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}