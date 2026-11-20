import { useCallback, useState } from 'react';
import type { Store } from '../types';
import { loadStore, saveStore } from '../utils/storage';

/** حالة التقدّم المحلية (LocalStorage) دون حسابات أو خوادم */
export function useStore() {
  const [store, setStore] = useState<Store>(() => loadStore());

  const update = useCallback((fn: (s: Store) => Store) => {
    setStore((prev) => {
      const next = fn(prev);
      saveStore(next);
      return next;
    });
  }, []);

  return { store, update };
}
