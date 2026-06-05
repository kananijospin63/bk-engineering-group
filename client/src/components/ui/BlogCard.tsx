'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Props {
  post: BlogPost;
  index?: number;
}

const categoryImages: Record<string, string> = {
  'Ingénierie':  '/images/img9.jpeg',
  'Formation':   '/images/img6.jpeg',
  'Technologie': '/images/img7.jpeg',
  'Architecture':'/images/img4.jpeg',
  'Topographie': '/images/img8.jpeg',
  'Actualités':  '/images/img12.jpeg',
};

function BlogCard({ post, index = 0 }: Props) {
  const publishedDate = post.published_at
    ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: fr })
    : '';

  const imageSrc = post.thumbnail
    || (post.category ? categoryImages[post.category] : null)
    || '/images/img10.jpeg';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group"
    >
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading={index < 3 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-gold-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-500" />
              {publishedDate}
            </span>
          )}
          <span className="flex items-center gap-1">
            <User className="w-3 h-3 text-gold-500" />
            {post.author}
          </span>
        </div>
        <h3 className="text-lg font-bold text-primary mb-2 font-heading line-clamp-2 group-hover:text-gold-600 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-gold-500 text-sm font-semibold hover:text-gold-600 transition-colors group/link"
        >
          Lire l&apos;article
          <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export default memo(BlogCard);
