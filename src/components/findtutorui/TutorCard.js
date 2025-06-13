// 1. TutorCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Star, Clock, MapPin, Heart, Video, Play } from 'lucide-react';
import Link from 'next/link';

const TutorCard = ({ 
  tutor, 
  favorites, 
  onToggleFavorite, 
  onOpenVideoModal, 
  onOpenChat 
}) => {
    const [thumbnail, setThumbnail] = useState(null);
const videoRef = useRef(null);
const canvasRef = useRef(null);
useEffect(() => {
  if (tutor.video_intro) {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = tutor.video_intro;
    video.currentTime = 1;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg");
      setThumbnail(imageUrl);
    });
  }
}, [tutor.video_intro]);
console.log(thumbnail)
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Video Preview Thumbnail */}
      {tutor.video_intro && (
        <div className="relative group cursor-pointer" onClick={() => onOpenVideoModal(tutor)}>
          <img
  src={thumbnail || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=225&fit=crop"}
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
              <Link href={`/profile/${tutor.user_id}`}>
                <h3 className="font-semibold text-lg text-gray-900">{tutor.name}</h3>
              </Link>
              <p className="text-blue-600 font-medium">
                {tutor.subjects?.join(', ') || 'General Tutor'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggleFavorite(tutor.id)}
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
            <button 
              onClick={() => onOpenChat(tutor)}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Message
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
