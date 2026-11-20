export const TEACHER_PHONE = '+972 56-851-5056';
export const WHATSAPP_URL = 'https://wa.me/972568515056';

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.77 14.12c-.24.68-1.41 1.3-1.95 1.38-.51.08-1.16.11-1.87-.12-.44-.14-1-.33-1.71-.64-3.01-1.3-4.97-4.35-5.12-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49.27-.3.59-.38.79-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.37 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.34.07.12.07.7-.17 1.38z" />
    </svg>
  );
}

export function WhatsAppContact({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`تواصل مع الأستاذ همام إسماعيل عبر واتساب على الرقم ${TEACHER_PHONE}`}
      className={`inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 font-bold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 ${
        compact ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-base shadow-sm'
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
        <WhatsAppIcon size={16} />
      </span>
      <span>تواصل عبر واتساب:</span>
      <span dir="ltr" className="font-extrabold tabular-nums">
        {TEACHER_PHONE}
      </span>
    </a>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`محادثة الأستاذ همام إسماعيل على واتساب (${TEACHER_PHONE})`}
      title={`تواصل مع الأستاذ همام إسماعيل: ${TEACHER_PHONE}`}
      className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700 active:scale-95"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
