import { useState } from 'react';
import { AlertTriangle, History, PlayCircle, RotateCcw, Shuffle, Trash2 } from 'lucide-react';
import type { Store } from '../types';
import { QUIZ_SIZE } from '../utils/quiz';
import { ProgressBar } from './ProgressBar';

interface Props {
  bankSize: number;
  seenCount: number;
  canStart: boolean;
  store: Store;
  onStart: () => void;
  onResetCycle: () => void;
  onClearHistory: () => void;
}

function pct(score: number, total: number) {
  return total ? Math.round((score / total) * 100) : 0;
}

export function QuizStart({ bankSize, seenCount, canStart, store, onStart, onResetCycle, onClearHistory }: Props) {
  const [confirming, setConfirming] = useState<null | 'cycle' | 'history'>(null);
  const attempts = store.attempts;
  const best = attempts.reduce((m, a) => Math.max(m, pct(a.score, a.total)), 0);
  const avg = attempts.length ? Math.round(attempts.reduce((s, a) => s + pct(a.score, a.total), 0) / attempts.length) : 0;
  const last = attempts.slice(-5).reverse();

  return (
    <div className="animate-rise space-y-6">
      <section className="rounded-3xl bg-gradient-to-l from-emerald-600 to-emerald-500 px-6 py-8 text-white shadow-sm">
        <h1 className="text-3xl font-extrabold">اختبر نفسك</h1>
        <p className="mt-2 max-w-2xl leading-8 text-emerald-50">
          كل اختبار يضم {QUIZ_SIZE} أسئلة تُختار عشوائيًا من بنك الأسئلة، وتُخلط خياراتها في كل محاولة. يمكنك إعادة الاختبار بلا حدود.
        </p>
        {canStart ? (
          <button
            type="button"
            onClick={onStart}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-lg font-extrabold text-emerald-700 shadow-sm transition hover:bg-emerald-50 active:scale-[0.99]"
          >
            <PlayCircle size={22} aria-hidden="true" />
            <span>ابدأ الاختبار</span>
          </button>
        ) : (
          <p className="mt-6 flex items-start gap-2 rounded-2xl bg-white/95 p-4 font-semibold text-orange-800" role="alert">
            <AlertTriangle className="mt-1 shrink-0" size={20} aria-hidden="true" />
            <span>
              لا يتوفر في بنك الأسئلة {QUIZ_SIZE} أسئلة على الأقل (المتوفر حاليًا: {bankSize}). أضف المزيد من الأسئلة إلى الملف{' '}
              <code dir="ltr" className="mx-1">
                src/data/questions.json
              </code>{' '}
              لبدء الاختبار.
            </span>
          </p>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'عدد المحاولات', value: String(attempts.length) },
          { label: 'أفضل نتيجة', value: attempts.length ? `${best}%` : '—' },
          { label: 'المتوسط', value: attempts.length ? `${avg}%` : '—' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-brand-100 bg-white p-4 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-700 tabular-nums">{s.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-extrabold text-slate-800">
            <Shuffle size={18} aria-hidden="true" />
            <span className="tabular-nums">الدورة الحالية (الدورة رقم {store.cycle})</span>
          </h2>
          <span className="text-sm font-semibold text-slate-500 tabular-nums">
            ظهر {seenCount} من {bankSize} سؤالًا
          </span>
        </div>
        <ProgressBar value={seenCount} max={bankSize} label="الأسئلة التي ظهرت في الدورة الحالية" />
        <p className="mt-3 text-sm leading-7 text-slate-500">
          نتجنّب تكرار الأسئلة التي ظهرت لك على هذا الجهاز حتى يُستنفد البنك، ثم تبدأ دورة جديدة بترتيب مختلف.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setConfirming('cycle')}
            className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>بدء دورة جديدة</span>
          </button>
        </div>
        {confirming === 'cycle' && (
          <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800" role="alertdialog" aria-label="تأكيد بدء دورة جديدة">
            <p className="font-semibold">سيُعاد اعتبار جميع الأسئلة «جديدة». تبقى نتائجك السابقة محفوظة.</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetCycle();
                  setConfirming(null);
                }}
                className="rounded-lg bg-orange-600 px-4 py-1.5 font-bold text-white transition hover:bg-orange-700"
              >
                تأكيد
              </button>
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </section>

      {attempts.length > 0 && (
        <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 font-extrabold text-slate-800">
            <History size={18} aria-hidden="true" />
            <span>آخر المحاولات</span>
          </h2>
          <ul className="divide-y divide-slate-100">
            {last.map((a) => {
              const p = pct(a.score, a.total);
              return (
                <li key={a.id} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-slate-500">
                    {new Date(a.date).toLocaleDateString('ar', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span
                    className={`rounded-lg px-3 py-0.5 text-sm font-extrabold tabular-nums ${
                      p >= 60 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {a.score} / {a.total} · {p}%
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => setConfirming('history')}
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:underline"
          >
            <Trash2 size={16} aria-hidden="true" />
            <span>مسح سجل المحاولات</span>
          </button>
          {confirming === 'history' && (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alertdialog" aria-label="تأكيد مسح السجل">
              <p className="font-semibold">سيُحذف سجل المحاولات وتُعاد الدورة من البداية على هذا الجهاز.</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClearHistory();
                    setConfirming(null);
                  }}
                  className="rounded-lg bg-red-600 px-4 py-1.5 font-bold text-white transition hover:bg-red-700"
                >
                  مسح
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(null)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
