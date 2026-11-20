import type { ReactNode } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import type { Group } from '../types';
import { Marked } from './Marked';

function LabelTag({ children, tone }: { children: ReactNode; tone: 'orange' | 'green' | 'blue' }) {
  const t = {
    orange: 'bg-orange-50 text-orange-800 border-orange-200',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    blue: 'bg-brand-50 text-brand-800 border-brand-200',
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-sm font-bold ${t}`}>
      {children}
    </span>
  );
}

export function ExampleGroup({ group }: { group: Group }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3 rounded-xl bg-brand-50 px-4 py-2.5 text-base font-extrabold text-brand-800">
        {group.title}
      </h3>
      {group.intro && <p className="mb-3 text-slate-600">{group.intro}</p>}

      {group.kind === 'analysis' && (
        <div className="grid gap-3 md:grid-cols-2">
          {group.examples.map((e) => (
            <article key={e.word + e.original} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Marked text={e.word} className="text-2xl font-extrabold text-slate-800 sm:text-3xl" />
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  أصلها: <Marked text={e.original} className="text-lg font-bold text-slate-700" />
                </span>
              </div>
              {e.evidence && (
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-bold text-slate-700">الدليل: </span>
                  {e.evidence}
                </p>
              )}
              <p className="mt-2.5 flex gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold leading-7 text-emerald-900">
                <Check size={18} className="mt-1 shrink-0 text-emerald-700" aria-hidden="true" />
                <span>{e.reason}</span>
              </p>
            </article>
          ))}
        </div>
      )}

      {group.kind === 'origin' && (
        <ul className="space-y-2">
          {group.examples.map((e) => (
            <li
              key={e.word}
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              <span className="min-w-20 text-xl font-extrabold text-slate-800">{e.word}</span>
              <LabelTag tone="orange">الأصل: {e.answer}</LabelTag>
              <span className="text-sm text-slate-600">{e.evidence}</span>
            </li>
          ))}
        </ul>
      )}

      {group.kind === 'weight' && (
        <ul className="space-y-2">
          {group.examples.map((e) => (
            <li
              key={e.word}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              <span className="min-w-20 text-xl font-extrabold text-slate-800">{e.word}</span>
              <ArrowLeft size={18} className="text-slate-400" aria-hidden="true" />
              <LabelTag tone="orange">أصلها: {e.original}</LabelTag>
              <ArrowLeft size={18} className="text-slate-400" aria-hidden="true" />
              <LabelTag tone="green">وزنها: {e.weight}</LabelTag>
            </li>
          ))}
        </ul>
      )}

      {group.kind === 'agent' && (
        <>
          <ul className="space-y-2">
            {group.examples.map((e) => (
              <li
                key={e.verb}
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <span className="min-w-16 text-xl font-extrabold text-slate-800">{e.verb}</span>
                <ArrowLeft size={18} className="text-slate-400" aria-hidden="true" />
                <LabelTag tone="green">{e.agent}</LabelTag>
                <span className="text-sm text-slate-600">أصلها: {e.original}</span>
              </li>
            ))}
          </ul>
          {group.analysis && (
            <p className="mt-3 flex gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold leading-7 text-emerald-900">
              <Check size={18} className="mt-1 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>{group.analysis}</span>
            </p>
          )}
        </>
      )}
    </div>
  );
}
