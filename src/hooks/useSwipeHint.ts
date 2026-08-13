import { useEffect, useRef } from 'react';

export function useSwipeHint<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const markInteracted = () => {
      hasInteractedRef.current = true;
    };

    const nudge = () => {
      if (hasInteractedRef.current) return;
      if (element.scrollWidth <= element.clientWidth + 8) return;

      const start = element.scrollLeft;
      element.scrollTo({ left: Math.min(start + 34, element.scrollWidth), behavior: 'smooth' });

      window.setTimeout(() => {
        if (!hasInteractedRef.current) {
          element.scrollTo({ left: start, behavior: 'smooth' });
        }
      }, 850);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(nudge, 450);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(element);
    element.addEventListener('pointerdown', markInteracted, { passive: true });
    element.addEventListener('wheel', markInteracted, { passive: true });
    element.addEventListener('focusin', markInteracted);

    return () => {
      observer.disconnect();
      element.removeEventListener('pointerdown', markInteracted);
      element.removeEventListener('wheel', markInteracted);
      element.removeEventListener('focusin', markInteracted);
    };
  }, []);

  return ref;
}
