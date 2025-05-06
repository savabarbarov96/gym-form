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
  'combined': 'combined',
  'tip': 'tip'
};

// Processing stages for better UX
enum ProcessingStage {
  VERIFYING_PAYMENT = 'Проверка на плащането...',
  INITIALIZING_WEBHOOK = 'Подготовка на поръчката...',
  GENERATING_PLAN = 'Генериране на вашата програма...',
  COMPLETED = 'Готово!'
}

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
  const [processingStage, setProcessingStage] = useState<ProcessingStage>(ProcessingStage.VERIFYING_PAYMENT);
  const [progressPercent, setProgressPercent] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);
  // Add a ref to track if webhooks have been triggered
  const webhooksTriggeredRef = useRef(false);
  // Timer for progress simulation
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Progress bar simulation
  useEffect(() => {
    // Start the progress bar simulation for the backend processing
    if (processingStage === ProcessingStage.GENERATING_PLAN && progressPercent < 95) {
      progressTimerRef.current = setInterval(() => {
        setProgressPercent(prev => {
          const newProgress = prev + 1;
          // Slow down as we approach 95%
          if (newProgress >= 95) {
            if (progressTimerRef.current) {
              clearInterval(progressTimerRef.current);
            }
            // Complete after reaching 95%
            setTimeout(() => {
              setProgressPercent(100);
              setProcessingStage(ProcessingStage.COMPLETED);
            }, 2000);
            return 95;
          }
          return newProgress;
        });
      }, 950); // Update about every second to simulate a 90 second process
    }

    // Cleanup timer
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [processingStage, progressPercent]);

  useEffect(() => {
    // Validate that we have a plan type
    if (!planParam) {
      console.error('Missing required plan parameter');
      setError('Payment verification failed. Missing plan information. Please contact support.');
      return;
    }

    // Determine the plan type from the URL parameter
    const planType = PLAN_TYPE_MAPPING[planParam];
    if (!planType) {
      console.error(`Invalid plan type: ${planParam}`);
      setError('Invalid plan type. Please contact support.');
      return;
    }

    // Function to process the order and trigger webhooks
    const processOrder = async () => {
      // If webhooks have already been triggered, don't do it again
      if (webhooksTriggeredRef.current) {
        console.log('Webhooks already triggered, continuing with simulation');
        return;
      }

      try {
        console.log('Starting order processing for plan:', planParam);
        console.log('Determined plan type:', planType);

        // Simulate the webhook trigger phase
        setTimeout(async () => {
          setProcessingStage(ProcessingStage.INITIALIZING_WEBHOOK);
          setProgressPercent(15);

          // Only proceed if form data is available
          if (formData) {
            console.log('Form data is available, triggering webhooks for plan type:', planType);
            
            // Mark webhooks as triggered before actually triggering them
            webhooksTriggeredRef.current = true;
            
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

            console.log(`Payment Success: Starting webhook submission for plan type: ${planType}`);
            
            // Trigger the appropriate webhook(s) based on the plan type
            let webhookResult = false;
            
            if (planType === 'combined' || planType === 'tip') {
              console.log(`Triggering both meal and workout plan webhooks for ${planType} plan`);
              const mealResult = await submitToMealPlanWebhook(formData);
              const workoutResult = await submitToWorkoutPlanWebhook(formData);
              webhookResult = mealResult && workoutResult;
              console.log(`${planType} plan webhooks results - Meal: ${mealResult}, Workout: ${workoutResult}`);
            } else if (planType === 'meal') {
              console.log('Triggering meal plan webhook only');
              webhookResult = await submitToMealPlanWebhook(formData);
            } else if (planType === 'workout') {
              console.log('Triggering workout plan webhook only');
              webhookResult = await submitToWorkoutPlanWebhook(formData);
            }
            
            console.log(`Payment Success: Webhook submission ${webhookResult ? 'succeeded' : 'failed'}`);
          } else {
            console.warn('Form data not available for webhook submission');
          }
          
          // Move to generating plan stage regardless of webhook result for better UX
          setTimeout(() => {
            setProcessingStage(ProcessingStage.GENERATING_PLAN);
            setProgressPercent(25);
          }, 1000);
        }, 2000); // Wait 2 seconds before triggering webhooks for visual feedback
        
      } catch (error) {
        console.error('Error processing order:', error);
        setError('An error occurred while processing your order. Please contact support.');
      }
    };

    // Start processing as soon as we have form data
    if (formData !== null && !webhooksTriggeredRef.current) {
      console.log('Initiating order processing. Form data loaded:', formData !== null);
      processOrder();
    } else if (!formData) {
      console.log('Waiting for form data to be loaded before processing order');
    }
  }, [planParam, formData]);

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

  // If still processing, show the loading state with progress
  if (processingStage !== ProcessingStage.COMPLETED) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-8">
            <div className="w-20 h-20 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium text-gray-800">{processingStage}</p>
            <p className="text-gray-500 mt-1">Моля, изчакайте. Процесът може да отнеме до 90 секунди.</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-orange to-orange-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{progressPercent}% завършено</p>
        </div>
      </div>
    );
  }

  // Processing completed, show the success state
  return <SuccessWithLoading />;
};

export default PaymentSuccess; 