'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';

const SimilarTutors = ({ similarTutors = [] }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Tutors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {similarTutors.map((tutor) => (
          <div
            key={tutor.user_id}
            className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={
                  tutor.profile_image ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(tutor.name || 'Tutor')
                }
                alt={tutor.name || 'Tutor'}
                className="w-20 h-20 rounded-2xl object-cover mb-4 group-hover:scale-105 transition-transform"
              />

              <h3 className="font-bold text-gray-900 mb-1">
                {tutor.name || `${tutor.first_name} ${tutor.last_name}`}
              </h3>

              <p className="text-sm text-blue-600 font-medium mb-2">
                {tutor.teaching_style || 'Friendly & Engaging'}
              </p>

              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {tutor.subjects?.slice(0, 4).map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                  >
                    {subject}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tutor.average_rating || '0.0'}</span>
                  <span className="text-gray-500">({tutor.rating_count || 0})</span>
                </div>

                <div className="text-lg font-bold text-blue-600">
                  ${tutor.hourly_rate || '0'}/hr
                </div>
              </div>

              <Link
                href={`/tutors/${tutor.user_id}`}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarTutors;
