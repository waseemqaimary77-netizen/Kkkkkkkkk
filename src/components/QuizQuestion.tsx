import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import type { QuizItem } from '../types';
import { ProgressBar } from './ProgressBar';

export const LABELS = ['أ', 'ب', 'ج', 'د'];

interface Props {
  item: QuizItem;
  index: number;
  total: number;
  selected: number | null;
  confirmed: boolean;
  onSelect: (i: number) => void;
  onConfirm: () => void;
  onNext: () => void;
}

export function QuizQuestion({ item, index, total, selected, confirmed, onSelect, onConfirm, onNext }: Props) {
  const isCorrect = confirmed && selected === item.correctIndex;
  const last = index === total - 1;

  return (
    <div className="animate-rise space-y-5" key={item.id}>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-600">
          <span className="tabular-nums">
            السؤال {index + 1} من {total}
          </span>
          {item.topic && <span className="text-slate-500">{item.topic}</span>}
        </div>
        <ProgressBar value={index + (confirmed ? 1 : 0)} max={total} label="تقدم الاختبار" />
      </div>

      <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-extrabold leading-10 text-slate-800 sm:text-2xl">{item.text}</h2>

        <div role="radiogroup" aria-label="الخيارات" className="mt-5 space-y-3">
          {item.options.map((opt, i) => {
            const chosen = selected === i;
            const correct = confirmed && i === item.correctIndex;
            const wrong = confirmed && chosen && i !== item.correctIndex;

            let cls = 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50';
            if (!confirmed && chosen) cls = 'border-brand-600 bg-brand-50 ring-2 ring-brand-200';
            if (correct) cls = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200';
            if (wrong) cls = 'border-red-500 bg-red-50 ring-2 ring-red-200';
            if (confirmed && !correct && !wrong) cls = 'border-slate-200 bg-white opacity-60';

            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={chosen}
                disabled={confirmed}
                onClick={() => onSelect(i)}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-right text-base font-semibold text-slate-800 transition sm:text-lg ${cls} ${
                  confirmed ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${
                    correct
                      ? 'bg-emerald-600 text-white'
                      : wrong
                        ? 'bg-red-600 text-white'
                        : chosen
                          ? 'bg-brand-600 text-white'
                          : 'bg-brand-100 text-brand-700'
                  }`}
                >
                  {correct ? (
                    <CheckCircle2 size={20} aria-hidden="true" />
                  ) : wrong ? (
                    <XCircle size={20} aria-hidden="true" />
                  ) : (
                    LABELS[i]
                  )}
                </span>
                <span className="flex-1 leading-8">{opt}</span>
              </button>
            );
          })}
        </div>

        {!confirmed && (
          <button
            type="button"
            onClick={onConfirm}
            disabled={selected === null}
            className="mt-6 w-full rounded-2xl bg-brand-700 px-6 py-3.5 text-lg font-extrabold text-white shadow-sm transition enabled:hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 sm:w-auto"
          >
            تأكيد الإجابة
          </button>
        )}
      </section>

      {confirmed && (
        <section
          aria-live="polite"
          className={`animate-pop rounded-3xl border-2 p-5 sm:p-6 ${
            isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50'
          }`}
        >
          <p className={`flex items-center gap-2 text-xl font-extrabold ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
            {isCorrect ? <CheckCircle2 aria-hidden="true" /> : <XCircle aria-hidden="true" />}
            <span>{isCorrect ? 'إجابة صحيحة، أحسنت!' : 'إجابة خاطئة'}</span>
          </p>
          {!isCorrect && (
            <p className="mt-2 font-semibold text-slate-700">
              الإجابة الصحيحة:{' '}
              <span className="font-extrabold text-emerald-800">{item.options[item.correctIndex]}</span>
            </p>
          )}
          <p className="mt-3 rounded-xl border border-slate-200/70 bg-white/90 p-3.5 leading-8 text-slate-700">
            <span className="font-extrabold text-brand-700">التفسير: </span>
            {item.explanation}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-brand-800"
          >
            <span>{last ? 'عرض النتيجة' : 'السؤال التالي'}</span>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        </section>
      )}
    </div>
  );
}
