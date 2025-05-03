import { loadStripe, Stripe } from '@stripe/stripe-js';

// Define plan types
export type PlanType = 'workout' | 'meal' | 'combined';

// Product mapping with prices
const PRODUCT_MAPPING: Record<PlanType, { 
  productId: string; 
  priceId: string;
  amount: number;
}> = {
  meal: {
    productId: 'prod_SFBGFsICFLW0zI', // Хранителен План
    priceId: 'price_1RBwp509RSewZPYHEKr9LQzp',
    amount: 6000, // 60 лева in cents
  },
  workout: {
    productId: 'prod_SFBJvpUpVe0aYO', // Тренировъчен План
    priceId: 'price_1RBwo109RSewZPYHEBeKTIbm',
    amount: 6000, // 60 лева in cents
  },
  combined: {
    productId: 'prod_SFBNKgtJz21qeo', // Комбиниран план
    priceId: 'price_1RBwqy09RSewZPYHofVF49Uy',
    amount: 9700, // 97 лева in cents
  }
};

// Initialize a variable to store the stripe instance
let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Initialize Stripe with the public key
 * We use a singleton pattern to ensure Stripe is only initialized once
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    // Using test key for consistency across the app
    const key = 'pk_test_51RBLsb09RSewZPYHj4dcfAEVrBAIffaPwo6AfJLbRl6rJOE8WpTMvoxMzCMmepUZEGzz5XV9ZInhjL5fYXA3wiar00iu9d2Elm';
    
    if (!key) {
      console.error('Stripe public key is not defined');
      return Promise.resolve(null);
    }
    
    // Initialize Stripe with the public key
    stripePromise = loadStripe(key);
  }
  
  return stripePromise;
};

/**
 * Get product name based on plan type
 */
function getProductName(planType: PlanType): string {
  switch (planType) {
    case 'meal':
      return 'Хранителен План';
    case 'workout':
      return 'Тренировъчен План';
    case 'combined':
      return 'Комбиниран План';
    default:
      return 'Персонализиран План';
  }
}

/**
 * Handle checkout using Stripe Checkout
 * @param planType The type of plan to purchase
 * @returns True if checkout was initiated successfully, false otherwise
 */
export const handleCheckout = async (planType: PlanType): Promise<boolean> => {
  try {
    console.log(`Initiating checkout for plan: ${planType}`);
    
    // Get the product mapping for the selected plan
    const product = PRODUCT_MAPPING[planType];
    if (!product) {
      console.error(`No product mapping found for plan type: ${planType}`);
      return false;
    }

    // Initialize Stripe
    const stripe = await getStripe();
    if (!stripe) {
      console.error('Failed to initialize Stripe');
      return false;
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: product.priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}_${planType}`,
      cancelUrl: `${window.location.origin}/payment-canceled`,
    });

    if (error) {
      console.error('Stripe checkout error:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Checkout process failed:', error);
    return false;
  }
};

/**
 * Get product description based on plan type
 */
function getProductDescription(planType: PlanType): string {
  switch (planType) {
    case 'meal':
      return 'Персонализиран хранителен режим, съобразен с вашите цели';
    case 'workout':
      return 'Персонализирана тренировъчна програма, съобразена с вашите цели';
    case 'combined':
      return 'Комбиниран план - хранителен режим и тренировъчна програма';
    default:
      return 'Персонализиран план';
  }
}

/**
 * Extract plan type from a Stripe session ID (used in the payment success page)
 * @param sessionId The session ID returned from Stripe
 * @returns The plan type if found, null otherwise
 */
export const extractPlanTypeFromSessionId = (sessionId: string): PlanType | null => {
  try {
    const parts = sessionId.split('_');
    
    // Check if the last part is a valid plan type
    if (parts.length >= 3) {
      const potentialPlanType = parts[parts.length - 1];
      if (potentialPlanType in PRODUCT_MAPPING) {
        return potentialPlanType as PlanType;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to extract plan type from session ID:', error);
    return null;
  }
}; 