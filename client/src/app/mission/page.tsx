import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { GraduationCap, Users, Lightbulb, BookOpen, Globe, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mission',
  description: "La mission de BK Engineering Group : former la prochaine génération d'ingénieurs congolais à travers la pratique, le mentorat et les technologies modernes.",
};

const pillars = [
  {
    icon: GraduationCap,
    title: 'Formation Pratique',
    description: "Nous croyons que l'apprentissage par la pratique est la méthode la plus efficace. Nos stagiaires travaillent sur des projets réels dès le premier jour.",
  },
  {
    icon: Users,
    title: 'Mentorat Technique',
    description: 'Chaque jeune ingénieur est accompagné par un mentor expérimenté qui partage son expertise et guide son développement professionnel.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Technologique',
    description: 'Nous intégrons les dernières technologies (BIM, drones, GPS différentiel) dans notre formation pour préparer les ingénieurs de demain.',
  },
  {
    icon: Globe,
    title: 'Standards Internationaux',
    description: "Nos formations respectent les normes internationales d'ingénierie, préparant nos diplômés à travailler dans n'importe quel contexte.",
  },
];

const programs = [
  {
    title: 'Stage Professionnel',
    duration: '3-6 mois',
    description: "Programme d'immersion complète pour les étudiants en fin de cycle d'ingénierie.",
    features: ['Projets réels', 'Supervision quotidienne', 'Rapport de stage', 'Attestation certifiée'],
  },
  {
    title: 'Formation Continue',
    duration: '1-4 semaines',
    description: 'Modules de formation spécialisés pour les professionnels souhaitant se perfectionner.',
    features: ['Topographie avancée', 'Logiciels BIM', 'Gestion de projet', 'Normes de construction'],
  },
  {
    title: 'Apprentissage',
    duration: '12-24 mois',
    description: "Programme d'apprentissage long terme combinant théorie et pratique intensive.",
    features: ["Contrat d'apprentissage", 'Formation théorique', 'Pratique terrain', 'Certification finale'],
  },
];

export default function MissionPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/img5.jpeg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Notre Engagement
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              Former les Ingénieurs<br />
              <span className="text-gold-400">de Demain</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              BK Engineering Group s&apos;engage à former la prochaine génération d&apos;ingénieurs congolais
              à travers la pratique, le mentorat et l&apos;intégration des technologies modernes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest mb-3 block">
                Notre Mission
              </span>
              <h2 className="section-title mb-6">
                Investir dans le Capital Humain Congolais
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La RDC regorge de talents et de ressources. Ce qui manque souvent, c&apos;est l&apos;accès
                à une formation technique de qualité et à des opportunités de pratique professionnelle.
                BK Engineering Group comble ce fossé.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Notre programme de formation est conçu pour transformer des étudiants prometteurs
                en ingénieurs compétents, capables de relever les défis d&apos;infrastructure de notre pays.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                En cinq ans, nous avons formé plus de 50 jeunes professionnels, dont la majorité
                travaille aujourd&apos;hui dans le secteur de la construction et du génie civil en RDC.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '50+', label: 'Formés' },
                  { value: '80%', label: 'Employés' },
                  { value: '5', label: 'Programmes' },
                ].map(stat => (
                  <div key={stat.label} className="text-center bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-black text-gold-500 font-heading">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/img6.jpeg"
                  alt="Formation technique BK Engineering"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Nos Piliers"
            title="Une Approche Pédagogique Unique"
            description="Notre méthode de formation repose sur quatre piliers fondamentaux qui garantissent l'excellence."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-center group h-full">
                  <div className="w-16 h-16 bg-gold-100 group-hover:bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                    <pillar.icon className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-primary font-heading mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Nos Programmes"
            title="Formations Disponibles"
            description="Des programmes adaptés à chaque niveau et chaque besoin professionnel."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <AnimatedSection key={program.title} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 h-full border-t-4 border-gold-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary font-heading">{program.title}</h3>
                    <span className="bg-gold-100 text-gold-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {program.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie terrain */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Sur le Terrain"
            title="La Formation en Pratique"
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/images/img22.jpeg', '/images/img23.jpeg', '/images/img24.jpeg', '/images/img25.jpeg'].map((src, i) => (
              <AnimatedSection key={src} delay={i * 0.08}>
                <div className="relative h-52 rounded-xl overflow-hidden shadow-md group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Formation terrain ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
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
            <BookOpen className="w-16 h-16 text-gold-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-white font-heading mb-4">
              Intéressé par Nos Programmes ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Contactez-nous pour en savoir plus sur nos programmes de formation et les opportunités disponibles.
            </p>
            <Link href="/contact" className="btn-primary">
              Nous Contacter
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PublicLayout>
  );
}

