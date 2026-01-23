import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Eye, MapPin, Phone, Mail } from 'lucide-react';
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

interface Facility {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'suspended';
  subscription: 'Trial' | 'Monthly' | 'Yearly';
  doctors: number;
  email: string;
  phone: string;
  joinedDate: string;
}

const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Downtown Medical Center',
    location: 'New York, NY',
    status: 'active',
    subscription: 'Yearly',
    doctors: 8,
    email: 'info@downtownmed.com',
    phone: '(212) 555-0100',
    joinedDate: '2025-06-15',
  },
  {
    id: '2',
    name: 'HealthFirst Clinic',
    location: 'Los Angeles, CA',
    status: 'active',
    subscription: 'Monthly',
    doctors: 5,
    email: 'info@healthfirst.com',
    phone: '(310) 555-0456',
    joinedDate: '2025-08-22',
  },
  {
    id: '3',
    name: 'Riverside Urgent Care',
    location: 'Chicago, IL',
    status: 'active',
    subscription: 'Trial',
    doctors: 3,
    email: 'contact@riverside.com',
    phone: '(312) 555-0789',
    joinedDate: '2026-01-10',
  },
  {
    id: '4',
    name: 'Bay Area Medical',
    location: 'San Francisco, CA',
    status: 'suspended',
    subscription: 'Monthly',
    doctors: 6,
    email: 'hello@bayareamedical.com',
    phone: '(415) 555-0321',
    joinedDate: '2025-04-03',
  },
  {
    id: '5',
    name: 'Summit Health Center',
    location: 'Denver, CO',
    status: 'active',
    subscription: 'Yearly',
    doctors: 12,
    email: 'info@summithealth.com',
    phone: '(303) 555-0654',
    joinedDate: '2025-03-18',
  },
];

export function FacilitiesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    console.log('📍 Current Screen: Admin Facilities List');
  }, []);

  const filteredFacilities = mockFacilities.filter((facility) => {
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || facility.status === filterStatus;
    
    return matchesSearch && matchesStatus;
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
    <DashboardLayout title="Facilities" role="admin">
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
                  placeholder="Search facilities..."
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
            Showing {filteredFacilities.length} of {mockFacilities.length} facilities
          </p>
        </div>

        {/* Facilities Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Facility</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Doctors</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Subscription</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFacilities.map((facility) => (
                  <tr key={facility.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{facility.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {facility.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {facility.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {facility.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{facility.doctors}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                          facility.status
                        )}`}
                      >
                        {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getSubscriptionColor(
                          facility.subscription
                        )}`}
                      >
                        {facility.subscription}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(facility.joinedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/facilities/${facility.id}`)}
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

          {filteredFacilities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No facilities found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}