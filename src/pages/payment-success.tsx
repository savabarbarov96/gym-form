import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SuccessWithLoading } from '@/components/app-states';
import { 
  submitToWebhook, 
  submitToMealPlanWebhook, 
  submitToWorkoutPlanWebhook 
} from '@/components/WebhookService';
import { FormData } from '@/types/survey';
import { saveUserData } from '@/lib/supabase';
import { PlanType, PRODUCT_MAPPING } from '@/contexts/StripeContext';

// Define mapping from URL param plan to actual plan type
const PLAN_TYPE_MAPPING: Record<string, PlanType> = {
  'workout': 'workout',
  'meal': 'meal',
  'combined': 'combined'
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // Get plan from client_reference_id which is passed from Stripe
  const clientReferenceId = searchParams.get('client_reference_id') || '';
  const planParam = clientReferenceId in PLAN_TYPE_MAPPING ? clientReferenceId : searchParams.get('plan');
  
  // Log the redirect parameters for debugging
  console.log('Payment Success: Redirect received with parameters', {
    clientReferenceId,
    planParam,
    allParams: Object.fromEntries(searchParams.entries())
  });
  
  const navigate = useNavigate();
  // Add a ref to track if webhooks have been triggered
  const webhooksTriggeredRef = useRef(false);
  const formDataLoadedRef = useRef(false);

  // Process form data and trigger webhooks immediately on component mount
  useEffect(() => {
    const processPayment = async () => {
      try {
        // Load form data from localStorage
        let formData: FormData | null = null;
        
        try {
          const savedFormData = localStorage.getItem('surveyFormData');
          if (savedFormData) {
            console.log('Payment Success: Form data loaded from localStorage');
            formData = JSON.parse(savedFormData);
            formDataLoadedRef.current = true;
          } else {
            console.warn('Payment Success: No form data found in localStorage');
          }
        } catch (err) {
          console.error('Failed to load form data from localStorage:', err);
        }

        // Validate the plan type
        if (!planParam) {
          console.error('Missing required plan parameter');
          navigate('/?error=missing-plan');
          return;
        }

        // Determine the plan type from the URL parameter
        const planType = PLAN_TYPE_MAPPING[planParam];
        if (!planType) {
          console.error(`Invalid plan type: ${planParam}`);
          navigate('/?error=invalid-plan');
          return;
        }

        // If webhooks have already been triggered, don't do it again
        if (webhooksTriggeredRef.current) {
          console.log('Webhooks already triggered, continuing with simulation');
          return;
        }

        console.log('Starting order processing for plan:', planParam);
        console.log('Determined plan type:', planType);

        // Save user data to Supabase if available
        if (formData && formData.personalInfo?.name && formData.personalInfo?.email) {
          console.log('Saving form data to Supabase...');
          
          // Add selected plan type to the form data before saving
          const formDataWithPlan = {
            ...formData,
            selectedPlan: planType,
            paymentStatus: 'completed',
            paymentDate: new Date().toISOString(),
            paymentDetails: {
              productId: PRODUCT_MAPPING[planType]?.productId || '',
              productName: PRODUCT_MAPPING[planType]?.name || '',
              paymentLink: PRODUCT_MAPPING[planType]?.paymentLink || '',
            }
          };
          
          // Save data in the background
          saveUserData(
            formData.personalInfo.name,
            formData.personalInfo.email,
            formDataWithPlan
          ).then(result => {
            if (result.success) {
              console.log("Form data saved to Supabase successfully");
            } else {
              console.error("Failed to save form data to Supabase:", result.message);
            }
          }).catch(error => {
            console.error("Error saving form data to Supabase:", error);
          });
        }

        // Mark webhooks as triggered 
        webhooksTriggeredRef.current = true;
        
        // Trigger webhooks in the background
        if (formData) {
          console.log(`Payment Success: Starting webhook submission for plan type: ${planType}`);
          
          if (planType === 'combined') {
            console.log(`Triggering both meal and workout plan webhooks for ${planType} plan`);
            
            // These webhooks need to be triggered properly for payment success
            Promise.all([
              submitToMealPlanWebhook(formData),
              submitToWorkoutPlanWebhook(formData)
            ]).then(([mealResult, workoutResult]) => {
              console.log(`${planType} plan webhooks results - Meal: ${mealResult}, Workout: ${workoutResult}`);
            });
          } else if (planType === 'meal') {
            console.log('Triggering meal plan webhook only');
            submitToMealPlanWebhook(formData).then(result => {
              console.log(`Meal plan webhook result: ${result}`);
            });
          } else if (planType === 'workout') {
            console.log('Triggering workout plan webhook only');
            submitToWorkoutPlanWebhook(formData).then(result => {
              console.log(`Workout plan webhook result: ${result}`);
            });
          }
        } else {
          console.warn('Form data not available for webhook submission');
        }
      } catch (error) {
        console.error('Error processing order:', error);
        navigate('/?error=processing-failed');
      }
    };

    // Process payment on component mount
    processPayment();
  }, [planParam, navigate]);

  // Directly render the SuccessWithLoading component
  return <SuccessWithLoading />;
};

export default PaymentSuccess; 