# CRAZY SHINE — Premium Automotive Detailing

Cinematic, editorial website for Crazy Shine. Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger · Lenis · Lucide**.

```bash
npm install
cp .env.example .env.local   # set the WhatsApp number etc.
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Configuration

All business data is in `src/config/site.ts` and read from environment variables — nothing is hardcoded in components.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International format, digits only. If empty, buttons open WhatsApp's contact picker with the message prefilled. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO, sitemap and Open Graph. |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `_HANDLE` | Footer Instagram link. |
| `NEXT_PUBLIC_LOCATION` / `NEXT_PUBLIC_MAPS_URL` | Footer address and map link. |
| `NEXT_PUBLIC_HOURS` | Opening hours text. |

WhatsApp messages (general, per-service, quote, booking) are defined in `site.ts` and in each section.

## Photography

Every image slot is a `Visual` in `src/content/*`:

- `media.ts` — hero slides (Mustang GT 2021, Porsche 911, Renault 12, BMW M, Mercedes-AMG), editorial and final CTA images
- `services.ts` — one visual per service
- `garage.ts` — The Garage gallery (vehicle, service tag, story, details)
- `transformations.ts` — before / after pairs

Put photos in `public/images/**` and set `src` (e.g. `src: "/images/garage/mustang-gt-2021.jpg"`). They are served through `next/image` (AVIF/WebP, lazy loading, responsive `sizes`). Until a `src` is set, an SVG **studio render** is shown — it is unbranded, weighs nothing and never pretends to be a real job; the gallery shows a notice while renders are in use. For before/after, provide both `before.src` and `after.src`.

## Structure

```
src/app            layout (fonts, SEO), page, privacy, terms, sitemap, robots, icon
src/config         site.ts — business config + WhatsApp helpers
src/content        editable content and image slots
src/components     Navbar, Footer, WhatsAppFloat, SmoothScroll, LegalPage
  sections/        Hero, ArtOfDetailing, Marquee, Services, Garage, BeforeAfter, WhyCrazyShine, FinalCta
  ui/              Media, StudioRender, Reveal/MaskedHeadline, Cta, Logo, icons
```

## Motion & accessibility

Masked headline reveals, hero crossfade + scroll push-in, parallax, pinned horizontal gallery (desktop; swipe with scroll-snap on mobile), clip-path reveals, Lenis smooth scroll. `prefers-reduced-motion` disables smooth scrolling, pinning, parallax and autoplay. Keyboard-operable slider (arrow keys), skip link, focus styles, semantic landmarks, JSON-LD `AutoWash` schema.
