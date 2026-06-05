'use client';

import { useEffect, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import TeamCard from '@/components/ui/TeamCard';
import { teamAPI } from '@/lib/api';
import { TeamMember } from '@/lib/types';
import Link from 'next/link';

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

      {/* Team Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Nos Professionnels"
            title="Rencontrez Notre Équipe"
            description="Chaque membre apporte une expertise unique qui contribue à la réussite de nos projets."
          />

          {loading ? (
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
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

