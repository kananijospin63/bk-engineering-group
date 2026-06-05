import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// Définit les endpoints d'upload — un par type de contenu
export const ourFileRouter = {
  // Upload image de projet
  projectImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      // Auth vérifiée côté client via JWT dans les headers
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  // Upload image de service
  serviceImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => ({ url: file.url })),

  // Upload photo de membre d'équipe
  teamPhoto: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => ({ url: file.url })),

  // Upload thumbnail de blog
  blogThumbnail: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => ({ url: file.url })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
