import Link from 'next/link';
import { HardHat, MapPin, Phone, Mail, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  pages: [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À Propos' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projets' },
    { href: '/team', label: 'Équipe' },
    { href: '/mission', label: 'Mission' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    'Conception Architecturale',
    'Irrigation & Drainage',
    'Topographie de Précision',
    'Réhabilitation de Bâtiments',
    'Travaux Publics',
    'Formation Technique',
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-white font-heading font-bold text-lg leading-tight block">
                  BK Engineering
                </span>
                <span className="text-gold-400 text-xs font-medium tracking-wider">GROUP</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Société d&apos;ingénierie multidisciplinaire basée à Goma, Nord-Kivu, RDC.
              Excellence, innovation et développement durable au service de l&apos;Afrique.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="text-sm hover:text-gold-400 transition-colors duration-150 flex items-center gap-1"
                  >
                    <span className="text-gold-500">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Nos Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((service) => (
                <li key={service} className="text-sm flex items-center gap-1">
                  <span className="text-gold-500">›</span> {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Avenue du Commerce, Quartier Himbi<br />
                  Goma, Nord-Kivu<br />
                  République Démocratique du Congo
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="tel:+25761652017" className="text-sm hover:text-gold-400 transition-colors">
                  +257 61 65 20 17
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="mailto:patikanblaiskeem@gmail.com" className="text-sm hover:text-gold-400 transition-colors">
                  patikanblaiskeem@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500" suppressHydrationWarning>
            © {new Date().getFullYear()} BK Engineering Group. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-500">
            Goma, Nord-Kivu, République Démocratique du Congo
          </p>
        </div>
      </div>
    </footer>
  );
}
