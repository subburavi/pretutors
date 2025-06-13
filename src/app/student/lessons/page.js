'use client';
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle, 
  RotateCcw, 
  X, 
  Star, 
  Download, 
  Search,
  Filter,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import axios from 'axios';
import { APIURL } from '../../../../ApiUrl';
import { useSelector } from 'react-redux';

const MyLessonsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(APIURL + 'student/lessons/' + user.id);
        const data = Object.values(response.data);
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [user.id]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  const isWithinJoinWindow = (start_time) => {
    const now = new Date();
    const lessonStart = new Date(start_time);
    const minutesDiff = (lessonStart.getTime() - now.getTime()) / (1000 * 60);
    return minutesDiff <= 10 && minutesDiff >= -30;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filterLessonsByTab = (lessons, tab) => {
    const now = new Date();
    switch (tab) {
      case 'upcoming':
        return lessons.filter(lesson => lesson.status === 'upcoming' && new Date(lesson.start_time) > now);
      case 'past':
        return lessons.filter(lesson => lesson.status === 'completed' || (new Date(lesson.start_time) < now && lesson.status !== 'pending'));
      case 'requests':
        return lessons.filter(lesson => lesson.status === 'pending');
      default:
        return lessons;
    }
  };

  const filteredLessons = filterLessonsByTab(lessons, activeTab).filter(lesson =>
    lesson.tutor_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinLesson = (meetingLink) => window.open(meetingLink, '_blank');

  const handleReschedule = (lessonId) => console.log('Reschedule lesson:', lessonId);

  const handleCancel = (lessonId) => console.log('Cancel lesson:', lessonId);

  const LessonCard = ({ lesson }) => {
    const { date, time } = formatDateTime(lesson.start_time);
    const canJoin = isWithinJoinWindow(lesson.start_time);
    return (
      <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {lesson.tutor_full_name.slice(0, 2)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{lesson.tutor_full_name}</h3>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-medium text-blue-600">{lesson.subject}</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" /><span>{date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" /><span>{time}</span>
                </div>
              </div>
              {lesson.notes && (
                <p className="text-xs text-gray-500 mt-1 truncate">{lesson.notes}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getStatusColor(lesson.status)}`}>
              {getStatusIcon(lesson.status)}
              <span className="capitalize hidden sm:inline">{lesson.status}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">${lesson.price}</div>
              <div className="text-xs text-gray-500">30 min</div>
            </div>
            <div className="flex items-center space-x-1">
              {lesson.status === 'pending' && (
                <button onClick={() => handleCancel(lesson.id)} className="px-3 py-2 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
              )}
              {lesson.status === 'upcoming' && canJoin && (
                <button onClick={() => handleJoinLesson(lesson.meeting_url)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-1 font-medium text-sm animate-pulse">
                  <Video className="w-4 h-4" /><span>Join</span>
                </button>
              )}
              {lesson.status === 'upcoming' && !canJoin && (
                <button onClick={() => handleReschedule(lesson.id)} className="px-3 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600">Reschedule</button>
              )}
              {lesson.status === 'completed' && (
                <button className="px-3 py-2 text-xs bg-purple-500 text-white rounded-lg hover:bg-purple-600">Review</button>
              )}
              {lesson.status === 'cancelled' && (
                <button className="px-3 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600">Book Again</button>
              )}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 rounded-xl bg-white shadow p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>My Lessons</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage your learning sessions</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Updated just now</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by tutor name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="bg-gray-50 p-1 rounded-lg inline-flex">
          {['upcoming', 'past', 'requests'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
              }`}>
                {filterLessonsByTab(lessons, tab).length}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
              <p className="text-gray-600">
                {activeTab === 'upcoming' && "You don't have any upcoming lessons scheduled."}
                {activeTab === 'past' && "You haven't completed any lessons yet."}
                {activeTab === 'requests' && "You don't have any pending lesson requests."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLessonsPage;