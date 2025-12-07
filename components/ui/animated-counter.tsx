'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

type AnimatedCounterProps = {
  from?: number;
  to: number;
  precision?: number;
  duration?: number;
};

export default function AnimatedCounter({
  from = 0,
  to,
  precision = 0,
  duration = 1.5,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toLocaleString(undefined, {
              minimumFractionDigits: precision,
              maximumFractionDigits: precision,
            });
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration, precision]);

  return <span ref={ref}>{from.toFixed(precision)}</span>;
}
