import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFacebookPixel from '../hooks/useFacebookPixel';

interface FacebookPixelProps {
  pixelId: string;
  debug?: boolean;
}

const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId, debug = false }) => {
  const location = useLocation();
  const { trackEvent } = useFacebookPixel({ pixelId, debug });

  // Track page views on route changes
  useEffect(() => {
    trackEvent('PageView');
  }, [location.pathname, trackEvent]);

  // Add noscript fallback for users with JavaScript disabled
  useEffect(() => {
    // Create noscript element for fallback tracking
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    
    // Add to document head
    document.head.appendChild(noscript);

    // Cleanup function
    return () => {
      if (document.head.contains(noscript)) {
        document.head.removeChild(noscript);
      }
    };
  }, [pixelId]);

  return null; // This component doesn't render anything visible
};

export default FacebookPixel; 