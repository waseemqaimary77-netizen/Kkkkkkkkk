import { useState } from 'react';
import { User } from 'lucide-react';
import logo from '../assets/logo.webp';
import teacher from '../assets/teacher.jpg';
import { WhatsAppContact } from './WhatsAppButton';

export function Footer({ home = false }: { home?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="mt-16 border-t border-brand-100 bg-white/90">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center">
        <img
          src={logo}
          alt="شعار منصة الإعلال مع همام إسماعيل"
          className="h-14 w-14 rounded-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {home && (
          <div className="flex items-center justify-center gap-3">
            {!imgError ? (
              <img
                src={teacher}
                alt="الأستاذ همام إسماعيل"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-12 w-12 shrink-0 rounded-full object-cover object-top shadow-sm ring-2 ring-brand-100"
              />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 ring-2 ring-brand-100">
                <User size={22} aria-hidden="true" />
              </span>
            )}
            <p className="text-base font-bold text-brand-800">إعداد وتقديم الأستاذ همام إسماعيل</p>
          </div>
        )}
        <WhatsAppContact compact />
        <p className="text-sm text-slate-600">جميع الحقوق محفوظة © للأستاذ همام إسماعيل</p>
      </div>
    </footer>
  );
}
