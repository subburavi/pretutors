import { useState } from 'react';
import { APIURL } from '../../ApiUrl';
import axios from 'axios';

const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when it's changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
    
    // Clear error for this field when it's changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    // Common validation logic based on step
    switch (step) {
    //   case 0: // Personal Information
    //     if (!formData.firstName.trim()) {
    //       newErrors.firstName = 'First name is required';
    //       isValid = false;
    //     }
    //     if (!formData.lastName.trim()) {
    //       newErrors.lastName = 'Last name is required';
    //       isValid = false;
    //     }
    //     if (!formData.email.trim()) {
    //       newErrors.email = 'Email is required';
    //       isValid = false;
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //       newErrors.email = 'Email is invalid';
    //       isValid = false;
    //     }
    //     if (!formData.phone.trim()) {
    //       newErrors.phone = 'Phone number is required';
    //       isValid = false;
    //     }
    //     if (!formData.country) {
    //       newErrors.country = 'Country is required';
    //       isValid = false;
    //     }
    //     if (!formData.city.trim()) {
    //       newErrors.city = 'City is required';
    //       isValid = false;
    //     }
    //     if (!formData.dateOfBirth) {
    //       newErrors.dateOfBirth = 'Date of birth is required';
    //       isValid = false;
    //     }
    //     break;
      
      case 0: // Languages & Subjects
        if (formData.subjects.length === 0) {
          newErrors.subjects = 'Select at least one subject';
          isValid = false;
        }
        if (formData.languages.length === 0) {
          newErrors.languages = 'Select at least one language';
          isValid = false;
        }
        if (formData.nativeLanguages.length === 0) {
          newErrors.nativeLanguages = 'Select at least one native language';
          isValid = false;
        }
        break;
      
      case 1: // Education & Experience
        if (!formData.teachingExperience) {
          newErrors.teachingExperience = 'Teaching experience is required';
          isValid = false;
        }
        if (!formData.education.trim()) {
          newErrors.education = 'Education background is required';
          isValid = false;
        }
        if (!formData.motivationForTeaching.trim()) {
          newErrors.motivationForTeaching = 'Motivation is required';
          isValid = false;
        }
        break;
      
      case 2: // Teaching Approach
        if (!formData.teachingStyle) {
          newErrors.teachingStyle = 'Select a teaching style';
          isValid = false;
        }
        if (formData.ageGroups.length === 0) {
          newErrors.ageGroups = 'Select at least one age group';
          isValid = false;
        }
        if (formData.lessonTypes.length === 0) {
          newErrors.lessonTypes = 'Select at least one lesson type';
          isValid = false;
        }
        break;
      
      case 3: // Profile & Media
        if (!formData.headline.trim()) {
          newErrors.headline = 'Professional headline is required';
          isValid = false;
        }
        if (!formData.description.trim()) {
          newErrors.description = 'Profile description is required';
          isValid = false;
        }
        // Note: In a real app, you'd also validate file uploads
        break;
      
      case 4: // Pricing & Availability
        if (!formData.trialRate.trim()) {
          newErrors.trialRate = 'Trial lesson rate is required';
          isValid = false;
        }
        if (!formData.hourlyRate.trim()) {
          newErrors.hourlyRate = 'Hourly rate is required';
          isValid = false;
        }
        if (!formData.timezone) {
          newErrors.timezone = 'Timezone is required';
          isValid = false;
        }
        if (!formData.responseTime) {
          newErrors.responseTime = 'Response time is required';
          isValid = false;
        }
        break;
      
      case 5: // Teaching Setup
        if (!formData.internetConnection) {
          newErrors.internetConnection = 'Internet connection is required';
          isValid = false;
        }
        if (!formData.teachingLocation) {
          newErrors.teachingLocation = 'Teaching location is required';
          isValid = false;
        }
        if (!formData.hasWebcam) {
          newErrors.hasWebcam = 'Webcam is required for online teaching';
          isValid = false;
        }
        break;
      
      // No validation for step 7 (Verification) as it might be optional
      
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

 const submitForm = async (steps) => {
  try {
    // Log the data you're about to send
    console.log('Submitting form data:', formData);

    // Send a PATCH or POST request (depending on your backend)
    const response = await axios.post(`${APIURL}updatetutorprofile`, {...formData,completed_steps:steps});

    if (response.status === 200 && response.data.status=='success') {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.data.message || 'Failed to update profile',
      };
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        'There was an error submitting your application. Please try again.',
    };
  }
};


  return {
    formData,
    errors,
    handleInputChange,
    handleArrayToggle,
    validateStep,
    submitForm,
    setFormData
  };
};

export default useFormData;