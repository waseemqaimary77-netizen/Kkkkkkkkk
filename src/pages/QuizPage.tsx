import { useEffect } from 'react';
import { questionBank } from '../data';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizResult } from '../components/QuizResult';
import { QuizReview } from '../components/QuizReview';
import { QuizStart } from '../components/QuizStart';
import { scoreOf, useQuiz } from '../hooks/useQuiz';
import { useStore } from '../hooks/useStore';

export function QuizPage() {
  const { store, update } = useStore();
  const quiz = useQuiz(questionBank, store, update);
  const { state } = quiz;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.phase, state.index]);

  if (state.phase === 'question') {
    const item = state.items[state.index];
    return (
      <QuizQuestion
        item={item}
        index={state.index}
        total={state.items.length}
        selected={state.selected}
        confirmed={state.confirmed}
        onSelect={quiz.select}
        onConfirm={quiz.confirm}
        onNext={quiz.next}
      />
    );
  }

  if (state.phase === 'result' || state.phase === 'review') {
    const { correct, wrong, total } = scoreOf(state.items, state.answers);
    if (state.phase === 'review') {
      return (
        <QuizReview
          items={state.items}
          answers={state.answers}
          onBack={() => quiz.setPhase('result')}
          onRestart={quiz.start}
        />
      );
    }
    return (
      <QuizResult
        correct={correct}
        wrong={wrong}
        total={total}
        onReview={() => quiz.setPhase('review')}
        onRestart={quiz.start}
      />
    );
  }

  const bankIds = new Set(questionBank.map((q) => q.id));
  const seenCount = store.seen.filter((id) => bankIds.has(id)).length;

  return (
    <QuizStart
      bankSize={questionBank.length}
      seenCount={seenCount}
      canStart={quiz.canStart}
      store={store}
      onStart={quiz.start}
      onResetCycle={quiz.resetCycle}
      onClearHistory={quiz.clearHistory}
    />
  );
}
