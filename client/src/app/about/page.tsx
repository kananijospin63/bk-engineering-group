import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { Target, Eye, Heart, Award, Users, Lightbulb, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos',
  description: "Découvrez l'histoire, la vision et les valeurs de BK Engineering Group, société d'ingénierie basée à Goma, Nord-Kivu, RDC.",
};

const values = [
  { icon: Award, title: 'Excellence', description: 'Nous visons les plus hauts standards de qualité dans chaque projet, sans compromis.' },
  { icon: Shield, title: 'Intégrité', description: 'Transparence et honnêteté dans toutes nos relations professionnelles et commerciales.' },
  { icon: Lightbulb, title: 'Innovation', description: "Adoption des technologies modernes pour des solutions d'ingénierie plus efficaces." },
  { icon: Users, title: 'Collaboration', description: 'Travail en équipe et partenariat étroit avec nos clients pour atteindre leurs objectifs.' },
  { icon: Heart, title: 'Impact Social', description: 'Engagement envers le développement durable et le bien-être des communautés locales.' },
  { icon: Target, title: 'Précision', description: 'Rigueur technique et attention aux détails dans chaque aspect de nos interventions.' },
];

const timeline = [
  { year: '2009', title: 'Fondation', description: 'Création de BK Engineering Group à Goma par Ing. Bahati Kasereka avec une équipe de 3 ingénieurs.' },
  { year: '2012', title: 'Expansion', description: "Extension des activités à l'ensemble du Nord-Kivu et premiers grands projets d'infrastructure." },
  { year: '2015', title: 'Certification', description: 'Obtention des certifications professionnelles et partenariats avec des organisations internationales.' },
  { year: '2018', title: 'Formation', description: 'Lancement du programme de formation technique pour les jeunes ingénieurs congolais.' },
  { year: '2021', title: 'Innovation', description: 'Intégration des technologies de pointe : drones, BIM, et systèmes GPS différentiel.' },
  { year: '2024', title: "Aujourd'hui", description: "Plus de 50 projets réalisés, 20+ ingénieurs et une présence dans toute la région des Grands Lacs." },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/img3.jpeg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Notre Histoire
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              À Propos de BK Engineering
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Depuis 2009, nous construisons l&apos;avenir de la RDC avec passion, expertise et engagement envers l&apos;excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest mb-3 block">
                Notre Histoire
              </span>
              <h2 className="section-title mb-6">
                15 Ans au Service de l&apos;Ingénierie Congolaise
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                BK Engineering Group a été fondé en 2009 à Goma, Nord-Kivu, avec une vision claire :
                apporter une expertise technique de niveau international au service du développement
                de la République Démocratique du Congo.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Partant d&apos;une petite équipe de trois ingénieurs passionnés, nous avons progressivement
                élargi notre champ d&apos;action pour couvrir l&apos;ensemble du Nord-Kivu et au-delà,
                en nous spécialisant dans les domaines du génie civil, de l&apos;architecture,
                de la topographie et des énergies renouvelables.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aujourd&apos;hui, BK Engineering Group est reconnu comme l&apos;un des cabinets d&apos;ingénierie
                les plus fiables de la région, avec plus de 50 projets réalisés et une équipe
                de plus de 20 professionnels certifiés.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="relative rounded-2xl shadow-2xl w-full h-96 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/img4.jpeg"
                    alt="Équipe BK Engineering Group sur le terrain"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gold-500 text-white rounded-2xl p-6 shadow-xl">
                  <div className="text-3xl font-black font-heading">50+</div>
                  <div className="text-sm font-medium">Projets Réalisés</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0}>
              <div className="bg-white rounded-2xl p-8 shadow-md h-full border-t-4 border-gold-500">
                <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-gold-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-heading mb-4">Notre Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le cabinet d&apos;ingénierie de référence en Afrique centrale, reconnu pour
                  son excellence technique, son innovation et son impact positif sur le développement
                  durable des communautés. Nous aspirons à un Congo où chaque infrastructure est
                  conçue avec rigueur, durabilité et respect de l&apos;environnement.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-md h-full border-t-4 border-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-heading mb-4">Notre Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fournir des services d&apos;ingénierie de haute qualité qui répondent aux besoins
                  spécifiques du contexte congolais, tout en formant la prochaine génération
                  d&apos;ingénieurs locaux. Nous nous engageons à livrer des projets dans les délais,
                  dans le budget et selon les standards les plus élevés.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Ce Qui Nous Guide"
            title="Nos Valeurs Fondamentales"
            description="Ces valeurs sont le fondement de chaque décision que nous prenons et de chaque projet que nous réalisons."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="w-12 h-12 bg-gold-100 group-hover:bg-gold-500 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                    <value.icon className="w-6 h-6 text-gold-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-primary font-heading mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Nos Chantiers"
            title="BK Engineering en Action"
            description="Des images authentiques de notre équipe et de nos réalisations sur le terrain."
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              '/images/img14.jpeg',
              '/images/img15.jpeg',
              '/images/img16.jpeg',
              '/images/img17.jpeg',
              '/images/img18.jpeg',
              '/images/img19.jpeg',
              '/images/img20.jpeg',
              '/images/img21.jpeg',
            ].map((src, i) => (
              <AnimatedSection key={src} delay={i * 0.05}>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`BK Engineering - réalisation ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-primary">
        <div className="container-custom">
          <SectionHeader
            subtitle="Notre Parcours"
            title="Une Croissance Continue"
            light
          />

          <div className="mt-14 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold-500/30 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white/10 rounded-2xl p-6 inline-block text-left">
                        <h3 className="text-white font-bold text-lg font-heading mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                      <span className="text-white font-black text-sm font-heading">{item.year}</span>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

