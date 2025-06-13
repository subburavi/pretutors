"use client";
import React, { useState, useEffect } from 'react';
import { Search, Star, Users, BookOpen, Globe, MessageCircle, PlayCircle, ChevronRight, Menu, X, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
const router=useRouter();
  const subjects = [
    'English', 'Spanish', 'French', 'German', 'Mathematics', 'Physics', 
    'Chemistry', 'Biology', 'Computer Science', 'Business', 'History', 'Art'
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "The personalized lessons helped me improve my Spanish fluency in just 3 months. My tutor was amazing!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Parent",
      content: "My daughter's math grades improved significantly thanks to the dedicated tutors here. Highly recommended!",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Rodriguez",
      role: "Professional",
      content: "Learning business English here helped me advance in my career. The flexible scheduling was perfect.",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "Ahmed Hassan",
      role: "University Student",
      content: "My Arabic tutor helped me master the language for my Middle Eastern studies. Excellent teaching methods!",
      rating: 5,
      avatar: "AH"
    },
    {
      name: "Li Wei",
      role: "Business Professional",
      content: "Learning Mandarin with native speakers gave me the confidence to expand my business to China.",
      rating: 5,
      avatar: "LW"
    },
    {
      name: "Marie Dubois",
      role: "Travel Enthusiast",
      content: "French lessons helped me feel confident during my trip to Paris. The cultural insights were invaluable!",
      rating: 5,
      avatar: "MD"
    }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Tutors",
      description: "Learn from certified tutors with years of teaching experience"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Learn Anywhere",
      description: "Access your lessons from anywhere in the world, anytime"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Interactive Lessons",
      description: "Engage in real-time conversations and interactive exercises"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Personalized Learning",
      description: "Customized lesson plans tailored to your learning goals"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => {
        const next = prev + 3;
        return next >= testimonials.length ? 0 : next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
  <Header/>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Learn with the world's
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    best tutors
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Master any subject with personalized 1-on-1 lessons from expert tutors. 
                  Learn at your own pace, on your schedule.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="What do you want to learn?"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <button  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <span>Find Tutors</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 8).map((subject, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors border border-gray-200"
                  >
                    {subject}
                  </span>
                ))}
              </div> */}
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Online tutoring"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Live Lesson</p>
                      <p className="text-xs text-gray-500">In progress</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-yellow-400 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-800" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-900">4.9/5</p>
                      <p className="text-xs text-yellow-800">Average rating</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">10k+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">500k+</div>
              <div className="text-gray-600">Students Taught</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">Subjects</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
      {/* Languages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Find Tutors by Language</h2>
            <p className="text-xl text-gray-600">Choose from our wide selection of language experts</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'English', flag: '🇺🇸', students: '125k+', color: 'from-blue-500 to-blue-600' },
              { name: 'Spanish', flag: '🇪🇸', students: '89k+', color: 'from-red-500 to-red-600' },
              { name: 'French', flag: '🇫🇷', students: '67k+', color: 'from-blue-600 to-indigo-600' },
              { name: 'German', flag: '🇩🇪', students: '45k+', color: 'from-gray-700 to-gray-800' },
              { name: 'Arabic', flag: '🇸🇦', students: '32k+', color: 'from-green-600 to-green-700' },
              { name: 'Chinese', flag: '🇨🇳', students: '78k+', color: 'from-red-600 to-yellow-500' },
              { name: 'Japanese', flag: '🇯🇵', students: '54k+', color: 'from-red-500 to-white' },
              { name: 'Korean', flag: '🇰🇷', students: '43k+', color: 'from-blue-500 to-red-500' },
              { name: 'Italian', flag: '🇮🇹', students: '39k+', color: 'from-green-500 to-red-500' },
              { name: 'Portuguese', flag: '🇧🇷', students: '36k+', color: 'from-green-500 to-yellow-400' },
              { name: 'Russian', flag: '🇷🇺', students: '28k+', color: 'from-blue-600 to-red-600' },
              { name: 'Dutch', flag: '🇳🇱', students: '21k+', color: 'from-red-500 to-blue-500' }
            ].map((language, index) => (
              <Link href={'/findtutor?subject='+language.name}>
              <div
                key={index}
               
                className="group cursor-pointer bg-white border-2 border-gray-100 hover:border-transparent rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
              >
                <div className="space-y-3">
                  <div className="text-4xl mb-2">{language.flag}</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {language.name} Tutors
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    {language.students} students
                  </p>
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${language.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 shadow-lg">
              View All Languages
            </button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why choose TutorHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of learning with our innovative platform designed to help you succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 text-center group hover:scale-105 transform transition-transform"
              >
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How it works</h2>
            <p className="text-xl text-gray-600">Get started in just 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 relative">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Find Your Tutor</h3>
              <p className="text-gray-600">Browse thousands of expert tutors and find the perfect match for your learning goals</p>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
              </div>
            </div>
            
            <div className="text-center space-y-4 relative">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Book a Lesson</h3>
              <p className="text-gray-600">Schedule your first lesson at a time that works for you. Try a trial lesson first!</p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Start Learning</h3>
              <p className="text-gray-600">Join your online classroom and begin your personalized learning journey</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">What our students say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(activeTestimonial, activeTestimonial + 3).map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed text-center">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-2 mt-12">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }, (_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index * 3)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(activeTestimonial / 3) === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to start your learning journey?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their lives through personalized learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center space-x-2">
                <span>Find Your Tutor</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
                Become a Tutor
              </button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Free trial lesson</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    <Footer/>
    </div>
  );
};

export default Home;