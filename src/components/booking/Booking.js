"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, MessageCircle } from "lucide-react";
import axios from "axios";
import { APIURL } from "../../../ApiUrl";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { openChat } from "@/store/slices/chatSlice";

const stripePromise = loadStripe('pk_test_W8TGOmnhOD0tQ7oOiIaOxi5A00fWWxURpJ');

const TutorBooking = ({ tutor }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
const dispatch=useDispatch();
  // Fetch available slots on date or tutor change
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const res = await axios.post(APIURL+"availability", {
          tutorId: tutor.user_id,
          date: dateStr,
        });
        setAvailableSlots(res.data.available_slots);
        setSelectedTimeSlot(null); // reset selected slot on date change
      } catch (error) {
        console.error("Error fetching slots", error);
        setAvailableSlots([]);
      }
      setLoading(false);
    };
    fetchSlots();
  }, [selectedDate, tutor.id]);

  // Get dates of current week view
  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + weekOffset * 7 - today.getDay()); // Sunday as start

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if a slot time is in the past for today
  const isPastSlot = (slotTime) => {
    if (!isToday(selectedDate)) return false;
    const now = new Date();
    const [hour, minute] = slotTime.split(":").map(Number);
    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(hour, minute, 0, 0);
    return slotDateTime < now;
  };
function formatDateTime24(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0"); // 24-hour
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = "00"; // if you want seconds

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  // Booking function
const handleBooking = async () => {
  if (!selectedTimeSlot) return alert("Please select a time slot");

  try {
    const dateStr = selectedDate.toISOString().slice(0, 10);
    const [hour, minute] = selectedTimeSlot.split(":").map(Number);

    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(hour, minute, 0, 0);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    // Format times in 24-hour format without timezone
    const start_time = formatDateTime24(startDateTime);
    const end_time = formatDateTime24(endDateTime);

    const response = await axios.post(APIURL + "create-checkout-session", {
      tutor_id: tutor.user_id,
      student_id: user.id,
      start_time,
      end_time,
      price: tutor.trial_rate,
      lesson_date: dateStr,
      meeting_url: "" ,// backend can generate or update later
      selectedDate
    });

    const { url } = response.data;
    window.location.href = url;

  } catch (error) {
    console.error("Booking failed", error);
    alert("Failed to book lesson. Try again.");
  }
};

  return (
    <div className="sticky top-8 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Pricing Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
        <div className="text-3xl font-bold mb-1">
          ${tutor.hourly_rate}
          <span className="text-lg font-normal opacity-90">/hour</span>
        </div>
        <p className="text-blue-100">Trial lesson: ${tutor.trial_rate}</p>
      </div>

      <div className="p-6">
        {/* Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Select Date
            </h3>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`p-3 text-xs rounded-xl transition-all ${
                  selectedDate.toDateString() === date.toDateString()
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : isToday(date)
                    ? "bg-blue-50 text-blue-600 font-medium border border-blue-200"
                    : "hover:bg-gray-50 border border-gray-100"
                }`}
              >
                <div className="font-bold">{date.getDate()}</div>
                <div className="opacity-75">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Available Times
          </h3>

          {loading ? (
            <div className="text-center text-gray-500">Loading slots...</div>
          ) : (
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {availableSlots.length === 0 && (
                <p className="col-span-3 text-center text-gray-500">No slots available</p>
              )}
              {availableSlots.map(({ time, is_available }) => {
                const disabled = !is_available || isPastSlot(time);
                const selected = selectedTimeSlot === time;
                return (
                  <button
                    key={time}
                    onClick={() => !disabled && setSelectedTimeSlot(time)}
                    disabled={disabled}
                    className={`p-3 text-sm rounded-xl border transition-all ${
                      selected
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white border-transparent shadow-lg scale-105"
                        : disabled
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-900"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Booking Buttons */}
        <div className="space-y-3">
          <button
            disabled={!selectedTimeSlot}
            onClick={handleBooking}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all transform hover:scale-105 shadow-lg"
          >
            Book Trial Lesson - ${tutor.trial_rate}
          </button>
          <button  onClick={() =>
                  dispatch(openChat({ id: tutor.user_id, name: tutor.name, avatar: 'SJ', online: true }))
                } className="w-full py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Send Message
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
          <div className="text-xs text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Cancel up to 4 hours before lesson
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Full refund or reschedule available
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Responds {tutor.response_time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorBooking;
