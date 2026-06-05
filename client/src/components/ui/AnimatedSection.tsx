'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,       // déclenche plus tôt (était 0.1)
    rootMargin: '50px 0px', // anticipe avant que l'élément soit visible
  });

  const initial = {
    opacity: 0,
    y: direction === 'up'    ? 20 : 0,   // réduit de 30 → 20
    x: direction === 'left'  ? -20 :
       direction === 'right' ?  20 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.4, delay: Math.min(delay, 0.3), ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
