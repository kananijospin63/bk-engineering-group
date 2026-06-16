'use client';

import { useEffect, useState, useMemo } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogCard from '@/components/ui/BlogCard';
import { blogAPI } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import clsx from 'clsx';

const fallbackPosts: BlogPost[] = [
  {
    id: 1,
    title: 'L\'Ingénierie Durable au Cœur du Développement Congolais',
    slug: 'ingenierie-durable-developpement-congolais',
    excerpt: 'Comment BK Engineering Group intègre les principes du développement durable dans chaque projet pour construire un Congo résilient et prospère, en harmonie avec son environnement naturel.',
    category: 'Ingénierie',
    thumbnail: '/images/img5.jpeg',
    author: 'Ir. Akeem Kanani Blaise',
    published: true,
    published_at: '2024-03-15T00:00:00Z',
    created_at: '2024-03-15T00:00:00Z',
  },
  {
    id: 2,
    title: 'Formation Technique : Investir dans la Jeunesse Congolaise',
    slug: 'formation-technique-jeunesse-congolaise',
    excerpt: 'Notre programme de formation technique a permis à plus de 50 jeunes ingénieurs de démarrer leur carrière. Retour sur cinq ans d\'engagement envers l\'excellence et le transfert de compétences.',
    category: 'Formation',
    thumbnail: '/images/img6.jpeg',
    author: 'Ir. Dallas',
    published: true,
    published_at: '2024-02-20T00:00:00Z',
    created_at: '2024-02-20T00:00:00Z',
  },
  {
    id: 3,
    title: 'Topographie par Drone : La Révolution des Relevés de Terrain',
    slug: 'topographie-drone-revolution-relevas-terrain',
    excerpt: 'L\'intégration des drones dans nos opérations topographiques a transformé notre capacité à cartographier des zones difficiles d\'accès avec une précision centimétrique en temps record.',
    category: 'Technologie',
    thumbnail: '/images/img7.jpeg',
    author: 'Ir. Joachim',
    published: true,
    published_at: '2024-01-10T00:00:00Z',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 4,
    title: 'Irrigation et Sécurité Alimentaire en Nord-Kivu',
    slug: 'irrigation-securite-alimentaire-nord-kivu',
    excerpt: 'Les projets d\'irrigation que nous réalisons dans la région de Masisi contribuent directement à améliorer la sécurité alimentaire de milliers de familles agricoles du Nord-Kivu.',
    category: 'Ingénierie',
    thumbnail: '/images/img8.jpeg',
    author: 'Ir. Akeem Kanani Blaise',
    published: true,
    published_at: '2023-11-05T00:00:00Z',
    created_at: '2023-11-05T00:00:00Z',
  },
  {
    id: 5,
    title: 'Réhabilitation d\'Infrastructures : Enjeux et Méthodes',
    slug: 'rehabilitation-infrastructures-enjeux-methodes',
    excerpt: 'La réhabilitation des bâtiments et infrastructures existants représente un défi technique majeur. Découvrez notre approche méthodique pour évaluer, renforcer et rénover les structures vieillissantes.',
    category: 'Architecture',
    thumbnail: '/images/img9.jpeg',
    author: 'Ir. Dallas',
    published: true,
    published_at: '2023-09-18T00:00:00Z',
    created_at: '2023-09-18T00:00:00Z',
  },
  {
    id: 6,
    title: 'Normes de Construction en RDC : État des Lieux',
    slug: 'normes-construction-rdc-etat-lieux',
    excerpt: 'Un regard critique sur les normes de construction en vigueur en République Démocratique du Congo et les efforts de BK Engineering pour aligner ses pratiques sur les standards internationaux.',
    category: 'Actualités',
    thumbnail: '/images/img10.jpeg',
    author: 'Ir. Joachim',
    published: true,
    published_at: '2023-07-22T00:00:00Z',
    created_at: '2023-07-22T00:00:00Z',
  },
];

export default function BlogPage() {
  const [posts, setPosts]                   = useState<BlogPost[]>(fallbackPosts);
  const [categories, setCategories]         = useState<string[]>(['Tous', 'Ingénierie', 'Formation', 'Technologie', 'Architecture', 'Actualités']);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [loading, setLoading]               = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      blogAPI.getAll({ limit: 50 }),
      blogAPI.getCategories(),
    ]).then(([postsRes, catsRes]) => {
      const data = postsRes.data.data || [];
      if (data.length > 0) setPosts(data);
      const cats = catsRes.data || [];
      if (cats.length > 0) setCategories(['Tous', ...cats]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => activeCategory === 'Tous'
      ? posts
      : posts.filter(p => p.category === activeCategory),
    [activeCategory, posts]
  );

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/img10.jpeg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4 block">
              Actualités & Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
              Notre Blog
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Articles, analyses et actualités sur l&apos;ingénierie, l&apos;architecture et le développement en RDC.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          {/* Category filter */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                    activeCategory === cat
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun article dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
