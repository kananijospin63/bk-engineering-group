import AnimatedSection from './AnimatedSection';

interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
}: Props) {
  return (
    <AnimatedSection className={centered ? 'text-center' : ''}>
      {subtitle && (
        <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className={`section-title mb-4 ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
