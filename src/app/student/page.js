"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  MessageCircle, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  Settings, 
  ChevronDown,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Star,
  Clock,
  Globe
} from 'lucide-react';

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "Thank you for the great lesson today! When is our next session?",
      time: "2 min ago",
      unread: 2,
      online: true,
      subject: "Spanish"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      avatar: "MC",
      lastMessage: "Could you please send me the homework materials?",
      time: "1 hour ago",
      unread: 0,
      online: false,
      subject: "Mathematics"
    },
    {
      id: 3,
      studentName: "Emma Rodriguez",
      avatar: "ER",
      lastMessage: "I'm struggling with the pronunciation exercises",
      time: "3 hours ago", 
      unread: 1,
      online: true,
      subject: "French"
    },
    {
      id: 4,
      studentName: "Ahmed Hassan",
      avatar: "AH",
      lastMessage: "Perfect! See you tomorrow at 3 PM",
      time: "1 day ago",
      unread: 0,
      online: false,
      subject: "Arabic"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "student",
      content: "Hi! I wanted to thank you for today's lesson. The grammar exercises really helped me understand the conjugations better.",
      time: "10:30 AM",
      avatar: "SJ"
    },
    {
      id: 2,
      sender: "tutor",
      content: "I'm so glad to hear that! You're making excellent progress with Spanish grammar. Keep practicing those exercises we went through.",
      time: "10:32 AM"
    },
    {
      id: 3,
      sender: "student", 
      content: "Thank you for the great lesson today! When is our next session?",
      time: "10:35 AM",
      avatar: "SJ"
    },
    {
      id: 4,
      sender: "tutor",
      content: "Our next session is scheduled for Friday at 2 PM. I'll send you some additional practice materials before then.",
      time: "10:37 AM"
    }
  ];

  const stats = [
    { label: "Total Students", value: "24", change: "+3 this month", color: "text-blue-600" },
    { label: "Hours Taught", value: "156", change: "+12 this week", color: "text-green-600" },
    { label: "Earnings", value: "$2,340", change: "+$280 this month", color: "text-purple-600" },
    { label: "Rating", value: "4.9", change: "98% positive", color: "text-yellow-600" }
  ];

  const upcomingLessons = [
    {
      student: "Sarah Johnson",
      subject: "Spanish",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      avatar: "SJ"
    },
    {
      student: "Michael Chen", 
      subject: "Mathematics",
      time: "4:30 PM - 5:30 PM",
      date: "Today",
      avatar: "MC"
    },
    {
      student: "Emma Rodriguez",
      subject: "French", 
      time: "10:00 AM - 11:00 AM",
      date: "Tomorrow",
      avatar: "ER"
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
    }
  };

  return ( 
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600">Welcome back! Here's your teaching overview.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Lessons */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Lessons</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {upcomingLessons.map((lesson, index) => (
                      <div key={index} className="p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                            {lesson.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{lesson.student}</p>
                            <p className="text-sm text-gray-600">{lesson.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{lesson.time}</p>
                          <p className="text-sm text-gray-600">{lesson.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
                <div className="flex h-full">
                  {/* Chat List */}
                  <div className="w-1/3 border-r border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                    </div>
                    <div className="overflow-y-auto h-full">
                      {conversations.map((conversation, index) => (
                        <div
                          key={conversation.id}
                          onClick={() => setSelectedChat(index)}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                            selectedChat === index ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                {conversation.avatar}
                              </div>
                              {conversation.online && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {conversation.studentName}
                                </p>
                                <p className="text-xs text-gray-500">{conversation.time}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 truncate">
                                  {conversation.lastMessage}
                                </p>
                                {conversation.unread > 0 && (
                                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                    {conversation.unread}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{conversation.subject}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Window */}
                  <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                            {conversations[selectedChat].avatar}
                          </div>
                          {conversations[selectedChat].online && (
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{conversations[selectedChat].studentName}</p>
                          <p className="text-sm text-gray-600">
                            {conversations[selectedChat].online ? 'Online' : 'Last seen 2 hours ago'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Video className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'tutor' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                            message.sender === 'tutor' ? 'flex-row-reverse' : 'flex-row'
                          }`}>
                            {message.sender === 'student' && (
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-medium">
                                {message.avatar}
                              </div>
                            )}
                            <div className={`px-4 py-2 rounded-2xl ${
                              message.sender === 'tutor'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs can be implemented similarly */}
            {activeTab !== 'dashboard' && activeTab !== 'messages' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <p className="text-gray-600">This section is under development.</p>
              </div>
            )}
          </div>
      
 
  );
};

export default TutorDashboard;