import { useEffect, useState } from 'react';

/**
 * Simple image preloading utility for local usage
 * Loads images in the background with priority for current and next images
 * 
 * @param paths Array of image paths to preload
 * @param priorityIndices Array of indices that should be loaded first
 * @returns Promise that resolves when priority images are loaded
 */
export const preloadImages = (
  paths: string[], 
  priorityIndices: number[] = []
): Promise<void> => {
  return new Promise((resolve) => {
    if (paths.length === 0) {
      resolve();
      return;
    }

    // Sort paths to load priority images first
    const sortedPaths = [...paths];
    const priorityPaths: string[] = [];
    
    // Extract priority paths
    priorityIndices.forEach(index => {
      if (index >= 0 && index < paths.length) {
        priorityPaths.push(paths[index]);
      }
    });

    // First load priority images
    let loadedCount = 0;
    let priorityLoadedCount = 0;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (priorityLoadedCount === priorityPaths.length) {
        // Resolve once all priority images are loaded
        resolve();
      }
    };

    // Load priority images first
    priorityPaths.forEach(path => {
      const img = new Image();
      img.onload = () => {
        priorityLoadedCount++;
        checkAllLoaded();
      };
      img.onerror = () => {
        console.warn(`Failed to preload priority image: ${path}`);
        checkAllLoaded();
      };
      img.src = path;
    });

    // Then load the rest of the images in the background
    setTimeout(() => {
      sortedPaths.forEach(path => {
        // Skip if it's a priority path that's already loading
        if (priorityPaths.includes(path)) return;
        
        const img = new Image();
        img.onload = () => {};
        img.onerror = () => {
          console.warn(`Failed to preload non-priority image: ${path}`);
        };
        img.src = path;
      });
    }, 500); // Small delay to prioritize the priority images

    // If there are no priority images, resolve immediately
    if (priorityPaths.length === 0) {
      resolve();
    }
  });
};

/**
 * Hook for lazy loading images in batches with crossfade capabilities
 * Completely client-side without external dependencies
 */
export const useBatchImageLoader = (
  imagePaths: string[],
  batchSize: number = 4,
  initialLoadCount: number = 2
) => {
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());
  const [loadingIndices, setLoadingIndices] = useState<Set<number>>(new Set());
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Function to load a batch of images
  const loadBatch = async (startIdx: number, count: number, priority: boolean = false) => {
    if (imagePaths.length === 0) return;
    
    const endIdx = Math.min(startIdx + count, imagePaths.length);
    const indicesToLoad: number[] = [];
    
    // Create arrays for set manipulation since we can't directly modify sets in React state
    const newLoadingIndices = Array.from(loadingIndices);
    
    // Find which indices in the batch need loading
    for (let i = startIdx; i < endIdx; i++) {
      if (!loadedIndices.has(i) && !loadingIndices.has(i)) {
        indicesToLoad.push(i);
        newLoadingIndices.push(i);
      }
    }
    
    if (indicesToLoad.length === 0) return;
    
    // Update loading indices
    setLoadingIndices(new Set(newLoadingIndices));
    
    // Prepare paths and prioritize the first batch
    const pathsToLoad = indicesToLoad.map(idx => imagePaths[idx]);
    
    // Use the preloading utility
    await preloadImages(
      pathsToLoad, 
      priority ? Array.from({ length: pathsToLoad.length }, (_, i) => i) : []
    );
    
    // Mark as loaded and remove from loading
    setLoadedIndices(prevLoaded => {
      const newLoaded = new Set(prevLoaded);
      indicesToLoad.forEach(idx => newLoaded.add(idx));
      return newLoaded;
    });
    
    setLoadingIndices(prevLoading => {
      const newLoading = new Set(prevLoading);
      indicesToLoad.forEach(idx => newLoading.delete(idx));
      return newLoading;
    });
    
    return indicesToLoad;
  };

  // Load initial batch on mount
  useEffect(() => {
    const loadInitialBatch = async () => {
      await loadBatch(0, initialLoadCount, true);
      setIsInitialLoadComplete(true);
    };
    
    loadInitialBatch();
  }, [imagePaths]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loadedIndices,
    loadingIndices,
    isInitialLoadComplete,
    loadBatch
  };
};

/**
 * Check if an image is fully loaded
 * @param path Image path
 * @returns Promise resolving to true if loaded, false if error
 */
export const checkImageLoaded = (path: string): Promise<boolean> => {
  return new Promise(resolve => {
    if (!path) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
  });
};

/**
 * Generate a responsive image size based on device width
 * Works locally without external services
 * 
 * @param path Original image path
 * @returns Original path (no transformation in local version)
 */
export const getResponsiveImagePath = (path: string): string => {
  // In this local version, we just return the original path
  // In a more advanced implementation, you could use local image 
  // processing libraries or generate multiple sizes at build time
  return path;
};

/**
 * Defers lazy loading of images until they're needed
 * @param callback Function to call for loading
 * @param delay Delay in ms before loading starts
 */
export const deferImageLoading = (callback: () => void, delay: number = 100): void => {
  setTimeout(callback, delay);
}; 