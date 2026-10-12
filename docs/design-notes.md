# Design notes

## A personal workshop, connected by curiosity

The portfolio needs to support hiring across engineering, product, and creative roles. The primary story is how Sannith approaches making things. Selected software projects carry technical detail; filmmaking has equal editorial presence; smaller experiments show curiosity without inflating their outcomes.

The house project is intentionally omitted at Sannith's request. Photography remains a small observation rather than a large section without a curated body of images. Vignette includes writing, directing, lead performance, cinematography, editing, and planning.

## References and decisions

- [teenage engineering: OP-1 overview](https://teenage.engineering/products/op-1/original/overview) and [control layout](https://teenage.engineering/guides/op-1/original/layout): precise labels, visible control-to-result relationships, restrained accent colors. Applied through a tactile hero instrument whose discipline controls change its readout, geometry, and destination.
- [Apple Human Interface Guidelines: Motion](https://developer.apple.com/design/human-interface-guidelines/motion): purposeful motion that supports understanding. Applied through brief state transitions, user-controlled rotation, and immediate interactions, with no loading ceremony or scroll interception.
- [Nothing: Glyph Interface](https://support.nothing.tech/hc/en-us/articles/43227904206097-What-is-the-Glyph-Interface): small visual signals can convey a useful state. Applied through concise selection indicators paired with text. The site does not invent live telemetry or arbitrary performance statistics.
- [NASA Eyes](https://science.nasa.gov/eyes/): spatial relationships invite exploration. The orbital instrument connects disciplines and expresses an interest in space without presenting decorative values as scientific data.
- [web.dev: animation performance](https://web.dev/articles/animations-guide): constrain visual work and favor inexpensive transitions. Canvas uses capped pixel density and visibility checks; sand uses a small grid and stops after settling.
- [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html): continuous ambient motion has an explicit pause control. System reduced-motion preferences are honored by default; meaningful content stays visible when animation stops.

These references informed interaction principles, material feel, and visual hierarchy. The composition, typography system, orbital drawing, and project diagrams were built specifically for this portfolio.

## Personal identity, theme, and motion refinements

Sannith's name is the primary title, with “Built on curiosity.” as a subordinate statement. The orbital instrument introduces a few of his interests alongside that identity. Warm paper and graphite/sage palettes share a restrained orange accent; dark mode includes its own instrument materials, diagrams, cards, dialogs, and readable secondary text rather than a color inversion. The theme is applied before stylesheet paint and remembers the visitor's explicit choice.

One faint shooting star crosses the open page background every 4–6 seconds, with a short initial appearance and no competing particle field. It uses a capped-resolution canvas, rests between passes, pauses while the document is hidden, and avoids starting behind open dialogs. The ambient-motion control stops it immediately.

The scroll treatment preserves native wheel, touch, keyboard, and anchor behavior. A two-pixel reading-progress line, one-time 18-pixel content reveals, and a maximum 16-pixel instrument drift provide continuity without changing scroll speed. Layout changes from filtering, accordions, and resizing recalculate progress through ResizeObserver. Reduced motion or ambient pause keeps content fully visible and removes decorative travel. Keyboard focus reveals any pending content immediately.

## Content verification

- InterviewEye: `backend/server.js`, `ai-services/evaluator.py`, `adaptive_engine.py`, and `tts.py` in [the source repository](https://github.com/Saneitt/InterviewEye). Current implementation uses Groq/Llama, Faster-Whisper, and Piper. Audio/video signals are exploratory.
- EcoSpectre: `ProcessingScreen.tsx`, `ResultScreen.tsx`, `ResultCard.tsx`, and `services/gemini.ts` in [the source repository](https://github.com/Saneitt/EcoSpectre). Gemini is called from the mobile client; the backend supports authentication and persistence. The UI saves decisions locally before background synchronization.
- QuantumQA: `app.py`, `backend/rag.py`, `backend/script_generation.py`, and `requirements.txt` in [the source repository](https://github.com/Saneitt/QuantumQA). Implemented with Streamlit; source references and case selection precede script generation.
- Sand: the [original Canvas simulation](https://github.com/Saneitt/Sand-falling-sim). The portfolio includes a compact reinterpretation with color, pour, reset, and keyboard controls, and links to the original.
- Jarvis: the [existing prototype](https://github.com/Saneitt/personal-jarvis), included locally so visitors can open the case study and demo without an account.

## Future assets

A small curated set of original photographs and real VTOL build photos could replace the small illustrated field notes. Behind-the-scenes Vignette images could deepen the filmmaking section. No personal photos or successful aircraft tests have been fabricated.
