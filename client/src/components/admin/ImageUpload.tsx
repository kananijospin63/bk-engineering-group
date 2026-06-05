'use client';

import { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { ImageIcon, X, CheckCircle } from 'lucide-react';

type Endpoint = keyof OurFileRouter;

interface Props {
  endpoint: Endpoint;
  onUploadComplete: (url: string) => void;
  currentImage?: string | null;
  label?: string;
}

export default function ImageUpload({ endpoint, onUploadComplete, currentImage, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {/* Aperçu de l'image actuelle */}
      {preview && (
        <div className="relative mb-3 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Aperçu" className="h-24 w-24 object-cover rounded-lg border border-gray-200" />
          <button
            type="button"
            onClick={() => { setPreview(null); onUploadComplete(''); }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Bouton d'upload Uploadthing */}
      <div className="flex items-center gap-3">
        <UploadButton
          endpoint={endpoint}
          onUploadBegin={() => setUploading(true)}
          onClientUploadComplete={(res) => {
            setUploading(false);
            if (res?.[0]?.url) {
              setPreview(res[0].url);
              onUploadComplete(res[0].url);
            }
          }}
          onUploadError={(error) => {
            setUploading(false);
            console.error('Upload error:', error);
            alert('Erreur lors de l\'upload : ' + error.message);
          }}
          appearance={{
            button: 'bg-gold-500 hover:bg-gold-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors',
            allowedContent: 'text-gray-400 text-xs',
          }}
          content={{
            button: uploading ? 'Upload en cours...' : (preview ? 'Changer l\'image' : 'Choisir une image'),
          }}
        />
        {preview && !uploading && (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            Image uploadée
          </span>
        )}
      </div>
    </div>
  );
}
