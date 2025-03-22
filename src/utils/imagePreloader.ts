/**
 * Utility to preload images
 * @param imagePaths Array of image paths to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  const loadPromises = imagePaths.map(path => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = (e) => {
        console.warn(`Failed to preload image: ${path}`, e);
        resolve(); // Resolve anyway to not block other images
      };
      img.src = path;
    });
  });

  return Promise.all(loadPromises);
};

/**
 * List of possible extensions to try for each background
 */
const POSSIBLE_EXTENSIONS = ['-min.jpg', '-min.JPG', '-min.jpeg', '-min.JPEG', '.jpg', '.JPG', '.jpeg', '.JPEG'];

/**
 * Generate background image paths with multiple possible extensions
 * @param count Number of backgrounds
 * @returns Array of arrays containing possible paths for each background
 */
export const getAllPossiblePaths = (count: number): string[][] => {
  return Array.from({ length: count }, (_, i) => {
    const basePathWithoutExtension = `/backgrounds/background-${i + 1}`;
    return POSSIBLE_EXTENSIONS.map(ext => `${basePathWithoutExtension}${ext}`);
  });
};

/**
 * Generate background image paths with first found extension
 * @param count Number of backgrounds
 * @param foundExtensions Array of found extensions for each background
 * @returns Array of background image paths
 */
export const getBackgroundPaths = (count: number, foundExtensions: string[]): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const ext = foundExtensions[i] || '.jpg'; // Default to .jpg if no extension found
    return `/backgrounds/background-${i + 1}${ext}`;
  });
};

/**
 * Dynamically detect available background images
 * @param maxImagesToCheck Maximum number of images to check for
 * @returns Promise that resolves with the object containing count and found extensions
 */
export const detectBackgroundCount = async (maxImagesToCheck: number = 40): Promise<{count: number, extensions: string[]}> => {
  let availableCount = 0;
  const foundExtensions: string[] = Array(maxImagesToCheck).fill('');
  
  // Get all possible path combinations
  const allPossiblePaths = getAllPossiblePaths(maxImagesToCheck);
  
  // For each background index, try all possible extensions
  const checkPromises = allPossiblePaths.map((pathOptions, idx) => {
    return new Promise<boolean>(resolve => {
      // Try each extension one by one
      const tryNextExtension = (extIndex: number) => {
        if (extIndex >= pathOptions.length) {
          // No valid extension found for this background
          resolve(false);
          return;
        }
        
        const path = pathOptions[extIndex];
        const img = new Image();
        
        img.onload = () => {
          availableCount++;
          foundExtensions[idx] = POSSIBLE_EXTENSIONS[extIndex];
          resolve(true);
        };
        
        img.onerror = () => {
          // Try the next extension
          tryNextExtension(extIndex + 1);
        };
        
        img.src = path;
      };
      
      // Start trying with the first extension
      tryNextExtension(0);
    });
  });
  
  await Promise.all(checkPromises);
  
  // Clean up the extensions array to match the actual count
  const finalExtensions = foundExtensions.slice(0, Math.max(availableCount, 1));
  
  // Ensure we return at least 1 if no images are found
  return {
    count: Math.max(availableCount, 1),
    extensions: finalExtensions
  };
}; 