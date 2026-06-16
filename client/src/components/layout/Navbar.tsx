'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, HardHat, LogIn, UserPlus } from 'lucide-react';
import clsx from 'clsx';
import { isAuthenticated } from '@/lib/auth';

const navLinks = [
  { href: '/',         label: 'Accueil' },
  { href: '/about',    label: 'À Propos' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projets' },
  { href: '/team',     label: 'Équipe' },
  { href: '/mission',  label: 'Mission' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Vérifie si l'admin est connecté (cookie JWT présent)
  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-colors duration-200',
      scrolled || !isHome ? 'bg-primary shadow-lg py-3' : 'bg-transparent py-5'
    )}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" prefetch={true} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center group-hover:bg-gold-400 transition-colors">
            <HardHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-white font-heading font-bold text-lg leading-tight block">
              BK Engineering
            </span>
            <span className="text-gold-400 text-xs font-medium tracking-wider">GROUP</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
                pathname === link.href
                  ? 'text-gold-400 bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {/* S'inscrire */}
          <Link
            href="/admin/register"
            prefetch={true}
            className="flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-gold-400 text-white hover:text-gold-400 text-sm font-semibold rounded-lg transition-all duration-200"
          >
            <UserPlus className="w-4 h-4" />
            S&apos;inscrire
          </Link>
          {/* Se connecter */}
          <Link
            href={loggedIn ? '/admin' : '/admin/login'}
            prefetch={true}
            className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-white text-sm font-semibold rounded-lg transition-all duration-200"
          >
            <LogIn className="w-4 h-4" />
            {loggedIn ? 'Dashboard' : 'Se connecter'}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        'lg:hidden bg-primary border-t border-white/10 overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="container-custom py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={clsx(
                'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150',
                pathname === link.href
                  ? 'text-gold-400 bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Séparateur */}
          <div className="border-t border-white/10 my-2" />

          {/* Boutons auth mobile */}
          <Link
            href="/admin/register"
            prefetch={true}
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            S&apos;inscrire
          </Link>
          <Link
            href={loggedIn ? '/admin' : '/admin/login'}
            prefetch={true}
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-gold-400 hover:bg-white/10 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            {loggedIn ? 'Dashboard' : 'Se connecter'}
          </Link>

          <Link href="/contact" prefetch={true} className="btn-primary mt-1 justify-center text-sm">
            Nous Contacter
          </Link>
        </div>
      </div>
    </header>
  );
}
