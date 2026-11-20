import { ArrowLeft } from 'lucide-react';
import type { Rule } from '../types';

function Letter({ ch, tone }: { ch: string; tone: 'from' | 'to' }) {
  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl font-extrabold ${
        tone === 'from'
          ? 'border border-orange-200 bg-orange-50 text-orange-700'
          : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      {ch}
    </span>
  );
}

export function RuleDiagram({ rule }: { rule: Rule }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex gap-2" aria-label="الحروف الأصلية">
          {rule.from.map((c) => (
            <Letter key={c} ch={c} tone="from" />
          ))}
        </div>
        <div className="flex flex-col items-center text-brand-700">
          <span className="text-xs font-bold">تُقلب إلى</span>
          <ArrowLeft size={26} aria-hidden="true" />
        </div>
        <Letter ch={rule.to} tone="to" />
      </div>
      <p className="mt-5 text-center text-sm font-bold text-slate-500">الشرط والسبب:</p>
      <ul className="mt-2.5 space-y-2">
        {rule.conditions.map((c) => (
          <li key={c} className="rounded-xl bg-brand-50 px-4 py-2.5 text-center font-bold text-brand-800">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
