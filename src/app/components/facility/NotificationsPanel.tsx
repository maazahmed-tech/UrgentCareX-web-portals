import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, Check, Trash2, Calendar, User, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';

interface Notification {
  id: string;
  type: 'profile' | 'subscription' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: any;
  iconColor: string;
}

export function NotificationsPanel() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'profile',
      title: 'Profile Updated',
      message: 'Your facility profile information was successfully updated',
      timestamp: '2 hours ago',
      read: false,
      icon: CheckCircle,
      iconColor: 'text-green-600 bg-green-100',
    },
    {
      id: '2',
      type: 'subscription',
      title: 'Subscription Renewed',
      message: 'Your Premium plan subscription has been successfully renewed',
      timestamp: '1 day ago',
      read: false,
      icon: Calendar,
      iconColor: 'text-blue-600 bg-blue-100',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id: string) => {
    // Auto-mark as read when clicked
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent marking as read when deleting
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <DashboardLayout title="Notifications" role="facility">
      <div className="max-w-4xl space-y-6">
        {/* Header Section */}
        <div>
          <p className="text-gray-600 mb-6">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-gray-600">
              You don't have any notifications yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`bg-white rounded-xl border transition-all cursor-pointer ${
                    notification.read 
                      ? 'border-gray-200 hover:border-gray-300' 
                      : 'border-blue-200 bg-blue-50/30 hover:bg-blue-50/50'
                  } p-5 hover:shadow-md`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notification.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-900' : 'text-gray-900 font-semibold'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        <button
                          onClick={(e) => handleDelete(notification.id, e)}
                          className="text-xs text-gray-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}