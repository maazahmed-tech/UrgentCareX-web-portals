import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Building2, UserCog, Users, CreditCard } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('📍 Current Screen: Admin Dashboard');
  }, []);

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Facilities', value: '89', icon: Building2, color: 'text-green-600' },
    { label: 'Doctors', value: '156', icon: UserCog, color: 'text-purple-600' },
    { label: 'Active Subs', value: '198', icon: CreditCard, color: 'text-orange-600' },
  ];

  const subscriptions = [
    { label: 'Trial (14-day)', count: '23', color: 'bg-yellow-500' },
    { label: 'Monthly', count: '112', color: 'bg-gray-900' },
    { label: 'Annual', count: '63', color: 'bg-green-600' },
  ];

  const recentActivity = [
    { icon: Building2, text: 'Downtown Medical registered', time: '2 hours ago' },
    { icon: UserCog, text: 'Dr. Sarah Johnson joined', time: '5 hours ago' },
    { icon: Building2, text: 'HealthFirst Clinic registered', time: 'Yesterday' },
    { icon: UserCog, text: 'Dr. Michael Chen joined', time: 'Yesterday' },
  ];

  return (
    <DashboardLayout title="Dashboard" role="admin">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.label} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className={`w-12 h-12 ${sub.color} rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-3`}>
                  {sub.count}
                </div>
                <p className="text-gray-900 font-medium">{sub.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <activity.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{activity.text}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}