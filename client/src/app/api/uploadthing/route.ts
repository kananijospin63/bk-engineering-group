import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

// Route handler Next.js pour Uploadthing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
