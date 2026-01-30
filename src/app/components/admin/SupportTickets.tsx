import { useState, useEffect } from 'react';
import {
  Headphones,
  Search,
  ChevronDown,
  ChevronUp,
  Building2,
  Stethoscope,
  Mail,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  source: 'facility' | 'doctor';
  submittedAt: string;
}

// Mock data for initial display
const MOCK_TICKETS: SupportTicket[] = [
  {
    id: '1',
    name: 'City Medical Center',
    email: 'admin@citymedical.com',
    subject: 'Unable to update insurance payers',
    message: 'We are trying to add new insurance providers to our facility profile but the system is not saving our changes. We have tried multiple times over the past two days. Can you please look into this issue?',
    source: 'facility',
    submittedAt: '2026-01-29T14:30:00Z'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    subject: 'Question about availability calendar',
    message: 'I would like to know how to set up recurring availability slots. Currently I have to manually add each day which is time consuming. Is there a way to set up a weekly schedule that repeats automatically?',
    source: 'doctor',
    submittedAt: '2026-01-28T09:15:00Z'
  },
  {
    id: '3',
    name: 'Sunrise Urgent Care',
    email: 'support@sunriseurgent.com',
    subject: 'Subscription billing inquiry',
    message: 'We were charged twice for our monthly subscription this month. Please investigate and process a refund for the duplicate charge. Our account ID is FAC-2024-0892.',
    source: 'facility',
    submittedAt: '2026-01-27T16:45:00Z'
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    email: 'mchen@healthcare.com',
    subject: 'Cannot view patient appointment history',
    message: 'When I click on a patient appointment to view details, the page shows a loading spinner but never loads the content. This started happening yesterday afternoon. I have tried clearing my browser cache but the issue persists.',
    source: 'doctor',
    submittedAt: '2026-01-27T11:20:00Z'
  },
  {
    id: '5',
    name: 'Metro Health Clinic',
    email: 'info@metrohealth.com',
    subject: 'Feature request: Export appointments',
    message: 'It would be very helpful if we could export our appointment data to CSV or Excel format for our internal reporting. Currently we have to manually copy the information which is inefficient.',
    source: 'facility',
    submittedAt: '2026-01-26T08:00:00Z'
  },
  {
    id: '6',
    name: 'Dr. Emily Rodriguez',
    email: 'e.rodriguez@medpractice.com',
    subject: 'Two-factor authentication issue',
    message: 'I enabled two-factor authentication but I am not receiving the verification codes on my phone. I have verified my phone number is correct. Please help me resolve this as I cannot access my account.',
    source: 'doctor',
    submittedAt: '2026-01-25T13:30:00Z'
  }
];

export function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'facility' | 'doctor'>('all');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  useEffect(() => {
    // Load tickets from localStorage and combine with mock data
    const storedTickets = localStorage.getItem('supportTickets');
    const parsedTickets: SupportTicket[] = storedTickets ? JSON.parse(storedTickets) : [];

    // Combine stored tickets with mock data (stored tickets first as they're newer)
    const allTickets = [...parsedTickets, ...MOCK_TICKETS];

    // Sort by date (newest first)
    allTickets.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    setTickets(allTickets);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter tickets based on search and source filter
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource = sourceFilter === 'all' || ticket.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const facilityCount = tickets.filter(t => t.source === 'facility').length;
  const doctorCount = tickets.filter(t => t.source === 'doctor').length;

  return (
    <DashboardLayout title="Support Tickets" role="admin">
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Headphones className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Support Tickets</h2>
              <p className="text-sm text-gray-600">View support requests from facilities and doctors</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Tickets</p>
            <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <p className="text-sm text-gray-600">From Facilities</p>
            </div>
            <p className="text-2xl font-bold text-purple-600">{facilityCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-green-600" />
              <p className="text-sm text-gray-600">From Doctors</p>
            </div>
            <p className="text-2xl font-bold text-green-600">{doctorCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Source Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSourceFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sourceFilter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSourceFilter('facility')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  sourceFilter === 'facility'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Facilities
              </button>
              <button
                onClick={() => setSourceFilter('doctor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  sourceFilter === 'doctor'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                Doctors
              </button>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No support tickets found</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchQuery || sourceFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Support tickets will appear here when submitted'}
              </p>
            </div>
          ) : (
            filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(ticket.id)}
                  className="w-full p-4 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Source Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      ticket.source === 'facility' ? 'bg-purple-100' : 'bg-green-100'
                    }`}>
                      {ticket.source === 'facility' ? (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Stethoscope className="w-5 h-5 text-green-600" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{ticket.subject}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                        <span className="font-medium">{ticket.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          ticket.source === 'facility'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {ticket.source === 'facility' ? 'Facility' : 'Doctor'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(ticket.submittedAt)}
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="ml-4 flex-shrink-0">
                    {expandedTicket === ticket.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedTicket === ticket.id && (
                  <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                    <div className="pl-14 space-y-4">
                      {/* Contact Info */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${ticket.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {ticket.email}
                        </a>
                      </div>

                      {/* Message */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {ticket.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
