'use client';
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Star, 
  BookOpen,
  DollarSign,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

const SimpleTutorDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data
  const todaysClasses = [
    {
      id: 1,
      time: "10:00 AM",
      student: "Aarav S.",
      subject: "Mathematics",
      status: "scheduled",
      meetingLink: "https://meetsync.app/room/math101"
    },
    {
      id: 2,
      time: "12:00 PM", 
      student: "Riya M.",
      subject: "Physics",
      status: "scheduled",
      meetingLink: "https://meetsync.app/room/physics201"
    },
    {
      id: 3,
      time: "4:00 PM",
      student: "Aman K.",
      subject: "Chemistry", 
      status: "pending"
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleJoinClass = (meetingLink) => {
    if (meetingLink) {
      window.open(meetingLink, '_blank');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <AlertCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
      <div className="flex-1 overflow-y-auto rounded-xl bg-white shadow p-6">

    <div className="space-y-6  min-h-screen">
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Welcome back, Subbu 👋</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span>{formatDate(currentTime)}</span>
            <span>•</span>
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">128</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹12,500</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">Rating (45 reviews)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            <span className="text-sm text-gray-500">({todaysClasses.length} classes)</span>
          </div>
          
          <div className="space-y-3">
            {todaysClasses.map(classInfo => (
              <div key={classInfo.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-16">
                      <div className="font-semibold text-gray-900">{classInfo.time}</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{classInfo.student}</span>
                    </div>
                    
                    <div className="text-sm text-blue-600 font-medium">
                      {classInfo.subject}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 border ${getStatusColor(classInfo.status)}`}>
                      {getStatusIcon(classInfo.status)}
                      <span className="capitalize">{classInfo.status}</span>
                    </div>
                    
                    {classInfo.status === 'scheduled' && classInfo.meetingLink && (
                      <button
                        onClick={() => handleJoinClass(classInfo.meetingLink)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-1"
                      >
                        <Video className="w-3 h-3" />
                        <span>Join</span>
                      </button>
                    )}
                    
                    {classInfo.status === 'pending' && (
                      <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-colors">
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {todaysClasses.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No classes scheduled for today</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
    </div>
    </div>
  );
};

export default SimpleTutorDashboard;