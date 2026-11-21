import { ArrowLeft, BookOpen, ClipboardCheck } from 'lucide-react';
import { WhatsAppContact } from '../components/WhatsAppButton';
import { lessons, questionBank } from '../data';

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="animate-rise mx-auto max-w-3xl space-y-5 text-center">
        <p className="text-sm font-bold text-brand-700">
          الصف الثاني عشر (التوجيهي) · فلسطين
        </p>
        <h1 className="text-5xl font-extrabold leading-tight text-brand-800 text-balance sm:text-6xl">
          الإعلال
        </h1>
        <p className="text-2xl font-bold text-gold-500">مع همام إسماعيل</p>
        <p className="mx-auto max-w-xl text-lg leading-9 text-slate-600">
          منصة تعليمية لإتقان قاعدة الإعلال وفق المنهاج الفلسطيني للصف الثاني عشر.
        </p>
        <div className="pt-1">
          <WhatsAppContact />
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
