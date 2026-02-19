# PWA Icons Generation Guide

## Required Icons

For PWA to work properly, you need to create the following icons:

1. `public/icon-192x192.png` - 192x192 pixels
2. `public/icon-512x512.png` - 512x512 pixels

## How to Generate Icons

### Option 1: Using Online Tools
1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload your logo (should be at least 512x512)
3. Generate icons
4. Download and place in `public/` folder

### Option 2: Using ImageMagick (Command Line)
```bash
# If you have ImageMagick installed
convert logo.png -resize 192x192 public/icon-192x192.png
convert logo.png -resize 512x512 public/icon-512x512.png
```

### Option 3: Using Photoshop/GIMP
1. Open your logo
2. Resize to 192x192 and save as `icon-192x192.png`
3. Resize to 512x512 and save as `icon-512x512.png`
4. Place both files in `public/` folder

## Icon Requirements

- Format: PNG
- Sizes: 192x192 and 512x512 pixels
- Background: Transparent or solid color
- Design: Should be recognizable at small sizes
- Colors: Should match your brand (primary yellow #f7c11e)

## Current Status

⚠️ Placeholder icons are referenced in manifest.json but actual icon files need to be created.
