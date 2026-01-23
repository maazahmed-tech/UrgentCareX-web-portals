import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, Award, Upload, FileText, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/app/components/layouts/DashboardLayout';

export function EditCredential() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/doctor');
    }
  }, [user, navigate]);

  // Mock data - in real app, fetch the credential by id
  const mockCredentials: { [key: string]: any } = {
    '1': {
      type: 'Medical License',
      number: 'MD-12345-CA',
      issuer: 'California Medical Board',
      issuedDate: '2015-06-15',
      expiryDate: '2026-06-15',
    },
    '2': {
      type: 'DEA Registration',
      number: 'DEA-98765',
      issuer: 'Drug Enforcement Administration',
      issuedDate: '2018-03-01',
      expiryDate: '2027-03-01',
    },
    '3': {
      type: 'Board Certification',
      number: 'BC-54321',
      issuer: 'American Board of Family Medicine',
      issuedDate: '2016-09-20',
      expiryDate: '2026-09-20',
    },
  };

  const initialData = mockCredentials[id || '1'] || {
    type: '',
    number: '',
    issuer: '',
    issuedDate: '',
    expiryDate: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState<string | null>(
    id === '1' ? 'medical_license_2015.pdf' : null
  );

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate that it's a PDF
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file only');
        e.target.value = '';
      }
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const removeExistingFile = () => {
    setExistingFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, update the credential in the backend
    // including uploadedFile if present
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
    <DashboardLayout title="Edit Credential" role="doctor">
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

            {/* Attachment Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Attachment (PDF only)
              </label>

              {/* Existing File Display */}
              {existingFile && !uploadedFile && (
                <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{existingFile}</p>
                        <p className="text-xs text-gray-600">Current attachment</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeExistingFile}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Newly Uploaded File Display */}
              {uploadedFile && (
                <div className="mb-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-600">
                          {(uploadedFile.size / 1024).toFixed(1)} KB • Ready to upload
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeUploadedFile}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        PDF files only (Max 10MB)
                      </p>
                    </div>
                  </div>
                </label>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}