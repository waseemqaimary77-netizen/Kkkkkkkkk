import lessonsJson from './lessons.json';
import questionsJson from './questions.json';
import type { Lesson, Question } from '../types';
import { validateBank } from '../utils/quiz';

export const lessons = lessonsJson as unknown as Lesson[];

const checked = validateBank(questionsJson);
if (checked.errors.length > 0) {
  console.warn('أسئلة تم استبعادها من بنك الأسئلة:\n' + checked.errors.join('\n'));
}
export const questionBank: Question[] = checked.valid;
