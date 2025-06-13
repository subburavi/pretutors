import React, { useState, useRef, useEffect } from 'react';
import { FileText, Award, Shield, X, Loader2 } from 'lucide-react';
 import FormError from '../ui/FormError';
import { deleteFile, uploadFile } from '@/lib/firebaseUtils';

const Verification = ({ formData, handleInputChange, errors }) => {
  const [idDocument, setIdDocument] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [uploadingId, setUploadingId] = useState(false);
  const [uploadingCertificates, setUploadingCertificates] = useState(false);

  const idInputRef = useRef(null);
  const certificateInputRef = useRef(null);

  useEffect(() => {
    if (formData.identity_document) {
      setIdDocument({
        name: getNameFromUrl(formData.identity_document),
        type: 'application/pdf',
        url: formData.identity_document,
      });
    }

    if (Array.isArray(formData.certificate_files)) {
      const certs = formData.certificate_files.map(url => ({
        name: getNameFromUrl(url),
        type: 'application/pdf',
        url,
      }));
      setCertificates(certs);
    }
  }, []);

  const getNameFromUrl = (url) => {
    const parts = url.split('%2F');
    return decodeURIComponent(parts[parts.length - 1].split('?')[0]);
  };

  const handleIdDocumentUpload = async (e) => {
    const file = e.target.files[0];
    idInputRef.current.value = '';
    if (!file) return;

    if (file.size > 10 * 1024 * 1024 || !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      alert('Invalid file. Must be JPG, PNG, or PDF and <10MB.');
      return;
    }

    setUploadingId(true);
    try {
      const filePath = `verifications/id/${Date.now()}_${file.name}`;
      const { downloadURL } = await uploadFile(file, filePath);

      setIdDocument({ name: file.name, type: file.type, url: downloadURL });
      handleInputChange('identity_document', downloadURL);
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploadingId(false);
    }
  };

  const handleCertificateUpload = async (e) => {
    const files = Array.from(e.target.files);
    certificateInputRef.current.value = '';
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    const validFiles = files.filter(f => {
      if (f.size > 10 * 1024 * 1024 || !allowedTypes.includes(f.type)) {
        alert(`${f.name} is invalid.`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    setUploadingCertificates(true);
    const newCertificates = [];

    for (let file of validFiles) {
      try {
        const filePath = `verifications/certificates/${Date.now()}_${file.name}`;
        const { downloadURL } = await uploadFile(file, filePath);
        newCertificates.push({ name: file.name, type: file.type, url: downloadURL });
      } catch (err) {
        console.error(err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    const combined = [...certificates, ...newCertificates];
    setCertificates(combined);
    handleInputChange('certificate_files', combined.map(c => c.url));
    setUploadingCertificates(false);
  };

  const removeIdDocument = async () => {
    if (idDocument?.url) await deleteFileFromUrl(idDocument.url);
    setIdDocument(null);
    handleInputChange('identity_document', null);
  };

  const removeCertificate = async (index) => {
    const removed = certificates[index];
    if (removed?.url) await deleteFileFromUrl(removed.url);

    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
    handleInputChange('certificate_files', updated.map(c => c.url));
  };

  const deleteFileFromUrl = async (url) => {
    try {
      const path = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
      await deleteFile(path);
    } catch (err) {
      console.error('File deletion failed:', err);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith?.('image/')) return '📷';
    if (fileType === 'application/pdf') return '📄';
    return '📎';
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification & Documents</h3>
        <p className="text-gray-600">Help build trust with students by verifying your identity and qualifications.</p>
      </div>

      {/* ID Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">Identity Verification *</label>
        {idDocument ? (
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getFileIcon(idDocument.type)}</span>
              <div>
                <p className="font-medium text-gray-900">{idDocument.name}</p>
              </div>
            </div>
            <button onClick={removeIdDocument} className="text-red-500 hover:text-red-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 bg-gradient-to-b from-blue-50 to-white">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-gray-700 font-medium mb-2">Upload Government ID</p>
            <p className="text-sm text-gray-500 mb-4">Passport, Driver's License, or National ID Card</p>
            <input ref={idInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleIdDocumentUpload} className="hidden" />
            <button
              onClick={() => idInputRef.current?.click()}
              disabled={uploadingId}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg"
            >
              {uploadingId ? <Loader2 className="animate-spin w-5 h-5 inline" /> : 'Upload ID Document'}
            </button>
          </div>
        )}
        {errors.idDocument && <FormError message={errors.idDocument} />}
      </div>

      {/* Certificates Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">Education Certificates</label>
        <div className="space-y-4">
          {certificates.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 divide-y">
              {certificates.map((cert, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getFileIcon(cert.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{cert.name}</p>
                    </div>
                  </div>
                  <button onClick={() => removeCertificate(index)} className="text-red-500 hover:text-red-700 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 bg-gradient-to-b from-green-50 to-white">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-gray-700 font-medium mb-2">Upload Diplomas & Certificates</p>
            <p className="text-sm text-gray-500 mb-4">Degrees, teaching certifications, language certificates</p>
            <input
              ref={certificateInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleCertificateUpload}
              multiple
              className="hidden"
            />
            <button
              onClick={() => certificateInputRef.current?.click()}
              disabled={uploadingCertificates}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg"
            >
              {uploadingCertificates ? <Loader2 className="animate-spin w-5 h-5 inline" /> : 'Upload Certificates'}
            </button>
          </div>
        </div>
      </div>

      {/* Background Check */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">Background Check</label>
        <label
          className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            formData.backgroundCheck ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input
            type="checkbox"
            checked={formData.backgroundCheck}
            onChange={(e) => handleInputChange('backgroundCheck', e.target.checked)}
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
          />
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">I agree to a background check</span>
            </div>
            <p className="text-xs text-gray-500">Optional but recommended for teaching children and building trust with parents</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Verification;
