import React from 'react';
import { DollarSign, Clock } from 'lucide-react';
import FormError from '../ui/FormError';

const PricingAvailability = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Your Rates</h3>
        <p className="text-gray-600">Choose competitive pricing that reflects your experience and expertise.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Trial Lesson Rate (USD) *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.trialRate}
              onChange={(e) => handleInputChange('trialRate', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.trialRate ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="10"
              min="5"
              max="50"
            />
          </div>
          <p className="text-sm text-gray-500">Recommended: $8-15 for trial lessons</p>
          {errors.trialRate && <FormError message={errors.trialRate} />}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Regular Hourly Rate (USD) *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.hourlyRate ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="25"
              min="10"
              max="100"
            />
          </div>
          <p className="text-sm text-gray-500">Recommended: $15-40 based on experience</p>
          {errors.hourlyRate && <FormError message={errors.hourlyRate} />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Timezone *</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${errors.timezone ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none`}
            >
              <option value="">Select timezone</option>
              <option value="UTC-12">(UTC-12:00) International Date Line West</option>
              <option value="UTC-11">(UTC-11:00) Coordinated Universal Time-11</option>
              <option value="UTC-10">(UTC-10:00) Hawaii</option>
              <option value="UTC-9">(UTC-09:00) Alaska</option>
              <option value="UTC-8">(UTC-08:00) Pacific Time (US & Canada)</option>
              <option value="UTC-7">(UTC-07:00) Mountain Time (US & Canada)</option>
              <option value="UTC-6">(UTC-06:00) Central Time (US & Canada)</option>
              <option value="UTC-5">(UTC-05:00) Eastern Time (US & Canada)</option>
              <option value="UTC-4">(UTC-04:00) Atlantic Time (Canada)</option>
              <option value="UTC-3">(UTC-03:00) Buenos Aires, Georgetown</option>
              <option value="UTC-2">(UTC-02:00) Mid-Atlantic</option>
              <option value="UTC-1">(UTC-01:00) Azores</option>
              <option value="UTC+0">(UTC+00:00) London, Dublin</option>
              <option value="UTC+1">(UTC+01:00) Berlin, Paris, Rome</option>
              <option value="UTC+2">(UTC+02:00) Cairo, Helsinki</option>
              <option value="UTC+3">(UTC+03:00) Moscow, Kuwait</option>
              <option value="UTC+4">(UTC+04:00) Abu Dhabi, Muscat</option>
              <option value="UTC+5">(UTC+05:00) Karachi, Tashkent</option>
              <option value="UTC+6">(UTC+06:00) Almaty, Dhaka</option>
              <option value="UTC+7">(UTC+07:00) Bangkok, Hanoi</option>
              <option value="UTC+8">(UTC+08:00) Beijing, Singapore</option>
              <option value="UTC+9">(UTC+09:00) Tokyo, Seoul</option>
              <option value="UTC+10">(UTC+10:00) Sydney, Melbourne</option>
              <option value="UTC+11">(UTC+11:00) Magadan, Solomon Is.</option>
              <option value="UTC+12">(UTC+12:00) Auckland, Fiji</option>
            </select>
          </div>
          {errors.timezone && <FormError message={errors.timezone} />}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Response Time *</label>
          <select
            value={formData.responseTime}
            onChange={(e) => handleInputChange('responseTime', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${errors.responseTime ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          >
            <option value="">How quickly do you respond?</option>
            <option value="within-1-hour">Within 1 hour</option>
            <option value="within-4-hours">Within 4 hours</option>
            <option value="within-12-hours">Within 12 hours</option>
            <option value="within-24-hours">Within 24 hours</option>
            <option value="within-48-hours">Within 48 hours</option>
          </select>
          {errors.responseTime && <FormError message={errors.responseTime} />}
        </div>
      </div>
    </div>
  );
};

export default PricingAvailability;