import React from 'react';
import { CheckCircle } from 'lucide-react';

const FormProgress = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Become a Tutor
        </h1>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              index < currentStep 
                ? 'bg-green-500 text-white' 
                : index === currentStep 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 mx-1 rounded-full transition-all ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="text-sm font-medium text-gray-700">
        {steps[currentStep]}
      </div>
    </div>
  );
};

export default FormProgress;