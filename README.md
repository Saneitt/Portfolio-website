# Sannith Vanamala — personal workshop

A portfolio spanning engineering, product design, filmmaking, and hands-on experiments.

**Live:** https://saneitt.github.io/Portfolio-website/

## Run locally

No package install or build is required. Serve this directory with any static server:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then open http://127.0.0.1:4173. GitHub Pages serves the same files from `main` at the repository root. All local paths are relative so the project works under `/Portfolio-website/`.

## Edit the site

- `index.html`: page structure, biography, experience, project previews, film and side projects.
- `styles.css`: responsive visual system, layouts, and motion preferences.
- `projects.js`: detailed project narratives, implementation notes, scope, and links.
- `app.js`: orbital canvas, discipline selector, project filters, native dialogs, keyboard index, sand playground, and clipboard feedback.
- `assets/`: favicon and an actual Jarvis prototype screenshot.
- `experiments/jarvis/`: standalone interactive concept and its case study.
- `docs/design-notes.md`: design reasoning and research references.

The site has no analytics, tracking scripts, API keys, or backend. Google Fonts supplies typography. The film thumbnail is loaded from YouTube; the film opens directly on YouTube because embedded playback was unavailable during verification. Motion preference is stored locally. The Jarvis prototype has its own clearly labeled demo state and local storage.

## Interaction and access

Normal document scrolling, visible keyboard focus, semantic headings, native modal focus containment, Escape dismissal, a skip link, responsive layouts, and a persistent ambient-motion control. System reduced-motion preference disables ambient rotation by default. Canvas work pauses offscreen and when the page is hidden. Sand moves only after a visitor interacts with it, then settles. The Drop sand button offers a keyboard alternative to drawing.

Use **Ctrl/Cmd + K** to search projects and sections. The instrument's discipline buttons support arrow keys. Source links, contact links, the biography, and the film's direct YouTube link remain available without JavaScript.

## Content and provenance

Project descriptions were checked against the linked repositories. InterviewEye's delivery signals and EcoSpectre's environmental assessments are described as experimental. QuantumQA is a reviewable generation workflow; generated scripts are not presented as validated production tests. Jarvis is an AI-assisted interface prototype with simulated actions, not a deployed autonomous assistant. Its case study includes the scope and next research steps.

The project-card diagrams are interface illustrations, labeled as such. The Jarvis image shows the existing prototype. Vignette uses its actual YouTube thumbnail. Writing, direction, lead performance, cinematography, editing, and planning credits were confirmed by Sannith. The VTOL note accurately describes a partially working experiment using salvaged RC plane parts. Photography is a short personal note with a link, rather than an invented gallery.

Portfolio implementation developed with AI assistance from Sannith's direction and reviewed project material. No third-party brand designs or logos are reproduced.
