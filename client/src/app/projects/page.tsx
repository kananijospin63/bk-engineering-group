'use client';

import { useEffect, useState, useMemo } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ProjectsPage() {
  const [projects, setProjects]         = useState<Project[]>([]);
  const [categories, setCategories]     = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    Promise.all([
      projectsAPI.getAll({ limit: 50 }),
      projectsAPI.getCategories(),
    ]).then(([projectsRes, catsRes]) => {
      setProjects(projectsRes.data.data || []);
      setCategories(['Tous', ...(catsRes.data || [])]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => activeCategory === 'Tous'
      ? projects
      : projects.filter(p => p.category === activeCategory),
    [activeCategory, projects]
  );

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/img8.jpeg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              Nos Projets
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Découvrez nos réalisations qui témoignent de notre expertise et de notre engagement envers l&apos;excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          {/* Filter tabs */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                    activeCategory === cat
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun projet dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
      {/* Galerie chantiers */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              '/images/img26.jpeg',
              '/images/img27.jpeg',
              '/images/img28.jpeg',
              '/images/img2.jpeg',
              '/images/img14.jpeg',
              '/images/img15.jpeg',
            ].map((src, i) => (
              <div key={src} className="relative h-28 rounded-xl overflow-hidden shadow group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Chantier BK Engineering ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

