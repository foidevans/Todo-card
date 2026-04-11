# Todo Card — HNG Stage 0 Frontend Task

A clean, accessible, and testable Todo Item Card built with plain HTML, CSS, and JavaScript. No frameworks, no dependencies just the OGs.

**Live Demo:**[https://todo-card-eta.vercel.app/]  
**GitHub:** [https://github.com/foidevans/Todo-card](https://github.com/foidevans/Todo-card)  
**Author:** Favour Evans (Foide)

---

## How to Run Locally

1. Clone the repo:
```bash
   git clone https://github.com/foidevans/Todo-card.git
```

2. Navigate into the project folder:
```bash
   cd Todo-card
```

3. Open `index.html` in your browser directly, or use a local server:
   - If you have VS Code, use the **Live Server** extension
   - Or run a quick local server with Python:
```bash
     python3 -m http.server 5500
```

4. Visit `http://localhost:5500` in your browser.

> No installs, no build steps, no package.json. Just open and run.

---

## Project Structure
Todo-card/
├── index.html       # Markup — semantic HTML with all required data-testid attributes
├── style.css        # Styles — layout, responsiveness, WCAG AA verified colors
├── script.js        # Behaviour — time remaining logic, checkbox toggle, edit/delete
└── README.md

---

## Decisions Made

### Plain HTML, CSS, and JavaScript
The task did not specify a framework, so none was used. Vanilla HTML/CSS/JS keeps the project lightweight, dependency-free, and easy to run anywhere without a build step. It also demonstrates fundamental frontend skills without framework abstractions.

### Semantic HTML first
Every element was chosen for its semantic meaning `<article>` for the card root, `<time>` with a `datetime` attribute for dates, `<ul role="list">` for tags, and real `<button>` elements for actions. This makes the component naturally accessible and testable without extra configuration.

### WCAG AA contrast compliance
Every color pair in the design was manually verified against the WCAG AA standard using the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) before being written into CSS. No color was chosen purely for aesthetics without first confirming it met the minimum 4.5:1 ratio for normal text.

| Element | Text | Background | Ratio |
|---|---|---|---|
| Title | `#1A1A2E` | `#FFFFFF` | 16.1:1 ✅ |
| Description | `#6B7280` | `#FFFFFF` | 4.83:1 ✅ |
| Priority badge | `#FFFFFF` | `#DC2626` | 4.82:1 ✅ |
| Status badge | `#4F46E5` | `#EEF2FF` | passes ✅ |
| Status done badge | `#04865D` | `#ECFDF5` | passes ✅ |
| Edit button | `#FFFFFF` | `#4F46E5` | 6.28:1 ✅ |
| Delete button | `#FFFFFF` | `#DC2626` | 4.82:1 ✅ |

### Inline SVG icons
Lucide Icons via CDN was attempted but proved unreliable for rendering multiple icons. Inline SVGs were used instead, no external dependency, no rendering issues, and icons inherit text color automatically via `stroke="currentColor"`.

### `sr-only` label on checkbox
The checkbox has both an `aria-label` attribute and a visually hidden `<label>` element linked via `for`. This ensures maximum screen reader compatibility across different assistive technologies.

### `aria-live="polite"` on time remaining
Since the time remaining value updates every 60 seconds via `setInterval`, it is wrapped in `aria-live="polite"` so screen readers announce the updated value without interrupting the user.

### Focus styles preserved
`:focus-visible` is used instead of `:focus` throughout, so focus rings only appear for keyboard users and not on mouse clicks. This is the modern correct approach that balances visual cleanliness with keyboard accessibility.

---

## Trade-offs

### Hardcoded data
Task title, description, priority, status, due date, and tags are all hardcoded as required by the brief. In a real application these would come from an API or state management layer. For this stage, hardcoding keeps the focus on UI correctness and testability rather than data fetching.

### Single card
The brief asked for "a single card or a small page containing one card." Only one card with the required `data-testid` attributes exists in the DOM. Multiple cards were explored during development but scrapped to stay aligned with the brief and avoid ambiguity in automated tests.

### No Add/Edit functionality
The Edit button logs to the console and the Delete button triggers a native `alert`. Full CRUD functionality is outside the scope of Stage 0 and would require a backend or persistent state layer.

### `setInterval` for time remaining
The time remaining updates every 60 seconds. A more precise approach would use `requestAnimationFrame` or calculate the exact milliseconds until the next minute boundary and use `setTimeout` for accuracy. For Stage 0 the 60 second interval is sufficient and matches the brief's guidance.

---

## Accessibility Checklist

- ✅ Real `<input type="checkbox">` with `aria-label` and `<label>`
- ✅ All buttons have accessible names via visible text and `aria-label`
- ✅ Priority and status badges have `aria-label`
- ✅ WCAG AA contrast on all text elements
- ✅ Visible focus styles on all interactive elements
- ✅ Keyboard navigable: Tab → checkbox → edit → delete
- ✅ `aria-live="polite"` on time remaining
- ✅ `aria-hidden="true"` on decorative SVG icons

---

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| 320px — 480px | Full width card, 20px padding, slightly smaller border radius |
| 480px+ | Centered card, max-width 480px, comfortable padding |

Tested at 320px, 375px, 480px, 768px, 1200px — no horizontal overflow at any width.