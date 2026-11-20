import type { Attempt, Store } from '../types';

const KEY = 'ilal:v1:store';
const MAX_ATTEMPTS = 100;

export function emptyStore(): Store {
  return { seen: [], cycle: 1, attempts: [], visited: [] };
}

function isStrArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === 'string');
}

function isAttempt(x: unknown): x is Attempt {
  if (!x || typeof x !== 'object') return false;
  const a = x as Record<string, unknown>;
  return typeof a.id === 'string' && typeof a.date === 'string' && typeof a.score === 'number' && typeof a.total === 'number';
}

/** قراءة آمنة من LocalStorage دون أن تتأثر واجهة المستخدم عند تعطيل التخزين */
export function loadStore(): Store {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    const o = JSON.parse(raw) as Record<string, unknown>;
    return {
      seen: isStrArray(o.seen) ? o.seen : [],
      cycle: typeof o.cycle === 'number' && o.cycle >= 1 ? o.cycle : 1,
      attempts: Array.isArray(o.attempts) ? o.attempts.filter(isAttempt) : [],
      visited: isStrArray(o.visited) ? o.visited : [],
    };
  } catch {
    return emptyStore();
  }
}

export function saveStore(s: Store): void {
  try {
    const trimmed: Store = { ...s, attempts: s.attempts.slice(-MAX_ATTEMPTS) };
    window.localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    // تجاهل صامت إذا كان التخزين المحلي غير متاح
  }
}
