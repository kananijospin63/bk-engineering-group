'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/ui/BlogCard';
import { blogAPI } from '@/lib/api';
import { BlogPost } from '@/lib/types';

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    blogAPI.getAll({ limit: 3 })
      .then(res => setPosts(res.data.data || []))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          subtitle="Actualités & Insights"
          title="Derniers Articles"
          description="Restez informé des dernières tendances en ingénierie et des actualités de BK Engineering Group."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-outline">
            Tous les Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
