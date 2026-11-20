import type { Question, QuizItem } from '../types';
import { randomInt, shuffle } from './random';

export const QUIZ_SIZE = 10;
export const OPTIONS_COUNT = 4;

/** يتحقق من سلامة بنك الأسئلة ويستبعد أي سؤال غير مكتمل */
export function validateBank(raw: unknown): { valid: Question[]; errors: string[] } {
  const errors: string[] = [];
  const valid: Question[] = [];
  if (!Array.isArray(raw)) return { valid, errors: ['ملف الأسئلة يجب أن يكون مصفوفة'] };
  const ids = new Set<string>();
  raw.forEach((q, i) => {
    const where = `السؤال رقم ${i + 1}`;
    if (!q || typeof q !== 'object') {
      errors.push(`${where}: صيغة غير صحيحة`);
      return;
    }
    const o = q as Record<string, unknown>;
    if (typeof o.id !== 'string' || !o.id) {
      errors.push(`${where}: المعرّف مفقود`);
      return;
    }
    if (ids.has(o.id)) {
      errors.push(`${where}: المعرّف ${o.id} مكرّر`);
      return;
    }
    if (typeof o.text !== 'string' || !o.text.trim()) {
      errors.push(`${o.id}: نص السؤال مفقود`);
      return;
    }
    if (!Array.isArray(o.options) || o.options.length !== OPTIONS_COUNT) {
      errors.push(`${o.id}: يجب أن يحتوي السؤال على ${OPTIONS_COUNT} خيارات`);
      return;
    }
    if (o.options.some((x) => typeof x !== 'string' || !x.trim())) {
      errors.push(`${o.id}: أحد الخيارات فارغ`);
      return;
    }
    if (new Set(o.options).size !== OPTIONS_COUNT) {
      errors.push(`${o.id}: خيارات مكرّرة`);
      return;
    }
    if (!Number.isInteger(o.answer) || (o.answer as number) < 0 || (o.answer as number) >= OPTIONS_COUNT) {
      errors.push(`${o.id}: رقم الإجابة الصحيحة غير صالح`);
      return;
    }
    if (typeof o.explanation !== 'string' || !o.explanation.trim()) {
      errors.push(`${o.id}: شرح الإجابة مفقود`);
      return;
    }
    ids.add(o.id);
    valid.push({
      id: o.id,
      topic: typeof o.topic === 'string' ? o.topic : undefined,
      text: o.text,
      options: o.options as string[],
      answer: o.answer as number,
      explanation: o.explanation,
    });
  });
  return { valid, errors };
}

/**
 * يختار معرّفات أسئلة الاختبار الجديد دون تكرار داخل الاختبار،
 * ويتجنّب تكرار الأسئلة الظاهرة في الدورة الحالية حتى يُستنفد البنك.
 */
export function pickQuestionIds(
  bank: readonly Question[],
  seen: readonly string[],
  count = QUIZ_SIZE,
): { ids: string[]; seen: string[]; newCycle: boolean } {
  const bankIds = bank.map((q) => q.id);
  const bankSet = new Set(bankIds);
  const seenValid = Array.from(new Set(seen.filter((id) => bankSet.has(id))));
  const seenSet = new Set(seenValid);
  const pool = shuffle(bankIds.filter((id) => !seenSet.has(id)));

  if (pool.length >= count) {
    const ids = pool.slice(0, count);
    return { ids: shuffle(ids), seen: [...seenValid, ...ids], newCycle: false };
  }
  const first = pool;
  const firstSet = new Set(first);
  const rest = shuffle(bankIds.filter((id) => !firstSet.has(id)));
  const fill = rest.slice(0, count - first.length);
  return { ids: shuffle([...first, ...fill]), seen: fill, newCycle: true };
}

function isAcceptable(a: number[]): boolean {
  for (let i = 0; i + 2 < a.length; i++) {
    if (a[i] === a[i + 1] && a[i + 1] === a[i + 2]) return false;
  }
  for (let i = 0; i + 3 < a.length; i++) {
    const d1 = (a[i + 1] - a[i] + 4) % 4;
    const d2 = (a[i + 2] - a[i + 1] + 4) % 4;
    const d3 = (a[i + 3] - a[i + 2] + 4) % 4;
    if (d1 === d2 && d2 === d3 && (d1 === 1 || d1 === 3)) return false;
  }
  return true;
}

/** يوزّع مواقع الإجابات الصحيحة بتوازن وعشوائية دون أنماط متكررة */
export function balancedPositions(n: number): number[] {
  for (let t = 0; t < 1000; t++) {
    const offset = randomInt(OPTIONS_COUNT);
    const arr = shuffle(Array.from({ length: n }, (_, i) => (i + offset) % OPTIONS_COUNT));
    if (isAcceptable(arr)) return arr;
  }
  return shuffle(Array.from({ length: n }, (_, i) => i % OPTIONS_COUNT));
}

/** يبني الاختبار مع خلط الخيارات والحفاظ على ارتباط الإجابة الصحيحة بنصّها */
export function buildQuiz(bank: readonly Question[], ids: readonly string[]): QuizItem[] {
  const byId = new Map(bank.map((q) => [q.id, q]));
  const positions = balancedPositions(ids.length);
  return ids.map((id, i) => {
    const q = byId.get(id);
    if (!q) throw new Error(`سؤال غير موجود: ${id}`);
    const correctText = q.options[q.answer];
    const wrong = shuffle(q.options.filter((_, idx) => idx !== q.answer));
    const options = wrong.slice();
    options.splice(positions[i], 0, correctText);
    return {
      id: q.id,
      topic: q.topic,
      text: q.text,
      options,
      correctIndex: positions[i],
      explanation: q.explanation,
    };
  });
}

export function messageFor(percent: number): { title: string; text: string } {
  if (percent === 100) return { title: 'علامة كاملة! 🌟', text: 'أتقنت القاعدة بامتياز. استمر بإجراء اختبارات جديدة لتثبيت ما تعلمته.' };
  if (percent >= 80) return { title: 'أداء رائع! 👏', text: 'أنت قريب جدًا من الإتقان. راجع الأسئلة التي أخطأت فيها لتصل إلى العلامة الكاملة.' };
  if (percent >= 60) return { title: 'جيد، وتستطيع أفضل! 💪', text: 'لديك أساس جيد. راجع التفسيرات وأعد المحاولة باختبار جديد.' };
  if (percent >= 40) return { title: 'بداية مقبولة 🌱', text: 'تحتاج إلى مزيد من المراجعة. عُد إلى شرح القاعدة ثم جرّب اختبارًا جديدًا.' };
  return { title: 'لا تقلق، التعلّم رحلة 🌿', text: 'ابدأ بمراجعة الدروس بهدوء، ثم أعد المحاولة؛ ستلاحظ التحسّن سريعًا.' };
}
