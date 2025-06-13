"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { APIURL } from "../../../ApiUrl";

export default function PaymentSuccess() {
  const router = useRouter();
  const [lessonId, setLessonId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [lessonDetails, setLessonDetails] = useState(null);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Get parameters from URL query params
    const params = new URLSearchParams(window.location.search);
    const id = params.get("lessonId");
    const session = params.get("session_id");
    
    setLessonId(id);
    setSessionId(session);
    
    // Validate required parameters
    if (!id) {
      setError(true);
      setMessage("Invalid booking reference. Please contact support.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!lessonId) return;

    const updateStatus = async () => {
      try {
        // Update lesson status and get lesson details
        const response = await axios.post(APIURL + "update-lesson-status", {
          lessonId,
          sessionId,
          status: "upcoming",
          paymentStatus: "completed"
        });

        // Assuming the API returns lesson details
        if (response.data.lesson) {
          setLessonDetails(response.data.lesson);
        }

        setMessage("Payment successful! Your lesson slot has been booked.");
        
        // Send confirmation email (optional API call)
        try {
          await axios.post(APIURL + "send-booking-confirmation", {
            lessonId,
            sessionId
          });
        } catch (emailError) {
          console.warn("Failed to send confirmation email:", emailError);
        }

      } catch (error) {
        console.error("Payment processing error:", error);
        setError(true);
        
        if (error.response?.status === 404) {
          setMessage("Lesson not found. Please contact support with your booking reference.");
        } else if (error.response?.status === 409) {
          setMessage("This lesson has already been processed. Check your bookings.");
        } else {
          setMessage("Failed to confirm your booking. Please contact support immediately.");
        }
      } finally {
        setLoading(false);
      }
    };

    updateStatus();
  }, [lessonId, sessionId]);

  // Countdown for automatic redirect
  useEffect(() => {
    if (!loading && !error && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !error) {
      router.push("/student/lessons");
    }
  }, [countdown, loading, error, router]);

  const handleManualRedirect = (path) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-xl">Processing your payment...</p>
          <p className="text-gray-500 text-sm mt-2">Please don't close this window</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {error ? (
          <>
            {/* Error State */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-red-600 mb-2">Booking Error</h1>
              <p className="text-gray-700">{message}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleManualRedirect("/support")}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => handleManualRedirect("/")}
                className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Success!</h1>
              <p className="text-gray-700 mb-4">{message}</p>
            </div>

            {/* Lesson Details */}
            {/* {lessonDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Booking Details:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Subject:</span> {lessonDetails.subject}</p>
                  <p><span className="font-medium">Tutor:</span> {lessonDetails.tutorName}</p>
                  <p><span className="font-medium">Date:</span> {lessonDetails.date}</p>
                  <p><span className="font-medium">Time:</span> {lessonDetails.time}</p>
                  <p><span className="font-medium">Duration:</span> {lessonDetails.duration} minutes</p>
                </div>
              </div>
            )} */}

            {/* Booking Reference */}
            <div className="bg-blue-50 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Booking Reference:</span> {lessonId}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Save this reference for your records
              </p>
            </div>

            {/* Auto-redirect countdown */}
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to your lessons in {countdown} seconds...
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleManualRedirect("/student/lessons")}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View My Lessons
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleManualRedirect("/student")}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleManualRedirect("/")}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Home
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-xs text-gray-500">
              <p>A confirmation email has been sent to your registered email address.</p>
              <p className="mt-1">Need help? <a href="/support" className="text-blue-600 hover:underline">Contact Support</a></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}