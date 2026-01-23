import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function PasswordReset() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength indicators
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const passwordStrength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber].filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 4) {
      setError('Password does not meet security requirements');
      return;
    }

    // Mock password reset
    alert('Password reset successfully!');
    navigate('/facility');
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'No password';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/facility')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <X className="w-4 h-4" />
          <span className="text-sm">Back to Login</span>
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">UC</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Reset Password</h1>
            <p className="text-gray-600">Create a new password for your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter new password"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Password strength:</span>
                    <span className={`text-sm font-medium ${
                      passwordStrength <= 2 ? 'text-red-600' :
                      passwordStrength === 3 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
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
                  placeholder="Confirm new password"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Password must contain:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    hasMinLength ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    {hasMinLength && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <span className={`text-sm ${hasMinLength ? 'text-green-600' : 'text-gray-600'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    hasUpperCase ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    {hasUpperCase && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <span className={`text-sm ${hasUpperCase ? 'text-green-600' : 'text-gray-600'}`}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    hasLowerCase ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    {hasLowerCase && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <span className={`text-sm ${hasLowerCase ? 'text-green-600' : 'text-gray-600'}`}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    hasNumber ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    {hasNumber && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <span className={`text-sm ${hasNumber ? 'text-green-600' : 'text-gray-600'}`}>
                    One number
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}