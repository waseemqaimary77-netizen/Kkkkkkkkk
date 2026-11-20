import { BookMarked, Check, Eye, FileText, ListOrdered, Layers, Target } from 'lucide-react';
import type { Lesson } from '../types';
import { Callout } from './Callout';
import { ExampleGroup } from './ExampleGroup';
import { RuleDiagram } from './RuleDiagram';
import { SectionTitle } from './SectionTitle';

const TYPE_TARGETS = ['alif', 'hamza', 'waw-ya', 'ya-waw'];

export function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <article className="animate-rise space-y-8" aria-labelledby="lesson-title">
      <header className="rounded-3xl bg-gradient-to-l from-brand-700 to-brand-500 px-6 py-7 text-white shadow-sm">
        <h1 id="lesson-title" className="text-2xl font-extrabold text-balance sm:text-3xl">
          {lesson.title}
        </h1>
      </header>

      <section>
        <SectionTitle icon={<BookMarked size={20} aria-hidden="true" />}>التعريف</SectionTitle>
        <p className="rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-lg font-semibold leading-9 text-brand-900">
          {lesson.definition}
        </p>
      </section>

      <section>
        <SectionTitle icon={<FileText size={20} aria-hidden="true" />} tone="sky">
          الشرح المبسّط
        </SectionTitle>
        <div className="space-y-3 text-lg leading-9 text-slate-700">
          {lesson.explanation.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {lesson.rule && (
        <section>
          <SectionTitle icon={<Target size={20} aria-hidden="true" />} tone="green">
            القاعدة في لمحة
          </SectionTitle>
          <RuleDiagram rule={lesson.rule} />
        </section>
      )}

      {lesson.types && (
        <section>
          <SectionTitle icon={<Layers size={20} aria-hidden="true" />} tone="green">
            أنواع الإعلال بالقلب
          </SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {lesson.types.map((t, i) => (
              <a
                key={t.title}
                href={`#/lessons/${TYPE_TARGETS[i]}`}
                className="group rounded-2xl border border-brand-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-lg font-extrabold text-brand-700 tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-extrabold text-slate-800">{t.title}</p>
                    <p className="text-sm text-slate-500">أمثلة: {t.example}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle icon={<ListOrdered size={20} aria-hidden="true" />}>خطوات تطبيق القاعدة</SectionTitle>
        <ol className="space-y-3">
          {lesson.steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-extrabold text-white tabular-nums">
                {i + 1}
              </span>
              <span className="pt-0.5 text-slate-700">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {lesson.groups.length > 0 && (
        <section>
          <SectionTitle icon={<Eye size={20} aria-hidden="true" />} tone="green">
            الأمثلة وتحليلها
          </SectionTitle>
          {lesson.groups.some((g) => g.kind === 'analysis') && (
            <p className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="mk-orig px-2 py-0.5 font-bold">الحرف الأصلي</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="mk-new px-2 py-0.5 font-bold">الحرف بعد الإعلال</span>
              </span>
            </p>
          )}
          {lesson.groups.map((g) => (
            <ExampleGroup key={g.title} group={g} />
          ))}
        </section>
      )}

      {lesson.notes.length > 0 && (
        <Callout>
          <ul className="space-y-2.5">
            {lesson.notes.map((n) => (
              <li key={n} className="flex items-start gap-2.5 leading-8 text-slate-700">
                <span className="font-extrabold text-orange-600" aria-hidden="true">
                  —
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Callout>
      )}

      {lesson.summary.length > 0 && (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <h3 className="mb-3 text-lg font-extrabold text-emerald-800">الخلاصة</h3>
          <ul className="space-y-2">
            {lesson.summary.map((s) => (
              <li key={s} className="flex items-start gap-2.5 font-semibold leading-8 text-emerald-900">
                <Check size={18} className="mt-1.5 shrink-0 text-emerald-700" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
