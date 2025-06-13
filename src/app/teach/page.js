"use client";
import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Globe, 
  Users, 
  BookOpen, 
  Star,
  Upload,
  Camera,
  Play,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Languages,
  GraduationCap,
  Award,
  FileText,
  Video,
  MessageSquare,
  Shield,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BecomeTutorPage = () => {
 const router=useRouter();

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Earn $10-40/hour",
      description: "Set your own rates and keep 85% of what you earn",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Schedule",
      description: "Teach when you want, from anywhere in the world",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connect with students from over 180 countries",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Growing Community",
      description: "Join 15,000+ tutors in our supportive community",
      color: "from-orange-500 to-red-600"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Apply to Teach",
      description: "Complete our simple application form with your teaching background and expertise",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      duration: "10 minutes"
    },
    {
      step: "02", 
      title: "Profile Review",
      description: "Our team reviews your application and provides feedback within 24-48 hours",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      duration: "1-2 days"
    },
    {
      step: "03",
      title: "Start Teaching",
      description: "Once approved, create your schedule and start connecting with students worldwide",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      duration: "Same day"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "English & Mandarin Tutor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "TutorHub gave me the flexibility to teach while traveling. I've helped over 200 students improve their English!",
      rating: 5,
      earnings: "$2,500/month"
    },
    {
      name: "Dr. James Wilson",
      role: "Mathematics & Physics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The platform is incredibly user-friendly. I love being able to share my passion for science with students globally.",
      rating: 5,
      earnings: "$3,200/month"
    },
    {
      name: "Maria Rodriguez",
      role: "Spanish & Business",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "Best decision I made was joining TutorHub. The support team is amazing and students are so motivated!",
      rating: 5,
      earnings: "$1,800/month"
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     {/* Navigation */}
     <Header/>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Become a Tutor &
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Share Your Knowledge
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of educators worldwide and start earning by teaching what you love. 
              Flexible schedule, global reach, and supportive community await you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
               <Link href='/teach/register'><button
                
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Start Teaching Today</span>
                <ArrowRight className="w-5 h-5" />
              </button></Link>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Watch Demo Video
              </button>
            </div>
            
            {/* Stats */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
                <div className="text-gray-600">Active Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">500,000+</div>
                <div className="text-gray-600">Lessons Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">180+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TutorHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a platform that puts tutors first with competitive rates, flexible scheduling, and comprehensive support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Get Started</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 3-step process to become a tutor and start earning within days.
            </p>
          </div>
          
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="lg:w-1/2">
                  <div className="relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                  
                  {index === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Share your expertise and teaching background</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Upload professional photo and intro video</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Set your hourly rate and availability</span>
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Background verification process</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Quality assessment by our team</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Personalized feedback and tips</span>
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Flexible scheduling system</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Instant student matching</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Weekly automatic payments</span>
                      </div>
                    </div>
                  )}
                  
                  {index === 0 && (
                    <Link href='/teach/register'> <button
                      onClick={() => setShowRegistration(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                    >
                      <span>Start Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button></Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from tutors who have transformed their passion into a thriving career with TutorHub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center text-green-800">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Earnings: {testimonial.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Teaching Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of successful tutors who are making a difference and earning great income. 
            Your expertise is valuable – let's put it to work!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
           <Link href='/teach/register'><button
              onClick={() => setShowRegistration(true)}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>Apply Now - It's Free</span>
              <ArrowRight className="w-5 h-5" />
            </button></Link>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Have Questions? Contact Us
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No upfront fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Quick approval</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
       <Footer/>
    </div>
  );
};

export default BecomeTutorPage;