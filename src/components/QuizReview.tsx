import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { QuizItem } from '../types';
import { LABELS } from './QuizQuestion';

interface Props {
  items: QuizItem[];
  answers: (number | null)[];
  onBack: () => void;
  onRestart: () => void;
}

export function QuizReview({ items, answers, onBack, onRestart }: Props) {
  return (
    <div className="animate-rise space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-800">مراجعة الإجابات</h1>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-100"
        >
          <ArrowRight size={16} aria-hidden="true" />
          <span>العودة للنتيجة</span>
        </button>
      </div>

      {items.map((it, i) => {
        const mine = answers[i];
        const ok = mine === it.correctIndex;
        return (
          <article
            key={it.id}
            className={`rounded-3xl border-2 bg-white p-5 shadow-sm ${
              ok ? 'border-emerald-200' : 'border-red-200'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 tabular-nums">السؤال {i + 1}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-0.5 text-sm font-extrabold ${
                  ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {ok ? <CheckCircle2 size={16} aria-hidden="true" /> : <XCircle size={16} aria-hidden="true" />}
                <span>{ok ? 'صحيحة' : 'خاطئة'}</span>
              </span>
            </div>
            <h2 className="text-xl font-extrabold leading-9 text-slate-800">{it.text}</h2>
            <dl className="mt-3 space-y-2 text-base">
              <div className={`rounded-xl px-3.5 py-2.5 ${ok ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <dt className="text-sm font-bold text-slate-500">إجابتك</dt>
                <dd className={`font-bold ${ok ? 'text-emerald-800' : 'text-red-800'}`}>
                  {mine === null ? 'لم تجب' : `${LABELS[mine]}) ${it.options[mine]}`}
                </dd>
              </div>
              {!ok && (
                <div className="rounded-xl bg-emerald-50 px-3.5 py-2.5">
                  <dt className="text-sm font-bold text-slate-500">الإجابة الصحيحة</dt>
                  <dd className="font-bold text-emerald-800">
                    {LABELS[it.correctIndex]}) {it.options[it.correctIndex]}
                  </dd>
                </div>
              )}
              <div className="rounded-xl bg-brand-50 px-3.5 py-2.5">
                <dt className="text-sm font-bold text-slate-500">التفسير</dt>
                <dd className="leading-8 text-slate-700">{it.explanation}</dd>
              </div>
            </dl>
          </article>
        );
      })}

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-lg font-extrabold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
      >
        <RotateCcw size={20} aria-hidden="true" />
        <span>بدء اختبار جديد</span>
      </button>
    </div>
  );
}
