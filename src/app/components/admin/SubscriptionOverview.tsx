import { useState, useEffect } from 'react';
import { CreditCard, Building2, UserCog, Search } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface Subscription {
  id: string;
  entityType: 'facility' | 'doctor';
  entityName: string;
  email: string;
  plan: 'Trial' | 'Monthly' | 'Yearly';
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  nextBillingDate: string;
  amount: string;
}

const mockSubscriptions: Subscription[] = [
  // Facilities
  {
    id: 'f1',
    entityType: 'facility',
    entityName: 'Downtown Medical Center',
    email: 'contact@downtownmed.com',
    plan: 'Yearly',
    status: 'active',
    startDate: '2025-06-15',
    nextBillingDate: '2026-06-15',
    amount: '$499/year',
  },
  {
    id: 'f2',
    entityType: 'facility',
    entityName: 'HealthFirst Clinic',
    email: 'info@healthfirst.com',
    plan: 'Monthly',
    status: 'active',
    startDate: '2025-08-22',
    nextBillingDate: '2026-02-22',
    amount: '$49/month',
  },
  {
    id: 'f3',
    entityType: 'facility',
    entityName: 'Riverside Urgent Care',
    email: 'contact@riverside.com',
    plan: 'Trial',
    status: 'active',
    startDate: '2026-01-10',
    nextBillingDate: '2026-01-24',
    amount: '$0 (14-day trial)',
  },
  {
    id: 'f4',
    entityType: 'facility',
    entityName: 'Bay Area Medical',
    email: 'hello@bayareamedical.com',
    plan: 'Monthly',
    status: 'cancelled',
    startDate: '2025-04-03',
    nextBillingDate: '-',
    amount: '$49/month',
  },
  {
    id: 'f5',
    entityType: 'facility',
    entityName: 'Summit Health Center',
    email: 'info@summithealth.com',
    plan: 'Yearly',
    status: 'active',
    startDate: '2025-03-18',
    nextBillingDate: '2026-03-18',
    amount: '$499/year',
  },
  // Doctors
  {
    id: 'd1',
    entityType: 'doctor',
    entityName: 'Dr. Sarah Johnson',
    email: 'sjohnson@downtownmed.com',
    plan: 'Yearly',
    status: 'active',
    startDate: '2025-06-20',
    nextBillingDate: '2026-06-20',
    amount: '$499/year',
  },
  {
    id: 'd2',
    entityType: 'doctor',
    entityName: 'Dr. Michael Chen',
    email: 'mchen@downtownmed.com',
    plan: 'Monthly',
    status: 'active',
    startDate: '2025-07-15',
    nextBillingDate: '2026-02-15',
    amount: '$49/month',
  },
  {
    id: 'd3',
    entityType: 'doctor',
    entityName: 'Dr. Emily Rodriguez',
    email: 'erodriguez@healthfirst.com',
    plan: 'Yearly',
    status: 'active',
    startDate: '2025-05-10',
    nextBillingDate: '2026-05-10',
    amount: '$499/year',
  },
  {
    id: 'd4',
    entityType: 'doctor',
    entityName: 'Dr. James Williams',
    email: 'jwilliams@riverside.com',
    plan: 'Trial',
    status: 'active',
    startDate: '2026-01-12',
    nextBillingDate: '2026-01-26',
    amount: '$0 (14-day trial)',
  },
  {
    id: 'd5',
    entityType: 'doctor',
    entityName: 'Dr. Lisa Anderson',
    email: 'landerson@bayarea.com',
    plan: 'Monthly',
    status: 'expired',
    startDate: '2025-04-08',
    nextBillingDate: '-',
    amount: '$49/month',
  },
  {
    id: 'd6',
    entityType: 'doctor',
    entityName: 'Dr. Robert Taylor',
    email: 'rtaylor@summithealth.com',
    plan: 'Yearly',
    status: 'active',
    startDate: '2025-03-25',
    nextBillingDate: '2026-03-25',
    amount: '$499/year',
  },
  {
    id: 'd7',
    entityType: 'doctor',
    entityName: 'Dr. Maria Garcia',
    email: 'mgarcia@summithealth.com',
    plan: 'Monthly',
    status: 'active',
    startDate: '2025-09-14',
    nextBillingDate: '2026-02-14',
    amount: '$49/month',
  },
  {
    id: 'd8',
    entityType: 'doctor',
    entityName: 'Dr. David Kim',
    email: 'dkim@healthfirst.com',
    plan: 'Yearly',
    status: 'active',
    startDate: '2025-08-30',
    nextBillingDate: '2026-08-30',
    amount: '$499/year',
  },
];

export function AdminSubscriptionOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    console.log('Current Screen: Admin Subscription Overview');
  }, []);

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = filterPlan === 'all' || sub.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchesType = filterType === 'all' || sub.entityType === filterType;

    return matchesSearch && matchesPlan && matchesStatus && matchesType;
  });

  // Calculate stats
  const activeSubscriptions = mockSubscriptions.filter((s) => s.status === 'active').length;
  const trialCount = mockSubscriptions.filter((s) => s.plan === 'Trial' && s.status === 'active').length;
  const monthlyCount = mockSubscriptions.filter((s) => s.plan === 'Monthly' && s.status === 'active').length;
  const yearlyCount = mockSubscriptions.filter((s) => s.plan === 'Yearly' && s.status === 'active').length;

  const getPlanColor = (plan: string) => {
    switch (plan) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'expired':
        return 'bg-red-600';
      case 'cancelled':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Subscriptions" role="admin">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold mt-1">{activeSubscriptions}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trial (14-day)</p>
                <p className="text-3xl font-bold mt-1">{trialCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                T
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly ($49)</p>
                <p className="text-3xl font-bold mt-1">{monthlyCount}</p>
              </div>
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                M
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Yearly ($499)</p>
                <p className="text-3xl font-bold mt-1">{yearlyCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                Y
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Subscription Plans</h3>
          <div className="flex flex-wrap gap-4 text-sm text-blue-800">
            <span><strong>Trial:</strong> $0 for 14 days (all features)</span>
            <span><strong>Monthly:</strong> $49/month</span>
            <span><strong>Yearly:</strong> $499/year (save $89)</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="facility">Facilities</SelectItem>
                  <SelectItem value="doctor">Doctors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plan Filter */}
            <div>
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="Trial">Trial</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
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
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredSubscriptions.length} of {mockSubscriptions.length} subscriptions
          </p>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plan</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Next Billing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {sub.entityType === 'facility' ? (
                          <Building2 className="w-4 h-4 text-gray-600" />
                        ) : (
                          <UserCog className="w-4 h-4 text-gray-600" />
                        )}
                        <span className="text-sm text-gray-600 capitalize">{sub.entityType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{sub.entityName}</p>
                        <p className="text-sm text-gray-500">{sub.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getPlanColor(
                          sub.plan
                        )}`}
                      >
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sub.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                          sub.status
                        )}`}
                      >
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(sub.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {sub.nextBillingDate === '-'
                        ? '-'
                        : new Date(sub.nextBillingDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No subscriptions found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
