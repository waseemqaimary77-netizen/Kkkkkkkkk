import type { ReactNode } from 'react';

const tones = {
  blue: 'bg-brand-100 text-brand-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  sky: 'bg-sky-100 text-sky-700',
} as const;

export function SectionTitle({
  icon,
  children,
  tone = 'blue',
}: {
  icon: ReactNode;
  children: ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-xl font-extrabold text-slate-800">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
        {icon}
      </span>
      <span>{children}</span>
    </h2>
  );
}
