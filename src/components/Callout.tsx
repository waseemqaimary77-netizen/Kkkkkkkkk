import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';

export function Callout({ title = 'ملاحظات مهمة', children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-orange-200 bg-orange-50/90 p-5 sm:p-6">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-orange-800">
        <Lightbulb size={20} aria-hidden="true" />
        <span>{title}</span>
      </h3>
      {children}
    </section>
  );
}
