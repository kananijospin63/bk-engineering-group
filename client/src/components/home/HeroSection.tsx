'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background image via CSS — évite les erreurs d'hydratation Next.js Image avec fill+priority */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/img1.jpeg')" }}
      />
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />

      {/* Cercles décoratifs légers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 border border-gold-500/10 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 border border-gold-500/10 rounded-full animate-spin-reverse" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container-custom text-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block bg-gold-500/20 border border-gold-500/30 text-gold-400 text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-widest">
            Goma, Nord-Kivu — RDC
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-tight mb-6"
        >
          Bâtir l&apos;Avenir de{' '}
          <span className="text-gold-400">l&apos;Afrique</span>
          <br />
          avec Excellence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Société d&apos;ingénierie multidisciplinaire spécialisée en génie civil, architecture,
          topographie, irrigation et formation technique au cœur de la RDC.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/projects" className="btn-primary text-base px-8 py-4">
            Voir nos Projets
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/contact" className="btn-secondary text-base px-8 py-4">
            Nous Contacter
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '50+',  label: "Projets Réalisés" },
            { value: '15+',  label: "Années d'Expérience" },
            { value: '20+',  label: 'Ingénieurs Experts' },
            { value: '100%', label: 'Satisfaction Client' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-gold-400 font-heading">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
