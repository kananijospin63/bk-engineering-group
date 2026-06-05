'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  { value: '50+',  label: 'Projets Réalisés',      description: 'Infrastructures livrées avec succès' },
  { value: '15+',  label: "Années d'Expérience",   description: 'Au service du développement' },
  { value: '20+',  label: 'Ingénieurs Experts',    description: 'Professionnels certifiés' },
  { value: '300+', label: 'Familles Bénéficiaires', description: 'Impact communautaire direct' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-primary relative overflow-hidden">
      {/* Pattern léger CSS au lieu d'un composant JS */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-gold-400 font-heading mb-2">
                {stat.value}
              </div>
              <div className="text-white font-semibold text-lg mb-1">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
