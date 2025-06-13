// 2. TutorSkeleton.jsx
import React from 'react';

const TutorSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-3 w-16 bg-gray-200 rounded mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-40 bg-gray-200 rounded"></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

export default TutorSkeleton;