'use client';
import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen,
  Save,
  Calendar,
  Edit,
  Camera,
  Shield,
  Bell,
  DollarSign
} from 'lucide-react';
import AvailabilityForm from '@/components/ui/AvailabilityForm';

const TutorSettings = () => {
  const [activeTab, setActiveTab] = useState('availability');
  const [personalDetails, setPersonalDetails] = useState({
    fullName: 'Subbu Reddy',
    email: 'subbu.reddy@gmail.com',
    phone: '+91 9876543210',
    location: 'Hyderabad, Telangana',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    experience: '5 years',
    qualification: 'M.Sc. Mathematics',
    hourlyRate: '500',
    bio: 'Experienced tutor with 5+ years in teaching Mathematics and Science subjects. Passionate about helping students achieve their academic goals.'
  });

  const [availability, setAvailability] = useState({
    Sunday: { enable: false, start_time: '09:00', end_time: '17:00' },
    Monday: { enable: true, start_time: '09:00', end_time: '17:00' },
    Tuesday: { enable: true, start_time: '09:00', end_time: '17:00' },
    Wednesday: { enable: true, start_time: '09:00', end_time: '17:00' },
    Thursday: { enable: true, start_time: '09:00', end_time: '17:00' },
    Friday: { enable: true, start_time: '09:00', end_time: '17:00' },
    Saturday: { enable: true, start_time: '10:00', end_time: '16:00' }
  });

  const [notifications, setNotifications] = useState({
    newBookings: true,
    classReminders: true,
    paymentUpdates: true,
    weeklyReports: false
  });

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting, value) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const saveSettings = () => {
    // Here you would save to your backend
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-gray-50 p-4" style={{width:"100%"}}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your profile, availability, and preferences</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Availability Tab */}
            {activeTab === 'availability' && (
            <AvailabilityForm initialAvailability={availability}/>
            )}

            {/* Personal Details Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <p className="text-gray-600 mb-6">Update your profile information and teaching details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={personalDetails.fullName}
                      onChange={(e) => handlePersonalDetailsChange('fullName', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={personalDetails.email}
                      onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={personalDetails.phone}
                      onChange={(e) => handlePersonalDetailsChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={personalDetails.location}
                      onChange={(e) => handlePersonalDetailsChange('location', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teaching Experience
                    </label>
                    <input
                      type="text"
                      value={personalDetails.experience}
                      onChange={(e) => handlePersonalDetailsChange('experience', e.target.value)}
                      placeholder="e.g., 5 years"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={personalDetails.qualification}
                      onChange={(e) => handlePersonalDetailsChange('qualification', e.target.value)}
                      placeholder="e.g., M.Sc. Mathematics"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={personalDetails.hourlyRate}
                      onChange={(e) => handlePersonalDetailsChange('hourlyRate', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjects (comma separated)
                    </label>
                    <input
                      type="text"
                      value={personalDetails.subjects.join(', ')}
                      onChange={(e) => handlePersonalDetailsChange('subjects', e.target.value.split(', '))}
                      placeholder="Mathematics, Physics, Chemistry"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={personalDetails.bio}
                    onChange={(e) => handlePersonalDetailsChange('bio', e.target.value)}
                    rows={4}
                    placeholder="Tell students about your teaching experience and approach..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <p className="text-gray-600 mb-6">Choose what notifications you'd like to receive</p>
                </div>

                <div className="space-y-4">
                  {Object.entries({
                    newBookings: 'New booking requests',
                    classReminders: 'Class reminders (15 min before)',
                    paymentUpdates: 'Payment and earnings updates',
                    weeklyReports: 'Weekly performance reports'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{label}</h4>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[key]}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            {/* <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                onClick={saveSettings}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSettings;