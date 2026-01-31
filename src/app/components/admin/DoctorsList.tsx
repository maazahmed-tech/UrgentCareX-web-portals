import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Eye, Mail, Phone, MapPin, Star, Calendar } from 'lucide-react';
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

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  facility: string;
  location: string;
  status: 'active' | 'suspended';
  subscription: 'Trial' | 'Monthly' | 'Yearly';
  joinedDate: string;
  patientsSeen: number;
  rating: number;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    email: 'dr.johnson@downtownmed.com',
    phone: '(555) 123-4567',
    facility: 'Downtown Medical Center',
    location: 'New York, NY',
    status: 'active',
    subscription: 'Yearly',
    joinedDate: '2025-06-20',
    patientsSeen: 342,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    email: 'mchen@downtownmed.com',
    phone: '(212) 555-0288',
    facility: 'Downtown Medical Center',
    location: 'New York, NY',
    status: 'active',
    subscription: 'Monthly',
    joinedDate: '2025-07-15',
    patientsSeen: 289,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Internal Medicine',
    email: 'erodriguez@healthfirst.com',
    phone: '(310) 555-0377',
    facility: 'HealthFirst Clinic',
    location: 'Los Angeles, CA',
    status: 'active',
    subscription: 'Yearly',
    joinedDate: '2025-05-10',
    patientsSeen: 456,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Dr. James Williams',
    specialty: 'Emergency Medicine',
    email: 'jwilliams@riverside.com',
    phone: '(312) 555-0466',
    facility: 'Riverside Urgent Care',
    location: 'Chicago, IL',
    status: 'active',
    subscription: 'Trial',
    joinedDate: '2026-01-12',
    patientsSeen: 87,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'Dermatology',
    email: 'landerson@bayarea.com',
    phone: '(415) 555-0555',
    facility: 'Bay Area Medical',
    location: 'San Francisco, CA',
    status: 'suspended',
    subscription: 'Monthly',
    joinedDate: '2025-04-08',
    patientsSeen: 178,
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    specialty: 'Orthopedics',
    email: 'rtaylor@summithealth.com',
    phone: '(303) 555-0644',
    facility: 'Summit Health Center',
    location: 'Denver, CO',
    status: 'active',
    subscription: 'Yearly',
    joinedDate: '2025-03-25',
    patientsSeen: 523,
    rating: 4.9,
  },
  {
    id: '7',
    name: 'Dr. Maria Garcia',
    specialty: 'Family Medicine',
    email: 'mgarcia@summithealth.com',
    phone: '(303) 555-0733',
    facility: 'Summit Health Center',
    location: 'Denver, CO',
    status: 'active',
    subscription: 'Monthly',
    joinedDate: '2025-09-14',
    patientsSeen: 234,
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Dr. David Kim',
    specialty: 'Cardiology',
    email: 'dkim@healthfirst.com',
    phone: '(310) 555-0822',
    facility: 'HealthFirst Clinic',
    location: 'Los Angeles, CA',
    status: 'active',
    subscription: 'Yearly',
    joinedDate: '2025-08-30',
    patientsSeen: 298,
    rating: 4.7,
  },
];

export function DoctorsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  useEffect(() => {
    console.log('Current Screen: Admin Doctors List');
  }, []);

  const specialties = Array.from(new Set(mockDoctors.map((doc) => doc.specialty)));

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;

    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-600' : 'bg-red-600';
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'Trial':
        return 'bg-yellow-500';
      case 'Monthly':
        return 'bg-gray-900';
      case 'Yearly':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Doctors" role="admin">
      <div className="space-y-4 md:space-y-6">
        {/* Filters Section */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <div>
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-gray-600">
            Showing {filteredDoctors.length} of {mockDoctors.length} doctors
          </p>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl border border-gray-200 p-4 space-y-3"
            >
              {/* Header: Name, Status, Plan */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                      doctor.status
                    )}`}
                  >
                    {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${getSubscriptionColor(
                      doctor.subscription
                    )}`}
                  >
                    {doctor.subscription}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span>{doctor.location}</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{doctor.patientsSeen} appts</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/doctors/${doctor.id}`)}
                  className="h-8"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No doctors found</p>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Doctor</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Specialty</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Appointments</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plan</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {doctor.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {doctor.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{doctor.specialty}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {doctor.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{doctor.patientsSeen}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                          doctor.status
                        )}`}
                      >
                        {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getSubscriptionColor(
                          doctor.subscription
                        )}`}
                      >
                        {doctor.subscription}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/doctors/${doctor.id}`)}
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

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No doctors found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
