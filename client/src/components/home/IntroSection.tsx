import AnimatedSection from '@/components/ui/AnimatedSection';
import { CheckCircle, Award, Users, Target } from 'lucide-react';
import Link from 'next/link';

const highlights = [
  { icon: CheckCircle, text: 'Expertise multidisciplinaire reconnue' },
  { icon: Award, text: 'Standards internationaux de qualité' },
  { icon: Users, text: "Équipe d'ingénieurs certifiés" },
  { icon: Target, text: 'Solutions adaptées au contexte local' },
];

export default function IntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative h-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/equipes/equipe-akeem.jpeg"
                  alt="Ingénieur BK Engineering Group sur le terrain"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-black font-heading">15+</div>
                <div className="text-sm font-medium mt-1">Années d&apos;Excellence</div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            </div>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection direction="right">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest mb-3 block">
              Qui Sommes-Nous
            </span>
            <h2 className="section-title mb-6">
              L&apos;Ingénierie au Service du Développement Congolais
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              BK Engineering Group est une société d&apos;ingénierie multidisciplinaire fondée à Goma,
              Nord-Kivu. Nous combinons expertise technique, innovation et connaissance du terrain
              pour livrer des projets d&apos;infrastructure qui transforment les communautés.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              De la conception architecturale aux travaux publics, en passant par la topographie
              de précision et la formation technique, nous accompagnons nos clients à chaque étape
              de leurs projets avec professionnalisme et engagement.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary">
              En Savoir Plus
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

