'use client';

import { useEffect, useState, useMemo } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogCard from '@/components/ui/BlogCard';
import { blogAPI } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import clsx from 'clsx';

export default function BlogPage() {
  const [posts, setPosts]               = useState<BlogPost[]>([]);
  const [categories, setCategories]     = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    Promise.all([
      blogAPI.getAll({ limit: 50 }),
      blogAPI.getCategories(),
    ]).then(([postsRes, catsRes]) => {
      setPosts(postsRes.data.data || []);
      setCategories(['Tous', ...(catsRes.data || [])]);
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

