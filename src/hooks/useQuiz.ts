import { useCallback, useReducer, useRef } from 'react';
import type { Question, QuizItem, Store } from '../types';
import { buildQuiz, pickQuestionIds, QUIZ_SIZE } from '../utils/quiz';

export type Phase = 'start' | 'question' | 'result' | 'review';

interface State {
  phase: Phase;
  items: QuizItem[];
  index: number;
  selected: number | null;
  confirmed: boolean;
  answers: (number | null)[];
}

type Action =
  | { type: 'start'; items: QuizItem[] }
  | { type: 'select'; i: number }
  | { type: 'confirm' }
  | { type: 'next' }
  | { type: 'phase'; phase: Phase }
  | { type: 'reset' };

const initial: State = { phase: 'start', items: [], index: 0, selected: null, confirmed: false, answers: [] };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'start':
      return { phase: 'question', items: a.items, index: 0, selected: null, confirmed: false, answers: a.items.map(() => null) };
    case 'select':
      if (s.phase !== 'question' || s.confirmed) return s;
      return { ...s, selected: a.i };
    case 'confirm': {
      if (s.phase !== 'question' || s.confirmed || s.selected === null) return s;
      const answers = s.answers.slice();
      answers[s.index] = s.selected;
      return { ...s, confirmed: true, answers };
    }
    case 'next':
      if (!s.confirmed) return s;
      if (s.index >= s.items.length - 1) return { ...s, phase: 'result' };
      return { ...s, index: s.index + 1, selected: null, confirmed: false };
    case 'phase':
      return { ...s, phase: a.phase };
    case 'reset':
      return initial;
    default:
      return s;
  }
}

export function scoreOf(items: QuizItem[], answers: (number | null)[]) {
  const correct = items.reduce((n, it, i) => n + (answers[i] === it.correctIndex ? 1 : 0), 0);
  return { correct, wrong: items.length - correct, total: items.length };
}

export function useQuiz(bank: Question[], store: Store, update: (fn: (s: Store) => Store) => void) {
  const [state, dispatch] = useReducer(reducer, initial);
  const savedRef = useRef(false);

  const canStart = bank.length >= QUIZ_SIZE;

  const start = useCallback(() => {
    if (bank.length < QUIZ_SIZE) return;
    const picked = pickQuestionIds(bank, store.seen, QUIZ_SIZE);
    const items = buildQuiz(bank, picked.ids);
    savedRef.current = false;
    update((s) => ({ ...s, seen: picked.seen, cycle: picked.newCycle ? s.cycle + 1 : s.cycle }));
    dispatch({ type: 'start', items });
  }, [bank, store.seen, update]);

  const next = useCallback(() => {
    if (state.confirmed && state.index >= state.items.length - 1 && !savedRef.current) {
      savedRef.current = true;
      const { correct, total } = scoreOf(state.items, state.answers);
      update((s) => ({
        ...s,
        attempts: [...s.attempts, { id: `${Date.now()}`, date: new Date().toISOString(), score: correct, total }],
      }));
    }
    dispatch({ type: 'next' });
  }, [state, update]);

  const resetCycle = useCallback(() => {
    update((s) => ({ ...s, seen: [], cycle: s.cycle + 1 }));
  }, [update]);

  const clearHistory = useCallback(() => {
    update((s) => ({ ...s, attempts: [], seen: [], cycle: 1 }));
  }, [update]);

  return {
    state,
    canStart,
    start,
    next,
    resetCycle,
    clearHistory,
    select: (i: number) => dispatch({ type: 'select', i }),
    confirm: () => dispatch({ type: 'confirm' }),
    setPhase: (phase: Phase) => dispatch({ type: 'phase', phase }),
    reset: () => dispatch({ type: 'reset' }),
  };
}
