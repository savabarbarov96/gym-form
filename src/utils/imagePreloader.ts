/**
 * Default safe background numbers to use as fallbacks
 * These are known to exist in the backgrounds folder
 */
export const SAFE_BACKGROUND_NUMBERS = [1, 2, 3, 5, 7, 9, 18, 22, 23, 24, 25, 26, 28, 29];

/**
 * Map of background numbers to their exact file extensions
 * Based on the actual files in the backgrounds folder
 */
export const BACKGROUND_FILE_MAP: Record<number, string> = {
  1: '-min.jpg',
  2: '-min.jpg',
  3: '-min.jpg',
  5: '-min.jpg',
  7: '-min.JPG',
  9: '-min.JPG',
  10: '-min.JPG',
  11: '-min.JPG',
  12: '-min.JPG',
  13: '-min.JPG',
  14: '-min.JPG',
  15: '-min.JPG',
  16: '-min.JPG',
  18: '-min.JPG',
  19: '-min.JPG',
  22: '.jpeg',
  23: '.jpeg',
  24: '.jpeg',
  25: '.jpeg',
  26: '.jpeg',
  28: '.jpeg',
  29: '.jpeg'
};

/**
 * Get a safe fallback background path
 * @returns A background image path known to exist
 */
export const getSafeBackgroundPath = (): string => {
  // Pick a random background from the safe list
  const randomIndex = Math.floor(Math.random() * SAFE_BACKGROUND_NUMBERS.length);
  const safeNumber = SAFE_BACKGROUND_NUMBERS[randomIndex];
  
  // Get the correct extension from the mapping
  const extension = BACKGROUND_FILE_MAP[safeNumber] || '-min.jpg';
  
  return `/backgrounds/background-${safeNumber}${extension}`;
};

/**
 * Utility to preload images
 * @param imagePaths Array of image paths to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  // Filter out any images that aren't in our safe list
  const filteredPaths = imagePaths.filter(path => {
    const match = path.match(/background-(\d+)/);
    if (!match) return false;
    
    const number = parseInt(match[1], 10);
    return SAFE_BACKGROUND_NUMBERS.includes(number);
  });
  
  // No need to add a fallback since we'll use getSafeBackgroundPath() when needed
  
  const loadPromises = filteredPaths.map(path => {
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
 * Generate correct background image paths based on our file mapping
 * @param count Maximum number of backgrounds to include
 * @returns Array of background image paths
 */
export const getBackgroundPaths = (): string[] => {
  return SAFE_BACKGROUND_NUMBERS.map(num => {
    const extension = BACKGROUND_FILE_MAP[num] || '-min.jpg';
    return `/backgrounds/background-${num}${extension}`;
  });
};

/**
 * Dynamically detect available background images and their correct extensions
 * @returns Promise that resolves with the object containing count and paths
 */
export const detectBackgroundImages = async (): Promise<{count: number, paths: string[]}> => {
  const paths = getBackgroundPaths();
  let availableCount = 0;
  
  // Check each path to confirm it's loadable
  const checkPromises = paths.map(path => {
    return new Promise<boolean>(resolve => {
      const img = new Image();
      
      img.onload = () => {
        availableCount++;
        resolve(true);
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${path}`);
        resolve(false);
      };
      
      img.src = path;
    });
  });
  
  await Promise.all(checkPromises);
  
  console.log(`Detected ${availableCount} confirmed background images`);
  
  // Ensure we return at least 1 if no images are found
  return {
    count: Math.max(availableCount, 1),
    paths: paths.slice(0, Math.max(availableCount, 1))
  };
};

/**
 * BACKWARD COMPATIBILITY function for detectBackgroundCount
 * @param maxImagesToCheck Maximum number of images to check for
 * @returns Promise that resolves with count and extensions to maintain old interface
 */
export const detectBackgroundCount = async (maxImagesToCheck: number = 40): Promise<{count: number, extensions: string[]}> => {
  // Use the new function but convert the result format
  const result = await detectBackgroundImages();
  
  // Create a simplified extensions array for backward compatibility
  const extensions = SAFE_BACKGROUND_NUMBERS.map(num => BACKGROUND_FILE_MAP[num] || '-min.jpg');
  
  return {
    count: result.count,
    extensions: extensions
  };
}; 