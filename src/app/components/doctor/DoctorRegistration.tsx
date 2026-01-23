import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Eye, EyeOff, Check, X, Mail, Lock, User, Briefcase, Phone, FileText, CheckCircle, CreditCard, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export function DoctorRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  useEffect(() => {
    console.log('📍 Current Screen: Doctor Registration - Step', currentStep);
  }, [currentStep]);

  // Step 1 data
  const [email, setEmail] = useState('dr.johnson@medcare.com');
  const [password, setPassword] = useState('Password123');
  const [confirmPassword, setConfirmPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2 data
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Johnson');
  const [phoneNumber, setPhoneNumber] = useState('(555) 789-0123');
  const [about, setAbout] = useState('Dedicated family medicine physician with over 15 years of experience providing compassionate, patient-centered care. Specializing in preventive care, chronic disease management, and wellness programs.');

  // Step 3 data - Credentials & Experience
  const [medicalSchool, setMedicalSchool] = useState('Harvard Medical School');
  const [residency, setResidency] = useState('Johns Hopkins Hospital');
  const [yearsOfExperience, setYearsOfExperience] = useState('15+ years');
  const [licenseNumber, setLicenseNumber] = useState('MD123456');
  const [npiNumber, setNpiNumber] = useState('1234567890');

  // Step 4 data - Practice Details
  const [addressStreet, setAddressStreet] = useState('123 Medical Plaza');
  const [addressSuite, setAddressSuite] = useState('Suite 200');
  const [addressCity, setAddressCity] = useState('San Francisco');
  const [addressState, setAddressState] = useState('CA');
  const [addressZipCode, setAddressZipCode] = useState('94102');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Preventive Care', 'Chronic Disease', 'Diabetes Management']);

  const specialtyOptions = [
    'Preventive Care',
    'Chronic Disease Management',
    'Diabetes Management',
    'Hypertension',
    'Annual Checkups',
    'Pediatric Care',
    'Women\'s Health',
    'Men\'s Health',
    'Geriatric Care',
    'Sports Medicine',
    'Mental Health',
    'Cardiology',
    'Dermatology',
    'Gastroenterology',
    'Orthopedics',
    'Pulmonology',
    'Neurology',
    'Allergy & Immunology',
    'Infectious Disease',
    'Endocrinology',
    'Rheumatology',
    'Urgent Care',
    'Travel Medicine',
    'Weight Management',
    'Sleep Medicine'
  ];

  const stateOptions = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const cityOptions = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco',
    'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
    'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City',
    'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore',
    'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
    'Kansas City', 'Long Beach', 'Mesa', 'Atlanta', 'Colorado Springs',
    'Virginia Beach', 'Raleigh', 'Omaha', 'Miami', 'Oakland',
    'Minneapolis', 'Tulsa', 'Wichita', 'New Orleans', 'Arlington'
  ];

  const yearsOfExperienceOptions = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '5-10 years',
    '10-15 years',
    '15-20 years',
    '20-25 years',
    '25+ years'
  ];

  // Step 5: Payment Information
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardName, setCardName] = useState('Sarah Johnson');
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
    setCurrentStep(5);
  };

  const handleStep5Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setCurrentStep(6);
  };

  const handleFinish = () => {
    // Mock registration - in real app, would save to backend
    navigate('/doctor/dashboard');
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleAvailabilityChange = (day: string, field: 'enabled' | 'start' | 'end', value: boolean | string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  // Step 6: Success Screen
  if (currentStep === 6) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Registration Successful!</h1>
            <p className="text-gray-600 mb-6">
              Welcome to UrgentCareX, Dr. {firstName} {lastName}! Your account has been created successfully.
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
                Complete your profile and set your availability to start accepting appointments.
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        {/* Back Button */}
        <button
          onClick={() => currentStep === 1 ? navigate('/doctor') : setCurrentStep((currentStep - 1) as Step)}
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
            <h1 className="text-xl font-semibold mb-2">Create Doctor Account</h1>
            <p className="text-gray-600">Step {currentStep} of 5</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
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
                    placeholder="your.email@example.com"
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
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          passwordStrength <= 2 ? 'bg-red-500' :
                          passwordStrength === 3 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
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

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="mt-1"
                    required
                  />
                </div>
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

              <div>
                <Label htmlFor="about">About Me</Label>
                <textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about your experience and specialties"
                  className="w-full h-24 mt-1 p-2 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Continue
              </Button>
            </form>
          )}

          {/* Step 3: Professional Information */}
          {currentStep === 3 && (
            <form onSubmit={handleStep3Submit} className="space-y-4">
              <div>
                <Label htmlFor="medicalSchool">Medical School</Label>
                <div className="relative mt-1">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="medicalSchool"
                    type="text"
                    value={medicalSchool}
                    onChange={(e) => setMedicalSchool(e.target.value)}
                    placeholder="Enter your medical school"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="residency">Residency</Label>
                <div className="relative mt-1">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="residency"
                    type="text"
                    value={residency}
                    onChange={(e) => setResidency(e.target.value)}
                    placeholder="Enter your residency"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <div className="relative mt-1">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="yearsOfExperience"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    className="pl-10 w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm text-gray-900 bg-white"
                    required
                  >
                    {yearsOfExperienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Continue
              </Button>
            </form>
          )}

          {/* Step 4: Practice Details */}
          {currentStep === 4 && (
            <form onSubmit={handleStep4Submit} className="space-y-4">
              <div>
                <Label htmlFor="addressStreet">Street Address</Label>
                <Input
                  id="addressStreet"
                  type="text"
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  placeholder="123 Medical Plaza"
                  className="mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter your building number and street name (e.g., 123 Medical Plaza)</p>
              </div>

              <div>
                <Label htmlFor="addressSuite">Suite / Unit / Floor (Optional)</Label>
                <Input
                  id="addressSuite"
                  type="text"
                  value={addressSuite}
                  onChange={(e) => setAddressSuite(e.target.value)}
                  placeholder="Suite 200"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Add suite, building, floor, or unit number if applicable</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="addressCity">City</Label>
                  <select
                    id="addressCity"
                    value={addressCity}
                    onChange={(e) => setAddressCity(e.target.value)}
                    className="mt-1 w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  >
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Select your city from the list</p>
                </div>

                <div>
                  <Label htmlFor="addressState">State</Label>
                  <select
                    id="addressState"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    className="mt-1 w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  >
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">State</p>
                </div>
              </div>

              <div>
                <Label htmlFor="addressZipCode">ZIP Code</Label>
                <Input
                  id="addressZipCode"
                  type="text"
                  value={addressZipCode}
                  onChange={(e) => setAddressZipCode(e.target.value)}
                  placeholder="94102"
                  className="mt-1"
                  maxLength={5}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">5-digit ZIP code</p>
              </div>

              <div>
                <Label>Specialties</Label>
                <p className="text-xs text-gray-600 mt-1 mb-2">Select all that apply</p>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {specialtyOptions.map((specialty) => (
                    <label
                      key={specialty}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {selectedSpecialties.length} selected
                </p>
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Continue
              </Button>
            </form>
          )}

          {/* Step 5: Payment Information */}
          {currentStep === 5 && (
            <form onSubmit={handleStep5Submit} className="space-y-4">
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
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <label htmlFor="agreedToTerms" className="text-sm text-gray-700 cursor-pointer">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => window.open('/facility/terms', '_blank')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => window.open('/facility/privacy', '_blank')}
                    className="text-gray-900 font-medium hover:underline"
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
                Start Free Trial
              </Button>
            </form>
          )}

          {/* Sign In Link */}
          {currentStep === 1 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/doctor')}
                  className="text-gray-900 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}