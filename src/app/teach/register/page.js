"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
 import { Mail, Phone, Globe, MapPin } from "lucide-react";
 import { login } from "@/store/slices/authSlice";
import FormError from "@/components/ui/FormError";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { APIURL } from "../../../../ApiUrl";

 
const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    gender: "",
    dateOfBirth: "",
    password:"",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
     if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(`${APIURL}registertutor`, formData);

      if (response.data.status === "success") {
        dispatch(login({ user: {...response.data.user}, token: response.data.token }));

        if (response.data.user.role === "student") {
          router.push("/student");
        } else {
          router.push("/tutor");
        }
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
             <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to TutorHub!</h3>
        <p className="text-gray-600">
          Let's start by getting to know you better. This information helps us create your tutor profile.
        </p>
      </div>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.firstName ? "border-red-300 bg-red-50" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <FormError message={errors.firstName} />}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.lastName ? "border-red-300 bg-red-50" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <FormError message={errors.lastName} />}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <FormError message={errors.email} />}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${
                errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && <FormError message={errors.phone} />}
        </div>
      </div>

      {/* Country, City, Gender */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Country */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Country *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${
                errors.country ? "border-red-300 bg-red-50" : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none`}
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="BR">Brazil</option>
              <option value="IN">India</option>
            </select>
          </div>
          {errors.country && <FormError message={errors.country} />}
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">City *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 ${
                errors.city ? "border-red-300 bg-red-50" : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="Enter your city"
            />
          </div>
          {errors.city && <FormError message={errors.city} />}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* DOB */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Date of Birth *</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className={`w-full px-4 py-3 border-2 ${
            errors.dateOfBirth ? "border-red-300 bg-red-50" : "border-gray-200"
          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
        />
        {errors.dateOfBirth && <FormError message={errors.dateOfBirth} />}
      </div>
<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Password *</label>
  <input
    type="password"
    value={formData.password}
    onChange={(e) => handleInputChange("password", e.target.value)}
    className={`w-full px-4 py-3 border-2 ${
      errors.password ? "border-red-300 bg-red-50" : "border-gray-200"
    } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
    placeholder="Enter a secure password"
  />
  {errors.password && <FormError message={errors.password} />}
</div>
      {/* Submit Button */}
      <div className="pt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all w-full md:w-auto"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>
<Footer/>
      </>
  );
};

export default Register;
