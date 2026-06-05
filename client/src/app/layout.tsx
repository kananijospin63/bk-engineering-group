import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700', '800', '900'],  // seulement les graisses utilisées
});

export const metadata: Metadata = {
  title: {
    default: 'BK Engineering Group | Génie Civil & Architecture — Goma, DRC',
    template: '%s | BK Engineering Group',
  },
  description:
    'BK Engineering Group est une société d\'ingénierie multidisciplinaire basée à Goma, Nord-Kivu, RDC. Spécialisée en génie civil, architecture, travaux publics, énergie et formation technique.',
  keywords: [
    'ingénierie', 'génie civil', 'architecture', 'Goma', 'Nord-Kivu', 'DRC', 'Congo',
    'topographie', 'irrigation', 'réhabilitation', 'BK Engineering',
  ],
  authors: [{ name: 'BK Engineering Group' }],
  creator: 'BK Engineering Group',
  openGraph: {
    type: 'website',
    locale: 'fr_CD',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bkengineering.com',
    siteName: 'BK Engineering Group',
    title: 'BK Engineering Group | Génie Civil & Architecture — Goma, DRC',
    description:
      'Société d\'ingénierie multidisciplinaire basée à Goma, Nord-Kivu, RDC. Génie civil, architecture, topographie, irrigation et formation technique.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'BK Engineering Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BK Engineering Group',
    description: 'Ingénierie multidisciplinaire à Goma, Nord-Kivu, DRC',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#0F172A', color: '#fff', borderRadius: '8px' },
            success: { iconTheme: { primary: '#F59E0B', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
