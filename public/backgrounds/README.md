# Background Images Documentation

## Naming Convention

All background images must follow this naming pattern:

```
background-NUMBER[-min].(jpg|jpeg|JPG|JPEG)
```

Where:
- `NUMBER` is a sequential number starting from 1 (e.g., 1, 2, 3...)
- `-min` suffix is optional but recommended for optimized images
- File extension can be jpg, jpeg, JPG, or JPEG

## Optimization Guidelines

### Recommended Format
- Use `-min` suffix for all optimized/compressed images
- Optimized images should be around 100-300KB in size
- Resolution: 1920x1080 or similar 16:9 aspect ratio
- JPEG format with 80-85% quality is recommended

### Image Processing
1. Use image optimization tools like TinyPNG, ImageOptim, or Squoosh
2. Resize large images to appropriate dimensions (1920x1080 maximum)
3. Apply compression to reduce file size

## Implementation Details

The application will:
1. Prioritize loading `-min` versions of images first
2. Fall back to regular versions if optimized versions aren't found
3. Try all supported extensions (jpg, jpeg, JPG, JPEG)
4. Skip missing numbers (e.g., if background-4.jpg doesn't exist)

## Example Naming

Good examples:
- `background-1-min.jpg` (optimized version)
- `background-1.jpg` (regular version, fallback)
- `background-2-min.JPG` (uppercase extension is fine)

Avoid:
- `bg-1.jpg` (incorrect prefix)
- `background-01.jpg` (leading zeros)
- `background-1.png` (unsupported extension)

## Location

All background images must be placed in the `/public/backgrounds/` directory.

## Adding New Images

1. Optimize your image using appropriate tools
2. Name it according to the convention above
3. Place it in the `/public/backgrounds/` directory
4. No code changes needed - the application will detect it automatically

## Usage

The application automatically rotates through these background images. The rotation
logic can be found in the `Index.tsx`