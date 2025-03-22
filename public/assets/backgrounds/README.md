# Fallback Background Image

This directory contains the fallback background image used when other background images fail to load.

## Important Note

Please add a file named `fallback-background.jpg` to this directory. This image will be used as a fallback when other background images cannot be loaded.

Recommended specifications:
- File name: `fallback-background.jpg`
- Size: 1920x1080 or larger (16:9 aspect ratio)
- Format: JPG
- Optimized for web (compressed)
- Dark or neutral color that works well with overlays

## Usage

This fallback image is automatically used by the application when:
1. No other background images are available
2. A selected background image fails to load
3. The path to a background image is invalid

The fallback mechanism is defined in `src/utils/imagePreloader.ts` and used in `src/pages/Index.tsx`. 