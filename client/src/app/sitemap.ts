import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkengineering.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/mission`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ];

  // Dynamic blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/blog?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      blogPages = (data.data || []).map((post: { slug: string; published_at?: string }) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch {
    // Silently fail — sitemap still works with static pages
  }

  // Dynamic projects
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/projects?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      projectPages = (data.data || []).map((project: { id: number; created_at?: string }) => ({
        url: `${BASE_URL}/projects/${project.id}`,
        lastModified: project.created_at ? new Date(project.created_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Silently fail
  }

  return [...staticPages, ...blogPages, ...projectPages];
}
