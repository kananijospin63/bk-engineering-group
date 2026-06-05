'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import TeamCard from '@/components/ui/TeamCard';
import { teamAPI } from '@/lib/api';
import { TeamMember } from '@/lib/types';

export default function TeamPreview() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    teamAPI.getAll()
      .then(res => setTeam((res.data || []).slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          subtitle="Notre Équipe"
          title="Les Experts Derrière Nos Succès"
          description="Une équipe d'ingénieurs et d'architectes passionnés, dédiés à l'excellence technique."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.length > 0 ? (
            team.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto bg-gray-200 rounded-2xl animate-pulse mb-4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-32" />
                <div className="h-3 bg-gray-200 rounded animate-pulse mx-auto w-24" />
              </div>
            ))
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
