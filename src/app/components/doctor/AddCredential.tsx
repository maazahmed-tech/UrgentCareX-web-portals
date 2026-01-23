import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, Award, Upload } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

export function AddCredential() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    type: '',
    number: '',
    issuer: '',
    issuedDate: '',
    expiryDate: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save the credential to the backend
    navigate('/doctor/profile');
  };

  const credentialTypes = [
    'Medical License',
    'DEA Registration',
    'Board Certification',
    'CPR Certification',
    'BLS Certification',
    'ACLS Certification',
    'PALS Certification',
    'Other',
  ];

  return (
    <DashboardLayout title="Add Credential" role="doctor">
      <div className="max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor/profile')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Credential Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">Select credential type</option>
                {credentialTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Credential Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.number}
                onChange={(e) => handleChange('number', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter credential number"
              />
            </div>

            {/* Issuing Organization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={(e) => handleChange('issuer', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="e.g., State Medical Board"
              />
            </div>

            {/* Issued Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issued Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.issuedDate}
                onChange={(e) => handleChange('issuedDate', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/doctor/profile')}
                className="flex-1 border border-gray-300 text-gray-700 h-11 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gray-900 text-white h-11 rounded-lg hover:bg-gray-800"
              >
                Add Credential
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}