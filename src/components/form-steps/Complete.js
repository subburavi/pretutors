import React from 'react';
import { CheckCircle } from 'lucide-react';

const Complete = () => {
  return (
    <div className="space-y-8 text-center">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h3>
        <p className="text-gray-600 text-lg">Thank you for joining TutorHub. We're excited to have you on our platform!</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h4>
        <div className="space-y-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-semibold text-blue-600">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Application Review</p>
              <p className="text-sm text-gray-600">Our team will review your application within 2-3 business days</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-semibold text-purple-600">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Profile Setup</p>
              <p className="text-sm text-gray-600">Once approved, we'll help you optimize your profile for maximum visibility</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-semibold text-green-600">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Start Teaching</p>
              <p className="text-sm text-gray-600">Begin receiving student bookings and start your teaching journey!</p>
            </div>
          </div>
        </div>
      </div>
{/*       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
          Go to Dashboard
        </button>
        <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:bg-gray-50 transition-all">
          Download Application Copy
        </button>
      </div> */}
    </div>
  );
};

export default Complete;