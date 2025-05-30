import React, { createContext, useContext, ReactNode } from 'react';
import useFacebookPixel from '../hooks/useFacebookPixel';

interface FacebookPixelContextType {
  trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
  trackCustomEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
  trackPurchase: (value: number, currency?: string, contentIds?: string[]) => void;
  trackLead: (value?: number, currency?: string) => void;
  trackCompleteRegistration: (value?: number, currency?: string) => void;
  trackInitiateCheckout: (value?: number, currency?: string, numItems?: number) => void;
  trackAddToCart: (value?: number, currency?: string, contentName?: string) => void;
  trackViewContent: (contentName?: string, contentCategory?: string, value?: number) => void;
  trackSearch: (searchString: string, value?: number) => void;
  isLoaded: boolean;
}

const FacebookPixelContext = createContext<FacebookPixelContextType | undefined>(undefined);

interface FacebookPixelProviderProps {
  children: ReactNode;
  pixelId: string;
  debug?: boolean;
}

export const FacebookPixelProvider: React.FC<FacebookPixelProviderProps> = ({
  children,
  pixelId,
  debug = false
}) => {
  const pixelMethods = useFacebookPixel({ pixelId, debug });

  return (
    <FacebookPixelContext.Provider value={pixelMethods}>
      {children}
    </FacebookPixelContext.Provider>
  );
};

export const useFacebookPixelContext = (): FacebookPixelContextType => {
  const context = useContext(FacebookPixelContext);
  if (context === undefined) {
    throw new Error('useFacebookPixelContext must be used within a FacebookPixelProvider');
  }
  return context;
};

export default FacebookPixelContext; 