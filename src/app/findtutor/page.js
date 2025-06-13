
"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
 import { openChat } from '@/store/slices/chatSlice';
import { useDispatch } from 'react-redux';
import HeroSection from '@/components/findtutorui/HeroSection';
import FilterSection from '@/components/findtutorui/FilterSection';
import TutorGrid from '@/components/findtutorui/TutorGrid';
 import VideoModal from '@/components/findtutorui/VideoModel';
import { APIURL } from '../../../ApiUrl';
import Pagination from '@/components/findtutorui/Pagination';

// Import all our new components
 

const FindTutorsPage = () => {
  // All state management
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedSubject: 'all',
    selectedLevel: 'all',
    selectedNativeLanguage: 'all',
    minRate: '',
    maxRate: '',
    selectedCountry: 'any',
    selectedAvailability: 'any',
    selectedSpecialties: [],
    selectedAlsoSpeaks: [],
    selectedTutorCategories: [],
    sortBy: 'top-picks'
  });

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 12;

  const dispatch = useDispatch();

  // Filter options
  const filterOptions = {
    subjects: ['all', 'English', 'Italian', 'Portuguese', 'French', 'Computer Science', 'Psychology'],
    levels: ['all', 'Children (4-12)', 'Teenagers (13-17)', 'Adults (18+)'],
    nativeLanguages: ['all', 'English', 'Spanish', 'French', 'Italian', 'Portuguese'],
    countries: ['any', 'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Philippines', 'South Africa'],
    availabilityOptions: ['any', 'Available now', 'Available today', 'Available this week'],
    specialties: ['Business English', 'Conversational English', 'English for beginners', 'IELTS', 'TOEFL', 'Grammar', 'Pronunciation'],
    alsoSpeaksOptions: ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese'],
    tutorCategoryOptions: ['Professional teachers', 'Community tutors', 'Native speakers', 'Certified teachers'],
   sortOptions: [
      { value: 'top-picks', label: 'Our top picks' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating-high', label: 'Highest Rating' },
      { value: 'most-reviewed', label: 'Most Reviewed' },
      { value: 'newest', label: 'Newest First' }
    ]
  };

  // Fetch tutors data
  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${APIURL}getprofiles`, {
          params: {
            subject: filters.selectedSubject !== 'all' ? filters.selectedSubject : '',
            level: filters.selectedLevel !== 'all' ? filters.selectedLevel : '',
            nativeLanguage: filters.selectedNativeLanguage !== 'all' ? filters.selectedNativeLanguage : '',
            minRate: filters.minRate,
            maxRate: filters.maxRate,
            country: filters.selectedCountry !== 'any' ? filters.selectedCountry : '',
            availability: filters.selectedAvailability !== 'any' ? filters.selectedAvailability : '',
            specialties: filters.selectedSpecialties.join(','),
            alsoSpeaks: filters.selectedAlsoSpeaks.join(','),
            tutorCategories: filters.selectedTutorCategories.join(','),
            sortBy: filters.sortBy,
            search: filters.searchTerm
          }
        });
       
        setTutors(response.data.profiles || []);
      } catch (error) {
        console.error('Error fetching tutors:', error);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    if (key !== 'currentPage') {
      setCurrentPage(1);
    }
  };

  // Pagination logic
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(tutors.length / tutorsPerPage);

  // Event handlers
  const handleToggleFavorite = (tutorId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tutorId)) {
        newFavorites.delete(tutorId);
      } else {
        newFavorites.add(tutorId);
      }
      return newFavorites;
    });
  };

  const handleOpenVideoModal = (tutor) => {
    setSelectedVideo(tutor);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  const handleOpenChat = (tutor) => {
    dispatch(openChat({
      recipientId: tutor.user_id,
      recipientName: tutor.name,
      recipientAvatar: tutor.profile_image
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.selectedSubject !== 'all') count++;
    if (filters.selectedLevel !== 'all') count++;
    if (filters.selectedNativeLanguage !== 'all') count++;
    if (filters.minRate) count++;
    if (filters.maxRate) count++;
    if (filters.selectedCountry !== 'any') count++;
    if (filters.selectedAvailability !== 'any') count++;
    if (filters.selectedSpecialties.length > 0) count++;
    if (filters.selectedAlsoSpeaks.length > 0) count++;
    if (filters.selectedTutorCategories.length > 0) count++;
    if (filters.sortBy !== 'top-picks') count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <HeroSection />
      
      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
      
      <TutorGrid
        tutors={currentTutors}
        loading={loading}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenVideoModal={handleOpenVideoModal}
        onOpenChat={handleOpenChat}
        activeFiltersCount={getActiveFiltersCount()}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <VideoModal
        isOpen={showVideoModal}
        tutor={selectedVideo}
        onClose={handleCloseVideoModal}
        onOpenChat={handleOpenChat}
      />
      
      <Footer />
    </div>
  );
};

export default FindTutorsPage;