/** عدد صحيح عشوائي في [0, max) باستخدام مولّد آمن إن توفّر */
export function randomInt(max: number): number {
  if (max <= 1) return 0;
  const c = typeof globalThis !== 'undefined' ? (globalThis as { crypto?: Crypto }).crypto : undefined;
  if (c && typeof c.getRandomValues === 'function') {
    const range = 0x100000000;
    const limit = range - (range % max);
    const buf = new Uint32Array(1);
    for (let i = 0; i < 16; i++) {
      c.getRandomValues(buf);
      if (buf[0] < limit) return buf[0] % max;
    }
  }
  return Math.floor(Math.random() * max);
}

/** خلط فيشر-ييتس دون تعديل المصفوفة الأصلية */
export function shuffle<T>(input: readonly T[]): T[] {
  const a = input.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
