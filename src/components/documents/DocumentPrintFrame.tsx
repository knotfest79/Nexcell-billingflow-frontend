import { useEffect, type ReactNode } from 'react';

let frameCount = 0;

export function DocumentPrintFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    frameCount += 1;
    document.body.classList.add('has-document-print');
    return () => {
      frameCount -= 1;
      if (frameCount === 0) document.body.classList.remove('has-document-print');
    };
  }, []);

  return <div className="document-frame">{children}</div>;
}
