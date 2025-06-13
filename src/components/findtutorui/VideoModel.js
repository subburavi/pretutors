// 7. VideoModal.jsx
import React from 'react';
import { Star, Clock } from 'lucide-react';

const VideoModal = ({ 
  isOpen, 
  tutor, 
  onClose, 
  onOpenChat 
}) => {
  if (!isOpen || !tutor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">
            Video Introduction - {tutor.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-4">
          {/* Video placeholder - replace with actual video player */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
            {tutor.video_intro ? (
              <video controls className="w-full h-64 md:h-96">
                <source src={tutor.video_intro} type="video/mp4" />
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
                {tutor.subjects?.join(', ') || 'General'} Tutor
              </h4>
              <p className="text-gray-600 mb-4">
                {tutor.description || 'Experienced tutor with a passion for teaching.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects?.map(subject => (
                  <span key={subject} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="md:w-64">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ${tutor.hourly_rate || '30'}/hour
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{tutor.average_rating || '4.5'} ({tutor.rating_count || '0'} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{tutor.timezone || 'Flexible schedule'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Book Session
                  </button>
                  <button 
                    onClick={() => onOpenChat(tutor)}
                    className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;