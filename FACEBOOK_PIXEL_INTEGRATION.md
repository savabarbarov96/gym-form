# Facebook Pixel Integration Guide

This document explains how to use the Facebook Pixel integration in your gym form application.

## Overview

The Facebook Pixel (now Meta Pixel) has been integrated into your React application to track user interactions, conversions, and optimize your advertising campaigns. The integration includes:

- **Automatic page view tracking** on route changes
- **Custom event tracking** for form interactions
- **TypeScript support** with proper type definitions
- **Context-based tracking** for easy use throughout the app
- **Gym-specific event utilities** for fitness-related tracking

## Files Added/Modified

### New Files Created:
- `src/types/global.d.ts` - TypeScript declarations for Facebook Pixel
- `src/hooks/useFacebookPixel.ts` - Custom hook for Pixel functionality
- `src/components/FacebookPixel.tsx` - Component for Pixel initialization
- `src/contexts/FacebookPixelContext.tsx` - React context for tracking
- `src/utils/facebookPixelEvents.ts` - Gym-specific tracking utilities

### Modified Files:
- `src/App.tsx` - Added Pixel provider and component
- `src/hooks/index.ts` - Added Pixel hook export

## Configuration

### Pixel ID
The Pixel ID `1011989821000338` is currently hardcoded in `src/App.tsx`. For production, consider moving this to environment variables:

```typescript
// In .env file
VITE_META_PIXEL_ID=1011989821000338

// In App.tsx
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "1011989821000338";
```

### Debug Mode
Debug mode is automatically enabled in development (`import.meta.env.DEV`) and disabled in production.

## Usage Examples

### Basic Event Tracking

```typescript
import { useFacebookPixelContext } from '../contexts/FacebookPixelContext';

const MyComponent = () => {
  const { trackEvent, trackLead, trackPurchase } = useFacebookPixelContext();

  const handleFormSubmit = () => {
    trackLead(50, 'USD'); // Track lead with $50 value
  };

  const handlePurchase = () => {
    trackPurchase(99.99, 'USD', ['gym_plan_premium']); // Track purchase
  };

  return (
    <button onClick={handleFormSubmit}>Submit Form</button>
  );
};
```

### Gym-Specific Event Tracking

```typescript
import { useFacebookPixelContext } from '../contexts/FacebookPixelContext';
import { trackGymFormStart, trackGymFormStepComplete } from '../utils/facebookPixelEvents';

const GymFormComponent = () => {
  const { trackEvent, trackCompleteRegistration } = useFacebookPixelContext();

  const handleFormStart = () => {
    trackGymFormStart(trackEvent);
  };

  const handleStepComplete = (stepNumber: number, stepName: string) => {
    trackGymFormStepComplete(trackEvent, stepNumber, stepName);
  };

  const handleFormComplete = () => {
    trackGymFormComplete(trackCompleteRegistration);
  };

  // ... component logic
};
```

### Payment Tracking

```typescript
import { useFacebookPixelContext } from '../contexts/FacebookPixelContext';
import { trackGymPaymentInitiate, trackGymPlanPurchase } from '../utils/facebookPixelEvents';

const PaymentComponent = () => {
  const { trackInitiateCheckout, trackPurchase } = useFacebookPixelContext();

  const handlePaymentStart = (planValue: number, planName: string) => {
    trackGymPaymentInitiate(trackInitiateCheckout, planValue, planName);
  };

  const handlePaymentSuccess = (planValue: number, planId: string, planName: string) => {
    trackGymPlanPurchase(trackPurchase, planValue, planId, planName);
  };

  // ... component logic
};
```

## Available Tracking Functions

### Standard Events
- `trackEvent(eventName, parameters)` - Track any standard Facebook event
- `trackPurchase(value, currency, contentIds)` - Track purchases
- `trackLead(value, currency)` - Track lead generation
- `trackCompleteRegistration(value, currency)` - Track registrations
- `trackInitiateCheckout(value, currency, numItems)` - Track checkout initiation
- `trackAddToCart(value, currency, contentName)` - Track add to cart
- `trackViewContent(contentName, contentCategory, value)` - Track content views
- `trackSearch(searchString, value)` - Track searches

### Custom Events
- `trackCustomEvent(eventName, parameters)` - Track custom events

### Gym-Specific Events
- `trackGymFormStart()` - Track when user starts the gym form
- `trackGymFormStepComplete()` - Track form step completion
- `trackGymFormComplete()` - Track full form completion
- `trackGymPaymentInitiate()` - Track payment initiation
- `trackGymPlanPurchase()` - Track successful purchases
- `trackWorkoutRecommendationView()` - Track workout recommendation views
- `trackFitnessSearch()` - Track fitness-related searches
- `trackGymFormAbandon()` - Track form abandonment
- `trackCTAClick()` - Track call-to-action clicks

## Event Parameters

Common parameters you can include with events:

```typescript
{
  value: 99.99,              // Monetary value
  currency: 'USD',           // Currency code
  content_name: 'Gym Plan',  // Content name
  content_category: 'fitness', // Content category
  content_ids: ['plan_1'],   // Product/content IDs
  content_type: 'product',   // Content type
  num_items: 1,              // Number of items
  search_string: 'workout',  // Search term
  status: true               // Registration status
}
```

## Testing and Debugging

### Meta Pixel Helper
Install the [Meta Pixel Helper Chrome extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) to:
- Verify pixel installation
- See fired events in real-time
- Debug tracking issues

### Console Logging
In development mode, all pixel events are logged to the console for debugging.

### Events Manager
Check your [Meta Events Manager](https://business.facebook.com/events_manager) to see tracked events and verify they're working correctly.

## Best Practices

1. **Value Tracking**: Always include meaningful values with events for better optimization
2. **Content IDs**: Use consistent content IDs across your tracking
3. **Currency**: Always specify currency for monetary events
4. **Custom Parameters**: Add relevant custom parameters for better audience segmentation
5. **Error Handling**: The integration includes fallbacks for when the pixel fails to load

## Privacy Considerations

- The pixel respects user privacy settings and ad blockers
- Consider implementing consent management for GDPR compliance
- The noscript fallback ensures basic tracking even with JavaScript disabled

## Troubleshooting

### Pixel Not Loading
- Check browser console for errors
- Verify the pixel ID is correct
- Check if ad blockers are interfering
- Use Meta Pixel Helper to diagnose issues

### Events Not Firing
- Ensure the FacebookPixelProvider wraps your components
- Check that the pixel is loaded before tracking events
- Verify event parameters are correctly formatted
- Check the browser console for error messages

### TypeScript Errors
- Ensure `src/types/global.d.ts` is included in your TypeScript configuration
- Verify all imports are correct
- Check that the pixel context is properly typed

## Support

For additional help:
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel/)
- [Meta Business Help Center](https://www.facebook.com/business/help/)
- [Meta Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) 