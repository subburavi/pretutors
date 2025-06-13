"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { APIURL } from "../../../ApiUrl";

export default function PaymentFailed() {
  const router = useRouter();
  const [lessonId, setLessonId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [lessonDetails, setLessonDetails] = useState(null);
  const [error, setError] = useState("");
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Get parameters from URL query params
    const params = new URLSearchParams(window.location.search);
    const id = params.get("lessonId");
    const session = params.get("session_id");
    const errorCode = params.get("error");
    const errorMessage = params.get("error_description");
    
    setLessonId(id);
    setSessionId(session);
    
    // Set error message based on payment gateway response
    if (errorCode) {
      switch (errorCode) {
        case 'card_declined':
          setError("Your card was declined. Please try a different payment method.");
          break;
        case 'insufficient_funds':
          setError("Insufficient funds. Please check your account balance or try another card.");
          break;
        case 'expired_card':
          setError("Your card has expired. Please use a valid card.");
          break;
        case 'payment_timeout':
          setError("Payment timed out. Please try again.");
          break;
        case 'processing_error':
          setError("Payment processing error. Please try again or contact support.");
          break;
        default:
          setError(errorMessage || "Payment failed. Please try again.");
      }
    } else {
      setError("Payment was not completed successfully.");
    }
    
    setMessage("We're sorry, but your payment could not be processed at this time.");
  }, []);

  useEffect(() => {
    if (!lessonId) {
      setLoading(false);
      return;
    }

    const updateFailedStatus = async () => {
      try {
        // Update lesson status to failed and get lesson details
        const response = await axios.post(APIURL + "update-lesson-status", {
          lessonId,
          sessionId,
          status: "failed",
          paymentStatus: "failed"
        });

        // Get lesson details for retry
        if (response.data.lesson) {
          setLessonDetails(response.data.lesson);
        }

     
      } catch (error) {
        console.error("Failed to update payment status:", error);
      } finally {
        setLoading(false);
      }
    };

    updateFailedStatus();
  }, [lessonId, sessionId, error]);

  const handleRetryPayment = async () => {
    if (!lessonId || retryAttempts >= 3) return;
    
    setIsRetrying(true);
    
    try {
      // Create new payment session for retry
      const response = await axios.post(APIURL + "create-payment-session", {
        lessonId,
        retryAttempt: retryAttempts + 1
      });

      if (response.data.paymentUrl) {
        setRetryAttempts(prev => prev + 1);
        // Redirect to payment gateway
        window.location.href = response.data.paymentUrl;
      } else {
        throw new Error("Failed to create payment session");
      }
    } catch (error) {
      console.error("Retry payment error:", error);
      setError("Unable to retry payment. Please contact support.");
    } finally {
      setIsRetrying(false);
    }
  };

  const handleManualRedirect = (path) => {
    router.push(path);
  };

  const handleBookLater = () => {
    // Clear the failed booking and redirect to booking page
    router.push("/book-lesson");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-xl">Processing payment status...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Failed State */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
          <p className="text-gray-700 mb-2">{message}</p>
          <p className="text-sm text-red-600">{error}</p>
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
              <p><span className="font-medium">Amount:</span> ${lessonDetails.amount}</p>
            </div>
          </div>
        )} */}

        {/* Booking Reference */}
        {lessonId && (
          <div className="bg-yellow-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Booking Reference:</span> {lessonId}
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              Your slot is temporarily reserved
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Retry Payment Button */}
       

          {/* Maximum retry attempts reached */}
          {retryAttempts >= 3 && (
            <div className="bg-red-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-red-800">
                Maximum retry attempts reached. Please contact support or try booking again later.
              </p>
            </div>
          )}

       

          {/* Secondary Actions */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleManualRedirect("/support")}
              className="flex-1 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => handleManualRedirect("/dashboard")}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Dashboard
            </button>
          </div>

          <button
            onClick={() => handleManualRedirect("/")}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
        </div>

        {/* Help Information */}
        <div className="mt-6 text-xs text-gray-500">
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <h4 className="font-medium text-blue-800 mb-1">Common Payment Issues:</h4>
            <ul className="text-blue-700 text-left space-y-1">
              <li>• Check your card details and expiry date</li>
              <li>• Ensure sufficient funds are available</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if issues persist</li>
            </ul>
          </div>
          <p>Need immediate help? <a href="/support" className="text-blue-600 hover:underline">Contact our support team</a></p>
          <p className="mt-1">Or call us at: <span className="font-medium">1-800-TUTORING</span></p>
        </div>
      </div>
    </div>
  );
}