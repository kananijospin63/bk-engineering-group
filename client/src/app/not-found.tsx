import Link from 'next/link';
import PublicLayout from '@/components/layout/PublicLayout';
import { HardHat } from 'lucide-react';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gold-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <HardHat className="w-12 h-12 text-gold-500" />
          </div>
          <h1 className="text-8xl font-black text-primary font-heading mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Page Non Trouvée</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link href="/" className="btn-primary">
            Retour à l&apos;Accueil
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
