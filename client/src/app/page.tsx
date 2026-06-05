import dynamic from 'next/dynamic';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';

// Chargement différé des sections sous le fold — réduit le JS initial
const ServicesSection  = dynamic(() => import('@/components/home/ServicesSection'),  { ssr: true });
const StatsSection     = dynamic(() => import('@/components/home/StatsSection'),     { ssr: false });
const ProjectsPreview  = dynamic(() => import('@/components/home/ProjectsPreview'),  { ssr: false });
const TeamPreview      = dynamic(() => import('@/components/home/TeamPreview'),      { ssr: false });
const BlogPreview      = dynamic(() => import('@/components/home/BlogPreview'),      { ssr: false });
const CTASection       = dynamic(() => import('@/components/home/CTASection'),       { ssr: true });

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <StatsSection />
      <ProjectsPreview />
      <TeamPreview />
      <BlogPreview />
      <CTASection />
    </PublicLayout>
  );
}
