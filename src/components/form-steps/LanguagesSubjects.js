import React from 'react';
import FormError from '../ui/FormError';

const LanguagesSubjects = ({ formData, handleArrayToggle, errors }) => {
  const subjects = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese',
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 
    'Geography', 'Economics', 'Business', 'Psychology', 'Philosophy', 'Art', 'Music'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese',
    'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Polish'
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Teaching Expertise</h3>
        <p className="text-gray-600">Select the subjects and languages you want to teach. You can always add more later.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">What subjects do you teach? *</label>
          {errors.subjects && <FormError message={errors.subjects} className="mb-2" />}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map(subject => (
              <label key={subject} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-blue-50 ${
                formData.subjects.includes(subject) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject)}
                  onChange={() => handleArrayToggle('subjects', subject)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-medium">{subject}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">What languages do you speak? *</label>
          {errors.languages && <FormError message={errors.languages} className="mb-2" />}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map(language => (
              <label key={language} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-green-50 ${
                formData.languages.includes(language) ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleArrayToggle('languages', language)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 font-medium">{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Native Languages *</label>
          {errors.nativeLanguages && <FormError message={errors.nativeLanguages} className="mb-2" />}
          <p className="text-sm text-gray-500 mb-3">Select languages you speak as a native speaker</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.filter(lang => formData.languages.includes(lang)).map(language => (
              <label key={language} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-purple-50 ${
                formData.nativeLanguages.includes(language) ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.nativeLanguages.includes(language)}
                  onChange={() => handleArrayToggle('nativeLanguages', language)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 font-medium">{language}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesSubjects;