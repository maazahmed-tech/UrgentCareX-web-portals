import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Circle,
  CreditCard,
  UserCog,
  CheckCircle,
  Eye,
  UserCheck,
  Download,
  AlertCircle,
  BarChart3,
  Stethoscope,
  ToggleLeft,
  ToggleRight
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
      description: 'Fill in all basic information, bio, photo, and contact details',
      completed: true 
    },
    { 
      id: 2, 
      title: 'Add Credentials', 
      description: 'Add medical license, NPI number, and medical school information',
      completed: true 
    },
    { 
      id: 3, 
      title: 'Set Availability Schedule', 
      description: 'Configure your working hours and availability calendar',
      completed: true 
    },
    { 
      id: 4, 
      title: 'Add Services & Equipment', 
      description: 'List diagnostic capabilities and clinical services you offer',
      completed: false 
    },
  ]
};

// Mock data for platform stats
const platformStats = {
  totalDoctors: 1247,
  totalPatients: 45823,
  profileViews: 892,
  recommendations: 234
};

// Mock data for performance comparison
const performanceData = [
  { name: 'Dr. Sarah Mitchell', reviews: 485, recommendations: 1340 },
  { name: 'Dr. James Rodriguez', reviews: 412, recommendations: 1120 },
  { name: 'Dr. Emily Chen', reviews: 368, recommendations: 980 },
  { name: 'Dr. Michael Davis', reviews: 321, recommendations: 875 },
  { name: 'Dr. Lisa Anderson', reviews: 289, recommendations: 756 },
  { name: 'You', reviews: 189, recommendations: 234, highlight: true },
];

// Mock data for top booked services
const topServices = [
  { 
    type: 'General Practitioner', 
    bookingCount: 3421, 
    percentage: 38,
    icon: '🩺',
    trend: '+12%'
  },
  { 
    type: 'Cardiologist', 
    bookingCount: 2156, 
    percentage: 24,
    icon: '❤️',
    trend: '+8%'
  },
  { 
    type: 'Psychologist', 
    bookingCount: 1893, 
    percentage: 21,
    icon: '🧠',
    trend: '+15%'
  },
];

export function DoctorDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isAvailable, setIsAvailable] = useState(() => {
    const saved = localStorage.getItem('doctorAvailableNow');
    const expiresAt = localStorage.getItem('doctorAvailableExpiresAt');
    
    if (saved && expiresAt) {
      const now = new Date().getTime();
      const expiry = parseInt(expiresAt);
      
      // If expired, clear it
      if (now >= expiry) {
        localStorage.removeItem('doctorAvailableNow');
        localStorage.removeItem('doctorAvailableExpiresAt');
        return false;
      }
      
      return JSON.parse(saved);
    }
    
    return false;
  });
  
  const [availableExpiresAt, setAvailableExpiresAt] = useState<number | null>(() => {
    const expiresAt = localStorage.getItem('doctorAvailableExpiresAt');
    return expiresAt ? parseInt(expiresAt) : null;
  });
  
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [selectedMetric, setSelectedMetric] = useState<'reviews' | 'recommendations'>('reviews');

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('📍 Current Screen: Doctor Dashboard');
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!isAvailable || !availableExpiresAt) {
      setTimeRemaining('');
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const remaining = availableExpiresAt - now;

      if (remaining <= 0) {
        // Time expired, auto-revert to unavailable
        setIsAvailable(false);
        setAvailableExpiresAt(null);
        localStorage.removeItem('doctorAvailableNow');
        localStorage.removeItem('doctorAvailableExpiresAt');
        setTimeRemaining('');
        return;
      }

      // Calculate remaining time
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isAvailable, availableExpiresAt]);

  const handleToggleAvailability = () => {
    const newStatus = !isAvailable;
    
    if (newStatus) {
      // Turning ON - set 1 hour expiry
      const now = new Date().getTime();
      const expiresAt = now + (60 * 60 * 1000); // 1 hour from now
      
      setIsAvailable(true);
      setAvailableExpiresAt(expiresAt);
      localStorage.setItem('doctorAvailableNow', JSON.stringify(true));
      localStorage.setItem('doctorAvailableExpiresAt', expiresAt.toString());
    } else {
      // Turning OFF - clear everything
      setIsAvailable(false);
      setAvailableExpiresAt(null);
      localStorage.removeItem('doctorAvailableNow');
      localStorage.removeItem('doctorAvailableExpiresAt');
    }
  };

  const chartData = performanceData.map(doctor => ({
    name: doctor.name === 'You' ? 'You' : doctor.name.split(' ')[1],
    value: doctor[selectedMetric],
    fill: doctor.highlight ? '#1f2937' : '#94a3b8'
  }));

  const completedMilestones = profileCompletionData.milestones.filter(m => m.completed).length;
  const totalMilestones = profileCompletionData.milestones.length;

  const schedule = [
    { id: '4', time: '10:30', patient: 'Lisa Park', age: 28, gender: 'Female', status: 'Cancelled' },
    { id: '5', time: '14:00', patient: 'David Chen', age: 42, gender: 'Male', status: 'Pending Confirmation' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Confirmation':
        return 'bg-gray-100 text-gray-700 border border-gray-300';
      case 'Confirmed':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Completed':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  return (
    <DashboardLayout title="Dashboard" role="doctor">
      <div className="space-y-4 md:space-y-6 max-w-7xl">
        {/* Welcome Message */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {user?.name || 'Doctor'}!</h2>
          <p className="text-sm md:text-base text-gray-600">Here's an overview of your practice performance and profile status.</p>
        </div>

        {/* Top Stats Row - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {/* Available Status */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-gray-600">Available Status</p>
              <CheckCircle className={`w-4 h-4 md:w-5 md:h-5 ${isAvailable ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-3xl font-bold">{isAvailable ? 'Available' : 'Unavailable'}</p>
              <button
                onClick={handleToggleAvailability}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  isAvailable
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAvailable ? (
                  <ToggleRight className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <ToggleLeft className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
            {isAvailable && (
              <p className="text-xs md:text-sm text-gray-500 mt-2">Expires in: {timeRemaining}</p>
            )}
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
              <UserCog className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{profileCompletionData.overallProgress}%</p>
          </div>
        </div>

        {/* Platform Statistics - 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Total Doctors */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Total Doctors</p>
            <p className="text-xl md:text-3xl font-bold text-gray-900">{platformStats.totalDoctors.toLocaleString()}</p>
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
            Compare your performance with the top 5 doctors on UrgentCareX
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
              <p className="text-sm text-gray-600">Your performance is highlighted in darker grey</p>
            </div>
          </div>
        </div>

        {/* Top 3 Most Booked Services */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Stethoscope className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg md:text-xl font-semibold">Most Requested Specialist Types</h2>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-4">
            Top 3 specialist types most frequently requested by patients on the platform
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {topServices.map((service, index) => (
              <div
                key={service.type}
                className="relative bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 rounded-xl border border-gray-200"
              >
                {/* Rank Badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                  #{index + 1}
                </div>

                {/* Icon */}
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{service.icon}</div>

                {/* Service Type */}
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {service.type}
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

        {/* Today's Schedule */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Today's Schedule</h2>
            <button
              onClick={() => navigate('/doctor/appointments-calendar-week')}
              className="text-xs md:text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View Full Calendar →
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Date Header */}
            <div className="px-4 md:px-6 py-3 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-sm md:text-base text-blue-900">
                Wednesday, January 21{' '}
                <span className="text-sm font-normal text-blue-600">(Today)</span>
              </h3>
            </div>

            {/* Appointments List */}
            <div className="divide-y divide-gray-200">
              {schedule.map((apt) => (
                <button
                  key={apt.id}
                  onClick={() => navigate(`/doctor/appointments/${apt.id}`)}
                  className="w-full p-4 md:p-6 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{apt.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {apt.patient}, {apt.age} yrs
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              apt.status
                            )}`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-900 hover:underline whitespace-nowrap">
                      View Details →
                    </span>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{apt.patient}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {apt.age} yrs, {apt.gender}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                          apt.status
                        )} whitespace-nowrap`}
                      >
                        {apt.status === 'Pending Confirmation' ? 'Pending' : apt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}