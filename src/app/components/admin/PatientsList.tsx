import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Eye, Mail, Phone, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended';
  registrationDate: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    status: 'active',
    registrationDate: '2025-06-15',
  },
  {
    id: '2',
    name: 'Mary Wilson',
    email: 'mary.wilson@email.com',
    phone: '(555) 234-5678',
    status: 'active',
    registrationDate: '2025-07-20',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@email.com',
    phone: '(555) 345-6789',
    status: 'active',
    registrationDate: '2025-08-10',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 456-7890',
    status: 'suspended',
    registrationDate: '2025-09-05',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 567-8901',
    status: 'active',
    registrationDate: '2025-10-12',
  },
  {
    id: '6',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
    phone: '(555) 678-9012',
    status: 'active',
    registrationDate: '2025-11-18',
  },
  {
    id: '7',
    name: 'James Anderson',
    email: 'james.anderson@email.com',
    phone: '(555) 789-0123',
    status: 'active',
    registrationDate: '2025-12-01',
  },
  {
    id: '8',
    name: 'Linda Taylor',
    email: 'linda.taylor@email.com',
    phone: '(555) 890-1234',
    status: 'suspended',
    registrationDate: '2026-01-05',
  },
  {
    id: '9',
    name: 'David Chen',
    email: 'david.chen@email.com',
    phone: '(555) 901-2345',
    status: 'active',
    registrationDate: '2026-01-10',
  },
  {
    id: '10',
    name: 'Lisa Park',
    email: 'lisa.park@email.com',
    phone: '(555) 012-3456',
    status: 'active',
    registrationDate: '2026-01-15',
  },
];

export function PatientsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    console.log('Current Screen: Admin Patients List');
  }, []);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-600' : 'bg-red-600';
  };

  return (
    <DashboardLayout title="Patients" role="admin">
      <div className="space-y-6">
        {/* Filters Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search patients by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredPatients.length} of {mockPatients.length} patients
          </p>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Patient</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Registration Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{patient.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {patient.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {patient.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(patient.registrationDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/patients/${patient.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No patients found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
