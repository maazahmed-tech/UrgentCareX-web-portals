import { useState } from 'react';
import { Activity, Briefcase, Edit2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

const DIAGNOSTIC_CAPABILITIES = [
  'X-ray',
  'Ultrasound',
  'CT Scan',
  'MRI Access',
  'Point-of-Care Testing (POCT)',
  'Viral Diagnostic Panels',
  'Rapid Diagnostic Tests',
  'EKG / Cardiac Testing',
  'Lab Draw Services',
  'Wound Care Equipment',
  'Spirometry',
  'Pulse Oximetry',
];

const CLINICAL_SERVICES = [
  'Acute Care Visits',
  'Orthopedic Injury Evaluation',
  'Pediatric Care',
  'Gynecologic Evaluation',
  'Respiratory Treatment',
  'IV Fluids',
  'IV Medications',
  'Vaccinations',
  'Suturing',
  'Splinting',
  'Abscess Drainage',
  'Laceration Repair',
  'Minor Burn Treatment',
  'Sports Injury Care',
  'Physical Examinations',
  'Occupational Health Services',
  'Travel Medicine',
  'STD Testing & Treatment',
  'Pregnancy Testing',
  'COVID-19 Testing',
  'Flu Testing & Treatment',
  'Allergy Testing',
];

interface FacilityServicesEquipmentProps {
  onSuccess: (message: string) => void;
}

export function FacilityServicesEquipment({ onSuccess }: FacilityServicesEquipmentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<string[]>([
    'X-ray',
    'EKG / Cardiac Testing',
    'Lab Draw Services',
  ]);
  const [selectedClinical, setSelectedClinical] = useState<string[]>([
    'Acute Care Visits',
    'Pediatric Care',
    'Vaccinations',
    'Physical Examinations',
  ]);

  const toggleDiagnostic = (item: string) => {
    if (selectedDiagnostics.includes(item)) {
      setSelectedDiagnostics(selectedDiagnostics.filter((s) => s !== item));
    } else {
      setSelectedDiagnostics([...selectedDiagnostics, item]);
    }
  };

  const toggleClinicalService = (item: string) => {
    if (selectedClinical.includes(item)) {
      setSelectedClinical(selectedClinical.filter((s) => s !== item));
    } else {
      setSelectedClinical([...selectedClinical, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess('Services & equipment updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to mock data
    setSelectedDiagnostics(['X-ray', 'EKG / Cardiac Testing', 'Lab Draw Services']);
    setSelectedClinical([' Acute Care Visits', 'Pediatric Care', 'Vaccinations', 'Physical Examinations']);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold">Facility Services & Equipment</h2>
          </div>
          <p className="text-sm text-gray-600">
            Healthcare facilities can provide a detailed list of diagnostic and clinical services they offer. This
            information helps the algorithm make more accurate recommendations based on patient needs, triage level,
            and service availability.
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)} className="flex-shrink-0">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Section A: Diagnostic & Imaging Capabilities */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">A. Diagnostic & Imaging Capabilities</h3>
          <p className="text-sm text-gray-600 mb-4">
            Indicate which diagnostic and imaging services your facility offers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DIAGNOSTIC_CAPABILITIES.map((capability) => (
              <label
                key={capability}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedDiagnostics.includes(capability)
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedDiagnostics.includes(capability)}
                  onChange={() => toggleDiagnostic(capability)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-900">{capability}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section B: Clinical Services Offered */}
        <div>
          <h3 className="text-lg font-semibold mb-2">B. Clinical Services Offered</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select all clinical services available at your facility:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {CLINICAL_SERVICES.map((service) => (
              <label
                key={service}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedClinical.includes(service)
                    ? 'bg-green-50 border-green-300'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } ${!isEditing ? 'cursor-not-allowed opacity-75' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedClinical.includes(service)}
                  onChange={() => toggleClinicalService(service)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-900">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </form>

      {/* Summary */}
      {!isEditing && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Diagnostic Capabilities Selected:
              </p>
              <p className="text-2xl font-bold text-blue-600">{selectedDiagnostics.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Clinical Services Selected:
              </p>
              <p className="text-2xl font-bold text-green-600">{selectedClinical.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
