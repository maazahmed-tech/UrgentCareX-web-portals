import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Home, 
  UserCog, 
  Settings, 
  LogOut, 
  Menu,
  Bell,
  ChevronDown,
  Calendar,
  BarChart3,
  CreditCard,
  ClipboardList
} from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface DoctorLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DoctorLayout({ children, title }: DoctorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/doctor');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
    { icon: UserCog, label: 'Profile', path: '/doctor/profile' },
    { icon: Calendar, label: 'Availability', path: '/doctor/availability-calendar' },
    { icon: ClipboardList, label: 'Appointments', path: '/doctor/appointments-today' },
    { icon: CreditCard, label: 'Subscription', path: '/doctor/subscription' },
    { icon: Settings, label: 'Settings', path: '/doctor/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold hidden sm:block">
              UrgentCareX Doctor Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/doctor/notifications')}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                  <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30 transition-transform lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}