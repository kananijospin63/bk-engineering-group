'use client';

import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { contactAPI } from '@/lib/api';
import { MapPin, Phone, Mail, Facebook, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success('Message envoyé avec succès !');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erreur lors de l\'envoi. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('/images/img12.jpeg')` }}
        />
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Parlons de Votre Projet
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              Contactez-Nous
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <AnimatedSection direction="left" className="lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary font-heading mb-2">
                    Informations de Contact
                  </h2>
                  <p className="text-gray-600 text-sm">
                    N&apos;hésitez pas à nous contacter par téléphone, email ou en remplissant le formulaire.
                  </p>
                </div>

                {[
                  {
                    icon: MapPin,
                    title: 'Adresse',
                    content: 'Avenue du Commerce, Quartier Himbi\nGoma, Nord-Kivu\nRépublique Démocratique du Congo',
                  },
                  {
                    icon: Phone,
                    title: 'Téléphone',
                    content: '+257 61 65 20 17',
                    href: 'tel:+25761652017',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'patikanblaiskeem@gmail.com',
                    href: 'mailto:patikanblaiskeem@gmail.com',
                  },
                ].map(({ icon: Icon, title, content, href }) => (
                  <div key={title} className="flex gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-sm mb-1">{title}</h3>
                      {href ? (
                        <a href={href} className="text-gray-600 text-sm hover:text-gold-500 transition-colors whitespace-pre-line">
                          {content}
                        </a>
                      ) : (
                        <p className="text-gray-600 text-sm whitespace-pre-line">{content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Social */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-primary text-sm mb-3">Réseaux Sociaux</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, href: '#', label: 'Facebook' },
                      { icon: Linkedin, href: '#', label: 'LinkedIn' },
                      { icon: Twitter, href: '#', label: 'Twitter' },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="w-10 h-10 bg-gray-100 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                      >
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-primary font-heading mb-6">
                  Envoyez-nous un Message
                </h2>

                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">Message Envoyé !</h3>
                    <p className="text-gray-600 mb-6">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="btn-primary"
                    >
                      Envoyer un Autre Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom Complet *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Demande de devis">Demande de devis</option>
                        <option value="Consultation technique">Consultation technique</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Formation">Formation</option>
                        <option value="Recrutement">Recrutement</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet ou votre demande..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer le Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="h-96 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63800.41!2d29.2!3d-1.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0a0a0a0a0a0a%3A0x0!2sGoma%2C+Nord-Kivu%2C+DRC!5e0!3m2!1sfr!2scd!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="BK Engineering Group - Goma, Nord-Kivu"
        />
      </section>
    </PublicLayout>
  );
}
