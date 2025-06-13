import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FormNavigation = ({ currentStep, stepsLength, prevStep, nextStep, isSubmitting = false }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={prevStep}
        disabled={currentStep === 0 || isSubmitting}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
          currentStep === 0 || isSubmitting
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>
      
      <button
        onClick={nextStep}
        disabled={currentStep === stepsLength - 1 || isSubmitting}
        className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg ${
          currentStep === stepsLength - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isSubmitting
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        <span>
          {isSubmitting 
            ? 'Processing...' 
            : currentStep === stepsLength - 2 
              ? 'Submit Application' 
              : 'Next'
          }
        </span>
        {!isSubmitting && <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default FormNavigation;