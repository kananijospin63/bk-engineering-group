'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicLayout from '@/components/layout/PublicLayout';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/lib/types';
import { MapPin, Calendar, User, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import clsx from 'clsx';

const statusConfig = {
  completed: { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  ongoing:   { label: 'En cours', color: 'bg-blue-100 text-blue-700',  icon: Clock },
  planned:   { label: 'Planifié', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    projectsAPI.getById(Number(id))
      .then(res => setProject(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-24 container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-8 w-1/2" />
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse mb-8" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-3" />
            ))}
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (notFound || !project) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-24 container-custom text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Projet non trouvé</h1>
          <Link href="/projects" className="btn-primary">
            Retour aux Projets
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const status = statusConfig[project.status] || statusConfig.completed;
  const StatusIcon = status.icon;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-primary relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-white">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux Projets
            </Link>

            <span className="inline-block bg-gold-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {project.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-black font-heading mb-6 leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {project.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  {project.location}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gold-500" />
                  {project.year}
                </span>
              )}
              {project.client && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-gold-500" />
                  {project.client}
                </span>
              )}
              <span className={clsx('flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold', status.color)}>
                <StatusIcon className="w-3 h-3" />
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {project.featured_image && (
              <AnimatedSection>
                <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description */}
              <AnimatedSection direction="left" className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-primary font-heading mb-4">
                  Description du Projet
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.description}
                </p>
              </AnimatedSection>

              {/* Project info sidebar */}
              <AnimatedSection direction="right">
                <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
                  <h3 className="text-lg font-bold text-primary font-heading border-b border-gray-200 pb-3">
                    Informations
                  </h3>

                  {[
                    { label: 'Catégorie', value: project.category },
                    { label: 'Localisation', value: project.location },
                    { label: 'Année', value: project.year?.toString() },
                    { label: 'Client', value: project.client },
                  ].filter(item => item.value).map(item => (
                    <div key={item.label}>
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        {item.label}
                      </dt>
                      <dd className="text-gray-700 font-medium">{item.value}</dd>
                    </div>
                  ))}

                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Statut
                    </dt>
                    <dd>
                      <span className={clsx('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold', status.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </dd>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 bg-primary rounded-2xl p-6 text-center">
                  <p className="text-white text-sm mb-4">
                    Un projet similaire ? Contactez-nous pour un devis.
                  </p>
                  <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                    Nous Contacter
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Back to projects */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center">
          <Link href="/projects" className="btn-outline">
            <ArrowLeft className="w-4 h-4" />
            Voir Tous les Projets
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
