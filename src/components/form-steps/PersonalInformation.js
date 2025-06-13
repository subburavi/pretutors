import React from 'react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import FormError from '../ui/FormError';

const PersonalInformation = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to TutorHub!</h3>
        <p className="text-gray-600">Let's start by getting to know you better. This information helps us create your tutor profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <FormError message={errors.firstName} />}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <FormError message={errors.lastName} />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <FormError message={errors.email} />}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && <FormError message={errors.phone} />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Country *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.country ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none`}
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="BR">Brazil</option>
              <option value="IN">India</option>
            </select>
          </div>
          {errors.country && <FormError message={errors.country} />}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">City *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="Enter your city"
            />
          </div>
          {errors.city && <FormError message={errors.city} />}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Date of Birth *</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={`w-full px-4 py-3 border-2 ${errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
        />
        {errors.dateOfBirth && <FormError message={errors.dateOfBirth} />}
      </div>
    </div>
  );
};

export default PersonalInformation;