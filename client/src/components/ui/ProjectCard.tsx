'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Project } from '@/lib/types';
import clsx from 'clsx';

interface Props {
  project: Project;
  index?: number;
}

const statusConfig = {
  completed: { label: 'Terminé',  color: 'bg-green-100 text-green-700',   icon: CheckCircle },
  ongoing:   { label: 'En cours', color: 'bg-blue-100 text-blue-700',     icon: Clock },
  planned:   { label: 'Planifié', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
};

const categoryImages: Record<string, string> = {
  'Génie Civil':     '/images/img1.jpeg',
  'Architecture':    '/images/img4.jpeg',
  'Topographie':     '/images/img7.jpeg',
  'Irrigation':      '/images/img8.jpeg',
  'Travaux Publics': '/images/img3.jpeg',
  'Énergie':         '/images/img5.jpeg',
};

function ProjectCard({ project, index = 0 }: Props) {
  const status     = statusConfig[project.status] || statusConfig.completed;
  const StatusIcon = status.icon;
  const imageSrc   = project.featured_image || categoryImages[project.category] || '/images/img2.jpeg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading={index < 3 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-gold-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={clsx('text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1', status.color)}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <Link href={`/projects/${project.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
        <h3 className="text-lg font-bold text-primary mb-2 font-heading line-clamp-2 group-hover:text-gold-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-500" />
              {project.location}
            </span>
          )}
          {project.year && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-500" />
              {project.year}
            </span>
          )}
        </div>
        {project.client && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Client : </span>
            <span className="text-xs font-medium text-gray-600">{project.client}</span>
          </div>
        )}
        <div className="mt-4 inline-flex items-center text-gold-500 text-sm font-semibold">
          Voir le projet
          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default memo(ProjectCard);
