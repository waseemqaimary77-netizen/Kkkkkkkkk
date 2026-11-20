import { Fragment } from 'react';

/**
 * يعرض نصًّا فيه ترميز: [x] = الحرف الأصلي (برتقالي) ، {x} = الحرف بعد الإعلال (أخضر).
 * يعتمد على اللون والخلفية دون هوامش جانبية للحفاظ على اتصال الحروف العربية.
 */
export function Marked({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(\[[^\]]+\]|\{[^}]+\})/g).filter((p) => p !== '');
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.startsWith('[') && p.endsWith(']')) {
          return (
            <span key={i} className="mk-orig">
              {p.slice(1, -1)}
            </span>
          );
        }
        if (p.startsWith('{') && p.endsWith('}')) {
          return (
            <span key={i} className="mk-new">
              {p.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </span>
  );
}
