import { useState, useEffect } from 'react';
import { Bell, Send, Users, Building2, UserCog, Clock, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';

interface NotificationHistory {
  id: string;
  title: string;
  message: string;
  recipients: 'all' | 'patients' | 'facilities' | 'doctors';
  sentAt: string;
  sentBy: string;
  recipientCount: number;
  status: 'sent' | 'failed';
}

const mockNotificationHistory: NotificationHistory[] = [
  {
    id: '1',
    title: 'System Maintenance Notice',
    message: 'The platform will undergo scheduled maintenance on Saturday, January 25th from 2:00 AM to 6:00 AM EST. During this time, the service may be temporarily unavailable.',
    recipients: 'all',
    sentAt: '2026-01-20T10:30:00',
    sentBy: 'Admin',
    recipientCount: 1492,
    status: 'sent',
  },
  {
    id: '2',
    title: 'New Feature: Appointment Reminders',
    message: 'We are excited to announce automated appointment reminders! Patients will now receive notifications 24 hours before their scheduled appointments.',
    recipients: 'patients',
    sentAt: '2026-01-18T14:15:00',
    sentBy: 'Admin',
    recipientCount: 1247,
    status: 'sent',
  },
  {
    id: '3',
    title: 'Updated Billing Information Required',
    message: 'Please review and update your billing information to ensure uninterrupted service. Log in to your dashboard to make changes.',
    recipients: 'facilities',
    sentAt: '2026-01-15T09:00:00',
    sentBy: 'Admin',
    recipientCount: 89,
    status: 'sent',
  },
  {
    id: '4',
    title: 'Profile Verification Reminder',
    message: 'Complete your profile verification to increase your visibility to patients. Verified profiles receive 40% more appointment requests.',
    recipients: 'doctors',
    sentAt: '2026-01-12T11:45:00',
    sentBy: 'Admin',
    recipientCount: 156,
    status: 'sent',
  },
  {
    id: '5',
    title: 'Holiday Hours Update',
    message: 'Reminder: Please update your holiday operating hours in your profile to ensure patients have accurate information during the upcoming holiday season.',
    recipients: 'all',
    sentAt: '2026-01-08T16:00:00',
    sentBy: 'Admin',
    recipientCount: 1492,
    status: 'sent',
  },
];

export function PushNotifications() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState(mockNotificationHistory);

  useEffect(() => {
    console.log('Current Screen: Admin Push Notifications');
  }, []);

  const getRecipientCount = () => {
    switch (recipients) {
      case 'all':
        return 1492; // patients + facilities + doctors
      case 'patients':
        return 1247;
      case 'facilities':
        return 89;
      case 'doctors':
        return 156;
      default:
        return 0;
    }
  };

  const getRecipientLabel = (value: string) => {
    switch (value) {
      case 'all':
        return 'All Users';
      case 'patients':
        return 'All Patients';
      case 'facilities':
        return 'All Facilities';
      case 'doctors':
        return 'All Doctors';
      default:
        return value;
    }
  };

  const getRecipientIcon = (value: string) => {
    switch (value) {
      case 'all':
        return <Users className="w-4 h-4" />;
      case 'patients':
        return <Users className="w-4 h-4" />;
      case 'facilities':
        return <Building2 className="w-4 h-4" />;
      case 'doctors':
        return <UserCog className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const handleSendNotification = () => {
    // Add to history
    const newNotification: NotificationHistory = {
      id: String(notificationHistory.length + 1),
      title,
      message,
      recipients: recipients as 'all' | 'patients' | 'facilities' | 'doctors',
      sentAt: new Date().toISOString(),
      sentBy: 'Admin',
      recipientCount: getRecipientCount(),
      status: 'sent',
    };

    setNotificationHistory([newNotification, ...notificationHistory]);
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);

    // Reset form
    setTitle('');
    setMessage('');
    setRecipients('');
  };

  const isFormValid = title.trim() && message.trim() && recipients;

  return (
    <DashboardLayout title="Push Notifications" role="admin">
      <div className="space-y-4 md:space-y-6">
        {/* Compose Notification */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-base md:text-lg font-semibold">Compose Notification</h2>
          </div>

          <div className="space-y-4">
            {/* Recipients */}
            <div>
              <Label htmlFor="recipients">Recipients</Label>
              <Select value={recipients} onValueChange={setRecipients}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">All Users</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="patients">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Patients (1,247)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="facilities">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">Facilities (89)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="doctors">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-4 h-4" />
                      <span className="text-sm">Doctors (156)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {recipients && (
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Sending to {getRecipientCount().toLocaleString()} recipients
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                className="mt-1.5"
                maxLength={100}
              />
              <p className="text-xs md:text-sm text-gray-500 mt-1">{title.length}/100 characters</p>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                className="mt-1.5 min-h-[100px] md:min-h-[120px]"
                maxLength={500}
              />
              <p className="text-xs md:text-sm text-gray-500 mt-1">{message.length}/500 characters</p>
            </div>

            {/* Send Button */}
            <div className="flex justify-end pt-2 md:pt-4">
              <Button
                onClick={() => setShowConfirmDialog(true)}
                disabled={!isFormValid}
                className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </div>
        </div>

        {/* Notification History */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-base md:text-lg font-semibold">Notification History</h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            {notificationHistory.map((notification) => (
              <div
                key={notification.id}
                className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {getRecipientIcon(notification.recipients)}
                    <span className="text-xs md:text-sm font-medium text-gray-600">
                      {getRecipientLabel(notification.recipients)}
                    </span>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <span className="text-xs md:text-sm text-gray-500">
                      {notification.recipientCount.toLocaleString()} recipients
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        notification.status === 'sent'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {notification.status === 'sent' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Sent
                        </>
                      ) : (
                        'Failed'
                      )}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{notification.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(notification.sentAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  at{' '}
                  {new Date(notification.sentAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Send Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Send Notification</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to send this notification to{' '}
              <strong>{getRecipientCount().toLocaleString()}</strong> {getRecipientLabel(recipients).toLowerCase()}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gray-50 rounded-lg p-4 my-4">
            <p className="font-semibold text-gray-900 mb-1">{title}</p>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSendNotification}
              className="bg-gray-900 hover:bg-gray-800"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Notification Sent Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your notification has been sent to {getRecipientCount().toLocaleString()} recipients.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-gray-900 hover:bg-gray-800">
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
