"use client";
import React, { use, useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { APIURL } from '../../ApiUrl';
import axios from 'axios';
import { Alert } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
 
export default function AuthModal({isOpen, setIsOpen}) {
 const dispatch=useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage,setErrorMessage]=useState("");
    const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage(""); // Clear previous error

  const {
    email, password, confirmPassword,
    firstName, lastName, acceptTerms
  } = formData;

  // Validation
  if (!email || !password || (isSignUp && (!firstName || !lastName || !confirmPassword || !acceptTerms))) {
    setErrorMessage("⚠️ Please fill in all required fields.");
    return;
  }

  if (isSignUp && password !== confirmPassword) {
    setErrorMessage("🚫 Passwords do not match.");
    return;
  }

  try {
    const url = `${APIURL}${isSignUp ? 'register' : 'login'}`;
    const payload = isSignUp
      ? { firstName, lastName, email, password,name:firstName+' '+lastName }
      : { email, password };

    const response = await axios.post(url, payload);
 if(response.data.status=='success'){
    
   dispatch(login({user:response.data.user,token:response.data.token}));
   if(response.data.user.role=='student'){
router.push('/student');
   }else{
router.push('/tutor');
   }
       
   }
     setIsOpen(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      acceptTerms: false
    });
  } catch (error) {
    console.log(error)
     setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
  }
};

const handleGoogleSignIn = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
     const payload = {
      googleId: user.uid,
      name: user.displayName,
      email: user.email,
      avathar:user.photoURL
    };

    const response = await axios.post(`${APIURL}googleauthverify`, payload);

    if(response.data.status=='success'){
    
   dispatch(login({user:response.data.user,token:response.data.token}));
   if(response.data.user.role=='student'){
router.push('/student');
   }else{
router.push('/tutor');
   }
       
   }
    // Store token / user if needed
     setIsOpen(false);

  } catch (error) {
    console.error('❌ Google Sign-In Error:', error);
    alert('Something went wrong during Google sign-in.');
  }
};


  if (!isOpen) {
    return ( <></>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl w-full max-w-md relative transform transition-all duration-300 scale-100 animate-in fade-in">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {isSignUp ? 'Join the Future' : 'Welcome Back'}
            </h2>
            <p className="text-gray-700/80">
              {isSignUp 
                ? '✨ Create your account to start your amazing journey' 
                : '🚀 Sign in to continue your adventure'
              }
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:from-white/90 hover:to-white/80 transition-all duration-300 mb-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-800 font-semibold">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-purple-200 via-pink-200 to-indigo-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/90 text-gray-600 font-medium">or continue with email</span>
            </div>
          </div>
            {errorMessage!="" && <div className="mb-4 px-4 py-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm font-medium shadow-sm">{errorMessage}</div>}

          {/* Form */}
          <div className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/90 outline-none transition-all duration-300 placeholder-gray-500"
                    required={isSignUp}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/90 outline-none transition-all duration-300 placeholder-gray-500"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="✉️ Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/90 outline-none transition-all duration-300 placeholder-gray-500"
                required
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="🔒 Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 pr-14 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/90 outline-none transition-all duration-300 placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isSignUp && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="🔐 Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 pr-14 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/90 outline-none transition-all duration-300 placeholder-gray-500"
                  required={isSignUp}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {isSignUp && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-purple-600 bg-white/70 border-white/30 rounded focus:ring-purple-500/50 focus:ring-2"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700/90">
                  I agree to the{' '}
                  <a href="#" className="text-purple-600 hover:text-pink-600 font-medium transition-colors">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-600 hover:text-pink-600 font-medium transition-colors">Privacy Policy</a>
                </label>
              </div>
            )}

            {!isSignUp && (
              <div className="text-right">
                <a href="#" className="text-sm text-purple-600 hover:text-pink-600 font-medium transition-colors">
                  Forgot your password? 🤔
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
            >
              {isSignUp ? '🚀 Create Account' : '✨ Sign In'}
            </button>
          </div>

          {/* Toggle between sign in/up */}
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-700/80">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 hover:text-pink-600 font-bold transition-colors duration-200"
              >
                {isSignUp ? '✨ Sign in' : '🚀 Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}