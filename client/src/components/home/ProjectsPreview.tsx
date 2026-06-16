'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/lib/types';

// Projets statiques affichés si l'API est indisponible
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'Construction Centre de Santé',
    description: 'Construction complète d\'un centre de santé moderne incluant salles de consultation, maternité et pharmacie pour desservir la communauté locale.',
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
    title: 'Système d\'Irrigation Masisi',
    description: 'Conception et installation d\'un réseau d\'irrigation couvrant 120 hectares de terres agricoles pour améliorer la productivité des exploitations.',
    category: 'Irrigation',
    location: 'Masisi, Nord-Kivu',
    year: 2023,
    client: 'Coopérative Agricole',
    featured_image: '/images/img2.jpeg',
    status: 'completed',
    created_at: '',
  },
  {
    id: 3,
    title: 'Réhabilitation Pont Routier',
    description: 'Réhabilitation structurelle d\'un pont stratégique reliant deux zones rurales, renforçant les échanges commerciaux et l\'accès aux services.',
    category: 'Travaux Publics',
    location: 'Kanyabayonga, Nord-Kivu',
    year: 2022,
    client: 'Gouvernement Provincial',
    featured_image: '/images/img3.jpeg',
    status: 'completed',
    created_at: '',
  },
];

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    projectsAPI.getAll({ limit: 3 })
      .then(res => {
        const data = res.data.data || [];
        if (data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          subtitle="Nos Réalisations"
          title="Projets Phares"
          description="Découvrez quelques-uns de nos projets emblématiques qui illustrent notre expertise et notre engagement."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects" className="btn-outline">
            Voir Tous les Projets
          </Link>
        </div>
      </div>
    </section>
  );
}
