import React from 'react';
import FormError from '../ui/FormError';

const TeachingApproach = ({ formData, handleInputChange, handleArrayToggle, errors }) => {
  const teachingStyles = [
    'Interactive & Conversational',
    'Structured & Curriculum-based', 
    'Visual & Creative',
    'Grammar-focused',
    'Immersive & Natural',
    'Test Preparation Specialist'
  ];

  const ageGroups = [
    'Children (4-12)',
    'Teenagers (13-17)', 
    'Adults (18-64)',
    'Seniors (65+)'
  ];

  const lessonTypes = [
    'One-on-one lessons',
    'Group lessons',
    'Conversation practice',
    'Test preparation',
    'Business/Professional',
    'Academic support'
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Teaching Style</h3>
        <p className="text-gray-600">Help students understand how you teach and who you work best with.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Teaching Style & Methodology *</label>
          {errors.teachingStyle && <FormError message={errors.teachingStyle} className="mb-2" />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teachingStyles.map(style => (
              <label key={style} className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-orange-50 ${
                formData.teachingStyle === style ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}>
                <input
                  type="radio"
                  name="teachingStyle"
                  checked={formData.teachingStyle === style}
                  onChange={() => handleInputChange('teachingStyle', style)}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 font-medium">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Age Groups You Teach *</label>
          {errors.ageGroups && <FormError message={errors.ageGroups} className="mb-2" />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ageGroups.map(age => (
              <label key={age} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-blue-50 ${
                formData.ageGroups.includes(age) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.ageGroups.includes(age)}
                  onChange={() => handleArrayToggle('ageGroups', age)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-medium">{age}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Lesson Types You Offer *</label>
          {errors.lessonTypes && <FormError message={errors.lessonTypes} className="mb-2" />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lessonTypes.map(type => (
              <label key={type} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-green-50 ${
                formData.lessonTypes.includes(type) ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.lessonTypes.includes(type)}
                  onChange={() => handleArrayToggle('lessonTypes', type)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 font-medium">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Do you have teaching materials?</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.hasTeachingMaterials}
                  onChange={(e) => handleInputChange('hasTeachingMaterials', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I have my own teaching materials</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.willingToCreateMaterials}
                  onChange={(e) => handleInputChange('willingToCreateMaterials', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I'm willing to create custom materials</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingApproach;