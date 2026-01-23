import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, User, Phone, Mail, Calendar, FileText, AlertCircle } from 'lucide-react';
import { DoctorLayout } from '@/app/components/layouts/DoctorLayout';

export function PatientPreview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patientData, setPatientData] = useState({
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    bloodType: 'A+',
    lastVisit: 'Dec 15, 2025',
    allergies: ['Penicillin', 'Peanuts', 'Latex'],
    medications: [
      { name: 'Lisinopril 10mg', dosage: 'Once daily', prescribedBy: 'Dr. Smith' },
      { name: 'Metformin 500mg', dosage: 'Twice daily', prescribedBy: 'Dr. Williams' }
    ],
    medicalHistory: [
      { date: 'Dec 15, 2025', condition: 'Hypertension checkup', doctor: 'Dr. Smith' },
      { date: 'Nov 3, 2025', condition: 'Type 2 Diabetes management', doctor: 'Dr. Williams' },
      { date: 'Aug 22, 2025', condition: 'Annual physical exam', doctor: 'Dr. Chen' }
    ],
    notes: 'Patient has been compliant with medication. Blood pressure readings improving. Continue monitoring glucose levels.'
  });

  useEffect(() => {
    // Simulate fetching patient data from an API
    const fetchData = async () => {
      // Replace with actual API call
      const data = {
        name: 'Sarah Johnson',
        age: 34,
        gender: 'Female',
        bloodType: 'A+',
        lastVisit: 'Dec 15, 2025',
        allergies: ['Penicillin', 'Peanuts', 'Latex'],
        medications: [
          { name: 'Lisinopril 10mg', dosage: 'Once daily', prescribedBy: 'Dr. Smith' },
          { name: 'Metformin 500mg', dosage: 'Twice daily', prescribedBy: 'Dr. Williams' }
        ],
        medicalHistory: [
          { date: 'Dec 15, 2025', condition: 'Hypertension checkup', doctor: 'Dr. Smith' },
          { date: 'Nov 3, 2025', condition: 'Type 2 Diabetes management', doctor: 'Dr. Williams' },
          { date: 'Aug 22, 2025', condition: 'Annual physical exam', doctor: 'Dr. Chen' }
        ],
        notes: 'Patient has been compliant with medication. Blood pressure readings improving. Continue monitoring glucose levels.'
      };
      setPatientData(data);
    };

    fetchData();
  }, [id]);

  return (
    <DoctorLayout title="Patient Preview">
      <div className="max-w-4xl">
        {/* Patient Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-[#6B7280]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1F2937]">{patientData.name}</h2>
                <p className="text-sm text-[#6B7280]">
                  {patientData.age} years old • {patientData.gender} • Blood Type: {patientData.bloodType}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/doctor/appointments')}
              className="h-10 px-4 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F3F4F6] transition-colors"
            >
              Back to Appointments
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Calendar className="w-4 h-4" />
            <span>Last Visit: {patientData.lastVisit}</span>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[#EF4444]" />
            <h3 className="text-lg font-semibold text-[#1F2937]">Allergies</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {patientData.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#FEE2E2] text-[#EF4444] text-sm rounded-lg"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#1F2937]" />
            <h3 className="text-lg font-semibold text-[#1F2937]">Current Medications</h3>
          </div>
          <div className="space-y-3">
            {patientData.medications.map((med, index) => (
              <div key={index} className="p-4 bg-[#F3F4F6] rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-[#1F2937]">{med.name}</h4>
                  <span className="text-sm text-[#6B7280]">{med.dosage}</span>
                </div>
                <p className="text-sm text-[#6B7280]">Prescribed by: {med.prescribedBy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#1F2937]" />
            <h3 className="text-lg font-semibold text-[#1F2937]">Recent Medical History</h3>
          </div>
          <div className="space-y-3">
            {patientData.medicalHistory.map((visit, index) => (
              <div key={index} className="p-4 border border-[#E5E7EB] rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-[#1F2937]">{visit.condition}</h4>
                    <p className="text-sm text-[#6B7280] mt-1">{visit.doctor}</p>
                  </div>
                  <span className="text-sm text-[#6B7280]">{visit.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Clinical Notes</h3>
          <p className="text-[#1F2937] leading-relaxed">{patientData.notes}</p>
        </div>
      </div>
    </DoctorLayout>
  );
}