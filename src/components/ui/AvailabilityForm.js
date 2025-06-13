'use client';

import { useEffect, useState } from 'react';
import { Clock, Save } from 'lucide-react';
import axios from 'axios';
import { APIURL } from '../../../ApiUrl';
import { useSelector } from 'react-redux';

const AvailabilityForm = ({ initialAvailability, onSave }) => {
  const [availability, setAvailability] = useState(initialAvailability);
  const user = useSelector((state) => state.auth.user);
 const [success,setSuccess]=useState(false);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
        day
      },
    }));
  };
useEffect(() => {
  const fetchAvailability = async () => {
    try {
      const tutor_id = user.id;
      const res = await axios.get(`${APIURL}availability/${tutor_id}`);
      console.log(res.data.availability);
      setAvailability(res.data.availability);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  fetchAvailability();
}, []);


  const submitAvailability = async () => {
    try {
      await axios.post(APIURL+'addavailability', {availability,tutor_id:user.id}); // Adjust API endpoint accordingly
      onSave?.();
     setSuccess(true)
    } catch (err) {
      console.error(err);
      alert('Failed to save availability');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Availability</h3>
        <p className="text-gray-600 mb-6">Set your available hours for each day of the week</p>
      </div>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="w-25">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={availability[day].enable}
                  onChange={(e) => handleAvailabilityChange(day, 'enable', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`font-medium ${
                    availability[day].enabled ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {day}
                </span>
              </label>
            </div>

            {availability[day].enable ? (
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">From</span>
                  <input
                    type="time"
                    value={availability[day].start_time}
                    onChange={(e) => handleAvailabilityChange(day, 'start_time', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">To</span>
                  <input
                    type="time"
                    value={availability[day].end_time}
                    onChange={(e) => handleAvailabilityChange(day, 'end_time', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="text-sm text-gray-500 ml-auto">
                  {(() => {
                    const start = availability[day].start_time.split(':');
                    const end = availability[day].end_time.split(':');
                    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
                    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
                    const totalHours = Math.max(0, (endMinutes - startMinutes) / 60);
                    return `${totalHours.toFixed(1)} hours`;
                  })()}
                </div>
              </div>
            ) : (
              <div className="flex-1 text-gray-400 text-sm">Not available</div>
            )}
          </div>
        ))}
      </div>
{success && (
  <div className="mt-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 shadow-sm">
    ✅ Profile availability updated successfully!
  </div>
)}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={submitAvailability}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Availability</span>
        </button>
      </div>
    </div>
  );
};

export default AvailabilityForm;