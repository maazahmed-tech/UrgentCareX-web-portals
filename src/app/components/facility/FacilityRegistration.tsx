import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Building2, 
  MapPin, 
  Phone, 
  Mail,
  Lock,
  CreditCard,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

type Step = 1 | 2 | 3 | 4 | 5;

export function FacilityRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Step 1: Email & Password
  const [email, setEmail] = useState('newclinic@healthfirst.com');
  const [password, setPassword] = useState('Password123');
  const [confirmPassword, setConfirmPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2: Facility Information
  const [facilityName, setFacilityName] = useState('HealthFirst Urgent Care');
  const [facilityType, setFacilityType] = useState('Urgent Care');
  const [address, setAddress] = useState('456 Market Street');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94103');
  const [phoneNumber, setPhoneNumber] = useState('(415) 555-0123');

  // Step 3: Operating Details
  const [mondayFriday, setMondayFriday] = useState('8:00 AM - 8:00 PM');
  const [saturday, setSaturday] = useState('9:00 AM - 5:00 PM');
  const [sunday, setSunday] = useState('10:00 AM - 4:00 PM');

  // Step 4: Payment Information
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardName, setCardName] = useState('John Smith');
  const [expiryDate, setExpiryDate] = useState('12/28');
  const [cvv, setCvv] = useState('123');

  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Password strength
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordStrength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber].filter(Boolean).length;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 4) {
      setError('Password does not meet security requirements');
      return;
    }

    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setCurrentStep(5);
  };

  const handleFinish = () => {
    // Mock registration - in real app, would save to backend
    navigate('/facility/dashboard');
  };

  // Step 5: Success Screen
  if (currentStep === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Registration Successful!</h1>
            <p className="text-gray-600 mb-6">
              Welcome to UrgentCareX! Your facility account for <span className="font-semibold">{facilityName}</span> has been created successfully.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-900 font-medium mb-2">
                🎉 14-Day Free Trial Activated!
              </p>
              <p className="text-sm text-green-800">
                Your trial starts now with full access to all features. You won't be charged until {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                <span className="font-medium">What's next?</span>
                <br />
                Complete your facility profile and start managing your urgent care services.
              </p>
            </div>
            <Button
              onClick={handleFinish}
              className="w-full bg-gray-900 hover:bg-gray-800"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-2xl px-8">
        {/* Back Button */}
        <button
          onClick={() => currentStep === 1 ? navigate('/facility') : setCurrentStep((currentStep - 1) as Step)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{currentStep === 1 ? 'Back to Login' : 'Previous Step'}</span>
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">UC</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Create Facility Account</h1>
            <p className="text-gray-600">Step {currentStep} of 4</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    step <= currentStep ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Email & Password */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="facility@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
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
                {password && (
                  <div className="mt-2 space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          passwordStrength <= 2 ? 'bg-red-500' :
                          passwordStrength === 3 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-1 ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasMinLength ? '✓' : '○'} 8+ characters
                      </div>
                      <div className={`flex items-center gap-1 ${hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasUpperCase ? '✓' : '○'} Uppercase letter
                      </div>
                      <div className={`flex items-center gap-1 ${hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasLowerCase ? '✓' : '○'} Lowercase letter
                      </div>
                      <div className={`flex items-center gap-1 ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasNumber ? '✓' : '○'} Number
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
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

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Continue
              </Button>
            </form>
          )}

          {/* Step 2: Facility Information */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <Label htmlFor="facilityName">Facility Name</Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="facilityName"
                    type="text"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="Downtown Medical Center"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="facilityType">Facility Type</Label>
                <select
                  id="facilityType"
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 mt-1"
                  required
                >
                  <option value="">Select facility type</option>
                  <option value="Urgent Care">Urgent Care</option>
                  <option value="Primary Care">Primary Care</option>
                  <option value="Specialty Care">Specialty Care</option>
                </select>
              </div>

              <div>
                <Label htmlFor="address">Street Address</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 mt-1"
                    required
                  >
                    <option value="">Select state</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="IL">Illinois</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="OH">Ohio</option>
                    <option value="GA">Georgia</option>
                    <option value="NC">North Carolina</option>
                    <option value="MI">Michigan</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="94102"
                  className="mt-1"
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Continue
              </Button>
            </form>
          )}

          {/* Step 3: Operating Hours */}
          {currentStep === 3 && (
            <form onSubmit={handleStep3Submit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Operating Hours</span>
                  <br />
                  Set your default operating hours. You can customize these later in your profile.
                </p>
              </div>

              <div>
                <Label htmlFor="mondayFriday">Monday - Friday</Label>
                <Input
                  id="mondayFriday"
                  type="text"
                  value={mondayFriday}
                  onChange={(e) => setMondayFriday(e.target.value)}
                  placeholder="8:00 AM - 8:00 PM"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="saturday">Saturday</Label>
                <Input
                  id="saturday"
                  type="text"
                  value={saturday}
                  onChange={(e) => setSaturday(e.target.value)}
                  placeholder="9:00 AM - 5:00 PM"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sunday">Sunday</Label>
                <Input
                  id="sunday"
                  type="text"
                  value={sunday}
                  onChange={(e) => setSunday(e.target.value)}
                  placeholder="10:00 AM - 4:00 PM"
                  className="mt-1"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Continue
              </Button>
            </form>
          )}

          {/* Step 4: Payment Information */}
          {currentStep === 4 && (
            <form onSubmit={handleStep4Submit} className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-900">
                  <span className="font-medium">🎉 Start Your 14-Day Free Trial</span>
                  <br />
                  Enter your payment information to unlock your trial. You won't be charged until the trial ends.
                </p>
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative mt-1">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="pl-10"
                    maxLength={19}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    className="mt-1"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="mt-1"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By providing your payment information, you agree to our Terms of Service and Privacy Policy. 
                  After your 14-day trial, you'll be automatically enrolled in the Monthly plan ($49/month) unless you cancel or change your plan.
                </p>
              </div>

              {/* Terms & Conditions Agreement */}
              <div className="flex items-start gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <label htmlFor="agreedToTerms" className="text-sm text-gray-700 leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => window.open('/facility/terms', '_blank')}
                    className="text-gray-900 font-medium underline hover:no-underline"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => window.open('/facility/privacy', '_blank')}
                    className="text-gray-900 font-medium underline hover:no-underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Complete Registration
              </Button>
            </form>
          )}

          {/* Sign In Link */}
          {currentStep === 1 && (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/facility')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>

              {/* Policy Links */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center mb-2">
                  Review our policies before signing up
                </p>
                <div className="flex items-center justify-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => window.open('/facility/terms', '_blank')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Terms of Service
                  </button>
                  <span className="text-gray-400">•</span>
                  <button
                    type="button"
                    onClick={() => window.open('/facility/privacy', '_blank')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}