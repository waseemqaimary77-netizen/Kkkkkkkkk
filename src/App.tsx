import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useHashRoute } from './hooks/useHashRoute';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { QuizPage } from './pages/QuizPage';

export default function App() {
  const route = useHashRoute();

  return (
    <div className="page-bg flex min-h-screen flex-col">
      <Header route={route} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-8">
        {route.name === 'home' && <HomePage />}
        {route.name === 'lessons' && <LessonsPage lessonId={route.lessonId} />}
        {route.name === 'quiz' && <QuizPage />}
      </main>
      <Footer home={route.name === 'home'} />
    </div>
  );
}
