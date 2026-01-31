import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, User, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Star, MessageSquare, ChevronDown, ChevronUp, Heart, AlertTriangle, Pill, Scissors, Users, Activity } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

interface ROSItem {
  category: string;
  value: string;
}

export function FacilityAppointmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isAISummaryExpanded, setIsAISummaryExpanded] = useState(false);

  useEffect(() => {
    console.log('Current Screen: Facility Appointment Details - ID:', id);
  }, [id]);

  // Mock appointment data - in real app this would come from API based on id
  const appointments = {
    '1': {
      id: '1',
      patientName: 'John Smith',
      patientAge: 45,
      patientGender: 'Male',
      patientPronouns: 'he/him',
      doctorName: 'Dr. Sarah Johnson',
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
      doctorName: 'Dr. Michael Chen',
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
      doctorName: 'Dr. Sarah Johnson',
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
      doctorName: 'Dr. Emily Davis',
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
      doctorName: 'Dr. Michael Chen',
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
      doctorName: 'Dr. Sarah Johnson',
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
      doctorName: 'Dr. Emily Davis',
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
      doctorName: 'Dr. Sarah Johnson',
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
      doctorName: 'Dr. Michael Chen',
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
    <DashboardLayout title="Appointment Details" role="facility">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Notification Banner */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${
            notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
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
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Cancel Appointment?</h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Are you sure you want to cancel this appointment with <strong>{appointment.patientName}</strong>?
                The patient will be notified and can choose another time slot.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm md:text-base"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-sm md:text-base"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/facility/appointments-calendar')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Appointments</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-md overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#E5E7EB] p-4 md:p-6 bg-gradient-to-r from-slate-50 to-white">
            <h1 className="text-xl md:text-2xl font-bold text-[#111827] mb-3">Appointment Details</h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <User className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-lg md:text-xl text-[#111827] truncate">{appointment.patientName}</p>
                <p className="text-sm md:text-base text-[#6B7280]">
                  {appointment.patientAge} yrs, {appointment.patientGender} ({appointment.patientPronouns || 'Not specified'})
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm ${getStatusColor(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 md:p-6 border-b border-[#E5E7EB] bg-white">
            <h2 className="font-bold text-lg text-[#111827] mb-4">Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Date</p>
                  <p className="font-semibold text-[#111827]">{appointment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Time</p>
                  <p className="font-semibold text-[#111827]">{appointment.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Pre-Visit Conversation Summary */}
          <div className="border-b border-[#E5E7EB] bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
            <button
              onClick={() => setIsAISummaryExpanded(!isAISummaryExpanded)}
              className="w-full p-4 md:p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="font-bold text-[#111827] text-base md:text-lg">AI Pre-Visit Conversation Summary</h2>
                  <p className="text-xs md:text-sm text-[#6B7280]">Summary of patient's conversation with AI assistant</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                {isAISummaryExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </div>
            </button>

            {isAISummaryExpanded && (
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="bg-white rounded-xl p-4 md:p-5 border border-indigo-100 shadow-sm">
                  <p className="text-sm md:text-base text-[#374151] leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Patient reported experiencing persistent headaches for the past week, primarily in the frontal region. Symptoms are worse in the morning and tend to improve throughout the day. No visual disturbances or nausea reported. Patient mentioned increased stress at work and reduced sleep quality over the past month. Has been taking over-the-counter pain relievers with moderate relief. No history of migraines or similar episodes. Patient expressed interest in discussing preventive measures and lifestyle modifications during the appointment.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Patient Medical Information */}
          <div className="p-4 md:p-6 border-b border-[#E5E7EB] bg-white">
            <h2 className="font-bold text-lg text-[#111827] mb-5">Medical History</h2>

            <div className="space-y-4">
              {/* Chronic Conditions */}
              {appointment.chronicConditions.length > 0 && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-[#111827]">Chronic Conditions</h3>
                  </div>
                  <ul className="space-y-2 ml-12">
                    {appointment.chronicConditions.map((condition, index) => (
                      <li key={index} className="text-[#374151] text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allergies */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-[#111827]">Allergies</h3>
                </div>
                <ul className="space-y-2 ml-12">
                  {appointment.allergies.map((allergy, index) => (
                    <li key={index} className="text-[#374151] text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      <span>{allergy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current Medications */}
              {appointment.medications.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-[#111827]">Current Medications</h3>
                  </div>
                  <ul className="space-y-2 ml-12">
                    {appointment.medications.map((med, index) => (
                      <li key={index} className="text-[#374151] text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        <span>{med.name} - <span className="text-[#6B7280]">{med.frequency}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Past Surgeries */}
              {appointment.pastSurgeries.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Scissors className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-[#111827]">Past Surgeries</h3>
                  </div>
                  <ul className="space-y-2 ml-12">
                    {appointment.pastSurgeries.map((surgery, index) => (
                      <li key={index} className="text-[#374151] text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                        <span>{surgery}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Family History */}
              {appointment.familyHistory.length > 0 && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-[#111827]">Family History</h3>
                  </div>
                  <ul className="space-y-2 ml-12">
                    {appointment.familyHistory.map((history, index) => (
                      <li key={index} className="text-[#374151] text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        <span>{history}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lifestyle & Social History */}
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-[#111827]">Lifestyle & Social History</h3>
                </div>
                <div className="space-y-2 ml-12">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-[#111827] min-w-[80px]">Smoking:</span>
                    <span className="text-[#374151]">{appointment.lifestyle.smoking}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-[#111827] min-w-[80px]">Alcohol:</span>
                    <span className="text-[#374151]">{appointment.lifestyle.alcohol}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-[#111827] min-w-[80px]">Exercise:</span>
                    <span className="text-[#374151]">{appointment.lifestyle.exercise}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROS Summary Section */}
          <div className="p-4 md:p-6 border-b border-[#E5E7EB] bg-slate-50">
            <h2 className="font-bold text-lg text-[#111827] mb-4">ROS Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rosSummary.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs font-semibold text-[#111827] uppercase tracking-wide mb-1">{item.category}</p>
                  <p className="text-sm text-[#6B7280]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Review Section - Only for Completed Appointments */}
          {currentStatus === 'Completed' && appointment.review && (
            <div className="p-4 md:p-6 border-b border-[#E5E7EB] bg-gradient-to-br from-yellow-50 to-orange-50">
              <h2 className="font-bold text-lg text-[#111827] mb-4">Patient Review</h2>
              <div className="bg-white rounded-xl p-4 md:p-5 border border-yellow-200 shadow-sm">
                {/* Star Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= appointment.review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-[#111827]">
                    {appointment.review.rating}/5
                  </span>
                </div>

                {/* Review Comment */}
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-[#374151] leading-relaxed italic text-base">
                    "{appointment.review.comment}"
                  </p>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                  <span>Review by <span className="font-medium text-[#374151]">{appointment.patientName}</span></span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons Based on Status */}
          <div className="p-4 md:p-6 bg-gradient-to-r from-slate-100 to-slate-50">
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
