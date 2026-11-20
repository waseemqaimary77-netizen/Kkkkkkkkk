import { useState } from 'react';
import { ArrowLeft, BookOpen, ClipboardCheck, User } from 'lucide-react';
import teacher from '../assets/teacher.jpg';
import { lessons, questionBank } from '../data';

export function HomePage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-rise space-y-5 text-center md:text-right">
          <p className="text-sm font-bold text-brand-700">
            الصف الثاني عشر (التوجيهي) · فلسطين
          </p>
          <h1 className="text-5xl font-extrabold leading-tight text-brand-800 text-balance sm:text-6xl">
            الإعلال
          </h1>
          <p className="text-2xl font-bold text-gold-500">مع همام إسماعيل</p>
          <p className="mx-auto max-w-xl text-lg leading-9 text-slate-600 md:mx-0">
            منصة تعليمية لإتقان قاعدة الإعلال وفق المنهاج الفلسطيني للصف الثاني عشر.
          </p>
          <p className="text-sm font-bold text-slate-500">إعداد وتقديم الأستاذ همام إسماعيل</p>
        </div>

        <div className="animate-pop mx-auto w-full max-w-sm">
          <div className="relative">
            <div
              className="absolute -inset-2.5 rounded-[2.1rem] bg-gradient-to-br from-brand-200 via-sky-100 to-amber-100"
              aria-hidden="true"
            />
            {!imgError ? (
              <img
                src={teacher}
                alt="الأستاذ همام إسماعيل"
                width={900}
                height={904}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="relative aspect-square w-full rounded-[1.75rem] object-cover object-top shadow-lg ring-4 ring-white"
              />
            ) : (
              <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-brand-50 to-sky-50 text-brand-700 shadow-lg ring-4 ring-white">
                <User size={64} aria-hidden="true" />
                <span className="mt-2 font-bold">الأستاذ همام إسماعيل</span>
              </div>
            )}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 px-4 py-2 text-center shadow-md backdrop-blur">
              <p className="font-extrabold text-brand-800">الأستاذ همام إسماعيل</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="القائمتان الرئيسيتان" className="grid gap-5 md:grid-cols-2">
        <a
          href="#/lessons"
          className="group animate-rise flex flex-col justify-between rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <div>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <BookOpen size={28} aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-extrabold text-slate-800">شرح قاعدة الإعلال</h2>
            <p className="mt-2 leading-8 text-slate-600 tabular-nums">
              {lessons.length} دروس منظّمة: التعريف، الشرح المبسّط، الخطوات، الأمثلة وتحليلها، والخلاصة.
            </p>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 font-bold text-brand-700">
            <span>ابدأ التعلّم</span>
            <ArrowLeft size={18} className="transition group-hover:-translate-x-1" aria-hidden="true" />
          </span>
        </a>

        <a
          href="#/quiz"
          className="group animate-rise flex flex-col justify-between rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
        >
          <div>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <ClipboardCheck size={28} aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-extrabold text-slate-800">اختبر نفسك</h2>
            <p className="mt-2 leading-8 text-slate-600 tabular-nums">
              اختبارات عشوائية غير محدودة من 10 أسئلة، من بنك يضم {questionBank.length} سؤالًا، مع تفسير علمي لكل إجابة.
            </p>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 font-bold text-emerald-700">
            <span>ابدأ الاختبار</span>
            <ArrowLeft size={18} className="transition group-hover:-translate-x-1" aria-hidden="true" />
          </span>
        </a>
      </section>
    </div>
  );
}
