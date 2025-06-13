"use client";
import React, { useEffect, useState } from 'react';
import { Star, Play, Clock, Users, Award, Calendar, Video, MessageCircle, Heart, MapPin, Globe, BookOpen, CheckCircle, Camera, Headphones, Wifi, Home } from 'lucide-react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
 import SimilarTutors from '@/components/SimilarTutors';
import TutorBooking from '@/components/booking/Booking';
import { APIURL } from '../../../../ApiUrl';

const Page = ({ params }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarTutors, setSimilarTutors] = useState([]);

  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${APIURL}tutor/profile/${params.id}`);
        setTutor(response.data.profile);
        
        // Fetch similar tutors based on the tutor's subjects
        // const similarResponse = await axios.get('/api/similartutors', {
        //   params: {
        //     subjects: response.data.subjects.join(','),
        //     exclude: response.data.id
        //   }
        // });
        setSimilarTutors(response.data.simillerprofile);
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorProfile();
  }, [params.id]);

  const getTechSpecs = () => {
    if (!tutor) return [];
    const specs = [];
    if (tutor.has_webcam) specs.push({ icon: Camera, text: 'HD Camera' });
    if (tutor.has_headset) specs.push({ icon: Headphones, text: 'Professional Audio' });
    if (tutor.internet_connection === 'good') specs.push({ icon: Wifi, text: 'Stable Connection' });
    if (tutor.teaching_location === 'home-office') specs.push({ icon: Home, text: 'Dedicated Space' });
    return specs;
  };

  const getExperienceIcon = (experience) => {
    if (!experience) return '🌟';
    const years = parseInt(experience.split('-')[0]);
    if (years >= 5) return '🏆';
    if (years >= 3) return '⭐';
    return '🌟';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Tutor not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Tutor Header */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-6 right-6">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all"
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 -mt-20 relative">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative z-10" style={{height:"129px"}}>
                      <img 
                        src={tutor.profile_image} 
                        alt={tutor.name}
                        className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 mt-16 md:mt-0">
                      <div className="mb-4">
                        <h1 className="text-4xl font-bold text-white mb-2">{tutor.name}</h1>
                        <p className="text-xl text-gray-600 mb-3 mt-3">{tutor.headline}</p>
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{tutor.city}, {tutor.country}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Timezone: {tutor.timezone}</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="font-semibold text-gray-900">4.9</span>
                            <span className="text-gray-500">(248 reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">320+ students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getExperienceIcon(tutor.teaching_experience)}</span>
                            <span className="text-gray-600">{tutor.teaching_experience?.replace('-', ' ') || '1-2 years'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Languages & Subjects */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Teaching Subjects</h3>
                          <div className="flex flex-wrap gap-2">
                            {tutor.subjects?.map((subject, index) => (
                              <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                          <div className="flex flex-wrap gap-2">
                            {tutor.native_languages?.map((lang, index) => (
                              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                                {lang} (Native)
                              </span>
                            ))}
                            {tutor.languages?.map((lang, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 mt-6">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${tutor.hourly_rate}<span className="text-xl text-gray-500 font-normal">/hour</span>
                        </div>
                        <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Responds {tutor.response_time || 'within 1 hour'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video & Tech Specs Combined */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Video Section */}
                <div className="md:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Video className="w-6 h-6 text-blue-600" />
                      Introduction Video
                    </h2>
                    <p className="text-gray-600 mt-1">Get to know your tutor</p>
                  </div>
                  <div className="p-6">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 shadow-inner">
                      {!showVideo ? (
                        <div className="relative w-full h-full group cursor-pointer" onClick={() => setShowVideo(true)}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                              <Play className="w-8 h-8 text-gray-800 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-lg font-semibold">Watch my introduction</p>
                            <p className="text-sm opacity-90">Learn about my teaching style</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          {tutor.video_intro ? (
                            <video controls className="w-full h-full">
                              <source src={tutor.video_intro} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div className="text-center text-white">
                              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                              <p className="text-lg mb-2">Video Player</p>
                              <p className="text-sm opacity-75 mb-4">Introduction video would play here</p>
                              <button 
                                onClick={() => setShowVideo(false)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Close
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tech Specifications */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Setup Quality
                  </h3>
                  <div className="space-y-3">
                    {getTechSpecs().map((spec, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <spec.icon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-700 font-medium">{spec.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {tutor.background_check && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Background Verified</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  About Me
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">{tutor.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg">Teaching Focus</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Style: {tutor.teaching_style}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">Age Groups: {tutor.age_groups?.join(', ') || 'All ages'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Lesson Types: {tutor.lesson_types?.join(', ') || 'One-on-one'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg">Background</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">Current: {tutor.current_occupation || 'Professional Tutor'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">{tutor.education || 'Education background not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Tutors */}
              <SimilarTutors similarTutors={similarTutors} />
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <TutorBooking tutor={tutor} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;