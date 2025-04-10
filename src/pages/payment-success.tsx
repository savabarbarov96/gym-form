import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { SuccessState } from '@/components/app-states';
import { 
  submitToWebhook, 
  submitToMealPlanWebhook, 
  submitToWorkoutPlanWebhook 
} from '@/components/WebhookService';
import { FormData } from '@/types/survey';

// Initialize Stripe outside of the component render cycle
// Use the same key as in ResultsState.tsx
const stripePromise = loadStripe('pk_test_51RBLsb09RSewZPYHj4dcfAEVrBAIffaPwo6AfJLbRl6rJOE8WpTMvoxMzCMmepUZEGzz5XV9ZInhjL5fYXA3wiar00iu9d2Elm');

// Price IDs to plan type mapping
const PRICE_MAPPING = {
  'price_1RBwo109RSewZPYHEBeKTIbm': 'workout', // Workout plan only
  'price_1RBwp509RSewZPYHEKr9LQzp': 'meal', // Meal plan only
  'price_1RBwqy09RSewZPYHofVF49Uy': 'combined' // Meal Plan and Workout plan product
};

type PlanType = 'workout' | 'meal' | 'combined';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
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
        setFormData(JSON.parse(savedFormData));
      }
    } catch (err) {
      console.error('Failed to load form data from localStorage:', err);
    }
  }, []);

  useEffect(() => {
    // If no session ID is provided, redirect to home
    if (!sessionId) {
      navigate('/');
      return;
    }

    // Function to verify the payment status and trigger webhooks
    const verifyPayment = async () => {
      // If webhooks have already been triggered, don't do it again
      if (webhooksTriggeredRef.current) {
        console.log('Webhooks already triggered, skipping');
        setIsVerifying(false);
        return;
      }

      try {
        console.log('Starting payment verification for session:', sessionId);
        
        // Create a server endpoint URL for verifying the session
        // For now we'll use a mock verification since we don't have a server endpoint
        const planType = await mockVerifyPayment(sessionId);
        
        console.log('Payment verification result:', planType ? 'Success' : 'Failed', 'Plan type:', planType);
        
        if (!planType) {
          setError('Unable to verify payment. Please contact support.');
          setIsVerifying(false);
          return;
        }

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
        console.error('Error verifying payment:', error);
        setError('An error occurred while verifying your payment. Please contact support.');
        setIsVerifying(false);
      }
    };

    // Only verify payment if form data is loaded AND we haven't triggered webhooks yet
    if (formData !== null && !webhooksTriggeredRef.current) {
      console.log('Initiating payment verification. Form data loaded:', formData !== null);
      verifyPayment();
    } else if (!formData) {
      console.log('Waiting for form data to be loaded before verifying payment');
    }
  }, [sessionId, navigate, formData]);

  // Mock function to verify payment (replace with actual verification logic)
  const mockVerifyPayment = async (sessionId: string): Promise<PlanType | null> => {
    // In a real implementation, you would call your server to verify the session
    console.log(`Verifying session: ${sessionId}`);
    
    // Mock verification - pretend we queried the session and got the line items
    // In production, this should be a server-side call to Stripe's API

    // For demo purposes, extract planType from sessionId if present
    // Format: sess_xxx_planType or cs_xxx_planType
    try {
      const parts = sessionId.split('_');
      console.log('Session ID parts:', parts);
      
      // Check if the last part is a valid plan type
      if (parts.length >= 3) {
        const potentialPlanType = parts[parts.length - 1];
        if (['workout', 'meal', 'combined'].includes(potentialPlanType)) {
          console.log(`Found valid plan type in session ID: ${potentialPlanType}`);
          return potentialPlanType as PlanType;
        }
      }
      
      console.log('No valid plan type found in session ID, defaulting to combined');
      // Default to combined if we can't determine the plan type
      // In production, this should actually verify with Stripe's API
      return 'combined';
    } catch (error) {
      console.error('Error parsing session ID:', error);
      return 'combined';
    }
  };

  // Function to trigger the appropriate webhooks
  const triggerWebhooks = async (planType: PlanType, formData: FormData) => {
    console.log(`Triggering webhooks for plan type: ${planType}`);

    try {
      // Only trigger the specific webhooks needed for the plan type
      if (planType === 'combined') {
        console.log('Triggering combined webhooks (both meal and workout plans)');
        await submitToWebhook(formData);
      } else if (planType === 'meal') {
        console.log('Triggering meal plan webhook only');
        await submitToMealPlanWebhook(formData);
      } else if (planType === 'workout') {
        console.log('Triggering workout plan webhook only');
        await submitToWorkoutPlanWebhook(formData);
      }
      console.log('Webhooks triggered successfully');
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
          <p className="text-xl">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // If there was an error, show an error message
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Payment verified, show the success state
  return <SuccessState />;
};

export default PaymentSuccess; 