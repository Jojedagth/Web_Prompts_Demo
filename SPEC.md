# SPEC.md — PromptOps

## Why This Project Exists

Developers and AI practitioners spend enormous time crafting effective prompts for complex tasks — spec writing, architecture design, UI generation, agent workflows. Most of this knowledge is lost, never shared, or locked behind paywalls.

**PromptOps** is a curated, community-driven library where certified users publish battle-tested prompt structures (spec ops, system prompts, architecture templates, UI blueprints) so that anyone can:
1. Browse and download proven prompt structures
2. Adapt them to their own project using a built-in AI adapter
3. Pass the refined prompt to a more powerful model to generate their full project

The goal is to democratize prompt engineering expertise and accelerate project creation.

---

## Project Identity

| Field | Value |
|---|---|
| **Name** | PromptOps |
| **Tagline** | Certified prompt structures. Real results. |
| **Target user** | Developers, students, indie hackers, AI enthusiasts |
| **Aesthetic** | Dark/black base · pastel accents · animated stack badges · editorial feel |
| **Language** | English |

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5 | Familiar, no build step required |
| Styles | CSS3 (custom properties, grid, flexbox, keyframes) | Full control, no framework needed |
| Logic | Vanilla JavaScript (ES6+) | No dependencies, runs locally |
| Storage | localStorage | Local-first, no backend required |
| Fonts | Google Fonts (imported via link) | Free, no install |

> **Future path:** Migrate to Tailwind CSS + React once comfortable. The component structure of this project maps 1:1 to React components.

---

## Pages & Sections

### 1. Landing / Hero
- Animated headline with glitch effect
- Tagline + CTA buttons: **Browse Prompts** / **Become Certified**
- Floating stack emojis animating in the background (HTML, CSS, JS, Python, React, etc.)
- Dark background `#0a0a0a` with pastel accent strokes

### 2. Prompt Library (`index.html → #library`)
- Filter bar: tabs by **Type** (All, Spec, Architecture, UI, Agent, System Prompt)
- Prompt cards showing: title, type badge (pastel color-coded), author, stack tags, short description, View + Adapt buttons
- Cards loaded from `localStorage`

### 3. Prompt Detail (modal)
- Full prompt text in monospace block
- Copy to clipboard button
- Download as `.md`
- "Adapt this prompt" button → scrolls to AI Adapter

### 4. AI Adapter Panel
- Dropdown to select any prompt from the library
- Textarea: user describes their project idea
- Button generates a complete mega-prompt combining the structure + user idea
- Output block with copy button

### 5. Publish (Certified Users only)
- Only visible when logged in as a certified user
- Form: Title · Type · Stack tags (comma separated) · Description · Full prompt body
- Saves to `localStorage` under `promptops_prompts`

### 6. Stack Showcase Section
- Animated cards for: HTML, CSS, JS, Python, Node.js, React, SQL, Git
- Each card: emoji icon + name + one-line description
- Cards animate in staggered on scroll via IntersectionObserver

### 7. Footer
- Links: About · GitHub · Become Certified
- "Built with HTML · CSS · JS"

---

## Data Model (localStorage)

```json
// Key: "promptops_prompts"
[
  {
    "id": "timestamp-string",
    "title": "Full-Stack Web App Spec Prompt",
    "type": "spec",
    "author": "admin",
    "stacks": ["HTML", "CSS", "JS", "Node"],
    "description": "Generates a complete SPEC.md for any web project.",
    "body": "You are a senior software architect...",
    "createdAt": "2026-05-20T00:00:00Z"
  }
]

// Key: "promptops_session"
{
  "username": "admin",
  "certified": true
}
```

---

## Certified Users (v1 — local only)

Hardcoded array in `auth.js`. No real authentication — local prototype only.

```js
const CERTIFIED_USERS = [
  { username: "admin", password: "promptops2026" },
  { username: "dev1",  password: "dev1pass" }
];
```

> **Security note:** For production, replace with JWT, OAuth, or Supabase auth.

---

## File Structure

```
promptops/
├── index.html
├── css/
│   ├── variables.css   ← CSS custom properties + reset
│   ├── main.css        ← All section styles
│   └── animations.css  ← All @keyframes
├── js/
│   ├── auth.js         ← Login/logout, session management
│   ├── storage.js      ← localStorage helpers
│   ├── prompts.js      ← Seed data + CRUD
│   ├── ui.js           ← Render cards, modal, filters
│   ├── adapter.js      ← Mega-prompt builder
│   └── main.js         ← App init + event listeners
```

---

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#111111` | Cards, panels |
| `--border` | `#1f1f1f` | Subtle borders |
| `--text` | `#e8e8e8` | Body text |
| `--text-muted` | `#6b6b6b` | Secondary text |
| `--mint` | `#a8f0c6` | Spec badge + accent |
| `--blue` | `#a8d8f0` | Architecture badge |
| `--pink` | `#f0a8d8` | UI badge |
| `--yellow` | `#f0e6a8` | Agent badge |
| `--purple` | `#d8a8f0` | System Prompt badge |

---

## Animations

| Name | Element | Effect |
|---|---|---|
| `fadeSlideUp` | Hero text, cards | Fade in + translateY on load |
| `glitch` | Hero headline | RGB split flicker via clip-path |
| `float` | Background stack emojis | Slow up/down float, randomized delay |
| `stackEntrance` | Stack showcase cards | Staggered slide-in on scroll (IntersectionObserver) |
| `pulseGlow` | CTA buttons | Soft mint glow on hover |
| `blink` | Hero tag dot | Opacity blink |

---

## V1 Scope (what to build now)

- [x] Hero section with animations
- [x] Prompt library with localStorage seed data
- [x] Filter by type
- [x] Prompt card + expand modal
- [x] Copy / download prompt
- [x] AI Adapter panel (no API call — just formats the mega-prompt)
- [x] Certified user login (localStorage session)
- [x] Publish form for certified users
- [x] Stack showcase with animations
- [x] Fully local — open `index.html` in browser

## Out of Scope (v1)

- [ ] Real backend / database
- [ ] Real authentication
- [ ] Live API call to AI models
- [ ] Search / full-text filter
- [ ] User profiles
- [ ] Ratings / comments
- [ ] Cybersecurity hardening

---

## How to Run Locally

```bash
# No install needed:
open index.html

# Or with a local server:
npx serve .
# or
python -m http.server 8080
```

---

## Next Steps After V1

1. Learn **Tailwind CSS** → replace manual CSS with utility classes
2. Learn **React** → split each section into a component
3. Add **Supabase** → real DB + auth
4. Add **Anthropic API** → live AI adapter
5. Deploy to **Vercel** or **Netlify** (free tier)

---

## Internationalization (i18n)

### Language Toggle
- Button in the nav (top right, next to login): **EN / ES**
- Switches all static UI text between English and Spanish instantly, no page reload
- Active language saved to `localStorage` under key `promptops_lang`
- On load, read `promptops_lang` and apply saved preference (default: `EN`)

### What gets translated
- Nav links
- Hero title, subtitle, tag, CTA buttons, stat labels
- Section eyebrows, titles, descriptions
- Filter tab labels
- Card action buttons (View, Adapt, Download, Copy)
- Modal button labels
- AI Adapter labels, placeholder text, button, output header
- Stack showcase card descriptions
- Publish form labels and placeholders
- Footer text
- Toast notifications
- Login/logout UI

### What does NOT get translated
- Prompt titles, descriptions, and bodies (user-generated content stays as published)
- Author names
- Stack tag names (HTML, CSS, JS, etc.)

### Implementation
- All translatable strings stored in a `TRANSLATIONS` object in `js/i18n.js`:
```js
const TRANSLATIONS = {
  en: {
    nav_library: "Library",
    nav_adapter: "Adapter",
    hero_tag: "Certified Prompt Engineering",
    hero_subtitle: "Certified prompt structures. Real results.",
    // ...
  },
  es: {
    nav_library: "Biblioteca",
    nav_adapter: "Adaptador",
    hero_tag: "Ingeniería de Prompts Certificada",
    hero_subtitle: "Estructuras de prompts certificadas. Resultados reales.",
    // ...
  }
};
```
- HTML elements get a `data-i18n="key"` attribute
- `applyLanguage(lang)` function loops over all `[data-i18n]` elements and sets `textContent`
- Toggle button shows current language and switches on click
