# Background Images

This directory contains the background images used in the web application.

## Image Requirements

- Replace the placeholder JPG files with your own background images
- Keep the same filenames (background-1.jpg, background-2.jpg, etc.)
- Recommended image size: 1920x1080 or larger (16:9 aspect ratio)
- Use high-quality, optimized images for web (compressed JPG format)
- Darker images work best with the overlay effects

## Enhanced Animated Background System

The application now uses an improved background system with the following features:

1. **Dynamic Movement**: Images subtly move and animate for a more engaging experience
2. **Shuffling Grid Layout**: Multiple images shown in a responsive grid that changes over time
3. **Smooth Transitions**: Animated transitions when shuffling between images
4. **Lazy Loading**: Images are loaded progressively as needed, not all at once
5. **Performance Optimized**: Only loads images as they're needed, reducing initial load time
6. **Client-side Only**: No external services required - everything works locally

### How It Works

- The `BackgroundSlider` component displays images in a 2x3 grid layout
- Images have subtle continuous motion with spring animations
- Every few seconds, the grid is shuffled with new random images
- Images use animation effects (scale, position, opacity) during transitions
- Loading happens progressively in small batches for better performance

## Configuration Options

You can configure the background slider by modifying these props:

```tsx
<BackgroundSlider 
  interval={12000}           // Time between image shuffles (ms)
  transitionDuration={2000}  // Duration of transition animations (ms)
  maxBackgrounds={40}        // Maximum number of backgrounds to check for
  initialLoadCount={4}       // How many images to load initially
  batchSize={4}              // How many images to load in each subsequent batch
/>
```

## Optimizing Your Own Images

For best performance, consider optimizing your images before adding them:

1. **Resize Large Images**: Keep dimensions reasonable (max 1920x1080 for most uses)
2. **Compress Images**: Use tools like ImageOptim, TinyPNG, or Squoosh
3. **Use Modern Formats**: Consider WebP format for better compression (with fallbacks)
4. **Consistent Naming**: Follow the naming pattern (background-1.jpg, background-2.jpg, etc.)

## Technical Implementation

The enhanced background system uses:

- CSS Grid for responsive image layout
- Framer Motion for smooth animations and transitions
- Spring animations for natural-feeling movements
- Continuous subtle movement for more dynamic visuals
- Batch loading strategy to improve performance
- requestAnimationFrame for smooth animations
- No external dependencies or services 