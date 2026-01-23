import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, Clock, Calendar } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

export function AddTimeSlot() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    recurring: true,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save the time slot to the backend
    navigate('/doctor/availability-calendar');
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <DashboardLayout title="Add Time Slot" role="doctor">
      <div className="max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor/availability-calendar')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Availability
        </button>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Day of Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day of Week <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.day}
                onChange={(e) => handleChange('day', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">Select day</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* Recurring */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) => handleChange('recurring', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
              />
              <label htmlFor="recurring" className="text-sm text-gray-700">
                Repeat this time slot every week
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/doctor/availability-calendar')}
                className="flex-1 border border-gray-300 text-gray-700 h-11 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gray-900 text-white h-11 rounded-lg hover:bg-gray-800"
              >
                Add Time Slot
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}