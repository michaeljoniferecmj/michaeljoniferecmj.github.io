import type { ReactNode } from 'react';

/**
 * Shared badge primitive with two named variants.
 *
 * Both variants ship together on day one (the Flagship marker and the
 * cross-listing marker sit in the same badge row on the same card), so this is
 * extraction-on-need, not speculative abstraction. They are deliberately
 * distinguished by icon AND copy AND colour family — never by colour alone
 * (WCAG 1.4.1), and never merely by shape.
 */
type PillVariant = 'flagship' | 'cross-listed';

const VARIANT_CLASSES: Record<PillVariant, string> = {
  // accent-dark on accent-50 — 5.62:1 at 11.5px. AA pass.
  flagship: 'border-accent-200 bg-accent-50 text-accent-dark',
  // navy-700 on navy-100 — 9.45:1 at 11.5px. AA/AAA pass.
  'cross-listed': 'border-navy-200 bg-navy-100 text-navy-700',
};

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-3 w-3"
    >
      <path d="M12 2l2.9 6.26 6.6.72-4.9 4.6 1.35 6.42L12 16.9 6.05 20l1.35-6.42-4.9-4.6 6.6-.72z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3 w-3"
    >
      <rect x="3" y="3" width="12" height="12" rx="2" />
      <path d="M9 21h10a2 2 0 0 0 2-2V9" />
    </svg>
  );
}

const VARIANT_ICONS: Record<PillVariant, ReactNode> = {
  flagship: <StarIcon />,
  'cross-listed': <LayersIcon />,
};

type PillProps = {
  variant: PillVariant;
  children: ReactNode;
};

export function Pill({ variant, children }: PillProps) {
  return (
    <span
      data-testid={`pill-${variant}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${VARIANT_CLASSES[variant]}`}
    >
      {VARIANT_ICONS[variant]}
      {children}
    </span>
  );
}
