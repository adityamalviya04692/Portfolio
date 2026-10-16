# Aditya Malviya — Portfolio

React and TypeScript portfolio, redesigned around the cream, orange, and blue visual direction of https://ayush.cc/. Uses original artwork and Aditya's existing professional content. The desk illustration and personalized standing avatar are animated through scroll, pointer movement, and a layered hologram sequence. These are not rigged WebGL models. See `ANIMATIONS.md` for implemented motion and the remaining 3D limitation.

## Local development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Open the `/aditya-portfolio/` path displayed by Vite.

## Content and design

- `src/data/portfolio.json`: profile, resume, contacts, experience, skills, certifications, and project source content.
- `src/App.tsx`: page composition, short project summaries, CSS-based project illustrations, accessible disclosures, navigation, and email copy control.
- `src/index.css`: responsive layout, typography, palette, hover motion, and reduced-motion support.
- `public/assets/workspace-aditya.png`: personalized hero avatar based on the supplied photo, generated using the built-in image generation tool. See `AVATAR.md` for its identity reference and edit prompt.
- `public/assets/aditya-portrait.png`: unaltered supplied photo used in the About section.
- `public/Aditya_Malviya_Senior_Data_Engineer.pdf` / `.docx`: current resume, downloaded from the site.

`#experience` links to the dedicated professional section; `#skills` opens the skills disclosure. Social links, mail, telephone and resume links remain available. Contact actions use the user's email client; there is no simulated form submission.

## Deployment

The existing GitHub Actions workflow builds and publishes pushes to `main`. The redesign is prepared on `codex/ayush-inspired-redesign`; it has not been published. Vite's base remains `/aditya-portfolio/`.

## Sources and motion

See `CONTENT_SOURCES.md` for the live LinkedIn/resume reconciliation and original Moriveda image provenance. See `ANIMATIONS.md` for motion behavior, accessibility, and avatar provenance.

## Original desk artwork prompt

Tool: built-in image generation. Final asset: `public/assets/workspace-hero.png`.

> Use case: stylized-concept. Asset type: portfolio website hero illustration. Create a polished whimsical 3D clay-rendered miniature workspace on a seamless warm ivory background #f4f0e6. Landscape 1536x1024. An Indian male developer with short black hair seen from behind and three-quarter side, seated on a cream swivel chair at an ivory desk, two navy monitors showing colorful abstract code lines and a connected data pipeline, small orange coffee mug, desk lamp, tiny books, potted green plant on right, a wall shelf and small cork pinboard above. Ochre and pale yellow rounded rectangular rug underneath. Soft ambient occlusion, rounded tactile shapes, beautifully lit like a high-end playful WebGL personal portfolio. Composition: entire scene contained in frame, centered, generously spaced ivory background around object silhouette. Isometric perspective from slightly above, character facing screens on right. Palette ivory, terracotta orange, ink navy, mustard, sage. No headings, no text, no logos, no watermark. Original illustration, charming and professional.
