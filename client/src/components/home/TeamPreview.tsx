'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { teamAPI } from '@/lib/api';
import { TeamMember } from '@/lib/types';
import { motion } from 'framer-motion';
import { Briefcase, HardHat, Settings } from 'lucide-react';

// Membres statiques affichés si l'API est indisponible
const fallbackTeam = [
  {
    id: 'akeem',
    name: 'Ir. Akeem Kanani Blaise',
    role: 'Gérant',
    photo: '/images/equipes/equipe-akeem.jpeg',
    icon: Briefcase,
    color: 'bg-gold-500',
  },
  {
    id: 'dallas',
    name: 'Ir. Dallas',
    role: 'Directeur Technique',
    photo: '/images/equipes/equipe-dallas.jpeg',
    icon: HardHat,
    color: 'bg-primary',
  },
  {
    id: 'joachim',
    name: 'Ir. Joachim',
    role: 'Directeur Technique',
    photo: '/images/equipes/equipe-joachim.jpeg',
    icon: Settings,
    color: 'bg-blue-700',
  },
];

export default function TeamPreview() {
  const [apiTeam, setApiTeam] = useState<TeamMember[]>([]);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    teamAPI.getAll()
      .then(res => {
        const data = (res.data || []).slice(0, 4);
        if (data.length > 0) setApiTeam(data);
      })
      .catch(() => {})
      .finally(() => setApiLoaded(true));
  }, []);

  // Si l'API a des membres, on les affiche avec TeamCard
  // Sinon on affiche les 3 membres statiques de direction
  const showFallback = apiLoaded && apiTeam.length === 0;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          subtitle="Notre Équipe"
          title="Les Experts Derrière Nos Succès"
          description="Une équipe d'ingénieurs et d'architectes passionnés, dédiés à l'excellence technique."
        />

        <div className="mt-14">
          {/* Avant que l'API réponde : squelettes discrets */}
          {!apiLoaded && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-2xl animate-pulse mb-4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-32" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse mx-auto w-24" />
                </div>
              ))}
            </div>
          )}

          {/* API disponible : membres depuis la base */}
          {apiLoaded && apiTeam.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {apiTeam.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-5 rounded-2xl overflow-hidden shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo || `/images/img${(i % 9) + 16}.jpeg`}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base font-bold text-primary font-heading mb-1">{member.name}</h3>
                  <p className="text-gold-500 text-sm font-semibold">{member.role}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Fallback statique : les 3 membres de direction avec leurs vraies photos */}
          {showFallback && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {fallbackTeam.map((member, i) => {
                const Icon = member.icon;
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                  >
                    {/* Photo */}
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      {/* Badge poste */}
                      <div className="absolute bottom-4 left-4">
                        <div className={`inline-flex items-center gap-2 ${member.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                          <Icon className="w-3.5 h-3.5" />
                          {member.role}
                        </div>
                      </div>
                    </div>
                    {/* Infos */}
                    <div className="p-5 text-center">
                      <h3 className="text-base font-black text-primary font-heading mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gold-500 text-sm font-semibold">{member.role}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/team" className="btn-outline">
            Toute l&apos;Équipe
          </Link>
        </div>
      </div>
    </section>
  );
}
