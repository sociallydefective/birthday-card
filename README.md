# Mridhula's Birthday Surprise 🎀
React + Vite + Framer Motion + Lucide. Art: your own sprite images in `src/assets/` (swap any file to change it) plus inline SVG decorations; all audio is synthesised with the Web Audio API (no files, no licences).

## Run
```
npm install
npm run dev      # http://localhost:5173  (open on your phone via the "Network" URL)
npm run build    # production build in dist/ — deploy to Netlify / Vercel / GitHub Pages
```
## Structure
- `src/App.jsx` – page state, transitions, progress dots, music/mute controls
- `src/pages.jsx` – the four pages (Entrance, Vibes, Fortune, Finale)
- `src/components/art.jsx` – your sprite images (cake, ghost, star, chick, banana cat, alien, Mew, Espeon, Pikachu) + SVG balloon, bow, heart
- `src/components/fx.jsx` – confetti + floating decorations
- `src/sound.js` – sound effects and optional music (off by default)
- `src/styles.css` – theme and layout
