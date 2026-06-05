'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/lib/types';

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    projectsAPI.getAll({ limit: 3 })
      .then(res => setProjects(res.data.data || []))
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
          {projects.length > 0 ? (
            projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            // Skeleton placeholders
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
            ))
          )}
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
