import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  UserCheck, 
  CheckCircle, 
  AlertCircle,
  Stethoscope,
  BarChart3,
  Download
} from 'lucide-react';
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

// Mock data for performance comparison (Top 5 facilities + current facility)
const performanceData = [
  { name: 'City Medical Center', score: 95, reviews: 450, recommendations: 1200 },
  { name: 'HealthFirst Clinic', score: 89, reviews: 380, recommendations: 950 },
  { name: 'Urgent Care Plus', score: 85, reviews: 320, recommendations: 820 },
  { name: 'Prime Healthcare', score: 82, reviews: 290, recommendations: 750 },
  { name: 'Community Health', score: 78, reviews: 250, recommendations: 680 },
  { name: 'Your Facility', score: 72, reviews: 189, recommendations: 234, highlight: true },
];

// Mock data for top specialist types
const topSpecialists = [
  { 
    type: 'General Physician', 
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
    type: 'Pediatrician', 
    requestCount: 1893, 
    percentage: 21,
    icon: '👶',
    trend: '+15%'
  },
];

export function FacilityAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState<'reviews' | 'recommendations'>('reviews');

  const chartData = performanceData.map(facility => ({
    name: facility.name === 'Your Facility' ? 'You' : facility.name.split(' ')[0],
    value: facility[selectedMetric],
    fill: facility.highlight ? '#1f2937' : '#94a3b8'
  }));

  const completedMilestones = profileCompletionData.milestones.filter(m => m.completed).length;
  const totalMilestones = profileCompletionData.milestones.length;

  return (
    <DashboardLayout title="Analytics Dashboard" role="facility">
      <div className="space-y-6 max-w-7xl">
        {/* Profile Completion Status */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold">Profile Completion Status</h2>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {profileCompletionData.overallProgress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div 
              className="bg-gray-900 h-3 rounded-full transition-all duration-500"
              style={{ width: `${profileCompletionData.overallProgress}%` }}
            />
          </div>

          {/* Milestones Checklist */}
          <div className="space-y-3">
            {profileCompletionData.milestones.map((milestone) => (
              <div 
                key={milestone.id}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  milestone.completed 
                    ? 'bg-gray-50 border-gray-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {milestone.title}
                  </h3>
                  <p className="text-sm mt-1 text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {completedMilestones} of {totalMilestones} milestones completed
            </p>
          </div>
        </div>

        {/* Platform Statistics - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Providers */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Providers on Platform</p>
            <p className="text-3xl font-bold text-gray-900">{platformStats.totalProviders.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">+127 this month</p>
          </div>

          {/* Total Patients */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Patients on Platform</p>
            <p className="text-3xl font-bold text-gray-900">{platformStats.totalPatients.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Total app downloads</p>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Profile Views</p>
            <p className="text-3xl font-bold text-gray-900">{platformStats.profileViews.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">+56 this week</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Recommendations</p>
            <p className="text-3xl font-bold text-gray-900">{platformStats.recommendations.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Times recommended to patients</p>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold">Performance Comparison</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('reviews')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === 'reviews'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setSelectedMetric('recommendations')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === 'recommendations'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recommendations
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Compare your facility with the top 5 facilities on UrgentCareX
          </p>

          <ResponsiveContainer width="100%" height={350}>
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
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Stethoscope className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Most Requested Specialist Types</h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Top 3 specialist types most frequently requested by patients on the platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSpecialists.map((specialist, index) => (
              <div 
                key={specialist.type}
                className="relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-3">{specialist.icon}</div>

                {/* Specialist Type */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {specialist.type}
                </h3>

                {/* Request Count */}
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {specialist.requestCount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-3">patient requests</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full"
                    style={{ width: `${specialist.percentage}%` }}
                  />
                </div>

                {/* Percentage and Trend */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{specialist.percentage}% of total</span>
                  <span className="text-sm text-gray-500 font-medium">{specialist.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}