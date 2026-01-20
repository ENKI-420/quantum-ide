# Definition of Done (DoD)
## DNA::}{::lang Sovereign Quantum AI Platform

This document outlines the comprehensive criteria that must be met for any task, feature, or user story to be considered "Done" and ready for deployment. This checklist ensures high quality, consistency, and maintainability across the project.

---

## 1. Code Quality & Standards

### 1.1 Syntax & Formatting
- [ ] **Linting**: Code passes all linter checks (ESLint, Biome) with no errors or warnings
- [ ] **Formatting**: Code is formatted according to project style guide (Prettier/Biome)
- [ ] **Clean Code**: No `console.log` statements, commented-out code, or unused imports/variables
- [ ] **Type Safety**: No TypeScript errors; `any` type usage is minimized and justified
- [ ] **Refactoring**: Code is modular, reusable, and follows DRY principles

### 1.2 Component Architecture
- [ ] **Single Responsibility**: Each component has one clear purpose
- [ ] **Props Interface**: All props are typed with descriptive interfaces
- [ ] **Default Props**: Sensible defaults provided where applicable
- [ ] **Composition**: Uses composition over inheritance patterns

---

## 2. Testing Requirements

### 2.1 Automated Testing
- [ ] **Unit Tests**: Critical functions and components have tests with >= 80% coverage
- [ ] **Integration Tests**: Key user flows and API integrations are tested and passing
- [ ] **Visual Regression**: Critical UI components have snapshot tests

### 2.2 Manual Testing
- [ ] **Feature Testing**: Feature has been manually tested in development environment
- [ ] **Edge Cases**: Error handling and edge cases verified (empty states, network failures)
- [ ] **Cross-Device**: Tested on physical devices where possible (not just emulators)

---

## 3. Functionality & Acceptance Criteria
- [ ] **Requirements Met**: All acceptance criteria defined in user story are satisfied
- [ ] **Bug Free**: No critical or high-priority bugs remain open
- [ ] **Data Integrity**: Database migrations tested and reversible; validation in place
- [ ] **Error Boundaries**: React error boundaries implemented for graceful failure

---

## 4. UI/UX Design System Compliance

### 4.1 Design Consistency

#### Color System (3-5 Colors Maximum)
| Token | Purpose | Value | Usage |
|-------|---------|-------|-------|
| Primary | Quantum/Tech actions | `oklch(0.7 0.15 195)` | CTAs, links, highlights |
| Secondary | Consciousness/Success | `oklch(0.65 0.18 160)` | Success states, bio elements |
| Accent | Energy/Warning (Lambda-Phi) | `oklch(0.75 0.18 85)` | Warnings, emphasis |
| Background | Dark foundation | `oklch(0.09 0.01 260)` | Page backgrounds |
| Muted | Subtle elements | `oklch(0.65 0.02 260)` | Secondary text, borders |

- [ ] **Token Usage**: All colors reference design tokens (no hardcoded hex/rgb values)
- [ ] **Semantic Colors**: Colors used semantically (e.g., destructive for errors)
- [ ] **No Purple**: Purple/violet not used prominently unless explicitly requested
- [ ] **Gradient Rules**: Gradients use analogous colors only (no opposing temperatures)

#### Typography System
| Level | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| H1 | 48-60px | 700 | 1.1 | Page titles |
| H2 | 28-36px | 700 | 1.2 | Section headers |
| H3 | 20-24px | 600 | 1.3 | Card titles |
| Body | 14-16px | 400 | 1.5-1.6 | Paragraphs |
| Caption | 12px | 500 | 1.4 | Labels, metadata |
| Mono | 13-14px | 400 | 1.4 | Code, metrics |

- [ ] **Font Families**: Maximum 2 font families (IBM Plex Sans + IBM Plex Mono)
- [ ] **Font Scale**: Uses defined scale (no arbitrary font sizes)
- [ ] **Line Height**: Body text uses `leading-relaxed` (1.5-1.6)
- [ ] **Text Wrapping**: Titles use `text-balance` or `text-pretty`

#### Spacing System (8px Base Grid)
| Scale | Value | Common Use |
|-------|-------|------------|
| 1 | 4px | Inline spacing |
| 2 | 8px | Small gaps |
| 3 | 12px | Icon gaps |
| 4 | 16px | Component padding |
| 6 | 24px | Card padding |
| 8 | 32px | Section gaps |
| 12 | 48px | Large spacing |
| 16 | 64px | Section padding |

- [ ] **Spacing Tokens**: Uses Tailwind spacing scale (no arbitrary values like `p-[17px]`)
- [ ] **Gap Over Margin**: Prefers `gap-*` over individual margins for flex/grid
- [ ] **Consistent Padding**: Similar components have matching padding

### 4.2 Visual Hierarchy
- [ ] **Clear Hierarchy**: Primary > Secondary > Tertiary actions clearly distinguished
- [ ] **Visual Weight**: Important elements have appropriate visual prominence
- [ ] **Whitespace**: Adequate breathing room between sections
- [ ] **Grouping**: Related elements visually grouped together
- [ ] **Alignment**: Elements aligned to grid; no orphaned elements

### 4.3 Component States

#### Interactive Element States (ALL Required)
| State | Visual Treatment | Implementation |
|-------|-----------------|----------------|
| Default | Base styling | Standard component |
| Hover | Subtle lift/glow | `hover:` prefix |
| Focus | 3px ring, offset | `focus-visible:` prefix |
| Active | Scale 0.98, haptic | `active:` prefix |
| Disabled | 50% opacity | `disabled:` attribute |
| Loading | Spinner overlay | Loading component |

- [ ] **All States**: Every interactive element has all 6 states implemented
- [ ] **Focus Visible**: Uses `focus-visible` (not `focus`) for keyboard-only rings
- [ ] **Disabled Clarity**: Disabled elements clearly non-interactive
- [ ] **Loading Feedback**: Async actions show immediate loading state

#### Data States (ALL Required)
| State | Requirement | Component |
|-------|-------------|-----------|
| Empty | Helpful message + CTA | `<Empty />` component |
| Loading | Skeleton or spinner | `<Skeleton />` / `<Spinner />` |
| Error | Error message + retry | Error boundary + message |
| Success | Confirmation feedback | Toast notification |
| Partial | Progressive loading | Skeleton + content |

- [ ] **Empty States**: All lists/tables have designed empty states
- [ ] **Loading States**: Skeleton loaders match content shape
- [ ] **Error States**: User-friendly error messages with recovery actions

---

## 5. Responsiveness

### 5.1 Breakpoint Compliance

| Breakpoint | Width | Layout | Touch Targets |
|------------|-------|--------|---------------|
| xs (Mobile) | < 640px | Single column, stacked | 48px minimum |
| sm (Mobile Landscape) | 640px | 2-column where appropriate | 44px minimum |
| md (Tablet) | 768px | 2-3 column grid | 44px minimum |
| lg (Desktop) | 1024px | 3-4 column grid | Standard |
| xl (Large Desktop) | 1280px | 4 column grid | Standard |
| 2xl (Ultra-wide) | 1536px | Max-width centered | Standard |

- [ ] **Mobile First**: Styles written mobile-first, enhanced for larger screens
- [ ] **All Breakpoints**: Tested at xs, sm, md, lg, xl breakpoints
- [ ] **No Horizontal Scroll**: No unintended horizontal scrolling at any breakpoint
- [ ] **Content Readable**: All text readable without zooming on mobile

### 5.2 Touch Optimization
- [ ] **Touch Targets**: Minimum 44x44px for all interactive elements on mobile
- [ ] **Tap Feedback**: Visual feedback on touch (scale/opacity change)
- [ ] **Safe Areas**: Respects device safe areas (notch, home indicator)
- [ ] **Input Zoom**: Inputs use 16px font to prevent iOS zoom
- [ ] **Gesture Support**: Swipe gestures where appropriate (drawers, carousels)

### 5.3 Cross-Browser Compatibility
- [ ] **Chrome**: Latest version verified
- [ ] **Firefox**: Latest version verified
- [ ] **Safari**: Latest macOS + iOS versions verified
- [ ] **Edge**: Latest version verified
- [ ] **Mobile Browsers**: iOS Safari + Chrome Android verified

---

## 6. Accessibility (WCAG 2.1 AA Compliance)

### 6.1 Perceivable

#### Color Contrast Requirements
| Element Type | Minimum Ratio | Measurement |
|--------------|---------------|-------------|
| Normal text (< 18px) | 4.5:1 | Against background |
| Large text (>= 18px bold or >= 24px) | 3:1 | Against background |
| UI Components | 3:1 | Against adjacent colors |
| Focus Indicators | 3:1 | Against adjacent colors |
| Decorative Elements | 3:1 | Against background |

- [ ] **Text Contrast**: All text meets 4.5:1 ratio (7:1 for AAA)
- [ ] **UI Contrast**: Interactive elements meet 3:1 ratio
- [ ] **Color Independence**: Information not conveyed by color alone

#### Non-Text Content
- [ ] **Alt Text**: All meaningful images have descriptive alt text
- [ ] **Decorative Images**: Decorative images have `alt=""`
- [ ] **Icon Labels**: Icons have accessible labels (aria-label or sr-only text)
- [ ] **SVG Accessibility**: SVGs have `role="img"` and titles where appropriate

### 6.2 Operable

#### Keyboard Navigation
| Key | Expected Action |
|-----|-----------------|
| Tab | Move focus forward through interactive elements |
| Shift + Tab | Move focus backward |
| Enter | Activate buttons, links, submit forms |
| Space | Activate buttons, toggle checkboxes |
| Escape | Close modals, dropdowns, overlays |
| Arrow Keys | Navigate within menus, tabs, radio groups |
| Home/End | Jump to first/last item in lists |

- [ ] **Full Keyboard Access**: All functionality available via keyboard
- [ ] **Logical Tab Order**: Tab order follows visual/logical flow
- [ ] **Visible Focus**: Focus indicator visible at all times
- [ ] **No Keyboard Traps**: User can always navigate away from any element
- [ ] **Skip Links**: Skip-to-content link present and functional

#### Focus Management
- [ ] **Focus Ring**: 3px ring with offset using `--ring` color
- [ ] **Focus Visible Only**: Ring shows on keyboard focus, not mouse click
- [ ] **Modal Focus Trap**: Focus trapped within open modals
- [ ] **Focus Restoration**: Focus returns to trigger when modal closes

### 6.3 Understandable

#### Content & Labels
- [ ] **Clear Labels**: All form inputs have visible, associated labels
- [ ] **Error Identification**: Errors clearly identified with text (not just color)
- [ ] **Error Suggestion**: Error messages suggest how to fix the issue
- [ ] **Consistent Navigation**: Navigation consistent across pages

#### Language & Reading
- [ ] **Language Attribute**: `lang` attribute set on `<html>`
- [ ] **Readable Content**: Content written at appropriate reading level
- [ ] **Abbreviations**: Abbreviations expanded on first use or in glossary

### 6.4 Robust

#### ARIA Implementation
```html
<!-- Landmarks (Required) -->
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<footer role="contentinfo">

<!-- Live Regions (For Dynamic Content) -->
<div role="status" aria-live="polite">  <!-- Non-urgent updates -->
<div role="alert" aria-live="assertive"> <!-- Urgent alerts -->

<!-- Widget States -->
<button aria-expanded="false" aria-controls="menu-1">
<div aria-hidden="true">  <!-- Decorative content -->
```

- [ ] **Landmarks**: Page has proper landmark regions
- [ ] **ARIA Labels**: Interactive elements have accessible names
- [ ] **ARIA States**: Dynamic states (expanded, selected, etc.) announced
- [ ] **Live Regions**: Dynamic content updates announced appropriately
- [ ] **No ARIA Misuse**: ARIA used correctly (prefer native HTML when possible)

### 6.5 Accessibility Testing Checklist
- [ ] **Automated Scan**: axe-core or Lighthouse accessibility audit passed (score >= 95)
- [ ] **Keyboard Test**: Complete all tasks using keyboard only
- [ ] **Screen Reader Test**: Tested with VoiceOver (Mac) or NVDA (Windows)
- [ ] **Zoom Test**: Content usable at 200% zoom
- [ ] **Reduced Motion**: Respects `prefers-reduced-motion` media query

---

## 7. User Interaction Flow

### 7.1 Navigation Patterns
- [ ] **Consistent Navigation**: Navigation placement consistent across all pages
- [ ] **Breadcrumbs**: Deep pages have breadcrumb trail
- [ ] **Back Navigation**: User can always navigate back
- [ ] **Current Location**: User always knows where they are
- [ ] **Command Palette**: Cmd+K shortcut works for power users

### 7.2 Form Interactions
- [ ] **Inline Validation**: Errors shown inline, near the field
- [ ] **Real-time Feedback**: Validation on blur or input (debounced)
- [ ] **Clear Error Messages**: Specific, actionable error text
- [ ] **Success Confirmation**: Clear feedback on successful submission
- [ ] **Autosave**: Long forms autosave with visual indicator

### 7.3 Feedback & Confirmation
- [ ] **Immediate Feedback**: Actions provide immediate visual response
- [ ] **Progress Indication**: Long operations show progress
- [ ] **Confirmation Dialogs**: Destructive actions require confirmation
- [ ] **Toast Notifications**: Non-blocking feedback for async actions
- [ ] **Undo Support**: Destructive actions have undo option where possible

### 7.4 Micro-interactions

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Button Hover | Scale 1.02, shadow increase | 150ms |
| Button Active | Scale 0.98, haptic pulse | 100ms |
| Card Hover | Lift 4px, border glow | 200ms |
| Page Enter | Fade in + slide up | 300ms |
| Modal Open | Fade in + scale from 0.95 | 200ms |
| Dropdown | Fade + slide down | 150ms |

- [ ] **Purposeful Animation**: Animations serve a functional purpose
- [ ] **Consistent Timing**: Similar animations have consistent duration
- [ ] **Reduced Motion**: All animations respect `prefers-reduced-motion`
- [ ] **No Jank**: Animations run at 60fps (GPU-accelerated)

---

## 8. Performance Benchmarks

### 8.1 Core Web Vitals (Required Metrics)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Largest Contentful Paint (LCP) | < 2.5s | Time to largest content |
| First Input Delay (FID) | < 100ms | Input responsiveness |
| Cumulative Layout Shift (CLS) | < 0.1 | Visual stability |
| First Contentful Paint (FCP) | < 1.8s | First content visible |
| Time to Interactive (TTI) | < 3.5s | Page fully interactive |
| Total Blocking Time (TBT) | < 200ms | Main thread blocking |

- [ ] **LCP**: Largest Contentful Paint under 2.5 seconds
- [ ] **FID**: First Input Delay under 100 milliseconds
- [ ] **CLS**: Cumulative Layout Shift under 0.1
- [ ] **TTI**: Time to Interactive under 3.5 seconds

### 8.2 Lighthouse Scores (Minimum Thresholds)

| Category | Minimum Score | Target Score |
|----------|---------------|--------------|
| Performance | 85 | 95+ |
| Accessibility | 95 | 100 |
| Best Practices | 90 | 95+ |
| SEO | 90 | 95+ |

- [ ] **Performance**: Lighthouse performance score >= 85
- [ ] **Accessibility**: Lighthouse accessibility score >= 95
- [ ] **Best Practices**: Lighthouse best practices >= 90

### 8.3 Asset Optimization
- [ ] **Image Optimization**: Images use Next.js Image component
- [ ] **Image Formats**: WebP/AVIF with fallbacks where supported
- [ ] **Lazy Loading**: Below-fold images and components lazy loaded
- [ ] **Font Optimization**: Fonts preloaded, with fallback stack
- [ ] **Bundle Size**: No single route exceeds 200KB JS (gzipped)

### 8.4 Runtime Performance
- [ ] **No Layout Thrashing**: No forced synchronous layouts
- [ ] **Debounced Handlers**: Resize/scroll handlers debounced
- [ ] **RAF Animations**: Complex animations use requestAnimationFrame
- [ ] **Memory Management**: No memory leaks in long-running pages
- [ ] **CSS Containment**: Complex components use CSS containment

---

## 9. Security

### 9.1 Input Handling
- [ ] **Input Validation**: All inputs validated on client AND server
- [ ] **Input Sanitization**: User inputs sanitized to prevent XSS
- [ ] **SQL Injection**: Parameterized queries used for all database access
- [ ] **File Upload**: File uploads validated (type, size, content)

### 9.2 Authentication & Authorization
- [ ] **Auth Checks**: Protected routes verify authentication
- [ ] **Authorization**: Role-based access control enforced
- [ ] **Session Security**: Secure session management (HTTP-only cookies)
- [ ] **CSRF Protection**: CSRF tokens used for state-changing requests

### 9.3 Secrets & Configuration
- [ ] **No Hardcoded Secrets**: API keys and secrets in environment variables
- [ ] **Client Exposure**: No server secrets exposed to client bundle
- [ ] **Environment Separation**: Different configs for dev/staging/prod

---

## 10. Documentation

### 10.1 Code Documentation
- [ ] **Complex Logic**: Non-obvious code explained with comments
- [ ] **JSDoc**: Public functions have JSDoc comments
- [ ] **Component Docs**: Complex components have usage examples
- [ ] **Type Documentation**: Exported types have descriptions

### 10.2 Project Documentation
- [ ] **README Updated**: README reflects any new setup steps
- [ ] **API Documentation**: New endpoints documented
- [ ] **Changelog**: Changes logged with version number
- [ ] **User Guides**: User-facing features have documentation

---

## 11. Deployment & Environment

### 11.1 Build Verification
- [ ] **Clean Build**: Project builds without errors or warnings
- [ ] **Bundle Analysis**: Bundle size reviewed and optimized
- [ ] **Environment Parity**: Staging environment mirrors production

### 11.2 CI/CD Pipeline
- [ ] **All Checks Pass**: Lint, type-check, test, build all pass
- [ ] **Preview Deploy**: Feature previewed in Vercel preview deployment
- [ ] **No Regressions**: No visual or functional regressions introduced

---

## 12. Review & Sign-off

### 12.1 Code Review
- [ ] **Peer Review**: Pull Request approved by at least one reviewer
- [ ] **Design Review**: UI changes reviewed against design specs
- [ ] **Accessibility Review**: a11y considerations reviewed

### 12.2 Quality Assurance
- [ ] **QA Testing**: QA team verified in staging environment
- [ ] **Regression Testing**: No existing functionality broken
- [ ] **Edge Case Testing**: Boundary conditions tested

### 12.3 Stakeholder Approval
- [ ] **Product Approval**: Product Owner accepted the deliverable
- [ ] **Design Approval**: Design team signed off on implementation
- [ ] **Technical Approval**: Tech lead approved architecture decisions

---

## Quick Reference Checklists

### Pre-Commit Checklist
```
[ ] Code compiles without errors
[ ] No console.log or commented code
[ ] All interactive elements have focus states
[ ] Tested on mobile viewport
[ ] Accessibility audit passed (Lighthouse >= 95)
```

### Pre-PR Checklist
```
[ ] All DoD items checked
[ ] Self-reviewed diff for mistakes
[ ] Tested all breakpoints
[ ] Keyboard navigation verified
[ ] Performance within thresholds
```

### Pre-Merge Checklist
```
[ ] PR approved by reviewer
[ ] CI/CD pipeline green
[ ] Preview deployment verified
[ ] Documentation updated
[ ] Changelog entry added
```

---

## Measurement Tools

| Tool | Purpose | Frequency |
|------|---------|-----------|
| Lighthouse CI | Performance, a11y, best practices | Every PR |
| axe-core | Accessibility violations | Every PR |
| Bundle Analyzer | JS bundle size | Weekly / Major changes |
| WebPageTest | Real-world performance | Pre-release |
| Chrome DevTools | Runtime performance | During development |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 2026 | Comprehensive UI/UX criteria, accessibility expansion, performance benchmarks |
| 1.0 | Dec 2025 | Initial DoD document |

---

*This DoD is a living document. Review and update retrospectively based on team learnings and evolving best practices.*
