import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('/images/img2.jpeg')` }}
      />

      <div className="container-custom relative z-10 text-center">
        <AnimatedSection>
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
            Démarrons Ensemble
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-6">
            Votre Projet Mérite<br />
            <span className="text-gold-400">le Meilleur</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet.
            Notre équipe d&apos;experts est prête à vous accompagner vers le succès.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander un Devis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+25761652017" className="btn-secondary text-base px-8 py-4">
              <Phone className="w-5 h-5" />
              +257 61 65 20 17
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
