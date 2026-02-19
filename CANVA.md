## Using a Canva design in the website (web/)

The link you shared points to a Canva editor page. Canva requires an interactive browser session (cookies/login), so the design contents can’t be fetched automatically here.

Use this workflow instead:

### 1) Export assets from Canva

For the hero background video:
- Export: MP4
- Recommended size: 1920×1080 (16:9)
- Keep the subject centered (safe area) because the site uses `object-cover` (edges may crop).

Optional poster (fallback image):
- Export: PNG/JPG
- Recommended size: 1920×1080

### 2) Host the assets

Pick one:
- Put the files into `web/public/` (committed to the repo)
- Upload to any CDN/object storage (then use the HTTPS URL)

### 3) Point the website hero to your Canva assets

The Hero component supports environment variables:
- `NEXT_PUBLIC_HERO_VIDEO_WEBM_URL` (optional, recommended if you can export/convert to WebM)
- `NEXT_PUBLIC_HERO_VIDEO_MP4_URL` (MP4 URL or `/hero-background.mp4`)
- `NEXT_PUBLIC_HERO_IMAGE_URL` (optional fallback image URL, can be GIF/WEBP/PNG/JPG)
- `NEXT_PUBLIC_HERO_VIDEO_POSTER` (optional poster URL)

Example:

```bash
NEXT_PUBLIC_HERO_VIDEO_MP4_URL="https://your-cdn.example/hero.mp4"
NEXT_PUBLIC_HERO_VIDEO_WEBM_URL="https://your-cdn.example/hero.webm"
NEXT_PUBLIC_HERO_IMAGE_URL="https://your-cdn.example/hero.gif"
NEXT_PUBLIC_HERO_VIDEO_POSTER="https://your-cdn.example/hero.jpg"
```

Implementation reference:
- [Hero.tsx](file:///c:/Users/DRDXB/Documents/trae_projects/ecommerco-prompt/ecommerco.ai/web/src/components/Hero.tsx)
