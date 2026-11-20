import { BookOpen, CheckCircle2, ClipboardList, RotateCcw, XCircle } from 'lucide-react';
import { messageFor } from '../utils/quiz';

interface Props {
  correct: number;
  wrong: number;
  total: number;
  onReview: () => void;
  onRestart: () => void;
}

export function QuizResult({ correct, wrong, total, onReview, onRestart }: Props) {
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const msg = messageFor(percent);
  const R = 52;
  const C = 2 * Math.PI * R;
  const good = percent >= 60;

  return (
    <div className="animate-rise space-y-6">
      <section className="rounded-3xl border border-brand-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-2xl font-extrabold text-slate-800">نتيجة الاختبار</h1>

        <div className="relative mx-auto mt-6 h-44 w-44" role="img" aria-label={`العلامة ${correct} من ${total}`}>
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="#dce8ff" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={good ? '#10b981' : '#f97316'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - percent / 100)}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-800 tabular-nums">
              {correct}
              <span className="text-xl text-slate-400"> / {total}</span>
            </span>
            <span className="text-lg font-bold text-brand-700 tabular-nums">{percent}%</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3.5">
            <p className="flex items-center justify-center gap-1.5 text-sm font-bold text-emerald-800">
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>إجابات صحيحة</span>
            </p>
            <p className="mt-1 text-3xl font-extrabold text-emerald-700 tabular-nums">{correct}</p>
          </div>
          <div className="rounded-2xl border border-red-100 bg-red-50 p-3.5">
            <p className="flex items-center justify-center gap-1.5 text-sm font-bold text-red-800">
              <XCircle size={18} aria-hidden="true" />
              <span>إجابات خاطئة</span>
            </p>
            <p className="mt-1 text-3xl font-extrabold text-red-700 tabular-nums">{wrong}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-brand-50 p-4">
          <p className="text-xl font-extrabold text-brand-800">{msg.title}</p>
          <p className="mt-1 leading-8 text-slate-600">{msg.text}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onReview}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-white px-6 py-3 font-extrabold text-brand-700 transition hover:bg-brand-50"
          >
            <ClipboardList size={20} aria-hidden="true" />
            <span>مراجعة الإجابات</span>
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <RotateCcw size={20} aria-hidden="true" />
            <span>بدء اختبار جديد</span>
          </button>
        </div>

        {!good && (
          <a
            href="#/lessons"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline"
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>راجع شرح القاعدة</span>
          </a>
        )}
      </section>
    </div>
  );
}
