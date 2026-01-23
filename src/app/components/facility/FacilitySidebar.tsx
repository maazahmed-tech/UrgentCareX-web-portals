import { useNavigate, useLocation } from 'react-router';
import { 
  Home, 
  Building2, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

export function FacilitySidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/facility');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/facility/dashboard' },
    { icon: Building2, label: 'Profile', path: '/facility/profile' },
    { icon: Shield, label: 'Insurance & Payers', path: '/facility/insurance-payers' },
    { icon: Users, label: 'Doctors', path: '/facility/doctors-roster' },
    { icon: Calendar, label: 'Appointments', path: '/facility/appointments' },
    { icon: CreditCard, label: 'Subscription', path: '/facility/subscription' },
    { icon: Settings, label: 'Settings', path: '/facility/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/facility/help-support' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-gray-900 text-sm font-bold">UC</span>
          </div>
          <span className="font-semibold text-sm">UrgentCareX</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          location.pathname.startsWith(item.path + '/');
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Menu */}
      <div className="p-3 border-t border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium">
                  {user?.name?.charAt(0) || 'F'}
                </span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'Facility'}
                </p>
                <p className="text-xs text-gray-400 truncate">Facility Portal</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate('/facility/notifications')}>
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/facility/settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}