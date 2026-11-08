# CRAZY SHINE — Detailing automotriz

Sitio web de Crazy Shine con el lenguaje visual de THEFATTEST adaptado al detailing automotriz.
**Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP · Lenis · Lucide · Neon (PostgreSQL)**.

```bash
npm install
cp .env.example .env.local   # número de WhatsApp, Neon, Instagram, ubicación…
npm run db:setup             # crea la tabla de reservas en Neon (requiere DATABASE_URL)
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Sistema visual
- Tipografía: **Anton** (titulares), **Inter** (texto), **JetBrains Mono** (etiquetas).
- Paleta: negro profundo `#080808`, grafito, blanco, gris metálico y **cromo/plata** como acento (`text-chrome`, `bg-chrome-gradient`).
- Recursos editoriales: titulares sólido + contorno, barra de anuncios, marquees infinitos (contorno y cinta cromada), palabras gigantes de fondo, etiquetas mono, botones entre corchetes con barrido de brillo.

## Secciones
Hero (Mustang GT protagonista) → Marquee → Servicios (grilla asimétrica, palabra de identidad por servicio) → Beneficios → Garage (grilla tipo campaña) → Cinta cromada → Nuestra esencia → Antes y después (slider) → Reserva (formulario + Neon) → Contacto → Footer.

## Variables de entorno
| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número en formato internacional, solo dígitos (p. ej. 573001234567). Sin él, los botones abren WhatsApp con el mensaje escrito para elegir contacto. |
| `DATABASE_URL` | Cadena de conexión de **Neon**. Guarda cada solicitud del formulario en la tabla `bookings` (`db/schema.sql`). Sin ella, el formulario igual funciona y pasa a WhatsApp. |
| `NEXT_PUBLIC_SITE_URL` | URL pública para SEO y sitemap. |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `_HANDLE` | Instagram en contacto y footer. |
| `NEXT_PUBLIC_LOCATION` / `NEXT_PUBLIC_MAPS_URL` | Ubicación y enlace a Google Maps. |
| `NEXT_PUBLIC_HOURS` | Horario. |

En Vercel: Project Settings → Environment Variables (o la integración de Neon, que crea `DATABASE_URL`).

## Fotografías
Están en `public/images/**` y se configuran en `src/content/*`. Son fotos de referencia (Unsplash y Wikimedia Commons, ver `public/images/CREDITS.md`) y el sitio lo indica; no son trabajos de Crazy Shine.

- **Mustang GT 2021**: las fotos de referencia disponibles son Mustang S550 2015–2017. Sube tu foto como `public/images/hero/mustang-gt-2021.jpg` (hero) y `public/images/garage/mustang-gt-2021.jpg` (garage): el build la detecta y la usa automáticamente en lugar del respaldo.
- **Antes y después**: sube la foto real del "antes" y cambia `before.src` en `src/content/transformations.ts`. Mientras sea la misma foto, se muestra una simulación rotulada como tal.
