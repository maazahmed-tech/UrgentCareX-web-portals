import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, Award, Calendar, Edit2, Save, Camera, MapPin, Briefcase, FileText, Star, CheckCircle, X, Settings, Plus, Trash2, Circle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { DoctorServicesEquipment } from '@/app/components/doctor/DoctorServicesEquipment';

interface DoctorProfileData {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  bio: string;
  licenseNumber: string;
  npi: string;
  medicalSchool: string;
  residency: string;
  yearsOfExperience: string;
  addressStreet: string;
  addressSuite: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  photoUrl: string;
  diagnosticCapabilities: string[];
  clinicalServices: string[];
  languages: string[];
}

interface Credential {
  id: string;
  type: string;
  number: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
}

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  appointmentType: string;
}

type TabType = 'basic' | 'education' | 'credentials' | 'reviews';

export function DoctorProfile() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('📍 Current Screen: Doctor Profile');
  }, []);

  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(() => {
    // Load availability status from localStorage
    const saved = localStorage.getItem('doctorAvailableNow');
    return saved ? JSON.parse(saved) : false;
  });
  const [profileData, setProfileData] = useState<DoctorProfileData>({
    name: user?.name || 'Dr. Sarah Johnson',
    email: user?.email || 'dr.johnson@downtownmed.com',
    phone: '(555) 123-4567',
    specialties: ['Preventive Care', 'Chronic Disease Management', 'Diabetes Management'],
    bio: 'Dedicated family medicine physician with over 15 years of experience providing compassionate, patient-centered care. Specializing in preventive care, chronic disease management, and wellness programs.',
    licenseNumber: 'MD-12345',
    npi: '1234567890',
    medicalSchool: 'Harvard Medical School',
    residency: 'Johns Hopkins Hospital',
    yearsOfExperience: '15+ years',
    addressStreet: '123 Medical Plaza',
    addressSuite: 'Suite 200',
    addressCity: 'San Francisco',
    addressState: 'CA',
    addressZipCode: '94102',
    photoUrl: '',
    diagnosticCapabilities: ['X-ray', 'EKG / Cardiac Testing', 'Lab Draw Services'],
    clinicalServices: ['Acute Care Visits', 'Pediatric Care', 'Vaccinations', 'Physical Examinations'],
    languages: ['English', 'Spanish'],
  });

  const [editedData, setEditedData] = useState(profileData);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const [credentials] = useState<Credential[]>([
    {
      id: '1',
      type: 'Medical License',
      number: 'MD-12345',
      issuer: 'State Medical Board',
      issuedDate: '2015-06-15',
      expiryDate: '2026-06-15',
      status: 'Active',
    },
    {
      id: '2',
      type: 'DEA Registration',
      number: 'DEA-987654',
      issuer: 'DEA',
      issuedDate: '2020-03-10',
      expiryDate: '2026-03-10',
      status: 'Active',
    },
    {
      id: '3',
      type: 'Board Certification',
      number: 'BC-56789',
      issuer: 'American Board of Internal Medicine',
      issuedDate: '2016-09-20',
      expiryDate: '2026-09-20',
      status: 'Active',
    },
    {
      id: '4',
      type: 'CPR Certification',
      number: 'CPR-11223',
      issuer: 'American Heart Association',
      issuedDate: '2024-01-15',
      expiryDate: '2026-01-15',
      status: 'Active',
    },
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      patientName: 'John Smith',
      rating: 5,
      comment: 'Dr. Sarah is an excellent physician. Very thorough and takes time to listen to concerns.',
      date: '2026-01-20',
      appointmentType: 'Follow-up',
    },
    {
      id: '2',
      patientName: 'Mary Wilson',
      rating: 4,
      comment: 'Great experience overall. The doctor was knowledgeable and professional. Would recommend!',
      date: '2026-01-20',
      appointmentType: 'New Patient',
    },
    {
      id: '3',
      patientName: 'Bob Johnson',
      rating: 5,
      comment: 'Exceptional care! The doctor explained everything clearly and addressed all my concerns. Highly satisfied with the consultation.',
      date: '2026-01-20',
      appointmentType: 'Follow-up',
    },
    {
      id: '4',
      patientName: 'Emily Davis',
      rating: 5,
      comment: 'Best doctor I\'ve ever had! Very caring and patient-centered approach.',
      date: '2026-01-18',
      appointmentType: 'Annual Checkup',
    },
    {
      id: '5',
      patientName: 'Michael Brown',
      rating: 4,
      comment: 'Very professional and knowledgeable. Took the time to answer all my questions.',
      date: '2026-01-15',
      appointmentType: 'Chronic Disease Management',
    },
    {
      id: '6',
      patientName: 'Sarah Martinez',
      rating: 5,
      comment: 'Highly recommend Dr. Sarah! She is compassionate and truly cares about her patients.',
      date: '2026-01-10',
      appointmentType: 'Diabetes Management',
    },
    {
      id: '7',
      patientName: 'James Anderson',
      rating: 5,
      comment: 'Outstanding physician. I feel confident in her medical expertise.',
      date: '2026-01-08',
      appointmentType: 'Follow-up',
    },
    {
      id: '8',
      patientName: 'Linda Taylor',
      rating: 4,
      comment: 'Good experience. The doctor was attentive and provided clear explanations.',
      date: '2026-01-05',
      appointmentType: 'Preventive Care',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'Mandarin Chinese',
    'Cantonese',
    'Tagalog',
    'Vietnamese',
    'Korean',
    'Arabic',
    'Russian',
    'German',
    'Portuguese',
    'Italian',
    'Japanese',
    'Hindi'
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

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    setShowSpecialtyDropdown(false);
    setShowLanguageDropdown(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
    setShowSpecialtyDropdown(false);
    setShowLanguageDropdown(false);
  };

  const handleChange = (field: keyof DoctorProfileData, value: string | string[]) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const toggleSpecialty = (specialty: string) => {
    const currentSpecialties = editedData.specialties;
    if (currentSpecialties.includes(specialty)) {
      handleChange('specialties', currentSpecialties.filter(s => s !== specialty));
    } else {
      handleChange('specialties', [...currentSpecialties, specialty]);
    }
  };

  const removeSpecialty = (specialty: string) => {
    handleChange('specialties', editedData.specialties.filter(s => s !== specialty));
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = editedData.languages;
    if (currentLanguages.includes(language)) {
      handleChange('languages', currentLanguages.filter(l => l !== language));
    } else {
      handleChange('languages', [...currentLanguages, language]);
    }
  };

  const removeLanguage = (language: string) => {
    handleChange('languages', editedData.languages.filter(l => l !== language));
  };

  const handleToggleAvailability = () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    // Persist to localStorage
    localStorage.setItem('doctorAvailableNow', JSON.stringify(newStatus));
  };

  // Calculate profile completeness
  const calculateCompleteness = () => {
    const fields = [
      profileData.name,
      profileData.email,
      profileData.phone,
      profileData.bio,
      profileData.licenseNumber,
      profileData.npi,
      profileData.medicalSchool,
      profileData.residency,
      profileData.yearsOfExperience,
      profileData.addressStreet,
      profileData.addressSuite,
      profileData.addressCity,
      profileData.addressState,
      profileData.addressZipCode,
      profileData.specialties.length > 0 ? 'yes' : '',
      profileData.photoUrl,
      profileData.diagnosticCapabilities.length > 0 ? 'yes' : '',
      profileData.clinicalServices.length > 0 ? 'yes' : '',
      profileData.languages.length > 0 ? 'yes' : '',
    ];
    const completed = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const getProfileSections = () => {
    return [
      {
        name: 'Basic Information',
        completed: !!(profileData.name && profileData.email && profileData.phone && profileData.bio),
        items: ['Name', 'Email', 'Phone', 'Bio']
      },
      {
        name: 'Credentials',
        completed: !!(profileData.licenseNumber && profileData.npi),
        items: ['Medical License', 'NPI Number']
      },
      {
        name: 'Education',
        completed: !!(profileData.medicalSchool && profileData.residency && profileData.yearsOfExperience),
        items: ['Medical School', 'Residency', 'Experience']
      },
      {
        name: 'Practice Location',
        completed: !!(profileData.addressStreet && profileData.addressCity && profileData.addressState && profileData.addressZipCode),
        items: ['Street Address', 'City', 'State', 'ZIP Code']
      },
      {
        name: 'Specialties',
        completed: profileData.specialties.length > 0,
        items: [`${profileData.specialties.length} specialties selected`]
      },
      {
        name: 'Services & Equipment',
        completed: profileData.diagnosticCapabilities.length > 0 || profileData.clinicalServices.length > 0,
        items: [`${profileData.diagnosticCapabilities.length} diagnostic, ${profileData.clinicalServices.length} clinical`]
      },
      {
        name: 'Profile Photo',
        completed: !!profileData.photoUrl,
        items: ['Professional headshot']
      },
      {
        name: 'Languages',
        completed: profileData.languages.length > 0,
        items: [`${profileData.languages.length} languages spoken`]
      },
    ];
  };

  const completeness = calculateCompleteness();
  const profileSections = getProfileSections();
  const completedSections = profileSections.filter(s => s.completed).length;

  const tabs = [
    { id: 'basic' as TabType, label: 'Basic Info', icon: User },
    { id: 'education' as TabType, label: 'Education & Training', icon: FileText },
    { id: 'credentials' as TabType, label: 'Credentials', icon: Award },
    { id: 'reviews' as TabType, label: 'Patient Reviews', icon: Star },
  ];

  return (
    <DashboardLayout title="My Profile" role="doctor">
      <div className="max-w-5xl h-full flex flex-col">
        {/* Profile Header with Progress - Fixed */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 mb-4 md:mb-6 flex-shrink-0">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            {/* Profile Photo */}
            <div className="flex flex-col items-center w-full md:w-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-xl md:text-2xl font-semibold relative overflow-hidden shadow-lg">
                {profileData.photoUrl ? (
                  <img src={profileData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{profileData.name.split(' ').map(n => n[0]).join('')}</span>
                )}
              </div>
              <button className="mt-3 flex items-center gap-2 px-3 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs">
                <Camera className="w-3 h-3" />
                Change Photo
              </button>
            </div>

            {/* Profile Summary */}
            <div className="flex-1 w-full">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 text-center md:text-left">{profileData.name}</h1>

              {/* Profile Completion Progress */}
              <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900">{completeness}% • {completedSections}/{profileSections.length} sections</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completeness}%` }}
                  />
                </div>

                {/* Checklist */}
                <div className="grid grid-cols-2 gap-x-3 md:gap-x-4 gap-y-2">
                  {profileSections.map((section) => (
                    <div key={section.name} className="flex items-center gap-2">
                      {section.completed ? (
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-3 h-3 md:w-4 md:h-4 text-red-500 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${section.completed ? 'text-gray-700' : 'text-red-600'}`}>
                        {section.name}
                      </span>
                    </div>
                  ))}
                </div>

                {completeness < 100 && (
                  <p className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-200">
                    Complete your profile to improve patient trust and visibility
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Fixed */}
        <div className="bg-white rounded-t-xl border border-b-0 border-gray-200 flex-shrink-0 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsEditing(false);
                    setEditedData(profileData);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content - Scrollable */}
        <div className="bg-white rounded-b-xl border border-gray-200 flex-1 flex flex-col overflow-hidden">
          {/* Edit/Save Buttons - Fixed within content area */}
          {activeTab !== 'credentials' && activeTab !== 'reviews' && (
            <div className="flex justify-end px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-gray-200 flex-shrink-0">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 md:px-6 h-10 md:h-11 rounded-lg hover:bg-gray-800 text-sm md:text-base"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit {tabs.find(t => t.id === activeTab)?.label}</span>
                  <span className="sm:hidden">Edit</span>
                </button>
              ) : (
                <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCancel}
                    className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-4 md:px-6 h-10 md:h-11 rounded-lg hover:bg-gray-50 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white px-4 md:px-6 h-10 md:h-11 rounded-lg hover:bg-gray-800 text-sm md:text-base"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4 md:space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{profileData.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <p className="text-gray-500 h-11 flex items-center text-sm">
                        {profileData.email} <span className="ml-2 text-xs">(Cannot be changed)</span>
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Practice Address</label>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <input
                              type="text"
                              value={editedData.addressStreet}
                              onChange={(e) => handleChange('addressStreet', e.target.value)}
                              placeholder="Street Address"
                              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            <p className="text-xs text-gray-500 mt-1">Enter your building number and street name (e.g., 123 Medical Plaza)</p>
                          </div>
                          <div>
                            <input
                              type="text"
                              value={editedData.addressSuite}
                              onChange={(e) => handleChange('addressSuite', e.target.value)}
                              placeholder="Suite / Apartment / Floor (Optional)"
                              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            <p className="text-xs text-gray-500 mt-1">Add suite, building, floor, or unit number if applicable</p>
                          </div>
                          <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-3">
                              <select
                                value={editedData.addressCity}
                                onChange={(e) => handleChange('addressCity', e.target.value)}
                                className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                              >
                                {cityOptions.map((city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 mt-1">Select your city from the list</p>
                            </div>
                            <div className="col-span-1">
                              <select
                                value={editedData.addressState}
                                onChange={(e) => handleChange('addressState', e.target.value)}
                                className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                              >
                                {stateOptions.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 mt-1">State</p>
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                value={editedData.addressZipCode}
                                onChange={(e) => handleChange('addressZipCode', e.target.value)}
                                placeholder="ZIP Code"
                                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                              />
                              <p className="text-xs text-gray-500 mt-1">5-digit ZIP code</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-900">
                          <p>{profileData.addressStreet}</p>
                          {profileData.addressSuite && <p>{profileData.addressSuite}</p>}
                          <p>{profileData.addressCity}, {profileData.addressState} {profileData.addressZipCode}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* About Me */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">About Me</h3>
                  {isEditing ? (
                    <textarea
                      value={editedData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Tell patients about your experience and approach to care..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                  )}
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editedData.specialties : profileData.specialties).map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-900 text-sm rounded-lg"
                      >
                        {specialty}
                        {isEditing && (
                          <button
                            onClick={() => removeSpecialty(specialty)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <div className="relative">
                        <button
                          onClick={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
                          className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                        >
                          + Add Specialty
                        </button>
                        {showSpecialtyDropdown && (
                          <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {specialtyOptions
                              .filter(option => !editedData.specialties.includes(option))
                              .map((specialty) => (
                                <button
                                  key={specialty}
                                  onClick={() => {
                                    toggleSpecialty(specialty);
                                    setShowSpecialtyDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                >
                                  {specialty}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Languages Spoken */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Languages Spoken</h3>
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editedData.languages : profileData.languages).map((language) => (
                      <span
                        key={language}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-blue-50 border border-blue-200 text-blue-900 text-sm rounded-lg"
                      >
                        {language}
                        {isEditing && (
                          <button
                            onClick={() => removeLanguage(language)}
                            className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <div className="relative">
                        <button
                          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                          className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                        >
                          + Add Language
                        </button>
                        {showLanguageDropdown && (
                          <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {languageOptions
                              .filter(option => !editedData.languages.includes(option))
                              .map((language) => (
                                <button
                                  key={language}
                                  onClick={() => {
                                    toggleLanguage(language);
                                    setShowLanguageDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                >
                                  {language}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Provider Services & Equipment */}
                <div className="pt-6 border-t border-gray-200">
                  <DoctorServicesEquipment
                    isEditing={isEditing}
                    onSave={(diagnostics, clinical) => {
                      handleChange('diagnosticCapabilities', diagnostics);
                      handleChange('clinicalServices', clinical);
                    }}
                    onCancel={() => {
                      // Reset to profile data
                      setEditedData(profileData);
                    }}
                    initialDiagnostics={isEditing ? editedData.diagnosticCapabilities : profileData.diagnosticCapabilities}
                    initialClinical={isEditing ? editedData.clinicalServices : profileData.clinicalServices}
                  />
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Education & Training</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical School</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.medicalSchool}
                          onChange={(e) => handleChange('medicalSchool', e.target.value)}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Enter your medical school"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{profileData.medicalSchool}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Residency Program</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.residency}
                          onChange={(e) => handleChange('residency', e.target.value)}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          placeholder="Enter your residency program"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{profileData.residency}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                      {isEditing ? (
                        <select
                          value={editedData.yearsOfExperience}
                          onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        >
                          {yearsOfExperienceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{profileData.yearsOfExperience}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div className="space-y-6 pt-6">
                {/* Credentials Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Number</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Issuer</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Issued Date</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Expiry Date</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {credentials.map((credential) => (
                          <tr key={credential.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">
                                  {credential.type}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{credential.number}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{credential.issuer}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {new Date(credential.issuedDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {new Date(credential.expiryDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(credential.status)}`}>
                                {credential.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => navigate(`/doctor/credentials/edit/${credential.id}`)}
                                  className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Credential Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => navigate('/doctor/add-credential')}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 h-11 rounded-lg hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add Credential
                  </button>
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure all credentials are current and valid. Expired credentials may affect your ability to accept appointments.
                  </p>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 pt-6">
                {/* Reviews Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Patient Name</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Rating</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Comment</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                          <tr key={review.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">
                                  {review.patientName}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{review.comment}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {new Date(review.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}