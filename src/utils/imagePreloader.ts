/**
 * Default safe background numbers to use as fallbacks
 * These are known to exist in the backgrounds folder
 */
export const SAFE_BACKGROUND_NUMBERS = [1, 2, 10, 11, 12, 13, 14, 15, 16, 18, 19, 22, 23, 24, 25, 26, 28, 29];

/**
 * Get a safe fallback background path
 * @returns A background image path known to exist
 */
export const getSafeBackgroundPath = (): string => {
  // Pick a random background from the safe list
  const randomIndex = Math.floor(Math.random() * SAFE_BACKGROUND_NUMBERS.length);
  const safeNumber = SAFE_BACKGROUND_NUMBERS[randomIndex];
  
  // Check if the number is higher than 21, use .jpeg extension
  if (safeNumber >= 22) {
    return `/backgrounds/background-${safeNumber}.jpeg`;
  }
  
  // For backgrounds 10-19, use -min.JPG
  if (safeNumber >= 10 && safeNumber <= 19) {
    return `/backgrounds/background-${safeNumber}-min.JPG`;
  }
  
  // For backgrounds 1-2, use -min.jpg
  return `/backgrounds/background-${safeNumber}-min.jpg`;
};

/**
 * Utility to preload images
 * @param imagePaths Array of image paths to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (imagePaths: string[]): Promise<void[]> => {
  // Filter out the known failing images
  const filteredPaths = imagePaths.filter(path => {
    const number = parseInt(path.match(/background-(\d+)/)?.[1] || '0', 10);
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
  // Only check safe background numbers we know exist
  const backgrounds = SAFE_BACKGROUND_NUMBERS.filter(num => num <= maxImagesToCheck);
  let availableCount = 0;
  const foundExtensions: string[] = Array(maxImagesToCheck).fill('');
  
  // For each safe background index, try the appropriate extension format
  const checkPromises = backgrounds.map(bgNum => {
    return new Promise<boolean>(resolve => {
      const img = new Image();
      
      // Determine the right path based on the background number
      let path = '';
      if (bgNum >= 22) {
        path = `/backgrounds/background-${bgNum}.jpeg`;
      } else if (bgNum >= 10 && bgNum <= 19) {
        path = `/backgrounds/background-${bgNum}-min.JPG`;
      } else {
        path = `/backgrounds/background-${bgNum}-min.jpg`;
      }
      
      img.onload = () => {
        availableCount++;
        // Store the appropriate extension
        if (bgNum >= 22) {
          foundExtensions[bgNum - 1] = '.jpeg';
        } else if (bgNum >= 10 && bgNum <= 19) {
          foundExtensions[bgNum - 1] = '-min.JPG';
        } else {
          foundExtensions[bgNum - 1] = '-min.jpg';
        }
        resolve(true);
      };
      
      img.onerror = () => {
        // This shouldn't happen for our safe list, but just in case
        console.warn(`Failed to load known good image: ${path}`);
        resolve(false);
      };
      
      img.src = path;
    });
  });
  
  await Promise.all(checkPromises);
  
  // Clean up the extensions array to match the actual count
  const finalExtensions = foundExtensions.slice(0, Math.max(availableCount, 1));
  
  console.log(`Detected ${availableCount} confirmed background images`);
  
  // Ensure we return at least 1 if no images are found
  return {
    count: Math.max(availableCount, 1),
    extensions: finalExtensions
  };
}; 