'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import { servicesAPI } from '@/lib/api';
import { Service } from '@/lib/types';
import { Building2, Droplets, Map, Wrench } from 'lucide-react';

// Fallback static services if API is unavailable
const fallbackServices: Service[] = [
  {
    id: 1,
    title: 'Conception Architecturale & Aménagement',
    description: 'Conception architecturale complète, planification intérieure/extérieure et modélisation 3D.',
    short_description: 'Conception architecturale complète, planification intérieure/extérieure et modélisation 3D.',
    icon: 'building',
    order_index: 1,
  },
  {
    id: 2,
    title: "Systèmes d'Irrigation & Drainage",
    description: "Systèmes d'irrigation et drainage pour agriculture et infrastructures urbaines.",
    short_description: "Systèmes d'irrigation et drainage pour agriculture et infrastructures urbaines.",
    icon: 'droplets',
    order_index: 2,
  },
  {
    id: 3,
    title: 'Topographie de Haute Précision',
    description: 'Relevés topographiques précis avec GPS différentiel, stations totales et drones.',
    short_description: 'Relevés topographiques précis avec GPS différentiel, stations totales et drones.',
    icon: 'map',
    order_index: 3,
  },
  {
    id: 4,
    title: 'Réhabilitation & Rénovation de Bâtiments',
    description: 'Réhabilitation structurelle et rénovation complète de bâtiments existants.',
    short_description: 'Réhabilitation structurelle et rénovation complète de bâtiments existants.',
    icon: 'wrench',
    order_index: 4,
  },
];

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => { if (res.data?.length) setServices(res.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          subtitle="Nos Expertises"
          title="Services d'Ingénierie Professionnels"
          description="Nous offrons une gamme complète de services d'ingénierie adaptés aux besoins spécifiques de la région."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-outline">
            Tous nos Services
          </Link>
        </div>
      </div>
    </section>
  );
}
