import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Building2,
  CreditCard,
  Settings,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  Users,
  Eye,
  UserCheck,
  Download,
  AlertCircle,
  BarChart3,
  Stethoscope,
  Star,
  Calendar
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for profile completion
const profileCompletionData = {
  overallProgress: 75,
  milestones: [
    { 
      id: 1, 
      title: 'Complete Profile', 
      description: 'Fill in all basic information, operating hours, and about section',
      completed: true 
    },
    { 
      id: 2, 
      title: 'Complete List of Accepted Insurance', 
      description: 'Select all insurance plans your facility accepts',
      completed: true 
    },
    { 
      id: 3, 
      title: 'Add List of Specialists', 
      description: 'Add the types of specialists available at your facility',
      completed: true 
    },
    { 
      id: 4, 
      title: 'Add Services Offered', 
      description: 'List all medical services your facility provides',
      completed: false 
    },
  ]
};

// Mock data for platform stats
const platformStats = {
  totalProviders: 1247,
  totalPatients: 45823,
  profileViews: 892,
  recommendations: 234
};

// Mock data for performance comparison
const performanceData = [
  { name: 'City Medical Center', reviews: 450, recommendations: 1200 },
  { name: 'HealthFirst Clinic', reviews: 380, recommendations: 950 },
  { name: 'Urgent Care Plus', reviews: 320, recommendations: 820 },
  { name: 'Prime Healthcare', reviews: 290, recommendations: 750 },
  { name: 'Community Health', reviews: 250, recommendations: 680 },
  { name: 'Your Facility', reviews: 189, recommendations: 234, highlight: true },
];

// Mock data for top specialist types
const topSpecialists = [
  { 
    type: 'General Practitioner', 
    requestCount: 3421, 
    percentage: 38,
    icon: '🩺',
    trend: '+12%'
  },
  { 
    type: 'Cardiologist', 
    requestCount: 2156, 
    percentage: 24,
    icon: '❤️',
    trend: '+8%'
  },
  { 
    type: 'Psychologist', 
    requestCount: 1893, 
    percentage: 21,
    icon: '🧠',
    trend: '+15%'
  },
];

export function FacilityDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isActive, setIsActive] = useState(true);
  const [acceptsAppointments, setAcceptsAppointments] = useState(() => {
    const stored = localStorage.getItem('facilityAcceptsAppointments');
    return stored !== 'false'; // Default to true
  });
  const [selectedMetric, setSelectedMetric] = useState<'reviews' | 'recommendations'>('reviews');

  useEffect(() => {
    if (!user || user.role !== 'facility') {
      navigate('/facility');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('📍 Current Screen: Facility Dashboard');
  }, []);

  const handleToggleStatus = () => {
    setIsActive(!isActive);
  };

  const handleToggleAppointments = () => {
    const newValue = !acceptsAppointments;
    setAcceptsAppointments(newValue);
    localStorage.setItem('facilityAcceptsAppointments', String(newValue));
    // Dispatch event so DashboardLayout can react
    window.dispatchEvent(new Event('appointmentSettingChange'));
  };

  const chartData = performanceData.map(facility => ({
    name: facility.name === 'Your Facility' ? 'You' : facility.name.split(' ')[0],
    value: facility[selectedMetric],
    fill: facility.highlight ? '#1f2937' : '#94a3b8'
  }));

  const completedMilestones = profileCompletionData.milestones.filter(m => m.completed).length;
  const totalMilestones = profileCompletionData.milestones.length;

  return (
    <DashboardLayout title="Dashboard" role="facility">
      <div className="space-y-4 md:space-y-6 max-w-7xl">
        {/* Welcome Message */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {user?.name || 'Facility'}!</h2>
          <p className="text-sm md:text-base text-gray-600">Here's an overview of your facility performance and profile status.</p>
        </div>

        {/* Top Stats Row - 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Profile Status */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-gray-600">Profile Status</p>
              <CheckCircle className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-3xl font-bold">{isActive ? 'Active' : 'Inactive'}</p>
              <button
                onClick={handleToggleStatus}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isActive ? (
                  <ToggleRight className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <ToggleLeft className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Plan Type */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-gray-600">Plan Type</p>
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <p className="text-xl md:text-3xl font-bold">Monthly</p>
          </div>

          {/* Profile Completion */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-gray-600">Profile Completion</p>
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{profileCompletionData.overallProgress}%</p>
          </div>

          {/* Accepts Appointments */}
          <div className={`bg-white rounded-xl p-4 md:p-6 border-2 transition-colors ${
            acceptsAppointments ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-gray-600">Accepts Appts</p>
              <Calendar className={`w-4 h-4 md:w-5 md:h-5 ${acceptsAppointments ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-xl md:text-3xl font-bold ${acceptsAppointments ? 'text-blue-600' : 'text-gray-400'}`}>
                {acceptsAppointments ? 'Yes' : 'No'}
              </p>
              <button
                onClick={handleToggleAppointments}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  acceptsAppointments
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {acceptsAppointments ? (
                  <ToggleRight className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <ToggleLeft className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 hidden md:block">
              {acceptsAppointments
                ? 'Patients can book appointments'
                : 'Appointment booking is disabled'}
            </p>
          </div>
        </div>

        {/* Platform Statistics - 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Total Providers */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Total Providers</p>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{platformStats.totalProviders.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2 hidden md:block">+127 this month</p>
          </div>

          {/* Total Patients */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Patients</p>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{platformStats.totalPatients.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2 hidden md:block">Total app downloads</p>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Profile Views</p>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{platformStats.profileViews.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2 hidden md:block">+56 this week</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Recommendations</p>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{platformStats.recommendations.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2 hidden md:block">Recommended to patients</p>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg md:text-xl font-semibold">Performance Comparison</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('reviews')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  selectedMetric === 'reviews'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setSelectedMetric('recommendations')}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  selectedMetric === 'recommendations'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recommendations
              </button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-4">
            Compare your facility with the top 5 facilities on UrgentCareX
          </p>

          <ResponsiveContainer width="100%" height={280} className="md:!h-[350px]">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#94a3b8"
                radius={[8, 8, 0, 0]}
                name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-900 rounded"></div>
              <p className="text-sm text-gray-600">Your facility is highlighted in darker grey</p>
            </div>
          </div>
        </div>

        {/* Top 3 Specialist Types */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Stethoscope className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg md:text-xl font-semibold">Most Requested Specialist Types</h2>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-4">
            Top 3 specialist types most frequently requested by patients on the platform
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {topSpecialists.map((specialist, index) => (
              <div
                key={specialist.type}
                className="relative bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 rounded-xl border border-gray-200"
              >
                {/* Rank Badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                  #{index + 1}
                </div>

                {/* Icon */}
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{specialist.icon}</div>

                {/* Specialist Type */}
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {specialist.type}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Review Summary */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Star className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg md:text-xl font-semibold">Review Summary</h2>
          </div>

          <div className="space-y-3">
            {/* 5 stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[60px]">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm text-gray-700">5 stars</span>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[80px] text-right">892 reviews</span>
            </div>

            {/* 4 stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[60px]">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm text-gray-700">4 stars</span>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[80px] text-right">248 reviews</span>
            </div>

            {/* 3 stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[60px]">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm text-gray-700">3 stars</span>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '6%' }}></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[80px] text-right">74 reviews</span>
            </div>

            {/* 2 stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[60px]">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm text-gray-700">2 stars</span>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '2%' }}></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[80px] text-right">25 reviews</span>
            </div>

            {/* 1 star */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[60px]">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm text-gray-700">1 star</span>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '1%' }}></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[80px] text-right">8 reviews</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <button
              onClick={() => navigate('/facility/profile')}
              className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 hover:border-gray-300 transition-colors text-left"
            >
              <Building2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2 md:mb-3" />
              <h3 className="font-semibold text-base md:text-lg mb-1">Update Profile</h3>
              <p className="text-xs md:text-sm text-gray-600">Edit facility information, hours, and services</p>
            </button>

            <button
              onClick={() => navigate('/facility/subscription')}
              className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 hover:border-gray-300 transition-colors text-left"
            >
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-green-600 mb-2 md:mb-3" />
              <h3 className="font-semibold text-base md:text-lg mb-1">Manage Subscription</h3>
              <p className="text-xs md:text-sm text-gray-600">View billing and upgrade your plan</p>
            </button>

            <button
              onClick={() => navigate('/facility/settings')}
              className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 hover:border-gray-300 transition-colors text-left"
            >
              <Settings className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mb-2 md:mb-3" />
              <h3 className="font-semibold text-base md:text-lg mb-1">Account Settings</h3>
              <p className="text-xs md:text-sm text-gray-600">Update preferences and security</p>
            </button>
          </div>
        </div>

        {/* Facility Status */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h3 className="text-base md:text-lg font-semibold">Facility Status</h3>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-base md:text-lg">
                  Your facility is currently {isActive ? 'Active' : 'Inactive'}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {isActive
                    ? 'Patients can view and access your services'
                    : 'Your facility is hidden from patient searches'}
                </p>
              </div>
              <button
                onClick={handleToggleStatus}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {isActive ? (
                  <ToggleRight className="w-5 h-5" />
                ) : (
                  <ToggleLeft className="w-5 h-5" />
                )}
                {isActive ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}