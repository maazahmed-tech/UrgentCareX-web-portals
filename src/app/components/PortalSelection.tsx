import { useNavigate } from 'react-router';
import { Shield, Building2, Stethoscope, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export function PortalSelection() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('📍 Current Screen: Portal Selection');
  }, []);

  const portals = [
    {
      id: 'admin',
      title: 'Admin Panel',
      description: 'Monitor platform health and manage users',
      icon: Shield,
      path: '/admin',
      color: 'bg-blue-600 hover:bg-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'facility',
      title: 'Facility Portal',
      description: 'Manage your facility, doctors, and appointments',
      icon: Building2,
      path: '/facility',
      color: 'bg-green-600 hover:bg-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'doctor',
      title: 'Doctor Portal',
      description: 'Manage your schedule and patient appointments',
      icon: Stethoscope,
      path: '/doctor',
      color: 'bg-purple-600 hover:bg-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white text-3xl font-bold">UC</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">UrgentCareX</h1>
          <p className="text-xl text-gray-600">Choose your portal to continue</p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {portals.map((portal) => (
            <button
              key={portal.id}
              onClick={() => navigate(portal.path)}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 text-left group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${portal.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <portal.icon className={`w-8 h-8 ${portal.iconColor}`} />
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{portal.title}</h2>
              <p className="text-gray-600 mb-6">{portal.description}</p>

              {/* Arrow */}
              <div className="flex items-center text-gray-900 font-medium">
                <span>Access Portal</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact{' '}
            <a href="mailto:support@urgentcarex.com" className="text-gray-900 font-medium hover:underline">
              support@urgentcarex.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}