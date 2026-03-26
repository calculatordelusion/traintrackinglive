import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to a grid/list container.
 * Children get staggered `animate-fade-in` when scrolled into view.
 * Uses IntersectionObserver for performance.
 */
export function useStaggeredAnimation(staggerMs = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getAnimationProps = (index: number) => ({
    className: visible ? "animate-fade-in" : "opacity-0",
    style: visible ? { animationDelay: `${index * staggerMs}ms`, animationFillMode: "backwards" as const } : undefined,
  });

  return { ref, visible, getAnimationProps };
}
