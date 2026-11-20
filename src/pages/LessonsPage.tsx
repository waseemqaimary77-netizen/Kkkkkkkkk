import { useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
import { lessons } from '../data';
import { LessonView } from '../components/LessonView';
import { ProgressBar } from '../components/ProgressBar';
import { useStore } from '../hooks/useStore';

export function LessonsPage({ lessonId }: { lessonId?: string }) {
  const { store, update } = useStore();
  const found = lessons.findIndex((l) => l.id === lessonId);
  const index = found >= 0 ? found : 0;
  const lesson = lessons[index];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  useEffect(() => {
    if (!lesson) return;
    update((s) => (s.visited.includes(lesson.id) ? s : { ...s, visited: [...s.visited, lesson.id] }));
  }, [lesson, update]);

  if (!lesson) {
    return (
      <p className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-orange-800">
        لا يوجد محتوى تعليمي بعد. أضف الدروس إلى الملف <code dir="ltr">src/data/lessons.json</code>.
      </p>
    );
  }

  const visitedCount = lessons.filter((l) => store.visited.includes(l.id) || l.id === lesson.id).length;

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500 tabular-nums">
          <span>
            الدرس {index + 1} من {lessons.length}
          </span>
          <span>
            تقدّمك: {visitedCount} / {lessons.length}
          </span>
        </div>
        <ProgressBar value={visitedCount} max={lessons.length} label="تقدم الدروس" />
      </div>

      <nav aria-label="دروس القاعدة" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {lessons.map((l, i) => {
          const active = l.id === lesson.id;
          const done = store.visited.includes(l.id);
          return (
            <a
              key={l.id}
              href={`#/lessons/${l.id}`}
              aria-current={active ? 'page' : undefined}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-3.5 py-2 text-sm font-bold transition ${
                active
                  ? 'border-brand-700 bg-brand-700 text-white shadow-sm'
                  : 'border-brand-200 bg-white text-brand-700 hover:bg-brand-50'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md text-xs tabular-nums ${
                  active
                    ? 'bg-white/25 text-white'
                    : done
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-brand-100 text-brand-700'
                }`}
              >
                {done && !active ? <Check size={12} aria-hidden="true" /> : i + 1}
              </span>
              <span>{l.short}</span>
            </a>
          );
        })}
      </nav>

      <LessonView key={lesson.id} lesson={lesson} />

      <div className="flex flex-wrap items-stretch justify-between gap-3 pt-2">
        {prev ? (
          <a
            href={`#/lessons/${prev.id}`}
            className="flex flex-1 items-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3 font-bold text-brand-700 transition hover:bg-brand-50 sm:flex-none"
          >
            <ChevronRight size={20} aria-hidden="true" />
            <span>
              <span className="block text-xs font-semibold text-slate-500">السابق</span>
              {prev.short}
            </span>
          </a>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <a
            href={`#/lessons/${next.id}`}
            className="flex flex-1 items-center justify-end gap-2 rounded-2xl bg-brand-700 px-4 py-3 font-bold text-white shadow-sm transition hover:bg-brand-800 sm:flex-none"
          >
            <span className="text-left">
              <span className="block text-xs font-semibold text-brand-200">التالي</span>
              {next.short}
            </span>
            <ChevronLeft size={20} aria-hidden="true" />
          </a>
        ) : (
          <a
            href="#/quiz"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-700 sm:flex-none"
          >
            <ClipboardCheck size={20} aria-hidden="true" />
            <span>انتقل إلى اختبر نفسك</span>
          </a>
        )}
      </div>
    </div>
  );
}
