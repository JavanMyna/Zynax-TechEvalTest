# Zynax — CSS Technical Evaluation

A front-end recreation of the [daily.dev](https://daily.dev) dashboard, built for the
Computer Science Society (USM) technical evaluation.

**Live demo:** https://zynax-eval.mynko.workers.dev

Reference that the build was matched against: [`imageRef.png`](./imageRef.png).

---

## Start here

Welcome, and thanks for taking the time to look through this. If you have five minutes:

1. Open the live demo.
2. Resize the window from desktop to phone width — the layout collapses deliberately
   (top-bar icons, sidebar, and the two-column grid drop out at their breakpoints).
3. Compare it against `imageRef.png`; the goal was visual fidelity to the reference,
   not a new design.
4. Read the **How this was built** section below. It is honest about AI use, because
   I would rather you judge the work with the full picture.

## What it is

A single-screen imitation of daily.dev's feed page:

- **Top bar** — logo, search field with a `Ctrl + K` hint, icon buttons, level badge
  with a circular progress ring, and a reputation/currency strip.
- **Left rail** — collapse control, new-post button, profile avatar, navigation icons,
  and squad avatars.
- **Feed tabs** — the highlighted "Want chips 🍟 ?" callout, tab list, feed settings,
  shortcuts, and a feed-quality badge.
- **"Happening Now" card** — four headlines with relative timestamps and a *Read all* link.
- **Article card** — source icon, headline, tags, read time, sign-in panel, and vote /
  comment / bookmark row.
- **Floating feedback button** — fixed bottom-right, with overlapping avatars.

All copy, candidate headlines, and cat photos are local or hard-coded. There is no
backend, authentication, database, or API call.

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 (function components, hooks) |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` |
| Linting | ESLint 10 + `eslint-plugin-react-hooks` |
| Hosting | Cloudflare Workers (static assets) |

No router, state library, or component library — the whole UI lives in `src/App.jsx`.

## Run locally

Requires Node.js `^20.19.0` or `>=22.12.0` (Vite 8's engine requirement).

```bash
git clone https://github.com/JavanMyna/Zynax-TechEvalTest.git
cd Zynax-TechEvalTest
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`). Other commands:

```bash
npm run build     # production bundle in dist/
npm run preview   # serve the built bundle locally
npm run lint      # ESLint over the repo
```

## Deployment

The site is deployed on **Cloudflare Workers** using static asset hosting. The Worker
serves the output of:

```bash
npm run build
```

i.e. the `dist/` directory. The live HTML references the same hashed bundles produced
by this build, so the deployed site corresponds to the current source.

## Project structure

```text
.
├── index.html              # entry document, favicon, page title
├── imageRef.png            # design reference used during development
├── src/
│   ├── main.jsx            # React root
│   ├── App.jsx             # all components, data, and Tailwind classes
│   ├── index.css           # Tailwind import
│   └── App.css             # leftover Vite template styles (unused)
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── cats/               # avatar images used throughout the page
├── vite.config.js          # React + Tailwind plugins
└── eslint.config.js
```

`src/App.css` and the SVGs in `src/assets/` are inherited from the Vite template and
are not part of the UI.

## Implementation notes

- **Responsive behaviour** is handled with Tailwind breakpoints rather than JavaScript:
  the top-bar icon group is hidden below `sm`, the sidebar and reputation strip below
  `md`, and the main card grid becomes one column below `lg`.
- **Level badge** draws its progress ring with SVG `strokeDasharray` / `strokeDashoffset`
  instead of an image or chart library.
- **Avatar fallback**: `Avatar` tracks an `onError` state and renders a cat emoji if an
  image fails to load, so the layout never shows a broken-image icon.
- **Design tokens** are repeated as Tailwind arbitrary values — page background
  `#0e1217`, card background `#1a1d24`, borders `#2a2e37`. A production version would
  promote these to theme variables.
- **Icons** are emoji/glyphs to keep the dependency count at zero; the logo and level
  ring are inline SVG.

## How this was built

I want to be direct about this, since the evaluation is meant to show what I can do:

- **The implementation is largely AI-assisted.** Most of the JSX and styling was
  generated with Claude.
- **The direction was mine.** The project started from the Vite React template, and a
  later commit added Tailwind. I supplied the reference screenshot and iterated on the
  output with the model: fixing spacing, colors, borders, typography, and layout until
  it matched the reference. Commit history shows that progression (`base` → React
  template → Tailwind pass → closer match to the reference → cat assets).
- I replaced the reference's people photos with photos of my own cats, which is the
  main deliberate departure from the original.
- I can walk through the component structure and explain what each part does.

## Known limitations

- Interactions are visual only. Search, tabs, voting, sign-in, and most buttons have no
  handlers; `Ctrl + K` is a hint, not a working shortcut.
- No automated tests and no CI configuration in the repo.
- Data is hard-coded in `App.jsx`; there is no loading, empty, or error state.
- Accessibility is partial: some icon-only buttons have `aria-label`, many do not, and
  keyboard focus styles are the browser defaults.
- `src/App.css` and `src/assets/*` are unused template leftovers.
- The Cloudflare Workers configuration is managed in Cloudflare, not committed here,
  so the repo alone does not reproduce the deployment setup.
