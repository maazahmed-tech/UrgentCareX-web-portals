import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function DoctorForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sending reset link
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/doctor')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Login</span>
          </button>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-xl font-semibold mb-2">Check Your Email</h1>
              <p className="text-gray-600">
                We've sent password reset instructions to
              </p>
              <p className="text-gray-900 font-medium mt-1">{email}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Didn't receive the email?</span>
                  <br />
                  Check your spam folder or try again with a different email address.
                </p>
              </div>

              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Try Different Email
              </Button>

              <Button
                onClick={() => navigate('/doctor')}
                className="w-full bg-gray-900 hover:bg-gray-800"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Login</span>
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">UC</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dr.johnson@downtownmed.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
              Send Reset Link
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/doctor')}
                  className="text-gray-900 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}