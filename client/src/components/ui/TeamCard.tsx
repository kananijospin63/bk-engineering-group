'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { TeamMember } from '@/lib/types';

interface Props {
  member: TeamMember;
  index?: number;
}

const fallbackPhotos = [
  '/images/engineer-field.jpg.jpeg',
  '/images/img16.jpeg',
  '/images/img17.jpeg',
  '/images/img18.jpeg',
];

function TeamCard({ member, index = 0 }: Props) {
  const photoSrc = member.photo || fallbackPhotos[index % fallbackPhotos.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      className="group text-center"
    >
      <div className="relative w-48 h-48 mx-auto mb-5 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay hover avec liens sociaux */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-10 h-10 bg-white/20 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-white" />
            </a>
          )}
        </div>
      </div>
      <h3 className="text-lg font-bold text-primary font-heading mb-1">{member.name}</h3>
      <p className="text-gold-500 text-sm font-semibold mb-3">{member.role}</p>
      {member.bio && (
        <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto line-clamp-3">
          {member.bio}
        </p>
      )}
    </motion.div>
  );
}

export default memo(TeamCard);
