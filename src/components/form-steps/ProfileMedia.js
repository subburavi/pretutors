import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, X } from 'lucide-react';
import FormError from '../ui/FormError';
import { deleteFile, uploadFile } from '@/lib/firebaseUtils';

const ProfileMedia = ({ formData, handleInputChange, errors }) => {
  const [photoPreview, setPhotoPreview] = useState(formData.profile_image || null);
  const [videoPreview, setVideoPreview] = useState(formData.video_intro || null);
  const [photoPath, setPhotoPath] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024 || !file.type.startsWith('image/')) {
      alert('Invalid photo file');
      return;
    }

    try {
      setPhotoUploading(true);
      const path = `profile_photos/${Date.now()}_${file.name}`;
      const { downloadURL, path: uploadedPath } = await uploadFile(file, path);
      setPhotoPreview(downloadURL);
      setPhotoPath(uploadedPath);
      handleInputChange('profile_image', downloadURL);
    } catch (err) {
      console.error('Photo upload error:', err);
      alert('Failed to upload photo.');
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024 || !file.type.startsWith('video/')) {
      alert('Invalid video file');
      return;
    }

    try {
      setVideoUploading(true);
      const path = `intro_videos/${Date.now()}_${file.name}`;
      const { downloadURL, path: uploadedPath } = await uploadFile(file, path);
      setVideoPreview(downloadURL);
      setVideoPath(uploadedPath);
      handleInputChange('video_intro', downloadURL);
    } catch (err) {
      console.error('Video upload error:', err);
      alert('Failed to upload video.');
    } finally {
      setVideoUploading(false);
    }
  };

  const removePhoto = async () => {
    if (photoPath) await deleteFile(photoPath);
    setPhotoPreview(null);
    setPhotoPath(null);
    handleInputChange('profile_image', null);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const removeVideo = async () => {
    if (videoPath) await deleteFile(videoPath);
    setVideoPreview(null);
    setVideoPath(null);
    handleInputChange('video_intro', null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  useEffect(() => {
    return () => {
      if (!formData.saved) {
        if (photoPath) deleteFile(photoPath);
        if (videoPath) deleteFile(videoPath);
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Your Profile</h3>
        <p className="text-gray-600">Your profile is what students see first. Make it engaging and professional!</p>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Profile Photo *</label>
          {photoPreview ? (
            <div className="relative w-48 h-48 mx-auto">
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-gradient-to-b from-blue-50 to-white">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium mb-2">Upload a professional photo</p>
              <p className="text-sm text-gray-500 mb-4">Clear headshot, good lighting, professional appearance</p>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <button
                onClick={() => photoInputRef.current?.click()}
                disabled={photoUploading}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg ${photoUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {photoUploading ? 'Uploading...' : 'Choose Photo'}
              </button>
            </div>
          )}
          {errors.photo && <FormError message={errors.photo} />}
        </div>

        {/* Intro Video */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">Introduction Video *</label>
          {videoPreview ? (
            <div className="relative max-w-2xl mx-auto">
              <video
                src={videoPreview}
                controls
                className="w-full rounded-lg shadow-lg"
              />
              <button
                onClick={removeVideo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors bg-gradient-to-b from-purple-50 to-white">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-10 h-10 text-purple-600" />
              </div>
              <p className="text-gray-700 font-medium mb-2">Upload a 2-3 minute introduction video</p>
              <p className="text-sm text-gray-500 mb-4">Introduce yourself, your teaching style, and what makes you unique</p>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
              <button
                onClick={() => videoInputRef.current?.click()}
                disabled={videoUploading}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg ${videoUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {videoUploading ? 'Uploading...' : 'Choose Video'}
              </button>
            </div>
          )}
          {errors.video && <FormError message={errors.video} />}
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Professional Headline *</label>
          <input
            type="text"
            value={formData.headline || ''}
            onChange={(e) => handleInputChange('headline', e.target.value)}
            className={`w-full px-4 py-3 border-2 ${errors.headline ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="e.g., Experienced English Teacher with 5+ Years of Online Teaching"
            maxLength={80}
          />
          <p className="text-sm text-gray-500">{formData.headline?.length || 0}/80 characters</p>
          {errors.headline && <FormError message={errors.headline} />}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Profile Description *</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={8}
            className={`w-full px-4 py-3 border-2 ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Tell students about your teaching philosophy, experience, methods, and what makes your lessons special. Be personal and engaging!"
            maxLength={1500}
          />
          <p className="text-sm text-gray-500">{formData.description?.length || 0}/1500 characters</p>
          {errors.description && <FormError message={errors.description} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileMedia;
