'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicLayout from '@/components/layout/PublicLayout';
import { blogAPI } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    blogAPI.getBySlug(slug)
      .then(res => setPost(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-24 container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-8 w-1/2" />
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse mb-8" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-3" />
            ))}
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (notFound || !post) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-24 container-custom text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Article non trouvé</h1>
          <Link href="/blog" className="btn-primary">
            Retour au Blog
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const publishedDate = post.published_at
    ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: fr })
    : '';

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-white">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-6 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Retour au Blog
            </Link>

            {post.category && (
              <span className="inline-block bg-gold-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-black font-heading mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {publishedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gold-500" />
                  {publishedDate}
                </span>
              )}
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-gold-500" />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {post.thumbnail && (
              <div className="relative h-80 rounded-2xl overflow-hidden mb-10 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-gold-500 pl-6">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-gold-600 prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/blog" className="btn-outline">
                <ArrowLeft className="w-4 h-4" />
                Tous les Articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
