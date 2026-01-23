import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Home,
  Building2,
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Users,
  BarChart3,
  CreditCard,
  ClipboardList,
  Calendar,
  Shield,
  HelpCircle,
  Clock,
  AlertTriangle,
  Send
} from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { AccountSuspensionOverlay } from '@/app/components/facility/AccountSuspensionOverlay';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  role: 'admin' | 'facility' | 'doctor';
}

export function DashboardLayout({ children, title, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  // Session timeout constants
  const WARNING_TIME = 25 * 60 * 1000; // 25 minutes in milliseconds
  const LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Check for suspension status on mount and when localStorage changes
  useEffect(() => {
    const checkSuspension = () => {
      if (role === 'facility') {
        const suspended = localStorage.getItem('facilityAccountSuspended') === 'true';
        setIsSuspended(suspended);
      } else if (role === 'doctor') {
        const suspended = localStorage.getItem('doctorAccountSuspended') === 'true';
        setIsSuspended(suspended);
      }
    };

    checkSuspension();

    // Listen for storage changes (in case suspension is triggered from another tab)
    window.addEventListener('storage', checkSuspension);
    // Listen for custom suspension change event (same tab)
    window.addEventListener('suspensionChange', checkSuspension);
    
    return () => {
      window.removeEventListener('storage', checkSuspension);
      window.removeEventListener('suspensionChange', checkSuspension);
    };
  }, [role]);

  const handleUnsuspend = () => {
    if (role === 'facility') {
      localStorage.removeItem('facilityAccountSuspended');
    } else if (role === 'doctor') {
      localStorage.removeItem('doctorAccountSuspended');
    }
    setIsSuspended(false);
  };

  const handleLogout = () => {
    logout();
    navigate(`/${role}`);
  };

  // Session timeout management
  useEffect(() => {
    let warningTimer: NodeJS.Timeout;
    let logoutTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;
    let lastActivity = Date.now();

    const resetTimers = () => {
      lastActivity = Date.now();
      setShowTimeoutWarning(false);
      
      // Clear existing timers
      if (warningTimer) clearTimeout(warningTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
      if (countdownInterval) clearInterval(countdownInterval);

      // Set warning timer (25 minutes)
      warningTimer = setTimeout(() => {
        setShowTimeoutWarning(true);
        setTimeRemaining(300); // 5 minutes in seconds
        
        // Start countdown
        countdownInterval = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, WARNING_TIME);

      // Set logout timer (30 minutes)
      logoutTimer = setTimeout(() => {
        handleLogout();
      }, LOGOUT_TIME);
    };

    // Track user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      // Only reset if not showing warning or if activity is significant
      if (!showTimeoutWarning) {
        resetTimers();
      }
    };

    // Initialize timers
    resetTimers();

    // Add event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      if (warningTimer) clearTimeout(warningTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
      if (countdownInterval) clearInterval(countdownInterval);
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [role, navigate]);

  const handleExtendSession = () => {
    setShowTimeoutWarning(false);
    setTimeRemaining(300);
    // Timers will be reset by the useEffect
    window.dispatchEvent(new Event('mousedown')); // Trigger activity
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Define navigation items based on role
  const getNavItems = () => {
    if (role === 'admin') {
      return [
        { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Patients', path: '/admin/patients' },
        { icon: Building2, label: 'Facilities', path: '/admin/facilities' },
        { icon: UserCog, label: 'Doctors', path: '/admin/doctors' },
        { icon: CreditCard, label: 'Subscriptions', path: '/admin/subscriptions' },
        { icon: Send, label: 'Notifications', path: '/admin/notifications' },
      ];
    } else if (role === 'facility') {
      return [
        { icon: Home, label: 'Dashboard', path: '/facility/dashboard' },
        { icon: Building2, label: 'Profile', path: '/facility/profile' },
        { icon: Shield, label: 'Insurance & Payers', path: '/facility/insurance-payers' },
        { icon: CreditCard, label: 'Subscription', path: '/facility/subscription' },
        { icon: Settings, label: 'Settings', path: '/facility/settings' },
        { icon: HelpCircle, label: 'Help & Support', path: '/facility/help-support' },
      ];
    } else {
      return [
        { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: UserCog, label: 'Profile', path: '/doctor/profile' },
        { icon: Calendar, label: 'Availability', path: '/doctor/availability-calendar' },
        { icon: ClipboardList, label: 'Appointments', path: '/doctor/appointments-calendar-week' },
        { icon: CreditCard, label: 'Subscription', path: '/doctor/subscription' },
        { icon: Settings, label: 'Settings', path: '/doctor/settings' },
        { icon: HelpCircle, label: 'Help & Support', path: '/doctor/help-support' },
      ];
    }
  };

  const navItems = getNavItems();

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
              UrgentCareX {role === 'admin' ? 'Admin' : role === 'facility' ? 'Facility Portal' : 'Doctor Portal'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {role !== 'admin' && (
              <button
                onClick={() => navigate(`/${role}/notifications`)}
                className="p-2 hover:bg-gray-100 rounded-lg relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

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
              className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors
                ${location.pathname === item.path ? 'bg-gray-100' : ''}
              `}
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
        <div className="p-6 min-h-[calc(100vh-4rem-80px)]">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </main>

      {/* Account Suspension Overlay */}
      {isSuspended && (
        <AccountSuspensionOverlay onUnsuspend={handleUnsuspend} />
      )}

      {/* Session Timeout Warning */}
      {showTimeoutWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Session Timeout Warning</h3>
                <p className="text-sm text-gray-600">Your session is about to expire</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-900 mb-3">
                For your security, you will be automatically logged out due to inactivity.
              </p>
              <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg border border-orange-200">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{formatTime(timeRemaining)}</span>
              </div>
              <p className="text-xs text-orange-800 mt-3 text-center">
                Click "Extend Session" to continue working
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1"
              >
                Logout Now
              </Button>
              <Button
                onClick={handleExtendSession}
                className="flex-1 bg-gray-900 hover:bg-gray-800"
              >
                Extend Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}