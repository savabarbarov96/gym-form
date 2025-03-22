import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadImages, useBatchImageLoader, deferImageLoading } from '@/utils/imageOptimizer';
import { detectBackgroundCount, getBackgroundPaths } from '@/utils/imagePreloader';

interface BackgroundSliderProps {
  interval?: number;
  transitionDuration?: number;
  maxBackgrounds?: number;
  initialLoadCount?: number;
  batchSize?: number;
}

// Animation variants for the background images
const imageAnimationVariants = {
  initial: (direction: number) => ({
    scale: 0.9,
    opacity: 0,
  }),
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { type: 'spring', stiffness: 50, damping: 20 },
      opacity: { duration: 1.0 }
    }
  },
  exit: (direction: number) => ({
    scale: 1.1,
    opacity: 0,
    transition: {
      duration: 1.0
    }
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5
    }
  }
};

export const BackgroundSlider: React.FC<BackgroundSliderProps> = ({
  interval = 6000, // Smaller interval for more frequent transitions
  transitionDuration = 1500, // Faster transitions
  maxBackgrounds = 40,
  initialLoadCount = 4,
  batchSize = 4,
}) => {
  // State for background management
  const [backgroundPaths, setBackgroundPaths] = useState<string[]>([]);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const [nextLeftIndex, setNextLeftIndex] = useState(2);
  const [nextRightIndex, setNextRightIndex] = useState(3);
  const [totalBackgrounds, setTotalBackgrounds] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // State for transition animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(1); // 1 or -1
  
  // Animation state
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Refs for animation control
  const lastTransitionTime = useRef<number>(Date.now());
  const animationFrameId = useRef<number | null>(null);
  const hasInitialized = useRef<boolean>(false);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Use our custom batch loader
  const { loadedIndices, isInitialLoadComplete, loadBatch } = useBatchImageLoader(
    backgroundPaths,
    batchSize,
    initialLoadCount
  );
  
  // Initialize background images on component mount
  useEffect(() => {
    const initializeBackgrounds = async () => {
      if (hasInitialized.current) return;
      hasInitialized.current = true;
      
      try {
        // Detect available background images
        const result = await detectBackgroundCount(maxBackgrounds);
        const { count, extensions } = result;
        console.log(`Detected ${count} background images with various extensions`);
        
        // Generate paths for all detected images
        const paths = getBackgroundPaths(count, extensions);
        setBackgroundPaths(paths);
        setTotalBackgrounds(count);
        
        // Set initial random indices ensuring all 4 are different
        const indices = getRandomIndices(count, 4);
        setLeftIndex(indices[0]);
        setRightIndex(indices[1]);
        setNextLeftIndex(indices[2]);
        setNextRightIndex(indices[3]);
        
        // Preload the initial images with high priority
        await preloadImages(
          indices.map(idx => paths[idx]),
          [0, 1, 2, 3] // All are high priority for initial load
        );
        
        setIsInitialLoading(false);
        
        // Start the continuous subtle movement animation
        startContinuousAnimation();
        
        // Preload a few more images in the background
        setTimeout(() => {
          const remainingIndices = Array.from({ length: Math.min(count, 8) }, (_, i) => i)
            .filter(i => !indices.includes(i));
          
          if (remainingIndices.length > 0) {
            preloadImages(
              remainingIndices.map(idx => paths[idx]),
              [] // No priority for background loading
            );
          }
        }, 2000);
      } catch (error) {
        console.error("Failed to initialize backgrounds:", error);
        setIsInitialLoading(false);
      }
    };
    
    initializeBackgrounds();
    
    return () => {
      // Cleanup animation frame and interval
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (animationInterval.current !== null) {
        clearInterval(animationInterval.current);
      }
    };
  }, [maxBackgrounds, initialLoadCount]);
  
  // Helper function to get random unique indices
  const getRandomIndices = (max: number, count: number): number[] => {
    const indices: number[] = [];
    while (indices.length < Math.min(count, max)) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };
  
  // Start continuous subtle animation for the background
  const startContinuousAnimation = useCallback(() => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }
    
    animationInterval.current = setInterval(() => {
      setAnimationProgress(prev => {
        const newValue = prev + 0.01;
        return newValue > 1 ? 0 : newValue;
      });
    }, 50);
  }, []);
  
  // Load more images as needed
  useEffect(() => {
    if (!isInitialLoadComplete || backgroundPaths.length === 0) return;
    
    const loadMoreImages = () => {
      // Calculate how many images we've already loaded
      const loadedCount = loadedIndices.size;
      
      // If we haven't loaded all images yet, load the next batch
      if (loadedCount < totalBackgrounds) {
        // Load images in small batches
        deferImageLoading(() => {
          loadBatch(loadedCount, batchSize);
        }, 1000);
      }
    };
    
    loadMoreImages();
  }, [backgroundPaths, isInitialLoadComplete, loadedIndices, loadBatch, totalBackgrounds, batchSize]);
  
  // Function to transition to next pair of images
  const transitionToNextImages = useCallback(() => {
    if (totalBackgrounds < 4) return;
    
    // Choose a new random direction
    setAnimationDirection(Math.random() > 0.5 ? 1 : -1);
    
    // Move next images to current
    setLeftIndex(nextLeftIndex);
    setRightIndex(nextRightIndex);
    
    // Pick new next images that are different from current
    const availableIndices = Array.from({ length: totalBackgrounds }, (_, i) => i)
      .filter(i => i !== nextLeftIndex && i !== nextRightIndex);
    
    if (availableIndices.length >= 2) {
      // Randomly shuffle the available indices
      for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
      }
      
      setNextLeftIndex(availableIndices[0]);
      setNextRightIndex(availableIndices[1]);
      
      // Preload the next images
      const imagesToLoad = [availableIndices[0], availableIndices[1]]
        .filter(idx => !loadedIndices.has(idx));
      
      if (imagesToLoad.length > 0) {
        preloadImages(
          imagesToLoad.map(idx => backgroundPaths[idx]),
          Array.from({ length: imagesToLoad.length }, (_, i) => i)
        );
      }
    }
    
    // Signal transition is happening
    setIsTransitioning(true);
    lastTransitionTime.current = Date.now();
  }, [nextLeftIndex, nextRightIndex, totalBackgrounds, loadedIndices, backgroundPaths]);
  
  // Effect for timing the background transitions
  useEffect(() => {
    if (isInitialLoading || isTransitioning || totalBackgrounds < 4) return;
    
    const checkForNextTransition = () => {
      const now = Date.now();
      const elapsed = now - lastTransitionTime.current;
      
      if (elapsed >= interval) {
        // Time to transition to next images
        transitionToNextImages();
      } else {
        // Check again soon
        animationFrameId.current = requestAnimationFrame(checkForNextTransition);
      }
    };
    
    // Start checking for next transition
    animationFrameId.current = requestAnimationFrame(checkForNextTransition);
    
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isInitialLoading, isTransitioning, interval, transitionToNextImages, totalBackgrounds]);
  
  // Effect for handling transition animation
  useEffect(() => {
    if (!isTransitioning) return;
    
    const updateTransition = () => {
      const now = Date.now();
      const elapsed = now - lastTransitionTime.current;
      const progress = Math.min(elapsed / transitionDuration, 1);
      
      if (progress < 1) {
        // Continue animation
        animationFrameId.current = requestAnimationFrame(updateTransition);
      } else {
        // Transition complete
        setIsTransitioning(false);
        lastTransitionTime.current = now;
      }
    };
    
    // Start transition animation
    animationFrameId.current = requestAnimationFrame(updateTransition);
    
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isTransitioning, transitionDuration]);
  
  // Function to safely get image path with optimization parameters
  const getImagePath = useCallback((index: number) => {
    if (backgroundPaths.length === 0 || index >= backgroundPaths.length) {
      return '';
    }
    const basePath = backgroundPaths[index];
    
    // Check if it's a modern format that supports WebP conversion
    // For local development, we can't transform on-the-fly, but in production
    // this could be replaced with proper image optimization service parameters
    return basePath;
  }, [backgroundPaths]);
  
  // Calculate subtle movement transforms based on animation progress
  const getMovementStyle = useCallback((isLeft: boolean) => {
    const baseX = Math.sin(animationProgress * Math.PI * 2 + (isLeft ? 0 : Math.PI)) * 3;
    const baseY = Math.cos(animationProgress * Math.PI * 2 + (isLeft ? 0 : Math.PI * 0.7)) * 3;
    const baseScale = 1 + Math.sin(animationProgress * Math.PI * 2 + (isLeft ? 0 : Math.PI * 0.3)) * 0.02;
    
    return {
      transform: `translate(${baseX}px, ${baseY}px) scale(${baseScale})`,
      transition: 'transform 4s ease-out'
    };
  }, [animationProgress]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <div className="relative h-full w-full">
        {/* Loading state */}
        {isInitialLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <div className="text-white animate-pulse">Loading backgrounds...</div>
          </div>
        )}
        
        {/* Two-panel layout (left and right) */}
        <div className="absolute inset-0 flex">
          {/* Left panel */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={`left-${leftIndex}`}
                className="absolute inset-0 overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageAnimationVariants}
                custom={animationDirection}
                whileHover="hover"
              >
                <img 
                  src={getImagePath(leftIndex)}
                  alt={`Background left ${leftIndex}`}
                  className="w-full h-full object-cover"
                  style={{
                    ...getMovementStyle(true),
                    filter: 'brightness(1.1)'
                  }}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right panel */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={`right-${rightIndex}`}
                className="absolute inset-0 overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageAnimationVariants}
                custom={-animationDirection}
                whileHover="hover"
              >
                <img 
                  src={getImagePath(rightIndex)}
                  alt={`Background right ${rightIndex}`}
                  className="w-full h-full object-cover"
                  style={{
                    ...getMovementStyle(false),
                    filter: 'brightness(1.1)'
                  }}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Overlay effects - preserved from original */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-slate-900/75 mix-blend-multiply z-[2]"></div>
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-blue-900/20 mix-blend-overlay"
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
          }}
          transition={{ 
            duration: 15, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        
        {/* Light beams effect */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute -inset-full h-[500%] w-[500%] bg-gradient-radial from-white/5 to-transparent opacity-30"
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
            }}
            style={{ transformOrigin: "60% 30%" }}
          ></motion.div>
        </motion.div>
        
        {/* Mesh pattern overlay */}
        <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] bg-repeat opacity-10"></div>
      </div>
    </div>
  );
}; 