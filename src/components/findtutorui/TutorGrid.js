// 5. TutorGrid.jsx
import React from 'react';
import { Filter, Search } from 'lucide-react';
import TutorCard from './TutorCard';
import TutorSkeleton from './TutorSkeleton';

const TutorGrid = ({
  tutors,
  loading,
  favorites,
  onToggleFavorite,
  onOpenVideoModal,
  onOpenChat,
  activeFiltersCount
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {tutors.length} Tutors Found
        </h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Filter className="w-4 h-4" />
          <span>Active filters: {activeFiltersCount}</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <TutorSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map(tutor => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                onOpenVideoModal={onOpenVideoModal}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>

          {tutors.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tutors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TutorGrid;