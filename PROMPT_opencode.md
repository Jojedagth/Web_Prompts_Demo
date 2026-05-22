# PromptOps — OpenCode Prompt

You are a senior frontend developer. Build a complete local web project called **PromptOps** using only HTML5, CSS3, and Vanilla JavaScript (ES6+). No frameworks, no build tools, no npm. Everything must work by opening `index.html` directly in a browser.

Read the full SPEC.md before writing any code. Every decision in it is final: file structure, color palette, data model, features, and out-of-scope items.

---

## Stack

- HTML5, CSS3, Vanilla JS (ES6+)
- Google Fonts via `<link>`: **DM Mono** (display/code) + **Space Grotesk** (body)
- localStorage for all data persistence
- No external JS libraries

---

## File Structure to Generate

```
promptops/
├── index.html
├── css/
│   ├── variables.css   ← CSS custom properties + reset
│   ├── main.css        ← All section styles
│   └── animations.css  ← All @keyframes
├── js/
│   ├── auth.js         ← Login/logout, session
│   ├── storage.js      ← localStorage helpers
│   ├── prompts.js      ← Seed data + CRUD
│   ├── ui.js           ← Render cards, modal, filters
│   ├── adapter.js      ← Mega-prompt builder
│   ├── i18n.js         ← All translations EN/ES + applyLanguage()
│   └── main.js         ← App init + event listeners
```

---

## Sections to Build

**1. Fixed Nav**
- Logo "Prompt<span>Ops</span>" (Ops in muted color)
- Links: Library · Adapter · Stacks · Publish (with `data-i18n` attributes)
- Right side: language toggle button **EN / ES** + login/logout
- Language toggle: switches between English and Spanish instantly, saves to `localStorage` key `promptops_lang`
- Glassmorphism background: `rgba(8,8,8,0.85)` + `backdrop-filter: blur(12px)`

**2. Hero**
- Tag pill with blinking dot (translatable)
- Big title with CSS glitch effect on one word (`::before` / `::after` with `clip-path` + `mix-blend-mode: screen`, colors `#f0a8d8` and `#a8d8f0`)
- Subtitle + two CTA buttons: primary (mint fill) + secondary (outline) — all translatable
- 3 stats: total prompts / certified authors / prompt types (labels translatable)
- Background: CSS grid lines + radial vignette
- Floating stack emojis (🌐 🎨 ⚡ 🐍 ⚛️ 🟩 🗄️ 🔧) with `float` keyframe, randomized duration and delay

**3. Prompt Library (`#library`)**
- Filter tabs: All · Spec · Architecture · UI · Agent · System Prompt (labels translatable)
- Cards grid `repeat(auto-fill, minmax(340px, 1fr))`
- Each card: type badge · author · title · description · stack tags · View + Adapt buttons (translatable)
- Cards fade-slide-up with staggered `animation-delay`
- Mouse glow: `mousemove` updates `--mx` `--my` on each card, `::before` radial gradient follows cursor

**4. Prompt Detail Modal**
- Overlay with `backdrop-filter: blur(6px)`
- Type badge · author · title · full prompt in monospace scrollable block
- Buttons: Copy · Download .md · Adapt This Prompt (translatable)
- Close on overlay click or X button

**5. AI Adapter (`#adapter`)**
- Two-column layout: explanation left, interactive panel right
- Panel: dropdown (select prompt from library) + textarea (project idea) + Generate button + output block with copy button
- All labels and placeholders translatable
- Mega-prompt output format:
```
## Context
You are a senior developer. Use the following proven prompt structure as your methodology.

## Prompt Structure (from PromptOps)
[selected prompt body]

## My Project
[user's idea]

## Instructions
Apply the structure above to my project. Be specific, detailed, and production-ready.
```

**6. Stack Showcase (`#stacks`)**
- Cards for: HTML · CSS · JavaScript · Python · Node.js · React · SQL · Git
- Each card: large emoji + name + one-line description (descriptions translatable)
- IntersectionObserver adds `.visible` class → CSS transition: `opacity: 1; transform: translateY(0)`
- Staggered `transition-delay` per card (0ms, 75ms, 150ms, 225ms...)

**7. Publish Form (`#publish`)**
- Hidden when not logged in (show locked message with login prompt — translatable)
- Form fields: Title · Type · Stack tags · Description · Prompt body (labels translatable)
- On submit: save to localStorage, refresh card grid, clear form, show toast
- Toast notifications translatable

**8. Footer**
- Brand blurb / nav links / stack info — all translatable

---

## Internationalization (i18n)

Create `js/i18n.js` with a `TRANSLATIONS` object covering EN and ES for every UI string. Example structure:

```js
const TRANSLATIONS = {
  en: {
    nav_library: "Library",
    nav_adapter: "Adapter",
    nav_stacks: "Stacks",
    nav_publish: "Publish",
    nav_login: "Login",
    nav_logout: "Logout",
    hero_tag: "Certified Prompt Engineering",
    hero_title_sub: "for real projects",
    hero_subtitle: "A curated library of battle-tested prompt structures published by certified engineers.",
    hero_cta_primary: "Browse Prompts",
    hero_cta_secondary: "Become Certified",
    hero_stat_prompts: "Prompts",
    hero_stat_authors: "Certified Authors",
    hero_stat_types: "Prompt Types",
    filter_all: "All",
    filter_spec: "Spec",
    filter_arch: "Architecture",
    filter_ui: "UI",
    filter_agent: "Agent",
    filter_system: "System Prompt",
    card_view: "View",
    card_adapt: "Adapt",
    modal_copy: "Copy",
    modal_download: "Download .md",
    modal_adapt: "Adapt This Prompt",
    adapter_title: "AI Adapter",
    adapter_subtitle: "Reshape any prompt structure to fit your exact project.",
    adapter_select_label: "Select a prompt structure",
    adapter_idea_label: "Describe your project idea",
    adapter_idea_placeholder: "e.g. A task manager app for freelancers with invoicing...",
    adapter_generate: "Generate Mega-Prompt",
    adapter_copy: "Copy",
    stacks_title: "Tech Stacks",
    stacks_eyebrow: "Ecosystem",
    publish_locked: "Certified users only",
    publish_login_prompt: "Login to publish prompt structures.",
    publish_title_label: "Title",
    publish_type_label: "Type",
    publish_stacks_label: "Stack tags (comma separated)",
    publish_desc_label: "Short description",
    publish_body_label: "Prompt body",
    publish_submit: "Publish Prompt",
    publish_success: "Prompt published successfully!",
    footer_built: "Built with HTML · CSS · JS",
    lang_toggle: "ES"
  },
  es: {
    nav_library: "Biblioteca",
    nav_adapter: "Adaptador",
    nav_stacks: "Tecnologías",
    nav_publish: "Publicar",
    nav_login: "Iniciar sesión",
    nav_logout: "Cerrar sesión",
    hero_tag: "Ingeniería de Prompts Certificada",
    hero_title_sub: "para proyectos reales",
    hero_subtitle: "Una biblioteca curada de estructuras de prompts probadas, publicadas por ingenieros certificados.",
    hero_cta_primary: "Ver Prompts",
    hero_cta_secondary: "Ser Certificado",
    hero_stat_prompts: "Prompts",
    hero_stat_authors: "Autores Certificados",
    hero_stat_types: "Tipos de Prompt",
    filter_all: "Todos",
    filter_spec: "Spec",
    filter_arch: "Arquitectura",
    filter_ui: "UI",
    filter_agent: "Agente",
    filter_system: "Prompt de Sistema",
    card_view: "Ver",
    card_adapt: "Adaptar",
    modal_copy: "Copiar",
    modal_download: "Descargar .md",
    modal_adapt: "Adaptar este Prompt",
    adapter_title: "Adaptador IA",
    adapter_subtitle: "Transforma cualquier estructura de prompt para que encaje exactamente con tu proyecto.",
    adapter_select_label: "Selecciona una estructura de prompt",
    adapter_idea_label: "Describe tu idea de proyecto",
    adapter_idea_placeholder: "ej. Una app de gestión de tareas para freelancers con facturación...",
    adapter_generate: "Generar Mega-Prompt",
    adapter_copy: "Copiar",
    stacks_title: "Tecnologías",
    stacks_eyebrow: "Ecosistema",
    publish_locked: "Solo usuarios certificados",
    publish_login_prompt: "Inicia sesión para publicar estructuras de prompts.",
    publish_title_label: "Título",
    publish_type_label: "Tipo",
    publish_stacks_label: "Tecnologías (separadas por coma)",
    publish_desc_label: "Descripción corta",
    publish_body_label: "Cuerpo del prompt",
    publish_submit: "Publicar Prompt",
    publish_success: "¡Prompt publicado con éxito!",
    footer_built: "Hecho con HTML · CSS · JS",
    lang_toggle: "EN"
  }
};

function applyLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key]) el.textContent = TRANSLATIONS[lang][key];
  });
  localStorage.setItem('promptops_lang', lang);
}
```

- Every translatable HTML element must have `data-i18n="key"` attribute
- On page load: read `promptops_lang` from localStorage (default `en`), call `applyLanguage()`
- Lang toggle button switches between `en` and `es` and calls `applyLanguage()` again
- Prompt content (title, description, body, author, stack tags) is NOT translated — stays as published

---

## Seed Data (write real, useful prompt bodies)

Seed 6 prompts on first load (check if key exists before seeding):

1. **Full-Stack Web App Spec** — type: `spec` — stacks: HTML, CSS, JS, Node
   Body: detailed prompt that generates a complete SPEC.md with why the project exists, tech stack decisions, pages/sections, data model, file structure, color palette, and v1 scope checklist.

2. **REST API Architecture** — type: `architecture` — stacks: Node, Express, SQL
   Body: generates a full API architecture doc with endpoints, request/response schemas, auth strategy, error handling, and folder structure.

3. **Landing Page UI Blueprint** — type: `ui` — stacks: HTML, CSS, JS
   Body: generates a complete UI spec for a landing page including hero, features, testimonials, CTA sections with color tokens, spacing system, and component breakdown.

4. **AI Agent Workflow** — type: `agent` — stacks: Python, OpenAI API
   Body: designs a multi-step AI agent with tools, memory, loop logic, and fallback handling for any automation task.

5. **Code Review System Prompt** — type: `system` — stacks: Any
   Body: system prompt that turns any AI model into a strict senior code reviewer checking bugs, security, performance, readability, and suggesting refactors with examples.

6. **Database Schema Designer** — type: `architecture` — stacks: SQL, PostgreSQL
   Body: generates a normalized database schema with tables, columns, types, constraints, indexes, and relationships for any described application.

---

## Animations Required

- `fadeSlideUp`: `opacity 0→1` + `translateY(28px→0)` — hero text and cards
- `glitch`: `clip-path` + `translateX` on `::before`/`::after` pseudo-elements — hero headline
- `float`: `translateY` infinite loop — background emojis with randomized duration/delay
- `stackEntrance`: CSS transition on `.visible` class via IntersectionObserver — stack cards
- `pulseGlow`: mint `box-shadow` pulse — primary CTA hover
- `blink`: opacity 1→0→1 — hero tag dot

---

## Design Tokens

```css
--bg:           #0a0a0a;
--surface:      #111111;
--surface-2:    #161616;
--border:       #1f1f1f;
--border-soft:  #262626;
--text:         #e8e8e8;
--text-muted:   #6b6b6b;
--mint:         #a8f0c6;
--blue:         #a8d8f0;
--pink:         #f0a8d8;
--yellow:       #f0e6a8;
--purple:       #d8a8f0;
--accent:       #a8f0c6;
```

---

## Quality Bar

- Zero JS errors in console on load
- localStorage operations wrapped in try/catch
- Cards re-render correctly when filter changes
- Language toggle works without page reload and persists on refresh
- Login/logout updates nav + publish section visibility without page reload
- AI Adapter output is a complete, copy-paste-ready mega-prompt
- Mobile responsive: single column under 600px, nav collapses gracefully
- IntersectionObserver only triggers stack card animations once
