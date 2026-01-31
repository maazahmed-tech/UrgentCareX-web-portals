import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Mail, Phone, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
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

interface PatientDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended';
  registrationDate: string;
}

// Mock data - consistent with PatientsList
const mockPatientDetails: Record<string, PatientDetail> = {
  '1': {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    status: 'active',
    registrationDate: '2025-06-15',
  },
  '2': {
    id: '2',
    name: 'Mary Wilson',
    email: 'mary.wilson@email.com',
    phone: '(555) 234-5678',
    status: 'active',
    registrationDate: '2025-07-20',
  },
  '3': {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@email.com',
    phone: '(555) 345-6789',
    status: 'active',
    registrationDate: '2025-08-10',
  },
  '4': {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 456-7890',
    status: 'suspended',
    registrationDate: '2025-09-05',
  },
  '5': {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 567-8901',
    status: 'active',
    registrationDate: '2025-10-12',
  },
};

export function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);

  useEffect(() => {
    if (id && mockPatientDetails[id]) {
      setPatient(mockPatientDetails[id]);
    } else {
      navigate('/admin/patients');
    }
  }, [id, navigate]);

  useEffect(() => {
    console.log('Current Screen: Admin Patient Details');
  }, []);

  if (!patient) return null;

  const handleActivate = () => {
    setPatient({ ...patient, status: 'active' });
    setShowActivateDialog(false);
  };

  const handleSuspend = () => {
    setPatient({ ...patient, status: 'suspended' });
    setShowSuspendDialog(false);
  };

  return (
    <DashboardLayout title="Patient Details" role="admin">
      <div className="space-y-4 md:space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/patients')}
          className="mb-2 md:mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </Button>

        {/* Header Card */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{patient.name}</h2>
                <span
                  className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium text-white ${
                    patient.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                </span>
              </div>
              <div className="mt-3 md:mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Registered on{' '}
                    {new Date(patient.registrationDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <h3 className="text-base md:text-lg font-semibold mb-4">Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <p className="text-sm text-gray-600">Account Type</p>
              <p className="text-sm font-medium text-gray-900 mt-1">Patient (Free)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {patient.status === 'active' ? 'Active' : 'Suspended'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Registration Date</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {new Date(patient.registrationDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <h3 className="text-base md:text-lg font-semibold mb-4">Account Actions</h3>
          <div className="flex flex-wrap gap-3">
            {patient.status === 'suspended' ? (
              <Button
                onClick={() => setShowActivateDialog(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Activate Account
              </Button>
            ) : (
              <Button
                onClick={() => setShowSuspendDialog(true)}
                variant="destructive"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Suspend Account
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Activate Confirmation Dialog */}
      <AlertDialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate Patient Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to activate the account for {patient.name}? This will restore
              their access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleActivate}
              className="bg-green-600 hover:bg-green-700"
            >
              Activate Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend Confirmation Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend Patient Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend the account for {patient.name}? This will
              temporarily restrict their access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspend}
              className="bg-red-600 hover:bg-red-700"
            >
              Suspend Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
