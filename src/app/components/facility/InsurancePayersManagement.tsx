import { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, Edit2, Building2, Check, Info } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/app/components/ui/select';

interface PayerSelection {
  payer: string;
  payer_id: string;
  accepted: boolean;
  plans: string[]; // ['All'] or specific plan types
  last_updated: string;
}

interface PayerConfig {
  name: string;
  id: string;
  logo?: string; // For future use
}

// Plan types available for selection
const PLAN_TYPES = ['All plans', 'HMO', 'PPO', 'EPO', 'POS'];

// Major National Payers - Pre-checked by default
const MAJOR_NATIONAL_PAYERS: PayerConfig[] = [
  { name: 'Aetna', id: '60054' },
  { name: 'Blue Cross Blue Shield', id: '00590' },
  { name: 'Cigna', id: '62308' },
  { name: 'UnitedHealthcare', id: '87726' },
  { name: 'Humana', id: '61101' },
  { name: 'Medicare', id: 'MCARE' },
  { name: 'Medicaid', id: 'MCAID' },
];

// Regional/State Payers (can be filtered by facility state)
const REGIONAL_PAYERS: PayerConfig[] = [
  { name: 'Kaiser Permanente', id: '95018' },
  { name: 'Blue Shield of California', id: 'BLU001' },
  { name: 'Health Net', id: 'HEA001' },
  { name: 'Florida Blue', id: 'FLO001' },
  { name: 'Independence Blue Cross', id: 'IND001' },
  { name: 'Highmark', id: 'HIG001' },
  { name: 'CareFirst', id: 'CAR001' },
  { name: 'Premera Blue Cross', id: 'PRE001' },
  { name: 'Medi-Cal (California)', id: 'MEDCA' },
  { name: 'MassHealth (Massachusetts)', id: 'MASSH' },
];

// Employer & Other Plans
const EMPLOYER_OTHER_PAYERS: PayerConfig[] = [
  { name: 'Oscar Health', id: 'OSCAR' },
  { name: 'Molina Healthcare', id: 'MOL001' },
  { name: 'Centene', id: 'CEN001' },
  { name: 'WellCare', id: 'WEL001' },
  { name: 'Ambetter', id: 'AMB001' },
  { name: 'Bright Health', id: 'BRI001' },
  { name: 'Medicare Advantage', id: 'MADV' },
  { name: 'Tricare', id: 'TRI001' },
  { name: 'VA Benefits', id: 'VA001' },
  { name: 'Federal Employee Program (FEP)', id: 'FEP001' },
  { name: 'CHAMPVA', id: 'CHA001' },
];

// US States
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

// Major US Cities
const US_CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle',
  'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City',
  'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee',
  'Albuquerque', 'Tucson', 'Fresno', 'Mesa', 'Sacramento', 'Atlanta', 'Kansas City',
  'Colorado Springs', 'Omaha', 'Raleigh', 'Miami', 'Long Beach', 'Virginia Beach',
  'Oakland', 'Minneapolis', 'Tulsa', 'Tampa', 'Arlington', 'New Orleans', 'Wichita',
  'Cleveland', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana',
  'Riverside', 'Corpus Christi', 'Lexington', 'Henderson', 'Stockton', 'Saint Paul',
  'Cincinnati', 'St. Louis', 'Pittsburgh', 'Greensboro', 'Lincoln', 'Anchorage',
  'Plano', 'Orlando', 'Irvine', 'Newark', 'Durham', 'Chula Vista', 'Toledo',
  'Fort Wayne', 'St. Petersburg', 'Laredo', 'Jersey City', 'Chandler', 'Madison',
  'Lubbock', 'Scottsdale', 'Reno', 'Buffalo', 'Gilbert', 'Glendale', 'North Las Vegas',
  'Winston-Salem', 'Chesapeake', 'Norfolk', 'Fremont', 'Garland', 'Irving', 'Hialeah',
  'Richmond', 'Boise', 'Spokane', 'Baton Rouge'
];

const mockFacilityIdentifiers = {
  npi1: '1234567890',
  npi2: '',
  tin: '12-3456789',
  streetAddress: '123 Healthcare Blvd',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
};

// Initialize with smart defaults (major payers pre-checked)
const initializeDefaultPayers = (): Record<string, PayerSelection> => {
  const defaults: Record<string, PayerSelection> = {};
  
  MAJOR_NATIONAL_PAYERS.forEach(payer => {
    defaults[payer.id] = {
      payer: payer.name,
      payer_id: payer.id,
      accepted: true, // Pre-checked
      plans: ['All plans'],
      last_updated: new Date().toISOString(),
    };
  });

  // All others start unchecked
  [...REGIONAL_PAYERS, ...EMPLOYER_OTHER_PAYERS].forEach(payer => {
    defaults[payer.id] = {
      payer: payer.name,
      payer_id: payer.id,
      accepted: false,
      plans: ['All plans'],
      last_updated: new Date().toISOString(),
    };
  });

  return defaults;
};

export function InsurancePayersManagement() {
  const [payerSelections, setPayerSelections] = useState<Record<string, PayerSelection>>(
    initializeDefaultPayers()
  );
  const [expandedPayers, setExpandedPayers] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['major']) // Major section expanded by default
  );
  const [isEditingIdentifiers, setIsEditingIdentifiers] = useState(false);
  const [identifiers, setIdentifiers] = useState(mockFacilityIdentifiers);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const togglePayer = (payerId: string) => {
    const updated = { ...payerSelections };
    updated[payerId] = {
      ...updated[payerId],
      accepted: !updated[payerId].accepted,
      last_updated: new Date().toISOString(),
    };
    setPayerSelections(updated);
  };

  const togglePayerExpanded = (payerId: string) => {
    const newExpanded = new Set(expandedPayers);
    if (newExpanded.has(payerId)) {
      newExpanded.delete(payerId);
    } else {
      newExpanded.add(payerId);
    }
    setExpandedPayers(newExpanded);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePlanTypeToggle = (payerId: string, planType: string) => {
    const updated = { ...payerSelections };
    const currentPlans = updated[payerId].plans;

    if (planType === 'All plans') {
      // Toggle all plans
      updated[payerId].plans = currentPlans.includes('All plans') 
        ? [] 
        : ['All plans'];
    } else {
      // Remove "All plans" if it exists and toggle specific plan
      const withoutAll = currentPlans.filter(p => p !== 'All plans');
      
      if (withoutAll.includes(planType)) {
        updated[payerId].plans = withoutAll.filter(p => p !== planType);
      } else {
        updated[payerId].plans = [...withoutAll, planType];
      }

      // If all specific plans are selected, simplify to "All plans"
      const specificPlans = ['HMO', 'PPO', 'EPO', 'POS'];
      if (specificPlans.every(p => updated[payerId].plans.includes(p))) {
        updated[payerId].plans = ['All plans'];
      }
    }

    updated[payerId].last_updated = new Date().toISOString();
    setPayerSelections(updated);
  };

  const handleSubmitIdentifiers = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Facility identifiers updated successfully!');
    setIsEditingIdentifiers(false);
  };

  const handleCancelIdentifiers = () => {
    setIdentifiers(mockFacilityIdentifiers);
    setIsEditingIdentifiers(false);
  };

  const renderPayerCard = (payer: PayerConfig) => {
    const selection = payerSelections[payer.id];
    const isExpanded = expandedPayers.has(payer.id);
    const hasSpecificPlans = selection.plans.length > 0 && !selection.plans.includes('All plans');

    return (
      <div
        key={payer.id}
        className={`border rounded-lg transition-all ${
          selection.accepted 
            ? 'border-gray-300 bg-white' 
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selection.accepted}
              onChange={() => togglePayer(payer.id)}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />

            {/* Payer Name with Badge */}
            <div className="flex items-center gap-2 flex-1">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {payer.name}
              </span>
              {hasSpecificPlans && (
                <span className="text-xs text-gray-500">
                  ({selection.plans.join(', ')})
                </span>
              )}
            </div>
          </div>

          {/* Expand button for plan types */}
          {selection.accepted && (
            <button
              onClick={() => togglePayerExpanded(payer.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {/* Plan Types Selection (expanded) */}
        {selection.accepted && isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 mb-3">Select accepted plan types:</p>
            <div className="flex flex-wrap gap-2">
              {PLAN_TYPES.map(planType => (
                <button
                  key={planType}
                  onClick={() => handlePlanTypeToggle(payer.id, planType)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selection.plans.includes(planType)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {selection.plans.includes(planType) && (
                    <Check className="w-3 h-3 inline mr-1" />
                  )}
                  {planType}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPayerSection = (
    title: string,
    subtitle: string,
    payers: PayerConfig[],
    sectionId: string
  ) => {
    const isExpanded = expandedSections.has(sectionId);
    const acceptedCount = payers.filter(p => payerSelections[p.id].accepted).length;

    return (
      <div className="bg-white rounded-xl border border-gray-200">
        <button
          onClick={() => toggleSection(sectionId)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              {title}
              <span className="text-sm font-normal text-gray-500">
                ({acceptedCount} of {payers.length} accepted)
              </span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 space-y-2">
            {payers.map(payer => renderPayerCard(payer))}
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout title="Insurance & Payers" role="facility">
      <div className="space-y-6 max-w-5xl">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Facility Identifiers */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold">Facility Identifiers</h2>
            </div>
            {!isEditingIdentifiers && (
              <Button onClick={() => setIsEditingIdentifiers(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmitIdentifiers}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="npi1">Primary NPI (National Provider Identifier)</Label>
                <Input
                  id="npi1"
                  type="text"
                  value={identifiers.npi1}
                  onChange={(e) => setIdentifiers({ ...identifiers, npi1: e.target.value })}
                  disabled={!isEditingIdentifiers}
                  placeholder="10-digit NPI"
                  maxLength={10}
                />
              </div>

              <div>
                <Label htmlFor="npi2">Secondary NPI (Optional)</Label>
                <Input
                  id="npi2"
                  type="text"
                  value={identifiers.npi2}
                  onChange={(e) => setIdentifiers({ ...identifiers, npi2: e.target.value })}
                  disabled={!isEditingIdentifiers}
                  placeholder="10-digit NPI"
                  maxLength={10}
                />
              </div>

              <div>
                <Label htmlFor="tin">TIN (Tax Identification Number)</Label>
                <Input
                  id="tin"
                  type="text"
                  value={identifiers.tin}
                  onChange={(e) => setIdentifiers({ ...identifiers, tin: e.target.value })}
                  disabled={!isEditingIdentifiers}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  type="text"
                  value={identifiers.streetAddress}
                  onChange={(e) => setIdentifiers({ ...identifiers, streetAddress: e.target.value })}
                  disabled={!isEditingIdentifiers}
                  placeholder="123 Healthcare Blvd"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={identifiers.city}
                    onValueChange={(value) => setIdentifiers({ ...identifiers, city: value })}
                    disabled={!isEditingIdentifiers}
                  >
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_CITIES.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={identifiers.state}
                    onValueChange={(value) => setIdentifiers({ ...identifiers, state: value })}
                    disabled={!isEditingIdentifiers}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    value={identifiers.zipCode}
                    onChange={(e) => setIdentifiers({ ...identifiers, zipCode: e.target.value })}
                    disabled={!isEditingIdentifiers}
                    placeholder="10001"
                  />
                </div>
              </div>

              {isEditingIdentifiers && (
                <div className="flex gap-3 pt-4">
                  <Button type="submit">Save Changes</Button>
                  <Button type="button" variant="outline" onClick={handleCancelIdentifiers}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Header with anxiety-reducing copy */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Accepted Insurance Plans
              </h2>
              <p className="text-gray-700">
                Select the insurance plans your facility currently accepts. You can update this anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Payer Groups */}
        <div className="space-y-4">
          {renderPayerSection(
            'Major National Payers',
            'Largest insurance providers accepted nationwide',
            MAJOR_NATIONAL_PAYERS,
            'major'
          )}

          {renderPayerSection(
            'Regional & State Plans',
            'Regional providers and state-specific programs',
            REGIONAL_PAYERS,
            'regional'
          )}

          {renderPayerSection(
            'Employer & Other Plans',
            'Employer-sponsored plans and additional coverage options',
            EMPLOYER_OTHER_PAYERS,
            'employer'
          )}
        </div>

        {/* Confidence Language / Legal Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> This list reflects your facility's declared accepted plans. 
            Final coverage is verified in real time with the patient's insurer. UrgentCareX is not 
            intended for collecting PII or securing sensitive patient data.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}