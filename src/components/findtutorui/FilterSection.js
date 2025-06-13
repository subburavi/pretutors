// 4. FilterSection.jsx
import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import MultiSelectDropdown from './MultiSelectDropdown';

const FilterSection = ({
  filters,
  onFilterChange,
  filterOptions
}) => {
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const filterRef = useRef(null);
  const filterPlaceholderRef = useRef(null);

  // Initialize filters from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilters = {};
    
    // Parse URL parameters
    if (urlParams.get('subject')) urlFilters.selectedSubject = urlParams.get('subject');
    if (urlParams.get('minRate')) urlFilters.minRate = urlParams.get('minRate');
    if (urlParams.get('maxRate')) urlFilters.maxRate = urlParams.get('maxRate');
    if (urlParams.get('availability')) urlFilters.selectedAvailability = urlParams.get('availability');
    if (urlParams.get('alsoSpeaks')) urlFilters.selectedAlsoSpeaks = urlParams.get('alsoSpeaks').split(',');
    if (urlParams.get('nativeLanguage')) urlFilters.selectedNativeLanguage = urlParams.get('nativeLanguage');
    if (urlParams.get('categories')) urlFilters.selectedTutorCategories = urlParams.get('categories').split(',');
    if (urlParams.get('sortBy')) urlFilters.sortBy = urlParams.get('sortBy');
    if (urlParams.get('page')) urlFilters.currentPage = parseInt(urlParams.get('page'));

    // Apply URL filters if any exist
    Object.keys(urlFilters).forEach(key => {
      onFilterChange(key, urlFilters[key]);
    });
  }, []);

  // Update URL when filters change
  const updateURL = (filterKey, filterValue) => {
    const urlParams = new URLSearchParams(window.location.search);
    
    switch (filterKey) {
      case 'selectedSubject':
        if (filterValue === 'all') urlParams.delete('subject');
        else urlParams.set('subject', filterValue);
        break;
      case 'minRate':
        if (!filterValue) urlParams.delete('minRate');
        else urlParams.set('minRate', filterValue);
        break;
      case 'maxRate':
        if (!filterValue) urlParams.delete('maxRate');
        else urlParams.set('maxRate', filterValue);
        break;
      case 'selectedAvailability':
        if (filterValue === 'any') urlParams.delete('availability');
        else urlParams.set('availability', filterValue);
        break;
      case 'selectedAlsoSpeaks':
        if (filterValue.length === 0) urlParams.delete('alsoSpeaks');
        else urlParams.set('alsoSpeaks', filterValue.join(','));
        break;
      case 'selectedNativeLanguage':
        if (filterValue === 'all') urlParams.delete('nativeLanguage');
        else urlParams.set('nativeLanguage', filterValue);
        break;
      case 'selectedTutorCategories':
        if (filterValue.length === 0) urlParams.delete('categories');
        else urlParams.set('categories', filterValue.join(','));
        break;
      case 'sortBy':
        urlParams.set('sortBy', filterValue);
        break;
      case 'currentPage':
        if (filterValue === 1) urlParams.delete('page');
        else urlParams.set('page', filterValue);
        break;
    }

    const newURL = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.pushState({}, '', newURL);
  };

  // Enhanced filter change handler with URL updates
  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);
    updateURL(key, value);
  };

  // Sticky filter logic
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current && filterPlaceholderRef.current) {
        const filterTop = filterPlaceholderRef.current.offsetTop;
        const scrollTop = window.scrollY;
        
        if (scrollTop > filterTop) {
          setIsFilterSticky(true);
          filterPlaceholderRef.current.style.height = `${filterRef.current.offsetHeight}px`;
        } else {
          setIsFilterSticky(false);
          filterPlaceholderRef.current.style.height = '0px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRateFilter = () => {
    handleFilterChange('currentPage', 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      {/* Placeholder for sticky positioning */}
      <div ref={filterPlaceholderRef}></div>
      
      <div 
        ref={filterRef}
        className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
          isFilterSticky ? 'fixed top-0 left-0 right-0 z-[9999] rounded-none shadow-xl py-3' : 'p-5 mb-8'
        }`}
      >
        <div className={isFilterSticky ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}>
          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">I want to learn</label>
              <div className="relative flex-1">
                <select
                  className="w-full h-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={filters.selectedSubject}
                  onChange={(e) => {
                    handleFilterChange('selectedSubject', e.target.value);
                    handleFilterChange('currentPage', 1);
                  }}
                >
                  <option value="all">English</option>
                  {filterOptions.subjects.slice(1).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                {filters.selectedSubject !== 'all' && (
                  <button
                    onClick={() => handleFilterChange('selectedSubject', 'all')}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per lesson</label>
              <div className="flex gap-2 flex-1 items-center ">
                <input
                  type="number"
                  placeholder="₹200"
                  className="flex-1 w-100 h-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={filters.minRate}
                  onChange={(e) => handleFilterChange('minRate', e.target.value)}
                  onBlur={handleRateFilter}
                  style={{width:"100px"}}
                />
                <span className="text-gray-500 px-1">–</span>
                <input
                  type="number"
                  placeholder="₹3,400+"
                  className="flex-1 h-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={filters.maxRate}
                  onChange={(e) => handleFilterChange('maxRate', e.target.value)}
                  onBlur={handleRateFilter}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">I'm available</label>
              <select
                className="w-full h-10 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex-1"
                value={filters.selectedAvailability}
                onChange={(e) => handleFilterChange('selectedAvailability', e.target.value)}
              >
                {filterOptions.availabilityOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'any' ? 'Any time' : option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filters Row - Smaller fields with space between left and right */}
          <div className="flex justify-between items-end gap-8">
            {/* Left side - 3 smaller filters */}
            <div className="flex gap-3 flex-1">
              <div className="flex flex-col min-w-[140px] max-w-[180px] flex-1">
                <MultiSelectDropdown
                  label="Also speaks"
                  options={filterOptions.alsoSpeaksOptions}
                  selected={filters.selectedAlsoSpeaks}
                  onToggle={(value) => handleFilterChange('selectedAlsoSpeaks', 
                    filters.selectedAlsoSpeaks.includes(value) 
                      ? filters.selectedAlsoSpeaks.filter(item => item !== value)
                      : [...filters.selectedAlsoSpeaks, value]
                  )}
                  placeholder="Any language"
                />
              </div>

              <div className="flex flex-col min-w-[140px] max-w-[180px] flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-2">Native speaker</label>
                <select
                  className="w-full h-8 px-3 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={filters.selectedNativeLanguage}
                  onChange={(e) => {
                    handleFilterChange('selectedNativeLanguage', e.target.value);
                    handleFilterChange('currentPage', 1);
                  }}
                >
                  <option value="all">Any</option>
                  {filterOptions.nativeLanguages.slice(1).map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col min-w-[140px] max-w-[180px] flex-1">
                <MultiSelectDropdown
                  label="Tutor categories"
                  options={filterOptions.tutorCategoryOptions}
                  selected={filters.selectedTutorCategories}
                  onToggle={(value) => handleFilterChange('selectedTutorCategories',
                    filters.selectedTutorCategories.includes(value)
                      ? filters.selectedTutorCategories.filter(item => item !== value)
                      : [...filters.selectedTutorCategories, value]
                  )}
                  placeholder="All categories"
                  className='py-1'
                />
              </div>
            </div>

            {/* Right side - Sort by filter */}
            <div className="flex flex-col min-w-[140px] max-w-[180px]">
              <label className="block text-xs font-medium text-gray-700 mb-2">Sort by</label>
              <select
                className="w-full h-8 px-3 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                {filterOptions.sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;