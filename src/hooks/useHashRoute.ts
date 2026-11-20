import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'lessons'; lessonId?: string }
  | { name: 'quiz' };

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'lessons') {
    return { name: 'lessons', lessonId: parts[1] ? decodeURIComponent(parts[1]) : undefined };
  }
  if (parts[0] === 'quiz') return { name: 'quiz' };
  return { name: 'home' };
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
