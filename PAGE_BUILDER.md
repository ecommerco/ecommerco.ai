## Page Builder (GrapesJS) — how to use it

This repository contains two separate Next.js apps:

- `web/` → the public marketing website (your main site)
- `page-builder/` → the visual editor (GrapesJS)

### Local URLs

- Website: http://localhost:3002/
- Builder editor: http://localhost:3004/editor

### Saving your edits

The builder now saves projects on the server:

- Load: `GET /api/projects/:slug`
- Save: `PUT /api/projects/:slug`

Default slug is `home`. You can switch projects by adding `?slug=...`:

- http://localhost:3004/editor?slug=home
- http://localhost:3004/editor?slug=landing

Saved files are stored locally under:

- `page-builder/.data/projects/*.json`

### Important note (website integration)

Right now the builder edits a GrapesJS project (HTML/CSS/components inside the editor).
It does not automatically overwrite the Next.js pages in `web/` yet.

If you want the builder to publish directly into the website, the next step is to add an export/publish pipeline, for example:

- export HTML/CSS from GrapesJS
- store it under `web/public/` and render it in a Next.js route, or
- convert it into React/Next components (more work, but cleaner long-term)
