import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, Clock, Calendar } from 'lucide-react';
import { DoctorLayout } from '@/app/components/layouts/DoctorLayout';

export function EditTimeSlot() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
    repeat: 'weekly'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/doctor/availability-calendar');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this time slot?')) {
      navigate('/doctor/availability-calendar');
    }
  };

  return (
    <DoctorLayout title="Edit Time Slot">
      <div className="max-w-2xl">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB]">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-6">Edit Availability Slot</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-[#6B7280] mb-2">Day of Week</label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-[#1F2937]"
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6B7280] mb-2">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-[#1F2937]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#6B7280] mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-[#1F2937]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#6B7280] mb-2">Repeat</label>
              <select
                value={formData.repeat}
                onChange={(e) => setFormData({ ...formData, repeat: e.target.value })}
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-[#1F2937]"
              >
                <option value="once">Once</option>
                <option value="weekly">Every Week</option>
                <option value="biweekly">Every 2 Weeks</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 h-11 bg-[#1F2937] text-white rounded-lg hover:bg-[#374151] transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 h-11 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
              >
                Delete Slot
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/doctor/availability-calendar')}
              className="w-full h-10 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F3F4F6] transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </DoctorLayout>
  );
}