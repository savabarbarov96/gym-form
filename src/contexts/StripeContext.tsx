import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Use the live Stripe key from environment variables
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51RBLsSP3RUANtq4LgJlJgCZhnHBzLGOPCjc3yIo8Kl8Wh6mFog3jLTJCSmh8rO0oSTgIaYWvBatR4oHbnJ5ye5u5005KAvJkCM';

// Define product IDs
export const STRIPE_PRODUCTS = {
  MEAL_PLAN: import.meta.env.VITE_STRIPE_MEAL_PLAN_PRODUCT_ID || 'prod_SFBGFsICFLW0zI',
  WORKOUT_PLAN: import.meta.env.VITE_STRIPE_WORKOUT_PLAN_PRODUCT_ID || 'prod_SFBJvpUpVe0aYO',
  COMBINED_PLAN: import.meta.env.VITE_STRIPE_COMBINED_PLAN_PRODUCT_ID || 'prod_SFBNKgtJz21qeo',
};

// Define plan types
export type PlanType = 'workout' | 'meal' | 'combined';

// Define product prices in currency display format
export const PRODUCT_PRICES = {
  workout: '60 лева',
  meal: '60 лева',
  combined: '97 лева',
};

interface StripeContextType {
  stripe: Stripe | null;
  isStripeLoading: boolean;
  stripeError: Error | null;
  handleCheckout: (planType: PlanType) => Promise<boolean>;
}

// Create the context with a default value
const StripeContext = createContext<StripeContextType>({
  stripe: null,
  isStripeLoading: true,
  stripeError: null,
  handleCheckout: async () => false,
});

// Product mapping with product IDs and display information
export const PRODUCT_MAPPING: Record<PlanType, { 
  productId: string;
  priceId: string;
  amount: number;
  name: string;
  description: string;
  paymentLink: string; // Direct payment link URL from Stripe Dashboard
}> = {
  meal: {
    productId: STRIPE_PRODUCTS.MEAL_PLAN,
    priceId: import.meta.env.VITE_STRIPE_MEAL_PLAN_PRICE_ID || 'price_1RKgtgP3RUANtq4LlOgEVkJ8',
    amount: 6000, // 60 лева in cents
    name: 'Хранителен План',
    description: 'Персонализиран хранителен режим, съобразен с вашите цели',
    paymentLink: '' // This will be generated dynamically
  },
  workout: {
    productId: STRIPE_PRODUCTS.WORKOUT_PLAN,
    priceId: import.meta.env.VITE_STRIPE_WORKOUT_PLAN_PRICE_ID || 'price_1RKgx9P3RUANtq4LzndJo3eH',
    amount: 6000, // 60 лева in cents
    name: 'Тренировъчен План',
    description: 'Персонализирана тренировъчна програма, съобразена с вашите цели',
    paymentLink: '' // This will be generated dynamically
  },
  combined: {
    productId: STRIPE_PRODUCTS.COMBINED_PLAN,
    priceId: import.meta.env.VITE_STRIPE_COMBINED_PLAN_PRICE_ID || 'price_1RKh0nP3RUANtq4Lf4qaQCv7',
    amount: 9700, // 97 лева in cents
    name: 'Комбиниран План',
    description: 'Комбиниран план - хранителен режим и тренировъчна програма',
    paymentLink: '' // This will be generated dynamically
  }
};

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [isStripeLoading, setIsStripeLoading] = useState(true);
  const [stripeError, setStripeError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize Stripe
    const initializeStripe = async () => {
      try {
        const stripePromise = await loadStripe(STRIPE_PUBLISHABLE_KEY);
        setStripe(stripePromise);
        setIsStripeLoading(false);
      } catch (error) {
        console.error('Failed to initialize Stripe:', error);
        setStripeError(error instanceof Error ? error : new Error('Unknown Stripe initialization error'));
        setIsStripeLoading(false);
      }
    };

    initializeStripe();
  }, []);

  /**
   * Handle checkout process for direct product purchase
   * @param planType The type of plan to purchase
   * @returns True if checkout was initiated successfully, false otherwise
   */
  const handleCheckout = async (planType: PlanType): Promise<boolean> => {
    try {
      console.log(`Initiating checkout for plan: ${planType}`);
      
      // Get the product mapping for the selected plan
      const product = PRODUCT_MAPPING[planType];
      if (!product) {
        console.error(`No product mapping found for plan type: ${planType}`);
        return false;
      }

      if (!stripe) {
        console.error('Stripe not initialized');
        return false;
      }

      // Get user email from localStorage if available
      const userEmail = localStorage.getItem('userEmail');
      
      // Create Stripe checkout session
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: product.priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment-success?client_reference_id=${planType}`,
        cancelUrl: `${window.location.origin}/payment-canceled`,
        clientReferenceId: planType,
        customerEmail: userEmail || undefined,
      });
      
      if (error) {
        console.error('Stripe checkout error:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Checkout process failed:', error);
      return false;
    }
  };

  const value = {
    stripe,
    isStripeLoading,
    stripeError,
    handleCheckout,
  };

  return <StripeContext.Provider value={value}>{children}</StripeContext.Provider>;
};

// Custom hook to use the StripeContext
export const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
}; 