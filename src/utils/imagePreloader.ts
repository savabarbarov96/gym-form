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
 * List of possible extensions to try for each background in priority order
 * Only using minified versions for performance
 */
const POSSIBLE_EXTENSIONS = [
  // Only using minified versions
  '-min.jpg', '-min.JPG', '-min.jpeg', '-min.JPEG'
];

// Known working minified backgrounds under 2MB (add or remove as needed)
const CONFIRMED_BACKGROUNDS = [
  1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 30
];

/**
 * Generate background image paths with multiple possible extensions
 * @returns Array of arrays containing possible paths for each background
 */
export const getAllPossiblePaths = (): string[][] => {
  return CONFIRMED_BACKGROUNDS.map(num => {
    const basePathWithoutExtension = `/backgrounds/background-${num}`;
    return POSSIBLE_EXTENSIONS.map(ext => `${basePathWithoutExtension}${ext}`);
  });
};

/**
 * Generate background image paths with first found extension
 * @param foundImages Map of image indices to their found extensions
 * @returns Array of background image paths
 */
export const getBackgroundPaths = (foundImages: Map<number, string>): string[] => {
  return Array.from(foundImages.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([num, ext]) => `/backgrounds/background-${num}${ext}`);
};

/**
 * Dynamically detect available background images with improved logging and error handling
 * @returns Promise that resolves with the object containing count and paths
 */
export const detectBackgroundCount = async (): Promise<{count: number, extensions: string[]}> => {
  const foundImages = new Map<number, string>();
  const failedImages: number[] = [];
  
  // Get all possible path combinations
  const allPossiblePaths = getAllPossiblePaths();
  
  // For each background index, try all possible extensions
  const checkPromises = CONFIRMED_BACKGROUNDS.map((num, idx) => {
    const pathOptions = allPossiblePaths[idx];
    
    return new Promise<boolean>(resolve => {
      // Try each extension one by one
      const tryNextExtension = (extIndex: number) => {
        if (extIndex >= pathOptions.length) {
          // No valid extension found for this background
          failedImages.push(num);
          resolve(false);
          return;
        }
        
        const path = pathOptions[extIndex];
        const img = new Image();
        
        img.onload = () => {
          foundImages.set(num, POSSIBLE_EXTENSIONS[extIndex]);
          console.debug(`Found image: ${path}`);
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
  
  // Log failed images
  if (failedImages.length > 0) {
    console.warn(`Failed to load background images: ${failedImages.join(', ')}`);
  }
  
  // Generate final paths
  const finalPaths = getBackgroundPaths(foundImages);
  console.log('Available background images:', finalPaths);
  
  // Ensure we return at least 1 if no images are found
  return {
    count: Math.max(foundImages.size, 1),
    extensions: Array.from(foundImages.values())
  };
}; 