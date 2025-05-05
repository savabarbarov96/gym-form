import { useState } from 'react';
import { useStripe } from '@/contexts/StripeContext';
import { PlanType } from '@/contexts/StripeContext';

interface UseStripePaymentReturn {
  isProcessing: boolean;
  error: string | null;
  initiatePayment: (planType: PlanType) => Promise<boolean>;
}

/**
 * Custom hook for handling Stripe payments
 * @returns Object with payment state and functions
 */
export const useStripePayment = (): UseStripePaymentReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleCheckout } = useStripe();

  /**
   * Initiates the payment process for a specific plan type
   * @param planType The type of plan to purchase (workout, meal, or combined)
   * @returns Promise resolving to true if checkout was initiated successfully
   */
  const initiatePayment = async (planType: PlanType): Promise<boolean> => {
    try {
      setIsProcessing(true);
      setError(null);

      // Save the user's email to localStorage if available from the form
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        const formData = localStorage.getItem('surveyFormData');
        if (formData) {
          const parsedData = JSON.parse(formData);
          if (parsedData.personalInfo?.email) {
            localStorage.setItem('userEmail', parsedData.personalInfo.email);
          }
        }
      }

      // Store the selected plan type
      localStorage.setItem('selectedPlanType', planType);

      // Initiate the checkout process
      const result = await handleCheckout(planType);
      
      if (!result) {
        setError('Payment initiation failed. Please try again.');
      }
      
      return result;
    } catch (error) {
      console.error('Payment processing error:', error);
      setError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    initiatePayment
  };
};

export default useStripePayment; 