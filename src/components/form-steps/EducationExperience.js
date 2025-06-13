import React from 'react';
import FormError from '../ui/FormError';

const EducationExperience = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Background</h3>
        <p className="text-gray-600">Tell us about your education and teaching experience to build student confidence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Teaching Experience *</label>
          <select
            value={formData.teachingExperience}
            onChange={(e) => handleInputChange('teachingExperience', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${errors.teachingExperience ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          >
            <option value="">Select experience level</option>
            <option value="no-experience">No formal teaching experience</option>
            <option value="less-than-1">Less than 1 year</option>
            <option value="1-2-years">1-2 years</option>
            <option value="3-5-years">3-5 years</option>
            <option value="5-10-years">5-10 years</option>
            <option value="10-plus-years">10+ years</option>
          </select>
          {errors.teachingExperience && <FormError message={errors.teachingExperience} />}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Current Occupation</label>
          <input
            type="text"
            value={formData.currentOccupation}
            onChange={(e) => handleInputChange('currentOccupation', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="e.g., Teacher, Software Engineer, Student"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Education Background *</label>
        <textarea
          value={formData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border-2 ${errors.education ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          placeholder="Tell us about your educational background, degrees, universities, and relevant coursework..."
        />
        {errors.education && <FormError message={errors.education} />}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Previous Teaching Experience</label>
        <textarea
          value={formData.previousTeachingRoles}
          onChange={(e) => handleInputChange('previousTeachingRoles', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Describe any formal or informal teaching experience, tutoring, training, or mentoring roles..."
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Certifications & Qualifications</label>
        <input
          type="text"
          value={formData.certifications.join(', ')}
          onChange={(e) => handleInputChange('certifications', e.target.value.split(', ').filter(cert => cert.trim()))}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="TEFL, TESOL, CELTA, DELTA, etc. (separate with commas)"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Why do you want to teach on TutorHub? *</label>
        <textarea
          value={formData.motivationForTeaching}
          onChange={(e) => handleInputChange('motivationForTeaching', e.target.value)}
          rows={3}
          className={`w-full px-4 py-3 border-2 ${errors.motivationForTeaching ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          placeholder="Share your passion for teaching and what motivates you to help students learn..."
        />
        {errors.motivationForTeaching && <FormError message={errors.motivationForTeaching} />}
      </div>
    </div>
  );
};

export default EducationExperience;