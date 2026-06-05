'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Droplets, Map, Wrench, Zap, GraduationCap } from 'lucide-react';
import { Service } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  building:   Building2,
  droplets:   Droplets,
  map:        Map,
  wrench:     Wrench,
  zap:        Zap,
  graduation: GraduationCap,
};

interface Props {
  service: Service;
  index?: number;
}

function ServiceCard({ service, index = 0 }: Props) {
  const Icon = iconMap[service.icon || 'building'] || Building2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
      className="bg-white rounded-2xl overflow-hidden shadow-md group cursor-pointer"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
        {service.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gold-500/20 rounded-2xl flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
              <Icon className="w-10 h-10 text-gold-400" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-primary mb-3 font-heading group-hover:text-gold-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {service.short_description || service.description}
        </p>
        <div className="mt-4 flex items-center text-gold-500 text-sm font-semibold">
          <span>En savoir plus</span>
          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ServiceCard);
