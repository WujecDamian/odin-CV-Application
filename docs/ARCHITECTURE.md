# CV SaaS migration plan

## Current baseline
- The app is a small React + Vite prototype with manual edit/preview toggles.
- State is scattered across component-local hooks, which makes section reordering, persistence, and future AI/export features difficult to scale.

## Target architecture
1. App shell and design system
   - Premium split view, responsive layout, shared tokens, and lightweight UI primitives.
2. Typed state
   - Zustand with persistence for profile data, section order, theme, and resume draft state.
3. Section system
   - Reusable section cards, drag-and-drop ordering, and preview-focused interactions.
4. Advanced tooling
   - Rich text, ATS scoring, template switching, and PDF export in later milestones.

## Step-by-step migration
- Phase 1: foundation (done here) — typed app shell, Zustand persistence, DnD section ordering.
- Phase 2: section modules — convert each resume block to reusable typed cards.
- Phase 3: premium templates and themes — add template switching, theme tokens, and export-ready preview.
- Phase 4: AI and data — ATS keywords, bullet generation, auth, and cloud sync.
