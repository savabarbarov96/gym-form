import { useEffect, useCallback } from 'react';

interface FacebookPixelConfig {
  pixelId: string;
  debug?: boolean;
}

interface TrackEventParams {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: Array<{ id: string; quantity: number }>;
  num_items?: number;
  search_string?: string;
  status?: boolean;
  [key: string]: unknown;
}

const useFacebookPixel = (config: FacebookPixelConfig) => {
  const { pixelId, debug = false } = config;

  useEffect(() => {
    // Check if pixel is already loaded
    if (window.fbq) {
      if (debug) console.log('Facebook Pixel already loaded');
      return;
    }

    // Load Facebook Pixel script using a simpler approach
    const loadPixel = () => {
      // Create the fbq function with proper typing
      const fbq: any = function(...args: any[]) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else {
          fbq.queue.push(args);
        }
      };

      // Set up the fbq object properties
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      fbq.callMethod = null;

      // Set up the global fbq
      if (!window.fbq) window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;

      // Create and append the script tag
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }

      // Initialize the pixel
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
      
      if (debug) {
        console.log('Facebook Pixel initialized with ID:', pixelId);
      }
    };

    loadPixel();
  }, [pixelId, debug]);

  // Track standard events
  const trackEvent = useCallback((eventName: string, parameters?: TrackEventParams) => {
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
      if (debug) {
        console.log('Facebook Pixel event tracked:', eventName, parameters);
      }
    } else {
      console.warn('Facebook Pixel not loaded');
    }
  }, [debug]);

  // Track custom events
  const trackCustomEvent = useCallback((eventName: string, parameters?: TrackEventParams) => {
    if (window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
      if (debug) {
        console.log('Facebook Pixel custom event tracked:', eventName, parameters);
      }
    } else {
      console.warn('Facebook Pixel not loaded');
    }
  }, [debug]);

  // Predefined tracking functions for common events
  const trackPurchase = useCallback((value: number, currency = 'USD', contentIds?: string[]) => {
    trackEvent('Purchase', {
      value,
      currency,
      content_ids: contentIds,
      content_type: 'product'
    });
  }, [trackEvent]);

  const trackLead = useCallback((value?: number, currency = 'USD') => {
    trackEvent('Lead', {
      value,
      currency
    });
  }, [trackEvent]);

  const trackCompleteRegistration = useCallback((value?: number, currency = 'USD') => {
    trackEvent('CompleteRegistration', {
      value,
      currency,
      status: true
    });
  }, [trackEvent]);

  const trackInitiateCheckout = useCallback((value?: number, currency = 'USD', numItems?: number) => {
    trackEvent('InitiateCheckout', {
      value,
      currency,
      num_items: numItems
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((value?: number, currency = 'USD', contentName?: string) => {
    trackEvent('AddToCart', {
      value,
      currency,
      content_name: contentName,
      content_type: 'product'
    });
  }, [trackEvent]);

  const trackViewContent = useCallback((contentName?: string, contentCategory?: string, value?: number) => {
    trackEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value,
      currency: 'USD'
    });
  }, [trackEvent]);

  const trackSearch = useCallback((searchString: string, value?: number) => {
    trackEvent('Search', {
      search_string: searchString,
      value,
      currency: 'USD'
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackCustomEvent,
    trackPurchase,
    trackLead,
    trackCompleteRegistration,
    trackInitiateCheckout,
    trackAddToCart,
    trackViewContent,
    trackSearch,
    isLoaded: !!window.fbq
  };
};

export default useFacebookPixel; 