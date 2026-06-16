'use client';

import { useEffect, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import TeamCard from '@/components/ui/TeamCard';
import { teamAPI } from '@/lib/api';
import { TeamMember } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, HardHat, Settings } from 'lucide-react';

// Membres de direction — affichés toujours en premier, statiques
const directionTeam = [
  {
    id: 'akeem',
    name: 'Ir. Akeem Kanani Blaise',
    role: 'Gérant',
    photo: '/images/equipes/equipe-akeem.jpeg',
    description:
      'Fondateur et Gérant de BK Engineering Group. Ingénieur multidisciplinaire avec plus de 15 ans d\'expérience dans le génie civil, l\'architecture et la gestion de projets d\'infrastructure en RDC.',
    icon: Briefcase,
    color: 'bg-gold-500',
  },
  {
    id: 'dallas',
    name: 'Ir. Dallas',
    role: 'Directeur Technique',
    photo: '/images/equipes/equipe-dallas.jpeg',
    description:
      'Directeur Technique de BK Engineering Group. Responsable de la supervision technique de tous les projets, il garantit la conformité aux normes d\'ingénierie et la qualité des réalisations.',
    icon: HardHat,
    color: 'bg-primary',
  },
  {
    id: 'joachim',
    name: 'Ir. Joachim',
    role: 'Directeur Technique',
    photo: '/images/equipes/equipe-joachim.jpeg',
    description:
      'Directeur Technique de BK Engineering Group. Expert en conception et en planification, il pilote les études techniques et assure l\'excellence opérationnelle sur les chantiers.',
    icon: Settings,
    color: 'bg-blue-700',
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamAPI.getAll()
      .then(res => setTeam(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/img9.jpeg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Notre Équipe
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              Les Experts BK Engineering
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Une équipe pluridisciplinaire d&apos;ingénieurs, d&apos;architectes et de techniciens passionnés par l&apos;excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Direction — section dédiée */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Leadership"
            title="Notre Direction"
            description="Les ingénieurs qui portent la vision de BK Engineering Group et conduisent l'entreprise vers l'excellence."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {directionTeam.map((member, i) => {
              const Icon = member.icon;
              return (
                <AnimatedSection key={member.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                  >
                    {/* Photo */}
                    <div className="relative h-72 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      {/* Badge poste */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className={`inline-flex items-center gap-2 ${member.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                          <Icon className="w-3.5 h-3.5" />
                          {member.role}
                        </div>
                      </div>
                    </div>

                    {/* Infos */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-primary font-heading mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gold-500 text-sm font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reste de l'équipe depuis l'API */}
      {(loading || team.length > 0) && (
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <SectionHeader
              subtitle="Nos Professionnels"
              title="Notre Équipe Technique"
              description="Chaque membre apporte une expertise unique qui contribue à la réussite de nos projets."
            />

            {loading ? (
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="w-48 h-48 mx-auto bg-gray-200 rounded-2xl animate-pulse mb-4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-32" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse mx-auto w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {team.map((member, i) => (
                  <TeamCard key={member.id} member={member} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Join us */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-3xl p-12 text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-black text-white font-heading mb-4">
                Rejoignez Notre Équipe
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Vous êtes ingénieur, architecte ou technicien passionné ?
                Nous sommes toujours à la recherche de talents pour renforcer notre équipe.
              </p>
              <Link href="/contact" className="btn-primary">
                Postuler Maintenant
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
