import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, User, Calendar, Clock, AlertCircle, Pill, FileText, CheckCircle, XCircle, Star } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

interface ROSItem {
  category: string;
  value: string;
}

export function DoctorAppointmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    console.log('📍 Current Screen: Appointment Details - ID:', id);
  }, [id]);

  // Mock appointment data - in real app this would come from API based on id
  const appointments = {
    '1': {
      id: '1',
      patientName: 'John Smith',
      patientAge: 45,
      patientGender: 'Male',
      patientPronouns: 'he/him',
      status: 'Completed',
      date: 'Monday, January 20, 2026',
      time: '9:00 AM - 9:30 AM',
      chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin', 'Shellfish'],
      medications: [
        { name: 'Metformin 500mg', frequency: 'Twice daily' },
        { name: 'Lisinopril 10mg', frequency: 'Once daily' },
      ],
      pastSurgeries: ['Appendectomy (2018)', 'Knee Surgery (2020)'],
      familyHistory: ['Heart Disease (Father)', 'Diabetes (Mother)'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Occasional',
        exercise: '3-4 times per week',
      },
      review: {
        rating: 5,
        comment: 'Dr. Sarah is an excellent physician. Very thorough and takes time to listen to concerns.',
      },
    },
    '2': {
      id: '2',
      patientName: 'Mary Wilson',
      patientAge: 32,
      patientGender: 'Female',
      patientPronouns: 'she/her',
      status: 'Completed',
      date: 'Monday, January 20, 2026',
      time: '9:30 AM - 10:00 AM',
      chronicConditions: [],
      allergies: ['None known'],
      medications: [
        { name: 'Birth control pill', frequency: 'Once daily' },
      ],
      pastSurgeries: [],
      familyHistory: ['Breast Cancer (Aunt)'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Social',
        exercise: '2-3 times per week',
      },
      review: {
        rating: 4,
        comment: 'Great experience overall. The doctor was knowledgeable and professional. Would recommend!',
      },
    },
    '3': {
      id: '3',
      patientName: 'Bob Johnson',
      patientAge: 58,
      patientGender: 'Male',
      patientPronouns: 'he/him',
      status: 'Completed',
      date: 'Monday, January 20, 2026',
      time: '10:00 AM - 10:30 AM',
      chronicConditions: ['Type 2 Diabetes', 'High Cholesterol'],
      allergies: ['Sulfa drugs'],
      medications: [
        { name: 'Metformin 500mg', frequency: 'Twice daily' },
        { name: 'Atorvastatin 20mg', frequency: 'Once daily' },
      ],
      pastSurgeries: ['Gallbladder Removal (2015)'],
      familyHistory: ['Diabetes (Both Parents)', 'Stroke (Grandfather)'],
      lifestyle: {
        smoking: 'Former smoker (quit 2019)',
        alcohol: 'Rarely',
        exercise: 'Daily walks',
      },
      review: {
        rating: 5,
        comment: 'Exceptional care! The doctor explained everything clearly and addressed all my concerns. Highly satisfied with the consultation.',
      },
    },
    '4': {
      id: '4',
      patientName: 'Lisa Park',
      patientAge: 28,
      patientGender: 'Female',
      patientPronouns: 'she/they',
      status: 'Cancelled',
      date: 'Tuesday, January 21, 2026',
      time: '10:30 AM - 11:00 AM',
      chronicConditions: ['Asthma'],
      allergies: ['Latex', 'Aspirin'],
      medications: [
        { name: 'Albuterol Inhaler', frequency: 'As needed' },
        { name: 'Fluticasone Inhaler', frequency: 'Twice daily' },
      ],
      pastSurgeries: [],
      familyHistory: ['Asthma (Mother)', 'Allergies (Sister)'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Never',
        exercise: 'Light yoga 2-3 times per week',
      },
    },
    '5': {
      id: '5',
      patientName: 'David Chen',
      patientAge: 42,
      patientGender: 'Male',
      patientPronouns: undefined,
      status: 'Pending Confirmation',
      date: 'Tuesday, January 21, 2026',
      time: '2:00 PM - 2:30 PM',
      chronicConditions: [],
      allergies: ['None known'],
      medications: [],
      pastSurgeries: [],
      familyHistory: ['Hypertension (Father)'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Moderate',
        exercise: '4-5 times per week',
      },
    },
    '6': {
      id: '6',
      patientName: 'Sarah Anderson',
      patientAge: 35,
      patientGender: 'Female',
      patientPronouns: 'they/them',
      status: 'Confirmed',
      date: 'Wednesday, January 22, 2026',
      time: '9:00 AM - 9:30 AM',
      chronicConditions: ['Migraine'],
      allergies: ['None known'],
      medications: [
        { name: 'Sumatriptan 50mg', frequency: 'As needed' },
      ],
      pastSurgeries: ['Wisdom teeth removal (2019)'],
      familyHistory: ['Migraine (Mother)'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Rarely',
        exercise: '3 times per week',
      },
    },
    '7': {
      id: '7',
      patientName: 'Michael Brown',
      patientAge: 50,
      patientGender: 'Male',
      patientPronouns: 'he/him',
      status: 'Pending Confirmation',
      date: 'Wednesday, January 22, 2026',
      time: '11:00 AM - 11:30 AM',
      chronicConditions: ['High Cholesterol'],
      allergies: ['None known'],
      medications: [
        { name: 'Atorvastatin 40mg', frequency: 'Once daily' },
      ],
      pastSurgeries: [],
      familyHistory: ['Heart Disease (Father)', 'High Cholesterol (Mother)'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Social',
        exercise: '2-3 times per week',
      },
    },
    '8': {
      id: '8',
      patientName: 'Emily Davis',
      patientAge: 29,
      patientGender: 'Female',
      patientPronouns: 'she/her',
      status: 'Confirmed',
      date: 'Thursday, January 23, 2026',
      time: '3:00 PM - 3:30 PM',
      chronicConditions: [],
      allergies: ['None known'],
      medications: [],
      pastSurgeries: [],
      familyHistory: ['None reported'],
      lifestyle: {
        smoking: 'Never',
        alcohol: 'Social',
        exercise: 'Daily runs',
      },
    },
    '9': {
      id: '9',
      patientName: 'James Wilson',
      patientAge: 62,
      patientGender: 'Male',
      patientPronouns: 'he/him',
      status: 'Confirmed',
      date: 'Friday, January 24, 2026',
      time: '10:00 AM - 10:30 AM',
      chronicConditions: ['Arthritis', 'Hypertension'],
      allergies: ['Codeine'],
      medications: [
        { name: 'Ibuprofen 400mg', frequency: 'Twice daily' },
        { name: 'Lisinopril 20mg', frequency: 'Once daily' },
      ],
      pastSurgeries: ['Hip Replacement (2022)'],
      familyHistory: ['Arthritis (Mother)', 'Heart Disease (Father)'],
      lifestyle: {
        smoking: 'Former smoker (quit 2015)',
        alcohol: 'Rarely',
        exercise: 'Light walking',
      },
    },
  };

  const appointment = appointments[id as keyof typeof appointments] || appointments['1'];
  const [currentStatus, setCurrentStatus] = useState(appointment.status);

  // ROS Summary data
  const rosSummary: ROSItem[] = [
    { category: 'General', value: 'No significant concerns reported' },
    { category: 'Head & Neck', value: 'No headaches or neck pain' },
    { category: 'Eyes', value: 'No vision changes' },
    { category: 'Ears, Nose & Throat', value: 'No hearing issues or sore throat' },
    { category: 'Cardiovascular', value: 'No chest pain or palpitations' },
    { category: 'Respiratory', value: 'No shortness of breath' },
    { category: 'Gastrointestinal', value: 'No nausea or digestive issues' },
    { category: 'Musculoskeletal', value: 'No joint pain or muscle weakness' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Confirmation':
        return 'bg-[#F3F4F6] text-[#6B7280]';
      case 'Confirmed':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      case 'Completed':
        return 'bg-[#D1FAE5] text-[#065F46]';
      case 'Cancelled':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]';
    }
  };

  const handleConfirmAppointment = () => {
    setCurrentStatus('Confirmed');
    setNotification({ message: 'Appointment confirmed successfully!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    // In real app, call API to update status
  };

  const handleMarkComplete = () => {
    setCurrentStatus('Completed');
    setNotification({ message: 'Appointment marked as complete!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    // In real app, call API to update status
  };

  const handleStartConsultation = () => {
    // In real app, navigate to consultation interface or telehealth
    alert('Starting consultation...');
  };

  const handleReschedule = () => {
    // In real app, navigate to reschedule interface
    alert('Reschedule functionality would open here');
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    setCurrentStatus('Cancelled');
    setShowRejectModal(false);
    setNotification({ message: 'Appointment rejected. Patient has been notified.', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    // In real app, call API to reject and notify patient
  };

  const handleCancel = () => {
    setShowRejectModal(true);
  };

  return (
    <DashboardLayout title="Appointment Details" role="doctor">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Notification Banner */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${
            notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`text-sm md:text-base font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {notification.message}
            </span>
          </div>
        )}

        {/* Reject Confirmation Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 md:p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Reject Appointment?</h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Are you sure you want to reject this appointment with <strong>{appointment.patientName}</strong>?
                The patient will be notified and can choose another provider.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-sm md:text-base"
                >
                  Reject Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor/appointments-calendar-week')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Appointments</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#E5E7EB] p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-semibold text-[#1F2937] mb-2">Appointment Details</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                👨‍⚕️
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#1F2937] truncate">{appointment.patientName}</p>
                <p className="text-xs md:text-sm text-[#6B7280]">
                  {appointment.patientAge} yrs, {appointment.patientGender} ({appointment.patientPronouns || 'Not specified'})
                </p>
              </div>
            </div>
            <div className="mt-3 md:mt-4">
              <span className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getStatusColor(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 md:p-6 border-b border-[#E5E7EB]">
            <h2 className="font-semibold text-[#1F2937] mb-3 md:mb-4">Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#6B7280] mt-0.5" />
                <div>
                  <p className="text-sm text-[#6B7280]">Date</p>
                  <p className="font-medium text-[#1F2937]">{appointment.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#6B7280] mt-0.5" />
                <div>
                  <p className="text-sm text-[#6B7280]">Time</p>
                  <p className="font-medium text-[#1F2937]">{appointment.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Medical Information */}
          <div className="p-4 md:p-6 border-b border-[#E5E7EB]">
            <h2 className="font-semibold text-[#1F2937] mb-4 md:mb-6">Medical History</h2>
            
            <div className="space-y-6">
              {/* Chronic Conditions */}
              {appointment.chronicConditions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🏥</span>
                    <h3 className="font-semibold text-[#1F2937]">Chronic Conditions</h3>
                  </div>
                  <ul className="space-y-1 ml-8">
                    {appointment.chronicConditions.map((condition, index) => (
                      <li key={index} className="text-[#6B7280] text-sm flex items-start gap-2">
                        <span className="text-[#1F2937] mt-1.5">•</span>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allergies */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚠️</span>
                  <h3 className="font-semibold text-[#1F2937]">Allergies</h3>
                </div>
                <ul className="space-y-1 ml-8">
                  {appointment.allergies.map((allergy, index) => (
                    <li key={index} className="text-[#6B7280] text-sm flex items-start gap-2">
                      <span className="text-[#1F2937] mt-1.5">•</span>
                      <span>{allergy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current Medications */}
              {appointment.medications.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">💊</span>
                    <h3 className="font-semibold text-[#1F2937]">Current Medications</h3>
                  </div>
                  <ul className="space-y-1 ml-8">
                    {appointment.medications.map((med, index) => (
                      <li key={index} className="text-[#6B7280] text-sm flex items-start gap-2">
                        <span className="text-[#1F2937] mt-1.5">•</span>
                        <span>
                          {med.name} - <span className="text-[#6B7280]">{med.frequency}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Past Surgeries */}
              {appointment.pastSurgeries.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔪</span>
                    <h3 className="font-semibold text-[#1F2937]">Past Surgeries</h3>
                  </div>
                  <ul className="space-y-1 ml-8">
                    {appointment.pastSurgeries.map((surgery, index) => (
                      <li key={index} className="text-[#6B7280] text-sm flex items-start gap-2">
                        <span className="text-[#1F2937] mt-1.5">•</span>
                        <span>{surgery}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Family History */}
              {appointment.familyHistory.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">👨‍👩‍👧‍👦</span>
                    <h3 className="font-semibold text-[#1F2937]">Family History</h3>
                  </div>
                  <ul className="space-y-1 ml-8">
                    {appointment.familyHistory.map((history, index) => (
                      <li key={index} className="text-[#6B7280] text-sm flex items-start gap-2">
                        <span className="text-[#1F2937] mt-1.5">•</span>
                        <span>{history}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lifestyle & Social History */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🏃</span>
                  <h3 className="font-semibold text-[#1F2937]">Lifestyle & Social History</h3>
                </div>
                <div className="space-y-2 ml-8">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="font-medium text-[#1F2937] min-w-[80px]">Smoking:</span>
                    <span className="text-[#6B7280]">{appointment.lifestyle.smoking}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="font-medium text-[#1F2937] min-w-[80px]">Alcohol:</span>
                    <span className="text-[#6B7280]">{appointment.lifestyle.alcohol}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="font-medium text-[#1F2937] min-w-[80px]">Exercise:</span>
                    <span className="text-[#6B7280]">{appointment.lifestyle.exercise}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROS Summary Section */}
          <div className="p-4 md:p-6 border-b border-[#E5E7EB]">
            <h2 className="font-semibold text-[#1F2937] mb-3 md:mb-4">ROS Summary</h2>
            <div className="space-y-3">
              {rosSummary.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                  <div className="sm:min-w-[160px]">
                    <p className="text-xs md:text-sm font-medium text-[#1F2937]">{item.category}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-[#6B7280]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Review Section - Only for Completed Appointments */}
          {currentStatus === 'Completed' && appointment.review && (
            <div className="p-4 md:p-6 border-b border-[#E5E7EB] bg-gradient-to-br from-blue-50 to-white">
              <h2 className="font-semibold text-[#1F2937] mb-3 md:mb-4">Patient Review</h2>
              <div className="space-y-3">
                {/* Star Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= appointment.review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-[#1F2937]">
                    {appointment.review.rating} / 5
                  </span>
                </div>

                {/* Review Comment */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-[#374151] leading-relaxed italic">
                    "{appointment.review.comment}"
                  </p>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <User className="w-4 h-4" />
                  <span>Review by {appointment.patientName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons Based on Status */}
          <div className="p-4 md:p-6 bg-[#F3F4F6]">
            {currentStatus === 'Pending Confirmation' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConfirmAppointment}
                  className="flex-1 bg-[#3B82F6] text-white py-3 px-6 rounded-lg hover:bg-[#2563EB] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Appointment
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-white text-[#EF4444] py-3 px-6 rounded-lg border border-[#FCA5A5] hover:bg-[#FEF2F2] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}

            {currentStatus === 'Confirmed' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleMarkComplete}
                  className="flex-1 bg-[#10B981] text-white py-3 px-6 rounded-lg hover:bg-[#059669] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark as Complete
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-white text-[#EF4444] py-3 px-6 rounded-lg border border-[#FCA5A5] hover:bg-[#FEF2F2] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}

            {currentStatus === 'Completed' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-[#10B981]">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">This appointment has been completed</span>
                </div>
              </div>
            )}

            {currentStatus === 'Cancelled' && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-[#EF4444]">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">This appointment has been cancelled</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}