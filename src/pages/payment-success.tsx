import React, { useEffect, useState, useRef } from 'react';
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
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Add a ref to track if webhooks have been triggered
  const webhooksTriggeredRef = useRef(false);

  // Load form data from localStorage on component mount
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem('surveyFormData');
      if (savedFormData) {
        console.log('Payment Success: Form data loaded from localStorage');
        setFormData(JSON.parse(savedFormData));
      } else {
        console.warn('Payment Success: No form data found in localStorage');
      }
    } catch (err) {
      console.error('Failed to load form data from localStorage:', err);
    }
  }, []);

  useEffect(() => {
    // Validate that we have a plan type
    if (!planParam) {
      console.error('Missing required plan parameter');
      setError('Payment verification failed. Missing plan information. Please contact support.');
      setIsVerifying(false);
      return;
    }

    // Function to process the order and trigger webhooks
    const processOrder = async () => {
      // If webhooks have already been triggered, don't do it again
      if (webhooksTriggeredRef.current) {
        console.log('Webhooks already triggered, skipping');
        setIsVerifying(false);
        return;
      }

      try {
        console.log('Starting order processing for plan:', planParam);
        
        // Determine the plan type from the URL parameter
        const planType = PLAN_TYPE_MAPPING[planParam];
        
        if (!planType) {
          console.error(`Invalid plan type: ${planParam}`);
          setError('Invalid plan type. Please contact support.');
          setIsVerifying(false);
          return;
        }
        
        console.log('Determined plan type:', planType);

        // Only proceed if form data is available
        if (formData) {
          console.log('Form data is available, triggering webhooks for plan type:', planType);
          
          // Mark webhooks as triggered before actually triggering them
          webhooksTriggeredRef.current = true;
          
          // Trigger the appropriate webhook(s) based on the plan type
          await triggerWebhooks(planType, formData);
        } else {
          console.warn('Form data not available for webhook submission');
        }
        
        setIsVerifying(false);
      } catch (error) {
        console.error('Error processing order:', error);
        setError('An error occurred while processing your order. Please contact support.');
        setIsVerifying(false);
      }
    };

    // Only process order if form data is loaded AND we haven't triggered webhooks yet
    if (formData !== null && !webhooksTriggeredRef.current) {
      console.log('Initiating order processing. Form data loaded:', formData !== null);
      processOrder();
    } else if (!formData) {
      console.log('Waiting for form data to be loaded before processing order');
    }
  }, [planParam, formData]);

  // Function to trigger the appropriate webhooks
  const triggerWebhooks = async (planType: PlanType, formData: FormData) => {
    console.log(`Triggering webhooks for plan type: ${planType}`);

    try {
      // First, save the form data to Supabase if we have a name and email
      if (formData.personalInfo?.name && formData.personalInfo?.email) {
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
        
        try {
          const result = await saveUserData(
            formData.personalInfo.name,
            formData.personalInfo.email,
            formDataWithPlan
          );
          
          if (result.success) {
            console.log("Form data saved to Supabase successfully");
          } else {
            console.error("Failed to save form data to Supabase:", result.message);
            // Continue with webhook submission even if Supabase save fails
          }
        } catch (error) {
          console.error("Error saving form data to Supabase:", error);
          // Continue with webhook submission even if Supabase save fails
        }
      } else {
        console.warn("Missing name or email, skipping Supabase save");
      }

      console.log(`Payment Success: Starting webhook submission to sava.automationaid.eu for plan type: ${planType}`);
      
      // Only trigger the specific webhooks needed for the plan type
      let webhookResult = false;
      if (planType === 'combined') {
        console.log('Triggering combined webhooks (both meal and workout plans)');
        webhookResult = await submitToWebhook(formData);
      } else if (planType === 'meal') {
        console.log('Triggering meal plan webhook only');
        webhookResult = await submitToMealPlanWebhook(formData);
      } else if (planType === 'workout') {
        console.log('Triggering workout plan webhook only');
        webhookResult = await submitToWorkoutPlanWebhook(formData);
      }
      
      console.log(`Payment Success: Webhook submission ${webhookResult ? 'succeeded' : 'failed'}`);
    } catch (error) {
      console.error('Error triggering webhooks:', error);
      // We don't set an error state here as we still want to show the success page
      // The user will still get their plan via email even if the webhook fails
    }
  };

  // If we're still verifying, show a loading message
  if (isVerifying) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Обработване на поръчката...</p>
        </div>
      </div>
    );
  }

  // If there was an error, show an error message
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Обработката на поръчката не успя</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Върнете се към началото
          </button>
        </div>
      </div>
    );
  }

  // Payment verified, show the success state
  return <SuccessWithLoading />;
};

export default PaymentSuccess; 