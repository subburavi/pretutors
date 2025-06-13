"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Star, Clock, MapPin, Filter, Search, Heart, Video, ChevronDown, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { APIURL } from '../../../ApiUrl';
import { openChat } from '@/store/slices/chatSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const FindTutorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState('all');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 12;

  // New filter states
  const [selectedCountry, setSelectedCountry] = useState('any');
  const [selectedAvailability, setSelectedAvailability] = useState('any');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedAlsoSpeaks, setSelectedAlsoSpeaks] = useState([]);
  const [selectedTutorCategories, setSelectedTutorCategories] = useState([]);
  const [sortBy, setSortBy] = useState('top-picks');
  const [isFilterSticky, setIsFilterSticky] = useState(false);

  // Refs for sticky behavior
  const filterRef = useRef(null);
  const filterPlaceholderRef = useRef(null);

  const subjects = ['all', 'English', 'Italian', 'Portuguese', 'French', 'Computer Science', 'Psychology'];
  const levels = ['all', 'Children (4-12)', 'Teenagers (13-17)', 'Adults (18+)'];
  const nativeLanguages = ['all', 'English', 'Spanish', 'French', 'Italian', 'Portuguese'];
  
  // New filter options
  const countries = ['any', 'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Philippines', 'South Africa'];
  const availabilityOptions = ['any', 'Available now', 'Available today', 'Available this week'];
  const specialties = ['Business English', 'Conversational English', 'English for beginners', 'IELTS', 'TOEFL', 'Grammar', 'Pronunciation'];
  const alsoSpeaksOptions = ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese'];
  const tutorCategoryOptions = ['Professional teachers', 'Community tutors', 'Native speakers', 'Certified teachers'];
  const sortOptions = [
    { value: 'top-picks', label: 'Our top picks' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest rated' },
    { value: 'reviews', label: 'Most reviews' }
  ];

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

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        
        // Prepare filter payload
        const payload = {
          subject: selectedSubject !== 'all' ? selectedSubject : '',
          native_language: selectedNativeLanguage !== 'all' ? selectedNativeLanguage : '',
          min_rate: minRate ? parseFloat(minRate) : '',
          max_rate: maxRate ? parseFloat(maxRate) : '',
          page: currentPage,
          limit: tutorsPerPage
        };

        // Remove undefined values from payload
        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(([_, value]) => value !== undefined)
        );

        const response = await axios.get(`${APIURL}getprofiles`, {
          params: payload,
          paramsSerializer: params => {
            return Object.entries(params)
              .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
              .join('&');
          }
        });
        
        setTutors(response.data.profiles);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [selectedSubject, selectedNativeLanguage, minRate, maxRate, currentPage]);

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subjects?.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || tutor.age_groups?.includes(selectedLevel);
    
    return matchesSearch && matchesLevel;
  });

  // Pagination logic
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  const toggleFavorite = (tutorId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(tutorId)) {
      newFavorites.delete(tutorId);
    } else {
      newFavorites.add(tutorId);
    }
    setFavorites(newFavorites);
  };

  const openVideoModal = (tutor) => {
    setSelectedVideo(tutor);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  const handleRateFilter = () => {
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const dispatch = useDispatch();

  // Helper function to handle multi-select filters
  const toggleMultiSelect = (value, selectedArray, setFunction) => {
    if (selectedArray.includes(value)) {
      setFunction(selectedArray.filter(item => item !== value));
    } else {
      setFunction([...selectedArray, value]);
    }
  };

  // Loading skeleton component
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

  // Multi-select dropdown component
  const MultiSelectDropdown = ({ label, options, selected, onToggle, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
        >
          <span className="truncate">
            {selected.length === 0 ? placeholder : `${selected.length} selected`}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map(option => (
              <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onToggle(option)}
                  className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Tutor</h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">Connect with experienced tutors and preview their teaching style with video introductions</p>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          {/* Placeholder for sticky positioning */}
          <div ref={filterPlaceholderRef}></div>
          
          <div 
            ref={filterRef}
            className={`bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 ${
              isFilterSticky ? 'fixed top-0 left-0 right-0 z-403333 rounded-none shadow-md' : ''
            }`}
          >
            <div className={isFilterSticky ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}>
              {/* Primary Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I want to learn</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      value={selectedSubject}
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="all">English</option>
                      {subjects.slice(1).map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    {selectedSubject !== 'all' && (
                      <button
                        onClick={() => setSelectedSubject('all')}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per lesson</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="₹200"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={minRate}
                      onChange={(e) => setMinRate(e.target.value)}
                      onBlur={handleRateFilter}
                    />
                    <span className="py-2 text-gray-500">–</span>
                    <input
                      type="number"
                      placeholder="₹3,400+"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={maxRate}
                      onChange={(e) => setMaxRate(e.target.value)}
                      onBlur={handleRateFilter}
                    />
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of birth</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country === 'any' ? 'Any country' : country}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I'm available</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                  >
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>
                        {option === 'any' ? 'Any time' : option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Secondary Filters */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                {/* <MultiSelectDropdown
                  label="Specialties"
                  options={specialties}
                  selected={selectedSpecialties}
                  onToggle={(value) => toggleMultiSelect(value, selectedSpecialties, setSelectedSpecialties)}
                  placeholder="Any specialty"
                /> */}

                <MultiSelectDropdown
                  label="Also speaks"
                  options={alsoSpeaksOptions}
                  selected={selectedAlsoSpeaks}
                  onToggle={(value) => toggleMultiSelect(value, selectedAlsoSpeaks, setSelectedAlsoSpeaks)}
                  placeholder="Any language"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Native speaker</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={selectedNativeLanguage}
                    onChange={(e) => {
                      setSelectedNativeLanguage(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="all">Any</option>
                    {nativeLanguages.slice(1).map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                <MultiSelectDropdown
                  label="Tutor categories"
                  options={tutorCategoryOptions}
                  selected={selectedTutorCategories}
                  onToggle={(value) => toggleMultiSelect(value, selectedTutorCategories, setSelectedTutorCategories)}
                  placeholder="All categories"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Bar */}
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or keyword"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredTutors.length} Tutors Found
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Active filters: {[
                selectedSubject !== 'all' ? 1 : 0,
                minRate || maxRate ? 1 : 0,
                selectedCountry !== 'any' ? 1 : 0,
                selectedAvailability !== 'any' ? 1 : 0,
                selectedSpecialties.length,
                selectedAlsoSpeaks.length,
                selectedNativeLanguage !== 'all' ? 1 : 0,
                selectedTutorCategories.length
              ].reduce((a, b) => a + b, 0)}</span>
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
                {currentTutors.map(tutor => (
                  <div key={tutor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    {/* Video Preview Thumbnail */}
                    {tutor.video_intro && (
                      <div className="relative group cursor-pointer" onClick={() => openVideoModal(tutor)}>
                        <img
                          src={tutor.video_intro.thumbnail || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=225&fit=crop"}
                          alt={`${tutor.name} video preview`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 text-blue-600 ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Preview
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Tutor Info */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={tutor.profile_image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(tutor.name)}
                            alt={tutor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                           <Link href={`/profile/${tutor.user_id}`}> <h3 className="font-semibold text-lg text-gray-900">{tutor.name}</h3></Link>
                            <p className="text-blue-600 font-medium">
                              {tutor.subjects?.join(', ') || 'General Tutor'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(tutor.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            favorites.has(tutor.id)
                              ? 'text-red-500 bg-red-50'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.has(tutor.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{tutor.average_rating || '4.5'}</span>
                        </div>
                        <span className="text-gray-500">({tutor.rating_count || '0'} reviews)</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tutor.description || 'Experienced tutor with a passion for teaching.'}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutor.subjects?.slice(0, 3).map(subject => (
                          <span key={subject} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{tutor.city || 'Unknown location'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{tutor.timezone || 'Flexible schedule'}</span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">
                          ${tutor.hourly_rate || '30'}<span className="text-sm font-normal text-gray-500">/hour</span>
                        </div>
                        <div className="flex gap-2">
                          <button  onClick={() =>
        dispatch(openChat({ id: tutor.user_id, name: tutor.name, avatar: 'SJ', online: true }))
      } className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            Message
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredTutors.length > tutorsPerPage && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 border-t border-b border-gray-300 ${currentPage === page ? 'bg-blue-50 text-blue-600 border-blue-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}

          {!loading && filteredTutors.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tutors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>

        {/* Video Modal */}
        {showVideoModal && selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold">
                  Video Introduction - {selectedVideo.name}
                </h3>
                <button
                  onClick={closeVideoModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="p-4">
                {/* Video placeholder - replace with actual video player */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                  {selectedVideo.video_intro ? (
                    <video controls className="w-full h-64 md:h-96">
                      <source src={selectedVideo.video_intro} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=225&fit=crop"
                      alt="Video preview"
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">
                      {selectedVideo.subjects?.join(', ') || 'General'} Tutor
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedVideo.description || 'Experienced tutor with a passion for teaching.'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.subjects?.map(subject => (
                        <span key={subject} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-64">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        ${selectedVideo.hourly_rate || '30'}/hour
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{selectedVideo.average_rating || '4.5'} ({selectedVideo.rating_count || '0'} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{selectedVideo.timezone || 'Flexible schedule'}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Book Session
                        </button>
                        <button  onClick={() =>
        dispatch(openChat({id: selectedVideo.user_id, name: selectedVideo.name, avatar: 'SJ', online: true }))
      } className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default FindTutorsPage;