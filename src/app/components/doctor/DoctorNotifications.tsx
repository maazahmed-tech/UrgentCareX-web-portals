import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, Check, Trash2, Calendar, User, AlertCircle, CheckCircle, ArrowLeft, Clock, CheckCheck } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';

interface Notification {
  id: string;
  type: 'appointment' | 'review' | 'patient' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export function DoctorNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'New Appointment Booked',
      message: 'Michael Chen has booked an appointment for tomorrow at 10:00 AM',
      timestamp: '5 minutes ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'review',
      title: 'New Review Received',
      message: 'Sarah Williams left a 5-star review for your recent consultation',
      timestamp: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Emily Davis in 30 minutes',
      timestamp: '2 hours ago',
      isRead: false,
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
      case 'review':
        return <CheckCircle className="w-5 h-5" />;
      case 'patient':
        return <User className="w-5 h-5" />;
      case 'system':
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-600';
      case 'review':
        return 'bg-green-100 text-green-600';
      case 'patient':
        return 'bg-green-100 text-green-600';
      case 'system':
        return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (id: string) => {
    // Auto-mark as read when clicked
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent marking as read when deleting
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <DashboardLayout title="Notifications" role="doctor">
      <div className="max-w-4xl space-y-4 md:space-y-6">
        {/* Header Section */}
        <div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">No notifications</h3>
            <p className="text-sm md:text-base text-gray-600">
              You don't have any notifications yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`bg-white rounded-xl border transition-all cursor-pointer ${
                  notification.isRead
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-blue-200 bg-blue-50/30 hover:bg-blue-50/50'
                } p-4 md:p-5 hover:shadow-md`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Icon */}
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBgColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 md:gap-4 mb-1">
                      <h3 className={`text-sm md:text-base font-medium ${notification.isRead ? 'text-gray-900' : 'text-gray-900 font-semibold'}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      <button
                        onClick={(e) => handleDelete(notification.id, e)}
                        className="text-xs text-gray-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}