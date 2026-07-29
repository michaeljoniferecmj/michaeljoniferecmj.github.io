import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * Every palette below resolves through a CSS custom property rather than a
 * literal hex. That indirection is the whole mechanism behind Dev Mode: the
 * `data-mode="dev"` attribute on <html> swaps one block of variables in
 * globals.css and the entire interface re-skins, with zero per-component
 * conditional classes to keep in sync.
 *
 * The DEFAULT (light) values are byte-identical to what shipped in v1.1.0 —
 * including the three documented AA contrast fixes — so the default view is
 * unchanged. See globals.css for the two variable blocks.
 *
 * `<alpha-value>` is required for Tailwind's slash-opacity syntax
 * (`bg-surface/85`, `border-navy-200/70`) to keep working through the variable.
 *
 * TOKENS THAT ARE NOT VARIABLES, AND WHY:
 *   white / black — used only as ink on dark chrome (carousel arrows, the
 *     watermark, the dot indicators sitting on a screenshot). Those surfaces are
 *     dark in BOTH modes, so inverting `white` would have made them vanish.
 *   shot          — the screenshot backdrop in the modal. Deliberately dark in
 *     both modes; a light letterbox around a product shot reads as a bug.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--c-navy-900) / <alpha-value>)',
          50: 'rgb(var(--c-navy-50) / <alpha-value>)',
          100: 'rgb(var(--c-navy-100) / <alpha-value>)',
          200: 'rgb(var(--c-navy-200) / <alpha-value>)',
          300: 'rgb(var(--c-navy-300) / <alpha-value>)',
          400: 'rgb(var(--c-navy-400) / <alpha-value>)',
          500: 'rgb(var(--c-navy-500) / <alpha-value>)',
          600: 'rgb(var(--c-navy-600) / <alpha-value>)',
          700: 'rgb(var(--c-navy-700) / <alpha-value>)',
          800: 'rgb(var(--c-navy-800) / <alpha-value>)',
          900: 'rgb(var(--c-navy-900) / <alpha-value>)',
          950: 'rgb(var(--c-navy-950) / <alpha-value>)',
        },
        slate: {
          50: 'rgb(var(--c-slate-50) / <alpha-value>)',
          100: 'rgb(var(--c-slate-100) / <alpha-value>)',
          200: 'rgb(var(--c-slate-200) / <alpha-value>)',
          300: 'rgb(var(--c-slate-300) / <alpha-value>)',
          400: 'rgb(var(--c-slate-400) / <alpha-value>)',
          500: 'rgb(var(--c-slate-500) / <alpha-value>)',
          600: 'rgb(var(--c-slate-600) / <alpha-value>)',
          700: 'rgb(var(--c-slate-700) / <alpha-value>)',
          800: 'rgb(var(--c-slate-800) / <alpha-value>)',
          900: 'rgb(var(--c-slate-900) / <alpha-value>)',
          950: 'rgb(var(--c-slate-950) / <alpha-value>)',
        },
        indigo: {
          50: 'rgb(var(--c-indigo-50) / <alpha-value>)',
          100: 'rgb(var(--c-indigo-100) / <alpha-value>)',
          200: 'rgb(var(--c-indigo-200) / <alpha-value>)',
          300: 'rgb(var(--c-indigo-300) / <alpha-value>)',
          400: 'rgb(var(--c-indigo-400) / <alpha-value>)',
          500: 'rgb(var(--c-indigo-500) / <alpha-value>)',
          600: 'rgb(var(--c-indigo-600) / <alpha-value>)',
          700: 'rgb(var(--c-indigo-700) / <alpha-value>)',
          800: 'rgb(var(--c-indigo-800) / <alpha-value>)',
          900: 'rgb(var(--c-indigo-900) / <alpha-value>)',
        },
        emerald: {
          50: 'rgb(var(--c-emerald-50) / <alpha-value>)',
          100: 'rgb(var(--c-emerald-100) / <alpha-value>)',
          200: 'rgb(var(--c-emerald-200) / <alpha-value>)',
          300: 'rgb(var(--c-emerald-300) / <alpha-value>)',
          400: 'rgb(var(--c-emerald-400) / <alpha-value>)',
          500: 'rgb(var(--c-emerald-500) / <alpha-value>)',
          600: 'rgb(var(--c-emerald-600) / <alpha-value>)',
          700: 'rgb(var(--c-emerald-700) / <alpha-value>)',
          800: 'rgb(var(--c-emerald-800) / <alpha-value>)',
          900: 'rgb(var(--c-emerald-900) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          light: 'rgb(var(--c-accent-light) / <alpha-value>)',
          dark: 'rgb(var(--c-accent-dark) / <alpha-value>)',
          50: 'rgb(var(--c-accent-50) / <alpha-value>)',
          100: 'rgb(var(--c-accent-100) / <alpha-value>)',
          200: 'rgb(var(--c-accent-200) / <alpha-value>)',
          /**
           * Ink for text sitting ON a filled accent/indigo button. It was
           * `text-white`, which only worked while every filled button had a
           * dark fill. In Dev Mode the fill is bright terminal green, so the
           * ink has to flip with it or the mailto CTA drops to ~1.3:1.
           */
          on: 'rgb(var(--c-accent-on) / <alpha-value>)',
        },
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        /**
         * Panel background. Was `bg-white` everywhere, which is genuinely
         * dual-use in this codebase: nine "card surface" uses that must invert,
         * and the carousel dot indicators that must stay white on top of a
         * screenshot. Splitting the two is what makes the swap safe.
         */
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        /** Inverted chip (the `>_` logo mark, the skip link). */
        chip: {
          DEFAULT: 'rgb(var(--c-chip) / <alpha-value>)',
          ink: 'rgb(var(--c-chip-ink) / <alpha-value>)',
        },
        /** Screenshot letterbox — intentionally mode-independent. */
        shot: {
          DEFAULT: '#020617',
          strip: '#0f172a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.85)' },
        },
        /**
         * Entry fade for a swapped carousel screenshot. It is an ANIMATION and
         * not a transition on purpose: the <img> carries `key={src}`, so React
         * unmounts and remounts it on every swap. A transition has no prior
         * opacity to move from and silently does nothing — which is exactly
         * the bug this replaced.
         */
        'shot-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        /** Modal panel. Never from `scale(0)` — nothing appears from nothing. */
        'modal-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'backdrop-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        /**
         * 220ms, not the 400ms this shipped with: UI motion stays under
         * 300ms, and this fires on a list expand — squarely UI. Paired with
         * a 45ms per-card stagger in ProjectLineSection.
         */
        'fade-in-up': 'fade-in-up 0.22s var(--ease-out) both',
        'soft-pulse': 'soft-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shot-in': 'shot-in 0.18s ease-out both',
        /* Modals sit in the "occasional" tier — 200-500ms is the band. */
        'modal-in': 'modal-in 0.2s var(--ease-out) both',
        'backdrop-in': 'backdrop-in 0.2s ease-out both',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      /**
       * `fine-pointer:` — gates a utility behind a real hovering pointer.
       *
       * Touch devices fire a :hover on tap and then LEAVE it applied until the
       * next tap elsewhere. Any hover that moves an element therefore sticks:
       * tap a project card on a phone and it lifts and stays lifted. Wrap
       * movement hovers in this variant; it stacks, so `fine-pointer:hover:…`
       * and `fine-pointer:group-hover:…` both work.
       *
       * Deliberately NOT applied to `group-hover:opacity-100` on the carousel
       * arrows. That false hover is load-bearing on touch — it is what reveals
       * the arrows at all. Gating it would hide them on phones.
       */
      addVariant('fine-pointer', '@media (hover: hover) and (pointer: fine)');
    }),
  ],
};

export default config;
