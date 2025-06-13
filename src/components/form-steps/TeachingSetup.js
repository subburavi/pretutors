import React from 'react';
import { Camera, Headphones, Building2, Wifi } from 'lucide-react';
import FormError from '../ui/FormError';

const TeachingSetup = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Teaching Setup</h3>
        <p className="text-gray-600">Ensure you have the right equipment and environment for quality online lessons.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Technical Requirements *</label>
          {errors.hasWebcam && <FormError message={errors.hasWebcam} className="mb-2" />}
          <div className="space-y-3">
            <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.hasWebcam ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.hasWebcam}
                onChange={(e) => handleInputChange('hasWebcam', e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <Camera className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">I have a working webcam/camera</span>
            </label>
            
            <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.hasHeadset ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.hasHeadset}
                onChange={(e) => handleInputChange('hasHeadset', e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <Headphones className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">I have a quality headset/microphone</span>
            </label>
            
            <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.hasQuietSpace ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.hasQuietSpace}
                onChange={(e) => handleInputChange('hasQuietSpace', e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <Building2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">I have a quiet, professional teaching space</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Internet Connection Speed *</label>
          <div className="relative">
            <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.internetConnection}
              onChange={(e) => handleInputChange('internetConnection', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.internetConnection ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none`}
            >
              <option value="">Select your internet speed</option>
              <option value="excellent">Excellent (50+ Mbps)</option>
              <option value="good">Good (25-50 Mbps)</option>
              <option value="adequate">Adequate (10-25 Mbps)</option>
              <option value="basic">Basic (5-10 Mbps)</option>
            </select>
          </div>
          {errors.internetConnection && <FormError message={errors.internetConnection} />}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Primary Teaching Location *</label>
          <select
            value={formData.teachingLocation}
            onChange={(e) => handleInputChange('teachingLocation', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${errors.teachingLocation ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          >
            <option value="">Where will you teach from?</option>
            <option value="home-office">Home Office</option>
            <option value="private-room">Private Room</option>
            <option value="dedicated-studio">Dedicated Teaching Studio</option>
            <option value="shared-space">Shared Space (occasionally)</option>
          </select>
          {errors.teachingLocation && <FormError message={errors.teachingLocation} />}
        </div>
      </div>
    </div>
  );
};

export default TeachingSetup;