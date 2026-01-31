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
    { label: 'Patients', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Facilities', value: '89', icon: Building2, color: 'text-green-600' },
    { label: 'Doctors', value: '156', icon: UserCog, color: 'text-purple-600' },
    { label: 'Active Subs', value: '198', icon: CreditCard, color: 'text-orange-600' },
  ];

  const subscriptions = [
    { label: 'Trial (14-day)', count: '23', color: 'bg-yellow-500', price: '$0' },
    { label: 'Monthly', count: '112', color: 'bg-gray-900', price: '$49' },
    { label: 'Yearly', count: '63', color: 'bg-green-600', price: '$499' },
  ];

  return (
    <DashboardLayout title="Dashboard" role="admin">
      <div className="space-y-4 md:space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl md:text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Summary */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Subscription Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.label} className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${sub.color} rounded-lg flex items-center justify-center text-white text-xl md:text-2xl font-bold mb-2 md:mb-3`}>
                  {sub.count}
                </div>
                <p className="text-sm md:text-base text-gray-900 font-medium">{sub.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}