# Background Images

This directory contains the background images used in the web application.

## Image Requirements

- Replace the placeholder JPG files with your own background images
- Keep the same filenames (background-1.jpg, background-2.jpg, etc.)
- Recommended image size: 1920x1080 or larger (16:9 aspect ratio)
- Use high-quality, optimized images for web (compressed JPG format)
- Darker images work best with the overlay effects

## Usage

The application automatically rotates through these background images. The rotation
logic can be found in the `Index.tsx` file using the `useBackgroundRotation` custom hook.

To modify the rotation timing, update the interval parameter (in milliseconds) in the hook usage:
```tsx
const { currentBgIndex, isLoading } = useBackgroundRotation(5, 8000); // 8 seconds per image
```

## Adding More Images

If you need to add more than the 5 default backgrounds:

1. Add additional files with sequential names (background-6.jpg, background-7.jpg, etc.)
2. Update the total count in the useBackgroundRotation hook:
```tsx
const { currentBgIndex, isLoading } = useBackgroundRotation(7, 8000); // Now using 7 images
``` 