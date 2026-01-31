import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Plus, Trash2, Clock, Copy, Check } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

export function AvailabilityCalendar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'Monday', enabled: true, slots: [{ id: '1', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Tuesday', enabled: true, slots: [{ id: '2', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Wednesday', enabled: true, slots: [{ id: '3', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Thursday', enabled: true, slots: [{ id: '4', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Friday', enabled: true, slots: [{ id: '5', startTime: '09:00', endTime: '14:00' }] },
    { day: 'Saturday', enabled: false, slots: [] },
    { day: 'Sunday', enabled: false, slots: [] },
  ]);

  const [savedMessage, setSavedMessage] = useState(false);
  const [appointmentDuration, setAppointmentDuration] = useState<number>(30);

  const toggleDay = (dayIndex: number) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex].enabled = !updated[dayIndex].enabled;
      // If enabling and no slots exist, add a default slot
      if (updated[dayIndex].enabled && updated[dayIndex].slots.length === 0) {
        updated[dayIndex].slots = [{ id: Date.now().toString(), startTime: '09:00', endTime: '17:00' }];
      }
      return updated;
    });
  };

  const updateSlot = (dayIndex: number, slotIndex: number, field: 'startTime' | 'endTime', value: string) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex].slots[slotIndex][field] = value;
      return updated;
    });
  };

  const addSlot = (dayIndex: number) => {
    setSchedule(prev => {
      const updated = [...prev];
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        startTime: '09:00',
        endTime: '17:00'
      };
      updated[dayIndex].slots.push(newSlot);
      return updated;
    });
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    setSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex].slots.splice(slotIndex, 1);
      return updated;
    });
  };

  const copyToAllWeekdays = (dayIndex: number) => {
    const sourceDay = schedule[dayIndex];
    setSchedule(prev => {
      const updated = [...prev];
      // Apply to Monday-Friday (indices 0-4)
      for (let i = 0; i < 5; i++) {
        if (i !== dayIndex) {
          updated[i].enabled = sourceDay.enabled;
          updated[i].slots = sourceDay.slots.map(slot => ({
            ...slot,
            id: `${i}-${Date.now()}-${Math.random()}`
          }));
        }
      }
      return updated;
    });
  };

  const copyToAllDays = (dayIndex: number) => {
    const sourceDay = schedule[dayIndex];
    setSchedule(prev => {
      const updated = [...prev];
      for (let i = 0; i < updated.length; i++) {
        if (i !== dayIndex) {
          updated[i].enabled = sourceDay.enabled;
          updated[i].slots = sourceDay.slots.map(slot => ({
            ...slot,
            id: `${i}-${Date.now()}-${Math.random()}`
          }));
        }
      }
      return updated;
    });
  };

  const handleSave = () => {
    // In a real app, save to backend
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  // Calculate total appointment slots for a given day
  const calculateSlotsForDay = (daySchedule: DaySchedule) => {
    if (!daySchedule.enabled) return 0;
    
    let totalSlots = 0;
    daySchedule.slots.forEach(slot => {
      const [startHour, startMin] = slot.startTime.split(':').map(Number);
      const [endHour, endMin] = slot.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      const durationMinutes = endMinutes - startMinutes;
      totalSlots += Math.floor(durationMinutes / appointmentDuration);
    });
    
    return totalSlots;
  };

  return (
    <DashboardLayout title="Availability Calendar" role="doctor">
      <div className="max-w-6xl">
        {/* Save Button & Success Message */}
        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm md:text-base text-gray-600">Set your weekly availability schedule</p>
          <div className="flex items-center gap-3">
            {savedMessage && (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Changes saved!</span>
              </div>
            )}
            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-gray-900 text-white px-6 h-10 md:h-11 rounded-lg hover:bg-gray-800 text-sm md:text-base"
            >
              Save Schedule
            </button>
          </div>
        </div>

        {/* Appointment Duration Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Appointment Duration</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-4">
                Set the fixed time interval for each patient appointment
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
                {[15, 20, 30, 45, 60, 90, 120].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setAppointmentDuration(duration)}
                    className={`h-10 md:h-11 px-2 md:px-4 rounded-lg border-2 transition-all text-sm md:text-base ${
                      appointmentDuration === duration
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {duration} min
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 lg:min-w-[200px]">
              <div className="text-xs md:text-sm text-blue-900 font-medium mb-1">Slots per 8-hour day</div>
              <div className="text-xl md:text-2xl font-bold text-blue-600">
                {Math.floor(480 / appointmentDuration)}
              </div>
              <div className="text-xs text-blue-700 mt-1">
                Based on {appointmentDuration} min appointments
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Schedule Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Weekly Schedule</h2>

          <div className="space-y-3">
            {schedule.map((daySchedule, dayIndex) => (
              <div
                key={daySchedule.day}
                className={`bg-white rounded-xl border-2 transition-all ${
                  daySchedule.enabled
                    ? 'border-green-200 bg-green-50/30'
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="p-4 md:p-5">
                  {/* Day Header with Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <button
                        onClick={() => toggleDay(dayIndex)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          daySchedule.enabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            daySchedule.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <h3 className={`text-base md:text-lg font-semibold ${
                        daySchedule.enabled ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {daySchedule.day}
                      </h3>
                      {!daySchedule.enabled && (
                        <span className="text-xs md:text-sm text-gray-500">Unavailable</span>
                      )}
                      {daySchedule.enabled && (
                        <span className="text-xs md:text-sm px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                          {calculateSlotsForDay(daySchedule)} slots
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {daySchedule.enabled && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <button
                          onClick={() => copyToAllWeekdays(dayIndex)}
                          className="text-xs flex items-center gap-1.5 px-2 md:px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap"
                          title="Copy to all weekdays"
                        >
                          <Copy className="w-3 h-3" />
                          <span className="hidden sm:inline">Copy to</span> Weekdays
                        </button>
                        <button
                          onClick={() => copyToAllDays(dayIndex)}
                          className="text-xs flex items-center gap-1.5 px-2 md:px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap"
                          title="Copy to all days"
                        >
                          <Copy className="w-3 h-3" />
                          <span className="hidden sm:inline">Copy to</span> All
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Time Slots */}
                  {daySchedule.enabled && (
                    <div className="space-y-3">
                      {daySchedule.slots.map((slot, slotIndex) => (
                        <div key={slot.id} className="flex items-center gap-2 md:gap-3">
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 hidden sm:block" />

                          {/* Start Time */}
                          <div className="flex-1">
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateSlot(dayIndex, slotIndex, 'startTime', e.target.value)}
                              className="w-full h-10 px-2 md:px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm md:text-base"
                            />
                          </div>

                          <span className="text-gray-400 text-sm">to</span>

                          {/* End Time */}
                          <div className="flex-1">
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateSlot(dayIndex, slotIndex, 'endTime', e.target.value)}
                              className="w-full h-10 px-2 md:px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm md:text-base"
                            />
                          </div>

                          {/* Remove Slot */}
                          {daySchedule.slots.length > 1 && (
                            <button
                              onClick={() => removeSlot(dayIndex, slotIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                              title="Remove time slot"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Add Another Slot */}
                      <button
                        onClick={() => addSlot(dayIndex)}
                        className="flex items-center gap-2 text-xs md:text-sm text-gray-600 hover:text-gray-900 mt-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add another time slot
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}