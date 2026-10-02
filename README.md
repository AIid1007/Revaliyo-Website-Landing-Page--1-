# Revaliyo landing page

Mobile-first landing page for Revaliyo. Next.js (App Router) + Tailwind v4 + Motion + GSAP ScrollTrigger + Lenis.
Follows the system light/dark setting and `prefers-reduced-motion`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Things to fill in

All in `lib/config.ts` unless noted:

| What | Where |
| --- | --- |
| App Store / Google Play URLs (set) | `STORE_LINKS` |
| Explainer film (YouTube/Vimeo embed URL, optional poster) | `FILM` |
| Privacy and Terms links (set). Banned-items list link is still `#` | `LINKS` |
| Email sign-ups. Set `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` in `.env.local` to a URL that accepts `POST {"email": "..."}`. Without it the form validates and shows success but **stores nothing**. | `SUBSCRIBE` |

## Placeholder images

`public/images/hiw-list.jpg`, `hiw-swap.jpg`, `hiw-collect.jpg` and `film-poster.jpg` are currently **flat-colour stand-ins**.
AI-generated placeholder photos for them exist in the Higgsfield library of the account used in the session, but this
environment's network policy blocked downloading them. Drop real or generated photos at those paths (4:5 for the three
how-it-works images, 16:9 for the poster) and update the alt text in `components/HowItWorks.tsx`.

## Copy still marked `[TBC: ...]` on the page

Search for `<Tbc>` in `components/FAQ.tsx`:

- Any fees on selling?
- Can users edit or reject the AI value?
- Final banned-items list
- How many days until the voucher arrives

## Copy changes made to the brief

- Voucher rule is **3 items** everywhere (the brief said 5 in one place, 3 in another).
- "Join the waitlist above" is now "below", because the only sign-up form is in the footer.
- "You can also give away all in the app" is now "You can also give things away in the app".
- "Want more updates, share email for spam free updates!" is now "Want more updates? Share your email for spam-free updates."
- Added by the designer, not in the brief: footer headline "Swap the things you don't use.", film placeholder label "Watch the film", the hero demo labels "Yours" / "Nearby", and the email button label "Sign me up".

## Structure

```
app/            layout, page, global tokens (colours, type, motion)
components/     one file per section (Hero, Film, OfferStrip, HowItWorks, WhyMK, Founder, FAQ, Footer)
lib/config.ts   links, film, endpoint
```

Design skills installed for this project live in `.agents/skills` (symlinked into `.claude/skills`).
