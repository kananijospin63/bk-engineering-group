'use client';

import { useEffect, useState, useMemo } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'Construction Centre de Santé de Référence',
    description: 'Construction complète d\'un centre de santé moderne incluant salles de consultation, bloc opératoire, maternité et pharmacie pour desservir plus de 5 000 habitants.',
    category: 'Génie Civil',
    location: 'Goma, Nord-Kivu',
    year: 2023,
    client: 'ONG Santé Plus',
    featured_image: '/images/img1.jpeg',
    status: 'completed',
    created_at: '',
  },
  {
    id: 2,
    title: 'Réseau d\'Irrigation Agricole Masisi',
    description: 'Conception et installation d\'un réseau d\'irrigation couvrant 120 hectares de terres agricoles pour améliorer la productivité et la sécurité alimentaire de la région.',
    category: 'Irrigation',
    location: 'Masisi, Nord-Kivu',
    year: 2023,
    client: 'Coopérative Agricole du Nord-Kivu',
    featured_image: '/images/img2.jpeg',
    status: 'completed',
    created_at: '',
  },
  {
    id: 3,
    title: 'Réhabilitation Pont Routier Stratégique',
    description: 'Réhabilitation structurelle d\'un pont stratégique reliant deux zones rurales, renforçant les échanges commerciaux et l\'accès aux services de base pour 12 000 personnes.',
    category: 'Travaux Publics',
    location: 'Kanyabayonga, Nord-Kivu',
    year: 2022,
    client: 'Gouvernement Provincial',
    featured_image: '/images/img3.jpeg',
    status: 'completed',
    created_at: '',
  },
  {
    id: 4,
    title: 'Complexe Résidentiel Moderne',
    description: 'Conception architecturale et supervision de la construction d\'un complexe résidentiel de 24 logements avec espaces verts, parking souterrain et équipements communautaires.',
    category: 'Architecture',
    location: 'Goma, Nord-Kivu',
    year: 2023,
    client: 'Promoteur Immobilier KIBALI',
    featured_image: '/images/img4.jpeg',
    status: 'completed',
    created_at: '',
  },
  {
    id: 5,
    title: 'Levé Topographique Zone Minière',
    description: 'Relevés topographiques de haute précision sur une superficie de 450 hectares à l\'aide de drones et GPS différentiel pour le compte d\'une société minière internationale.',
    category: 'Topographie',
    location: 'Walikale, Nord-Kivu',
    year: 2024,
    client: 'Mining Resources DRC',
    featured_image: '/images/img7.jpeg',
    status: 'ongoing',
    created_at: '',
  },
];

export default function ProjectsPage() {
  const [projects, setProjects]             = useState<Project[]>(fallbackProjects);
  const [categories, setCategories]         = useState<string[]>(['Tous', 'Génie Civil', 'Irrigation', 'Travaux Publics', 'Architecture', 'Topographie']);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [loading, setLoading]               = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      projectsAPI.getAll({ limit: 50 }),
      projectsAPI.getCategories(),
    ]).then(([projectsRes, catsRes]) => {
      const data = projectsRes.data.data || [];
      if (data.length > 0) setProjects(data);
      const cats = catsRes.data || [];
      if (cats.length > 0) setCategories(['Tous', ...cats]);
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
              '/images/img14.jpeg',
              '/images/img15.jpeg',
              '/images/img16.jpeg',
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
