import { BookOpen, ClipboardCheck } from 'lucide-react';
import logo from '../assets/logo.webp';
import type { Route } from '../hooks/useHashRoute';

const tabs = [
  { href: '#/lessons', name: 'lessons', label: 'شرح قاعدة الإعلال', Icon: BookOpen },
  { href: '#/quiz', name: 'quiz', label: 'اختبر نفسك', Icon: ClipboardCheck },
] as const;

export function Header({ route }: { route: Route }) {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:gap-8">
        <a
          href="#/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          aria-label="الصفحة الرئيسية - الإعلال مع همام إسماعيل"
        >
          <img
            src={logo}
            alt="شعار الإعلال مع همام إسماعيل"
            className="h-10 w-10 rounded-full object-cover shadow-sm"
            referrerPolicy="no-referrer"
          />
          <span className="text-lg font-extrabold text-brand-800 whitespace-nowrap">الإعلال</span>
        </a>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="القائمتان الرئيسيتان">
          {tabs.map(({ href, name, label, Icon }) => {
            const active = route.name === name;
            return (
              <a
                key={name}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-colors sm:px-4 sm:text-sm ${
                  active
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
