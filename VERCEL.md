## Deploy the website (web/) to Vercel

This repo contains multiple apps. The public marketing website is in `web/`.

### Vercel (recommended)

1) Go to Vercel → **Add New… → Project**
2) Import `ecommerco/ecommerco.ai`
3) In **Root Directory**, select: `web`
4) Set **Project Name** to control your Vercel URL:
   - No dash: `ecommercioai` → `https://ecommercioai.vercel.app`
   - With dash: `ecommercio-ai` → `https://ecommercio-ai.vercel.app`
   Notes:
   - Vercel preview domains are `*.vercel.app` (not `vercel.com` and not `versal.com`)
   - You cannot use dots in the project subdomain, so `ecommercio.ai.vercel.app` is not a valid format
4) Keep defaults:
   - Framework: Next.js
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: (leave empty)
5) Deploy

### Set up the custom domain (Cloudflare DNS)

In Vercel → Project → **Settings → Domains**, add:
- `ecommerco.ai`
- `www.ecommerco.ai`

In Cloudflare → **DNS → Records** set:
- `@` (A) → `76.76.21.21` (DNS only while testing)
- `www` (CNAME) → `cname.vercel-dns.com` (DNS only while testing)

Remove any old A/CNAME records pointing elsewhere (for example `103.169.142.0` or `76.13.179.65`) to avoid conflicts.

### Troubleshooting

- If you see Cloudflare 404 pages, check Cloudflare **Workers & Pages → Routes** and disable routes that match `ecommerco.ai/*`.
- If Vercel deploy succeeds but the domain still shows old content, wait for DNS propagation and clear Cloudflare cache.

### Environment variables (Hero video)

If you want to use a hosted hero video (for example exported from Canva), set these in Vercel → Project → **Settings → Environment Variables**:
- `NEXT_PUBLIC_HERO_VIDEO_WEBM_URL` (optional, recommended)
- `NEXT_PUBLIC_HERO_VIDEO_MP4_URL` (MP4 URL)
- `NEXT_PUBLIC_HERO_IMAGE_URL` (optional, can be GIF/WEBP/PNG/JPG)
- `NEXT_PUBLIC_HERO_VIDEO_POSTER` (optional image URL)
