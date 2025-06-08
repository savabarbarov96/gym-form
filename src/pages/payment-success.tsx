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
            formData = JSON.parse(savedFormData);
            formDataLoadedRef.current = true;
          }
        } catch (err) {
          // Form data loading failed, continue without it
        }

        // Validate the plan type
        if (!planParam) {
          navigate('/?error=missing-plan');
          return;
        }

        // Determine the plan type from the URL parameter
        const planType = PLAN_TYPE_MAPPING[planParam];
        if (!planType) {
          navigate('/?error=invalid-plan');
          return;
        }

        // If webhooks have already been triggered, don't do it again
        if (webhooksTriggeredRef.current) {
          return;
        }

        // Save user data to Supabase if available
        if (formData && formData.personalInfo?.name && formData.personalInfo?.email) {
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
            // Data saved successfully or failed silently
          }).catch(error => {
            // Error handled silently
          });
        }

        // Mark webhooks as triggered 
        webhooksTriggeredRef.current = true;
        
        // Trigger webhooks in the background
        if (formData) {
          if (planType === 'combined') {
            // These webhooks need to be triggered properly for payment success
            Promise.all([
              submitToMealPlanWebhook(formData),
              submitToWorkoutPlanWebhook(formData)
            ]).then(([mealResult, workoutResult]) => {
              // Webhooks completed
            });
          } else if (planType === 'meal') {
            submitToMealPlanWebhook(formData).then(result => {
              // Webhook completed
            });
          } else if (planType === 'workout') {
            submitToWorkoutPlanWebhook(formData).then(result => {
              // Webhook completed
            });
          }
        }
      } catch (error) {
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