import logo from '../assets/logo.webp';

export function Footer({ home = false }: { home?: boolean }) {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-white/90">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center">
        <img
          src={logo}
          alt="شعار منصة الإعلال مع همام إسماعيل"
          className="h-14 w-14 rounded-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {home && (
          <p className="text-sm font-bold text-brand-700">إعداد وتقديم الأستاذ همام إسماعيل</p>
        )}
        <p className="text-sm text-slate-600">جميع الحقوق محفوظة © للأستاذ همام إسماعيل</p>
      </div>
    </footer>
  );
}
