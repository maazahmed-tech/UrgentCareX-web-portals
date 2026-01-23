import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowLeft, Info } from 'lucide-react';
import { login } from '@/lib/auth';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function DoctorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('📍 Current Screen: Doctor Login');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = login(email, password);
    if (user && user.role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('dr.johnson@downtownmed.com');
    setPassword('password123');
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
            <p className="text-gray-600">Doctor Portal</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</p>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><span className="font-medium">Email:</span> dr.johnson@downtownmed.com</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.johnson@downtownmed.com"
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
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
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

            <div className="text-center">
              <p className="text-sm text-gray-600">New to UrgentCareX?</p>
              <button
                type="button"
                onClick={() => navigate('/doctor/register')}
                className="mt-2 text-sm text-gray-900 font-medium underline hover:no-underline"
              >
                Create Doctor Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}