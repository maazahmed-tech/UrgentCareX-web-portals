import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowLeft, Info, Mail } from 'lucide-react';
import { login } from '@/lib/auth';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

type LoginStep = 'credentials' | 'otp';

export function FacilityLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('📍 Current Screen: Facility Login -', step === 'credentials' ? 'Credentials' : 'OTP Verification');
  }, [step]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = login(email, password);
    if (user && user.role === 'facility') {
      // Generate and "send" OTP
      const otpCode = '123456'; // Demo OTP - always the same for easy testing
      setOtp(otpCode);
      console.log('🔐 OTP sent to email:', otpCode);
      setStep('otp');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp === '123456') {
      navigate('/facility/dashboard');
    } else {
      setError('Invalid OTP code. Please try again.');
    }
  };

  const handleResendOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otpCode);
    console.log('🔐 New OTP sent to email:', otpCode);
    setError('');
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    setOtp('');
    setError('');
  };

  const fillDemoCredentials = () => {
    setEmail('facility@downtownmed.com');
    setPassword('password123');
  };

  const handleOtpChange = (value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    setOtp(value);

    // Auto-focus next input
    if (value && value.length < 6) {
      const nextInput = document.getElementById(`otp-${value.length}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = pastedData.split('');
      while (newOtp.length < 6) newOtp.push('');
      setOtp(newOtp.join(''));
      // Focus the last filled input or the next empty one
      const nextIndex = Math.min(pastedData.length, 5);
      document.getElementById(`otp-${nextIndex}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Portal Selection</span>
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">UC</span>
            </div>
            <h1 className="text-xl font-semibold">UrgentCareX</h1>
            <p className="text-gray-600">Facility Portal</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</p>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><span className="font-medium">Email:</span> facility@downtownmed.com</p>
                  <p><span className="font-medium">Password:</span> password123</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Click to fill demo credentials
                </button>
              </div>
            </div>
          </div>

          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="facility@downtownmed.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Sign In
              </Button>

              <div className="text-center">
                <a 
                  href="/facility/forgot-password" 
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="text-center text-sm">
                <p className="text-gray-600 mb-2">New facility?</p>
                <button
                  type="button"
                  onClick={() => navigate('/facility/register')}
                  className="text-gray-900 font-medium underline hover:no-underline"
                >
                  Create Facility Account
                </button>
              </div>

              {/* Policy Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center mb-2">
                  By using UrgentCareX, you agree to our
                </p>
                <div className="flex items-center justify-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => navigate('/facility/terms')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Terms of Service
                  </button>
                  <span className="text-gray-400">•</span>
                  <button
                    type="button"
                    onClick={() => navigate('/facility/privacy')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <div>
              {/* OTP Sent Confirmation */}
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900 mb-1">OTP Sent Successfully</p>
                    <p className="text-sm text-green-800">
                      A 6-digit verification code has been sent to <strong>{email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                  <div className="flex gap-2">
                    {otp.split('').map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        placeholder="1"
                        maxLength={1}
                        required
                        className="mt-1 text-center text-2xl tracking-widest"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Please enter the code sent to your email
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                  Verify & Sign In
                </Button>

                <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    onClick={handleBackToCredentials}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ← Back
                  </button>
                </div>

                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    Didn't receive the code? Check your spam folder or click "Resend OTP"
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}