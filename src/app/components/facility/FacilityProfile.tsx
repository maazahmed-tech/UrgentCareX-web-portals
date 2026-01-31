import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Clock, Edit2, Plus, X, Star, Stethoscope, MessageSquare, CheckCircle, Camera, Save, Shield } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { FacilityServicesEquipment } from '@/app/components/facility/FacilityServicesEquipment';

type TabType = 'basic' | 'operations' | 'reviews';

const FACILITY_TYPES = [
  'Urgent Care',
  'Walk-In Clinic',
  'Medical Center',
  'Emergency Care',
  'Family Practice',
  'Specialty Clinic',
  'Primary Care Center',
];

const SPECIALTY_OPTIONS = [
  'Cardiologist',
  'Orthopedic Surgeon',
  'General Physician',
  'Pediatrician',
  'Dermatologist',
  'Neurologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Endocrinologist',
  'Psychiatrist',
  'Ophthalmologist',
  'ENT Specialist',
  'Urologist',
  'Rheumatologist',
  'Allergist',
  'Emergency Medicine Physician',
  'Sports Medicine Specialist',
  'Physical Medicine & Rehabilitation',
  'Family Medicine Physician',
  'Internal Medicine Physician',
];

const mockFacilityData = {
  name: 'Downtown Medical Center',
  facilityType: 'Urgent Care',
  address: '123 Healthcare Blvd',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '(212) 555-0100',
  email: 'info@downtownmed.com',
  website: 'www.downtownmed.com',
  description:
    'Downtown Medical Center is a state-of-the-art urgent care facility providing comprehensive medical services to the New York community. We specialize in walk-in care, minor emergencies, and preventive health services.',
  logoUrl: '',
  insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare', 'Cigna', 'Medicare'],
  operatingHours: {
    monday: '8:00 AM - 8:00 PM',
    tuesday: '8:00 AM - 8:00 PM',
    wednesday: '8:00 AM - 8:00 PM',
    thursday: '8:00 AM - 8:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: '10:00 AM - 4:00 PM',
  },
  services: [
    'Minor Injuries & Wounds',
    'X-Rays & Diagnostics',
    'Cold & Flu Treatment',
    'COVID-19 Testing',
    'Vaccinations & Immunizations',
    'Physical Examinations',
    'Lab Services',
    'Occupational Health Services',
  ],
  specialties: [
    'General Physician',
    'Cardiologist',
    'Orthopedic Surgeon',
    'Pediatrician',
    'Emergency Medicine Physician',
  ],
  patientReviews: [
    {
      id: 1,
      patientName: 'John D.',
      rating: 5,
      comment: 'Dr. Urgent is an excellent physician. Very thorough and takes time to listen to concerns.',
      date: '2 weeks ago',
    },
    {
      id: 2,
      patientName: 'Sarah M.',
      rating: 5,
      comment: 'Great facility with friendly staff. Short wait times and very professional service.',
      date: '1 month ago',
    },
    {
      id: 3,
      patientName: 'Michael R.',
      rating: 4,
      comment: 'Clean facility and competent medical staff. Would definitely recommend to others.',
      date: '1 month ago',
    },
  ],
};

export function FacilityProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [isEditingSpecialists, setIsEditingSpecialists] = useState(false);
  const [formData, setFormData] = useState(mockFacilityData);
  const [editedData, setEditedData] = useState(mockFacilityData);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSaveBasic = () => {
    setFormData(editedData);
    setIsEditingBasic(false);
  };

  const handleCancelBasic = () => {
    setEditedData(formData);
    setIsEditingBasic(false);
  };

  const handleSaveHours = () => {
    setFormData(editedData);
    setIsEditingHours(false);
  };

  const handleCancelHours = () => {
    setEditedData(formData);
    setIsEditingHours(false);
  };

  const handleSaveSpecialists = () => {
    setFormData(editedData);
    setIsEditingSpecialists(false);
    setSelectedSpecialty('');
  };

  const handleCancelSpecialists = () => {
    setEditedData(formData);
    setIsEditingSpecialists(false);
    setSelectedSpecialty('');
  };

  const handleAddSpecialty = () => {
    if (selectedSpecialty && !editedData.specialties.includes(selectedSpecialty)) {
      setEditedData({
        ...editedData,
        specialties: [...editedData.specialties, selectedSpecialty],
      });
      setSelectedSpecialty('');
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setEditedData({
      ...editedData,
      specialties: editedData.specialties.filter((_, i) => i !== index),
    });
  };

  const availableSpecialties = SPECIALTY_OPTIONS.filter(
    (specialty) => !editedData.specialties.includes(specialty)
  );

  // Calculate profile completeness
  const calculateCompleteness = () => {
    const sections = getProfileSections();
    const completedSections = sections.filter(s => s.completed).length;
    return Math.round((completedSections / sections.length) * 100);
  };

  const getProfileSections = () => {
    return [
      {
        name: 'Basic Information',
        completed: !!(formData.name && formData.email && formData.phone && formData.description),
      },
      {
        name: 'Operating Hours',
        completed: Object.values(formData.operatingHours).every(hours => hours && hours.trim() !== ''),
      },
      {
        name: 'Facility Location',
        completed: !!(formData.address && formData.city && formData.state && formData.zipCode),
      },
      {
        name: 'Insurance Accepted',
        completed: formData.insuranceAccepted && formData.insuranceAccepted.length > 0,
      },
      {
        name: 'Specialists Available',
        completed: formData.specialties && formData.specialties.length > 0,
      },
      {
        name: 'Services Offered',
        completed: formData.services && formData.services.length >= 3,
      },
      {
        name: 'Facility Logo',
        completed: !!formData.logoUrl,
      },
    ];
  };

  const completeness = calculateCompleteness();
  const profileSections = getProfileSections();
  const completedSections = profileSections.filter(s => s.completed).length;

  const tabs = [
    { id: 'basic' as TabType, label: 'Basic Info', icon: Building2 },
    { id: 'operations' as TabType, label: 'Operations', icon: Clock },
    { id: 'reviews' as TabType, label: 'Patient Reviews', icon: Star },
  ];

  return (
    <DashboardLayout title="Facility Profile" role="facility">
      <div className="max-w-5xl h-full flex flex-col">
        {/* Profile Header with Progress - Fixed */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 mb-4 md:mb-6 flex-shrink-0">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            {/* Facility Logo */}
            <div className="flex flex-col items-center w-full md:w-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 text-2xl font-semibold relative overflow-hidden shadow-lg border-2 border-blue-300">
                {formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Facility Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-10 h-10 md:w-12 md:h-12" />
                )}
              </div>
              <button className="mt-2 md:mt-3 flex items-center gap-2 px-3 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs">
                <Camera className="w-3 h-3" />
                Upload Logo
              </button>
            </div>

            {/* Facility Summary */}
            <div className="flex-1 w-full">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">{formData.name}</h1>

              {/* Profile Completion Progress */}
              <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                  <span className="text-xs md:text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900">
                    {completeness}% • {completedSections}/{profileSections.length} sections
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completeness}%` }}
                  />
                </div>

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {profileSections.map((section) => (
                    <div key={section.name} className="flex items-center gap-2">
                      {section.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${section.completed ? 'text-gray-700' : 'text-red-600'}`}>
                        {section.name}
                      </span>
                    </div>
                  ))}
                </div>

                {completeness < 100 && (
                  <p className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-200">
                    Complete your facility profile to increase patient bookings
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
                    setIsEditingBasic(false);
                    setIsEditingHours(false);
                    setIsEditingSpecialists(false);
                    setEditedData(formData);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content - Scrollable */}
        <div className="bg-white rounded-b-xl border border-gray-200 flex-1 flex flex-col overflow-hidden">
          {/* Edit/Save Buttons - Only for Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="flex justify-end px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-gray-200 flex-shrink-0">
              {!isEditingBasic ? (
                <button
                  onClick={() => setIsEditingBasic(true)}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 md:px-6 h-10 md:h-11 rounded-lg hover:bg-gray-800 text-sm w-full sm:w-auto justify-center"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Basic Info
                </button>
              ) : (
                <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCancelBasic}
                    className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-4 md:px-6 h-10 md:h-11 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveBasic}
                    className="flex-1 sm:flex-none flex items-center gap-2 bg-gray-900 text-white px-4 md:px-6 h-10 md:h-11 rounded-lg hover:bg-gray-800 text-sm justify-center"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className={`flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6 ${activeTab === 'basic' ? '' : 'pt-4 md:pt-6'}`}>
            {/* BASIC INFO TAB */}
            {activeTab === 'basic' && (
              <div className="space-y-4 md:space-y-6">
                {/* Facility Information */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Facility Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                      {isEditingBasic ? (
                        <input
                          type="text"
                          value={editedData.name}
                          onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{formData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facility Type</label>
                      {isEditingBasic ? (
                        <select
                          value={editedData.facilityType}
                          onChange={(e) => setEditedData({ ...editedData, facilityType: e.target.value })}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        >
                          {FACILITY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{formData.facilityType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditingBasic ? (
                        <input
                          type="tel"
                          value={editedData.phone}
                          onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{formData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <p className="text-gray-500 h-11 flex items-center text-sm">
                        {formData.email} <span className="ml-2 text-xs">(Cannot be changed)</span>
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      {isEditingBasic ? (
                        <input
                          type="text"
                          value={editedData.website}
                          onChange={(e) => setEditedData({ ...editedData, website: e.target.value })}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 h-11 flex items-center">{formData.website}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Location</h3>
                  {isEditingBasic ? (
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <input
                          type="text"
                          value={editedData.address}
                          onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                          placeholder="Street Address"
                          className="w-full h-10 md:h-11 px-3 md:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 md:gap-4">
                        <div className="col-span-2 sm:col-span-3">
                          <input
                            type="text"
                            value={editedData.city}
                            onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                            placeholder="City"
                            className="w-full h-10 md:h-11 px-3 md:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                          />
                        </div>
                        <div className="col-span-1">
                          <input
                            type="text"
                            value={editedData.state}
                            onChange={(e) => setEditedData({ ...editedData, state: e.target.value })}
                            placeholder="State"
                            maxLength={2}
                            className="w-full h-10 md:h-11 px-3 md:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <input
                            type="text"
                            value={editedData.zipCode}
                            onChange={(e) => setEditedData({ ...editedData, zipCode: e.target.value })}
                            placeholder="ZIP Code"
                            className="w-full h-10 md:h-11 px-3 md:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-900">
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    </div>
                  )}
                </div>

                {/* About */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">About</h3>
                  {isEditingBasic ? (
                    <textarea
                      value={editedData.description}
                      onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                      rows={5}
                      className="w-full px-3 md:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      placeholder="Tell patients about your facility..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{formData.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* OPERATIONS TAB */}
            {activeTab === 'operations' && (
              <div className="space-y-4 md:space-y-6">
                {/* Operating Hours */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Operating Hours</h3>
                    {!isEditingHours ? (
                      <button
                        onClick={() => setIsEditingHours(true)}
                        className="flex items-center gap-2 text-sm bg-gray-900 text-white px-4 h-9 md:h-10 rounded-lg hover:bg-gray-800 w-full sm:w-auto justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Hours
                      </button>
                    ) : (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleCancelHours}
                          className="flex-1 sm:flex-none text-sm border border-gray-300 text-gray-700 px-4 h-9 md:h-10 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveHours}
                          className="flex-1 sm:flex-none flex items-center gap-2 text-sm bg-gray-900 text-white px-4 h-9 md:h-10 rounded-lg hover:bg-gray-800 justify-center"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {Object.entries(isEditingHours ? editedData.operatingHours : formData.operatingHours).map(([day, hours]) => (
                      <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900 capitalize text-sm w-24">{day}</span>
                        {isEditingHours ? (
                          <input
                            type="text"
                            value={hours}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                operatingHours: { ...editedData.operatingHours, [day]: e.target.value },
                              })
                            }
                            className="flex-1 sm:max-w-xs h-10 px-3 md:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                            placeholder="e.g., 8:00 AM - 8:00 PM"
                          />
                        ) : (
                          <span className="text-gray-600 text-sm">{hours}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services & Equipment */}
                <div className="pt-6 border-t border-gray-200">
                  <FacilityServicesEquipment onSuccess={() => {}} />
                </div>

                {/* Specialists */}
                <div className="pt-4 md:pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Specialists Available</h3>
                    {!isEditingSpecialists ? (
                      <button
                        onClick={() => setIsEditingSpecialists(true)}
                        className="flex items-center gap-2 text-sm bg-gray-900 text-white px-4 h-9 md:h-10 rounded-lg hover:bg-gray-800 w-full sm:w-auto justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Specialists
                      </button>
                    ) : (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleCancelSpecialists}
                          className="flex-1 sm:flex-none text-sm border border-gray-300 text-gray-700 px-4 h-9 md:h-10 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveSpecialists}
                          className="flex-1 sm:flex-none flex items-center gap-2 text-sm bg-gray-900 text-white px-4 h-9 md:h-10 rounded-lg hover:bg-gray-800 justify-center"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                    {(isEditingSpecialists ? editedData.specialties : formData.specialties).map((specialty, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-900 text-sm">{specialty}</span>
                        </div>
                        {isEditingSpecialists && (
                          <button
                            onClick={() => handleRemoveSpecialty(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isEditingSpecialists && (
                    <div className="flex gap-2">
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        <option value="">Select a specialty to add...</option>
                        {availableSpecialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddSpecialty}
                        disabled={!selectedSpecialty}
                        className="px-4 h-11 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Insurance Accepted */}
                <div className="pt-4 md:pt-6 border-t border-gray-200">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Insurance Accepted</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                    {formData.insuranceAccepted.map((insurance, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-900 text-sm">{insurance}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Insurance information is managed through the Insurance & Payers section.
                  </p>
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-3 md:space-y-4 pt-4 md:pt-6">
                {formData.patientReviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300 fill-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-600">- {review.patientName}</p>
                  </div>
                ))}

                <p className="text-sm text-gray-500 mt-4 italic">
                  Patient reviews are managed by the platform and cannot be edited directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}