'use client';

import { useEffect, useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import { servicesAPI } from '@/lib/api';
import { Service } from '@/lib/types';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const fallbackServices: Service[] = [
  {
    id: 1,
    title: 'Conception Architecturale & Aménagement',
    description: 'Nous offrons des services complets de conception architecturale, incluant la planification intérieure et extérieure, la modélisation 3D, et le suivi de chantier. Notre équipe crée des espaces fonctionnels et esthétiques adaptés aux besoins de chaque client.',
    short_description: 'Conception architecturale complète, planification intérieure/extérieure et modélisation 3D.',
    icon: 'building',
    order_index: 1,
  },
  {
    id: 2,
    title: "Systèmes d'Irrigation & Drainage",
    description: "Conception et installation de systèmes d'irrigation et de drainage efficaces pour l'agriculture, les zones urbaines et les infrastructures. Nous utilisons des technologies modernes pour optimiser la gestion de l'eau.",
    short_description: "Systèmes d'irrigation et drainage pour agriculture et infrastructures urbaines.",
    icon: 'droplets',
    order_index: 2,
  },
  {
    id: 3,
    title: 'Topographie de Haute Précision',
    description: "Services de topographie utilisant des équipements de pointe (GPS différentiel, stations totales, drones) pour des relevés précis. Idéal pour les projets de construction, l'aménagement du territoire et les études géotechniques.",
    short_description: 'Relevés topographiques précis avec GPS différentiel, stations totales et drones.',
    icon: 'map',
    order_index: 3,
  },
  {
    id: 4,
    title: 'Réhabilitation & Rénovation de Bâtiments',
    description: "Expertise en réhabilitation structurelle et rénovation de bâtiments existants. Nous évaluons l'état des structures, proposons des solutions de renforcement et supervisons les travaux.",
    short_description: 'Réhabilitation structurelle et rénovation complète de bâtiments existants.',
    icon: 'wrench',
    order_index: 4,
  },
];

const processSteps = [
  { step: '01', title: 'Consultation', description: 'Rencontre initiale pour comprendre vos besoins et objectifs.' },
  { step: '02', title: 'Étude & Conception', description: 'Analyse technique et élaboration des plans et devis détaillés.' },
  { step: '03', title: 'Validation', description: 'Présentation et validation du projet avec le client.' },
  { step: '04', title: 'Exécution', description: 'Réalisation des travaux avec supervision rigoureuse.' },
  { step: '05', title: 'Livraison', description: 'Remise du projet finalisé avec documentation complète.' },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    servicesAPI.getAll()
      .then(res => { if (res.data?.length) setServices(res.data); })
      .catch(() => {});
  }, []);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/img7.jpeg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Nos Expertises
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              Services d&apos;Ingénierie
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Des solutions techniques complètes et adaptées aux défis spécifiques de la région.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Ce Que Nous Faisons"
            title="Nos Domaines d'Expertise"
            description="Chaque service est conçu pour répondre aux besoins spécifiques du contexte congolais avec des standards internationaux."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 group h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gold-100 group-hover:bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <span className="text-2xl font-black text-gold-600 group-hover:text-white transition-colors duration-300 font-heading">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary font-heading mb-3 group-hover:text-gold-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {['Expertise certifiée', 'Équipements modernes', 'Suivi personnalisé'].map(item => (
                          <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Notre Méthode"
            title="Comment Nous Travaillons"
            description="Un processus structuré et transparent pour garantir la réussite de chaque projet."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.1}>
                <div className="text-center relative">
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gold-200" />
                  )}
                  <div className="relative z-10 w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-black font-heading">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-primary font-heading mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black text-white font-heading mb-4">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Contactez-nous pour une consultation gratuite et un devis personnalisé.
            </p>
            <Link href="/contact" className="btn-primary">
              Demander un Devis Gratuit
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PublicLayout>
  );
}

