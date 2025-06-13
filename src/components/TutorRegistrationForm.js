import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FormProgress from './ui/FormProgress';
import FormNavigation from './ui/FormNavigation';
import useFormData from '../hooks/useFormData';

// Form Steps
import PersonalInformation from './form-steps/PersonalInformation';
import LanguagesSubjects from './form-steps/LanguagesSubjects';
import EducationExperience from './form-steps/EducationExperience';
import TeachingApproach from './form-steps/TeachingApproach';
import ProfileMedia from './form-steps/ProfileMedia';
import PricingAvailability from './form-steps/PricingAvailability';
import TeachingSetup from './form-steps/TeachingSetup';
import Verification from './form-steps/Verification';
import Complete from './form-steps/Complete';
import { Password } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { APIURL } from '../../ApiUrl';
import axios from 'axios';

const TutorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
    const user = useSelector((state) => state.auth.user);
console.log(user);
  const initialFormState = {
    userid:user.id,
    subjects: [],
    languages: [],
    nativeLanguages: [],
    teachingExperience: '',
    currentOccupation: '',
    education: '',
    previousTeachingRoles: '',
    certifications: [],
    motivationForTeaching: '',
    teachingStyle: '',
    ageGroups: [],
    lessonTypes: [],
    hasTeachingMaterials: false,
    willingToCreateMaterials: false,
    headline: '',
    description: '',
    trialRate: '',
    hourlyRate: '',
    timezone: '',
    responseTime: '',
    hasWebcam: false,
    hasHeadset: false,
    hasQuietSpace: false,
    internetConnection: '',
    teachingLocation: '',
    backgroundCheck: false,
    completed_steps:currentStep,
    profile_image:'',
    video_intro:'',
    identity_document:'',
    certificate_files:[]
  };

  const { 
    formData, 
    errors, 
    handleInputChange, 
    handleArrayToggle, 
    validateStep,
    submitForm,
    setFormData 
  } = useFormData(initialFormState);

  const steps = [
    
    'Languages & Subjects', 
    'Education & Experience',
    'Teaching Approach',
    'Profile & Media',
    'Pricing & Availability',
    'Teaching Setup',
    'Verification',
    'Complete'
  ];

const getTutorProfile = async (userId) => {
  try {
    const response = await axios.get(`${APIURL}tutor/profile/${userId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching tutor profile:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch tutor profile',
    };
  }
};
 useEffect(() => {
  const loadProfile = async () => {
    const res = await getTutorProfile(user.id);
    if (res.success && res.data) {
      const data = res.data;

      const normalizedData = {
        userid: user.id ?? '',
        subjects: data.subjects ?? [],
        languages: data.languages ?? [],
        nativeLanguages: data.native_languages ?? [],
        teachingExperience: data.teaching_experience ?? '',
        currentOccupation: data.current_occupation ?? '',
        education: data.education ?? '',
        previousTeachingRoles: data.previous_teaching_roles ?? '',
        certifications: data.certifications ?? [],
        motivationForTeaching: data.motivation_for_teaching ?? '',
        teachingStyle: data.teaching_style ?? '',
        ageGroups: data.age_groups ?? [],
        lessonTypes: data.lesson_types ?? [],
        hasTeachingMaterials: !!data.has_teaching_materials,
        willingToCreateMaterials: !!data.willing_to_create_materials,
        headline: data.headline ?? '',
        description: data.description ?? '',
        trialRate: data.trial_rate ?? '',
        hourlyRate: data.hourly_rate ?? '',
        timezone: data.timezone ?? '',
        responseTime: data.response_time ?? '',
        hasWebcam: !!data.has_webcam,
        hasHeadset: !!data.has_headset,
        hasQuietSpace: !!data.has_quiet_space,
        internetConnection: data.internet_connection ?? '',
        teachingLocation: data.teaching_location ?? '',
        backgroundCheck: !!data.background_check,
        completed_steps: data.completed_steps ?? 0,
        profile_image:data.profile_image ?? '',
        video_intro:data.video_intro ?? 0,
        identity_document:data.identity_document ?? '',
        certificate_files:data.certificate_files ?? []
        // Add media preloads here if needed (profile_image, video_intro, etc.)
      };

      setFormData(prev => ({ ...prev, ...normalizedData }));
      setCurrentStep(parseInt(normalizedData.completed_steps || 0));
    }
  };

  if (user?.id) {
    loadProfile();
  }
}, [user?.id, setFormData]);


const nextStep = async () => {
  // Validate current step before proceeding
  if (!validateStep(currentStep)) return;

  setIsSubmitting(true);
  setSubmissionError('');

  try {
    // Submit partial data for current step
    const result = await submitForm(currentStep);

    if (result.success) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setSubmissionError(result.error || 'An error occurred. Please try again.');
    }
  } catch (error) {
    setSubmissionError('An unexpected error occurred. Please try again.');
    console.error('Step submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    // Validate the current step first
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionError('');
      
      const result = await submitForm();
      
      if (result.success) {
        // Move to completion step
        setCurrentStep(steps.length - 1);
        window.scrollTo(0, 0);
      } else {
        setSubmissionError(result.error || 'An unknown error occurred. Please try again.');
      }
    } catch (error) {
      setSubmissionError('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const renderStepContent = () => {
    switch (parseInt(currentStep)) {
      case 0:
        return <LanguagesSubjects 
                 formData={formData} 
                 handleArrayToggle={handleArrayToggle} 
                 errors={errors} 
               />;
      case 1:
        return <EducationExperience 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 errors={errors} 
               />;
      case 2:
        return <TeachingApproach 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 handleArrayToggle={handleArrayToggle} 
                 errors={errors} 
               />;
      case 3:
        return <ProfileMedia 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 errors={errors} 
               />;
      case 4:
        return <PricingAvailability 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 errors={errors} 
               />;
      case 5:
        return <TeachingSetup 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 errors={errors} 
               />;
      case 6:
        return <Verification 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 errors={errors} 
               />;
      case 7:
        return <Complete />;
      default:
        return null;
    }
  };

  return (
    <>
       
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Progress Bar */}
          <FormProgress steps={steps} currentStep={currentStep} />

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            {renderStepContent()}
            
            {/* Display submission error if any */}
            {submissionError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <p className="font-medium">Submission Error</p>
                <p>{submissionError}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <FormNavigation 
              currentStep={currentStep} 
              stepsLength={steps.length}
              prevStep={prevStep}
              nextStep={nextStep}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorRegistrationForm;