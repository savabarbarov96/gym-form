// Utility functions for tracking Facebook Pixel events specific to the gym form application

export interface GymFormEventParams {
  step_number?: number;
  form_type?: string;
  user_goal?: string;
  fitness_level?: string;
  workout_preference?: string;
  value?: number;
  currency?: string;
}

// Track when user starts the gym form
export const trackGymFormStart = (trackEvent: (name: string, params?: any) => void) => {
  trackEvent('Lead', {
    content_name: 'Gym Form Started',
    content_category: 'fitness_assessment',
    value: 50, // Estimated lead value
    currency: 'USD'
  });
};

// Track when user completes a form step
export const trackGymFormStepComplete = (
  trackEvent: (name: string, params?: any) => void,
  stepNumber: number,
  stepName: string
) => {
  trackEvent('ViewContent', {
    content_name: `Gym Form Step ${stepNumber} - ${stepName}`,
    content_category: 'fitness_assessment',
    content_ids: [`step_${stepNumber}`],
    value: stepNumber * 10, // Progressive value based on completion
    currency: 'USD'
  });
};

// Track when user completes the entire gym form
export const trackGymFormComplete = (
  trackCompleteRegistration: (value?: number, currency?: string) => void
) => {
  trackCompleteRegistration(100, 'USD'); // Full form completion value
};

// Track when user initiates payment for gym services
export const trackGymPaymentInitiate = (
  trackInitiateCheckout: (value?: number, currency?: string, numItems?: number) => void,
  planValue: number,
  planName: string
) => {
  trackInitiateCheckout(planValue, 'USD', 1);
};

// Track successful gym plan purchase
export const trackGymPlanPurchase = (
  trackPurchase: (value: number, currency?: string, contentIds?: string[]) => void,
  planValue: number,
  planId: string,
  planName: string
) => {
  trackPurchase(planValue, 'USD', [planId]);
};

// Track when user views workout recommendations
export const trackWorkoutRecommendationView = (
  trackViewContent: (contentName?: string, contentCategory?: string, value?: number) => void,
  workoutType: string
) => {
  trackViewContent(
    `Workout Recommendation - ${workoutType}`,
    'workout_plan',
    25
  );
};

// Track when user searches for specific fitness content
export const trackFitnessSearch = (
  trackSearch: (searchString: string, value?: number) => void,
  searchTerm: string
) => {
  trackSearch(searchTerm, 15);
};

// Track custom events for specific gym form interactions
export const trackCustomGymEvent = (
  trackCustomEvent: (name: string, params?: any) => void,
  eventName: string,
  params: GymFormEventParams
) => {
  trackCustomEvent(eventName, {
    ...params,
    event_source: 'gym_form',
    timestamp: new Date().toISOString()
  });
};

// Track when user abandons the form (can be called on page unload)
export const trackGymFormAbandon = (
  trackCustomEvent: (name: string, params?: any) => void,
  currentStep: number,
  totalSteps: number
) => {
  trackCustomEvent('FormAbandon', {
    content_name: 'Gym Form Abandoned',
    content_category: 'fitness_assessment',
    step_number: currentStep,
    completion_percentage: Math.round((currentStep / totalSteps) * 100),
    value: currentStep * 5, // Partial value based on progress
    currency: 'USD'
  });
};

// Track when user clicks on specific call-to-action buttons
export const trackCTAClick = (
  trackEvent: (name: string, params?: any) => void,
  ctaName: string,
  ctaLocation: string
) => {
  trackEvent('Contact', {
    content_name: `CTA Click - ${ctaName}`,
    content_category: 'user_engagement',
    cta_location: ctaLocation,
    value: 20,
    currency: 'USD'
  });
}; 