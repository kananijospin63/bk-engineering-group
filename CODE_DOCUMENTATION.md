# Documentation du Code — BK Engineering Group

Description complète de chaque fichier du projet full-stack.

---

## Structure Générale du Projet

```
bkengineeringgroup/
├── client/                    # Frontend Next.js 14
│   ├── public/
│   │   └── images/            # Images locales du site
│   ├── src/
│   │   ├── app/               # Pages (App Router Next.js)
│   │   ├── components/        # Composants React réutilisables
│   │   └── lib/               # Utilitaires, API, types
│   ├── .env.local             # Variables d'environnement locales
│   ├── next.config.js         # Configuration Next.js
│   ├── tailwind.config.js     # Configuration Tailwind CSS
│   └── package.json           # Dépendances frontend
│
├── server/                    # Backend Express.js
│   ├── src/
│   │   ├── config/            # Configuration (storage)
│   │   ├── db/                # Base de données
│   │   ├── middleware/        # Middlewares Express
│   │   ├── routes/            # Routes API
│   │   └── utils/             # Utilitaires serveur
│   ├── public/uploads/        # Images uploadées localement
│   ├── .env                   # Variables d'environnement serveur
│   └── package.json           # Dépendances backend
│
├── DEPLOYMENT.md              # Guide de déploiement
├── CODE_DOCUMENTATION.md      # Ce fichier
├── docker-compose.yml         # Configuration Docker (PostgreSQL local)
├── start-all.bat              # Script de démarrage Windows
└── README.md                  # Documentation principale
```

---

## FRONTEND — `client/`

### Configuration

#### `client/next.config.js`
Configuration principale de Next.js.
- **`reactStrictMode: false`** — désactive le double rendu en développement
- **`compress: true`** — active la compression gzip/brotli des réponses
- **`images.remotePatterns`** — autorise les images depuis Uploadthing, Supabase, localhost
- **`rewrites()`** — proxy `/api-uploads/*` vers le serveur backend local
- **`headers()`** — cache des assets statiques et headers de sécurité

#### `client/tailwind.config.js`
Configuration de Tailwind CSS.
- Définit les couleurs personnalisées : `primary` (bleu foncé #0F172A) et `gold` (ambre #F59E0B)
- Ajoute les polices : `sans` (Inter/Poppins) et `heading` (Montserrat)
- Définit les animations personnalisées : `fade-in`, `slide-up`, `float`

#### `client/tsconfig.json`
Configuration TypeScript.
- `"@/*"` → alias vers `./src/*` pour les imports courts
- Mode strict activé pour la sécurité du typage

#### `client/.eslintrc.json`
Règles ESLint pour Next.js.
- `@next/next/no-img-element: "off"` — désactivé car le projet utilise `<img>` natif pour les images dynamiques

#### `client/.env.local`
Variables d'environnement locales (non committées).
- `NEXT_PUBLIC_API_URL` — URL du backend Express
- `NEXT_PUBLIC_SITE_URL` — URL publique du site
- `UPLOADTHING_TOKEN` — Token Uploadthing pour l'upload d'images

---

### Pages — `client/src/app/`

#### `client/src/app/layout.tsx`
Layout racine de toute l'application.
- Charge les polices Google (Inter, Montserrat) via `next/font`
- Définit les métadonnées SEO globales (title, description, OpenGraph, Twitter)
- Inclut le composant `<Toaster>` pour les notifications toast

#### `client/src/app/page.tsx`
Page d'accueil (`/`).
- Assemble toutes les sections de la page d'accueil
- Utilise `dynamic()` de Next.js pour le chargement différé des sections sous le fold
- Sections : Hero, Intro, Services, Stats, Projets, Équipe, Blog, CTA

#### `client/src/app/globals.css`
Styles CSS globaux.
- Importe les directives Tailwind (`@tailwind base/components/utilities`)
- Définit les classes réutilisables : `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.input-field`, `.container-custom`
- Animations CSS : `animate-spin-slow`, `animate-spin-reverse` pour les cercles décoratifs du Hero
- Scrollbar personnalisée

#### `client/src/app/not-found.tsx`
Page 404 personnalisée.
- Affichée quand une route n'existe pas
- Bouton de retour à l'accueil

#### `client/src/app/robots.ts`
Génère le fichier `robots.txt`.
- Autorise les robots sur toutes les pages publiques
- Bloque `/admin/` pour les moteurs de recherche

#### `client/src/app/sitemap.ts`
Génère le sitemap XML dynamiquement.
- Inclut toutes les pages statiques
- Récupère les articles de blog depuis l'API et les ajoute
- Récupère les projets depuis l'API et les ajoute

---

### Pages Publiques

#### `client/src/app/about/page.tsx`
Page À Propos (`/about`).
- Histoire de BK Engineering Group depuis 2009
- Section Vision & Mission
- Grille des valeurs fondamentales (6 cartes)
- Galerie photos 8 images de terrain
- Timeline de l'évolution (2009 → 2024)

#### `client/src/app/services/page.tsx`
Page Services (`/services`).
- Charge les services depuis l'API backend
- Fallback avec données statiques si l'API est indisponible
- Grille des services avec description complète
- Section processus de travail (5 étapes)
- Section CTA

#### `client/src/app/projects/page.tsx`
Page Projets (`/projects`).
- Charge tous les projets depuis l'API avec pagination
- Filtrage par catégorie avec `useMemo` pour les performances
- Grille animée avec Framer Motion
- Galerie de photos de chantier en bas de page

#### `client/src/app/projects/[id]/page.tsx`
Page détail d'un projet (`/projects/:id`).
- Charge un projet spécifique par son ID
- Affiche l'image principale, description complète
- Sidebar avec informations (catégorie, localisation, année, client, statut)
- CTA pour contacter l'équipe

#### `client/src/app/team/page.tsx`
Page Équipe (`/team`).
- Charge les membres depuis l'API
- Grille de cartes avec photo, nom, rôle, bio
- Section "Rejoignez Notre Équipe" avec CTA

#### `client/src/app/mission/page.tsx`
Page Mission (`/mission`).
- Présente la mission de formation technique
- Section avec image et statistiques (50+ formés, 80% employés)
- 4 piliers pédagogiques
- 3 programmes de formation avec durée et features
- Galerie terrain 4 photos

#### `client/src/app/blog/page.tsx`
Page Blog (`/blog`).
- Charge tous les articles publiés depuis l'API
- Filtrage par catégorie avec `useMemo`
- Grille de BlogCards

#### `client/src/app/blog/[slug]/page.tsx`
Page article de blog (`/blog/:slug`).
- Charge un article par son slug unique
- Affiche thumbnail, excerpt, contenu HTML complet
- Rendu HTML avec `prose` de Tailwind Typography

#### `client/src/app/contact/page.tsx`
Page Contact (`/contact`).
- Formulaire avec validation : nom, email, sujet (select), message
- Envoie les données au backend via `contactAPI`
- Affiche un message de confirmation après envoi
- Coordonnées : adresse, téléphone (+257 61 65 20 17), email (patikanblaiskeem@gmail.com)
- Carte Google Maps intégrée (Goma, Nord-Kivu)

---

### Pages Admin — `client/src/app/admin/`

#### `client/src/app/admin/layout.tsx`
Layout des pages admin.
- Wrappé par `AdminLayout` uniquement sur les pages internes admin

#### `client/src/app/admin/login/page.tsx`
Page de connexion admin (`/admin/login`).
- Formulaire email/mot de passe
- Appelle `authAPI.login()` et stocke le token JWT
- Redirige vers `/admin` si déjà connecté
- Affiche/masque le mot de passe

#### `client/src/app/admin/page.tsx`
Tableau de bord admin (`/admin`).
- Affiche 6 cartes de statistiques (projets, services, équipe, articles, messages, non lus)
- **Actions Rapides** : 6 boutons — Nouveau Projet, Nouvel Article, Nouveau Membre, Voir Messages, Gérer Services, Voir le Site
- **Modales de création rapide** directement depuis le dashboard (sans aller sur une autre page)
- Bouton **Actualiser** pour recharger les stats
- Section **Gestion Complète** avec liens vers toutes les pages

#### `client/src/app/admin/projects/page.tsx`
Gestion des projets admin.
- Liste tous les projets en tableau avec miniature, catégorie, statut
- Modal de création/modification avec champs : titre, catégorie, statut, localisation, année, client, description
- Composant `ImageUpload` pour uploader une image via Uploadthing
- Boutons modifier (crayon bleu) et supprimer (poubelle rouge)

#### `client/src/app/admin/services/page.tsx`
Gestion des services admin.
- Liste les services sur la gauche (cliquable pour modifier)
- Formulaire de modification sur la droite : titre, description courte/complète, icône, ordre
- Composant `ImageUpload` pour l'image du service

#### `client/src/app/admin/team/page.tsx`
Gestion des membres de l'équipe admin.
- Grille de cartes avec photo miniature, nom, rôle
- Modal de création/modification : nom, rôle, bio, email, ordre, LinkedIn
- Composant `ImageUpload` pour la photo du membre

#### `client/src/app/admin/blog/page.tsx`
Gestion des articles de blog admin.
- Tableau avec titre, catégorie, statut (publié/brouillon), date
- Modal de création/modification : titre, catégorie, auteur, extrait, contenu HTML, thumbnail
- Case à cocher **Publier immédiatement**
- Composant `ImageUpload` pour la couverture

#### `client/src/app/admin/messages/page.tsx`
Gestion des messages de contact admin.
- Liste des messages avec filtrage (Tous / Non lus / Lus)
- Badge bleu pour les messages non lus
- Panneau de lecture à droite au clic
- Bouton **Répondre** (ouvre le client email)
- Marque automatiquement comme lu à l'ouverture

#### `client/src/app/admin/settings/page.tsx`
Paramètres du compte admin.
- Affiche les infos du compte (nom, email, rôle)
- Formulaire de changement de mot de passe avec validation
- Affichage/masquage des mots de passe

#### `client/src/app/api/uploadthing/core.ts`
Configuration des endpoints Uploadthing.
- Définit 4 routes d'upload : `projectImage`, `serviceImage`, `teamPhoto`, `blogThumbnail`
- Limites de taille : 4MB pour images, 2MB pour photos
- Retourne l'URL publique après upload réussi

#### `client/src/app/api/uploadthing/route.ts`
Route API Next.js pour Uploadthing.
- Expose les handlers GET et POST pour la route `/api/uploadthing`
- Requis par Uploadthing pour fonctionner avec Next.js App Router

---

### Composants — `client/src/components/`

#### `client/src/components/layout/PublicLayout.tsx`
Layout de toutes les pages publiques.
- Wrappé `Navbar` en haut et `Footer` en bas autour du `{children}`

#### `client/src/components/layout/Navbar.tsx`
Barre de navigation principale.
- Fixe en haut de la page (sticky)
- Transparente sur la page d'accueil, opaque sur les autres pages
- Devient opaque au scroll (détection via `window.scrollY`)
- Navigation desktop avec liens préchargés (`prefetch={true}`)
- Menu mobile en CSS pur (sans Framer Motion) pour la performance
- Lien actif mis en évidence en doré

#### `client/src/components/layout/Footer.tsx`
Pied de page.
- Logo + description de l'entreprise
- Liens de navigation avec `prefetch={true}`
- Liste des services
- Coordonnées (adresse Goma, téléphone +257 61 65 20 17, email patikanblaiskeem@gmail.com)
- Réseaux sociaux (Facebook, LinkedIn, Twitter, Instagram)
- Copyright avec `suppressHydrationWarning` pour éviter les erreurs d'hydratation

#### `client/src/components/admin/AdminLayout.tsx`
Layout de toutes les pages admin.
- Vérifie l'authentification au montage, redirige vers `/admin/login` si non connecté
- Sidebar avec navigation (Dashboard, Projets, Services, Équipe, Blog, Messages, Paramètres)
- Header avec breadcrumb et lien "Voir le Site"
- Menu mobile avec overlay
- Affiche le nom/email de l'utilisateur connecté en bas
- Bouton de déconnexion

#### `client/src/components/admin/ImageUpload.tsx`
Composant d'upload d'image via Uploadthing.
- Bouton stylisé en doré pour déclencher l'upload
- Aperçu de l'image après upload réussi
- Bouton ✕ pour supprimer l'image
- Indicateur de progression pendant l'upload
- Supporte tous les endpoints Uploadthing définis dans `core.ts`

#### `client/src/components/home/HeroSection.tsx`
Section hero de la page d'accueil (plein écran).
- Image de fond CSS avec overlay gradient
- Deux cercles décoratifs animés en CSS
- Titre principal avec animation Framer Motion
- Deux boutons CTA : "Voir nos Projets" et "Nous Contacter"
- Grille de 4 statistiques : 50+ projets, 15+ ans, 20+ ingénieurs, 100% satisfaction
- Indicateur de scroll animé en bas

#### `client/src/components/home/IntroSection.tsx`
Section introduction sur l'accueil.
- Image de l'ingénieur BK Engineering sur le terrain (à gauche)
- Badge flottant "15+ Années d'Excellence"
- Texte de présentation de l'entreprise (à droite)
- Liste de 4 points forts avec icônes
- Bouton "En Savoir Plus" vers `/about`

#### `client/src/components/home/ServicesSection.tsx`
Section services sur l'accueil.
- Charge les services depuis l'API backend
- Fallback avec 4 services statiques si l'API est indisponible
- Grille de `ServiceCard` (4 colonnes)
- Bouton "Tous nos Services"

#### `client/src/components/home/StatsSection.tsx`
Section statistiques sur l'accueil (fond sombre).
- 4 statistiques : 50+ projets, 15+ ans, 20+ ingénieurs, 300+ familles
- Animation d'apparition au scroll via `useInView`
- Pattern de points décoratif en arrière-plan

#### `client/src/components/home/ProjectsPreview.tsx`
Aperçu des projets sur l'accueil.
- Charge 3 projets depuis l'API
- Affiche des squelettes animés pendant le chargement
- Bouton "Voir Tous les Projets"

#### `client/src/components/home/TeamPreview.tsx`
Aperçu de l'équipe sur l'accueil.
- Charge 4 membres depuis l'API
- Bouton "Toute l'Équipe"

#### `client/src/components/home/BlogPreview.tsx`
Aperçu des articles sur l'accueil.
- Charge 3 articles depuis l'API
- N'affiche rien si aucun article disponible
- Bouton "Tous les Articles"

#### `client/src/components/home/CTASection.tsx`
Section call-to-action en bas de page d'accueil.
- Fond sombre avec image en arrière-plan (opacity 20%)
- Titre "Votre Projet Mérite le Meilleur"
- Bouton "Demander un Devis" → `/contact`
- Bouton téléphone avec le numéro +257 61 65 20 17

#### `client/src/components/ui/AnimatedSection.tsx`
Composant d'animation au scroll.
- Utilise `useInView` de react-intersection-observer
- Animations : fade-up, slide-left, slide-right, none
- Paramètres : `delay`, `direction`, `threshold: 0.05`
- `rootMargin: '50px'` pour anticiper l'animation avant que l'élément soit visible

#### `client/src/components/ui/SectionHeader.tsx`
En-tête de section réutilisable.
- Sous-titre en doré (uppercase)
- Titre principal (h2)
- Description optionnelle
- Props : `light` (texte blanc sur fond sombre), `centered` (centré par défaut)

#### `client/src/components/ui/ProjectCard.tsx`
Carte de projet.
- Image avec fallback par catégorie (ex: Génie Civil → img1.jpeg)
- Badge catégorie (doré) et badge statut (vert/bleu/jaune)
- Overlay gradient en bas de l'image
- Lien vers `/projects/:id`
- Affiche : titre, description (2 lignes), localisation, année, client
- Mémorisé avec `React.memo` pour les performances

#### `client/src/components/ui/BlogCard.tsx`
Carte d'article de blog.
- Image avec fallback par catégorie
- Badge catégorie
- Date de publication formatée en français
- Nom de l'auteur
- Lien "Lire l'article →" vers `/blog/:slug`
- Mémorisé avec `React.memo`

#### `client/src/components/ui/ServiceCard.tsx`
Carte de service.
- Image ou icône Lucide si pas d'image
- Overlay gradient sur l'image
- Icône en badge doré en bas à gauche
- Hover : zoom de l'image, titre en doré
- Mémorisé avec `React.memo`

#### `client/src/components/ui/TeamCard.tsx`
Carte de membre de l'équipe.
- Photo avec fallback local si pas de photo en BDD
- Overlay au hover avec liens LinkedIn et email
- Nom en gras, rôle en doré, bio en 3 lignes max
- Mémorisé avec `React.memo`

---

### Bibliothèques — `client/src/lib/`

#### `client/src/lib/api.ts`
Client API Axios centralisé.
- Instance Axios avec `baseURL` depuis `NEXT_PUBLIC_API_URL`
- **Intercepteur request** : ajoute automatiquement le token JWT depuis les cookies
- **Intercepteur response** : en cas de 401, supprime le token et redirige vers `/admin/login`
- Exports groupés par domaine :
  - `authAPI` : login, me, changePassword
  - `projectsAPI` : getAll, getById, getCategories
  - `servicesAPI` : getAll, getById
  - `blogAPI` : getAll, getBySlug, getCategories
  - `teamAPI` : getAll
  - `contactAPI` : send
  - `adminAPI` : CRUD complet pour projets, services, équipe, blog, messages + stats

#### `client/src/lib/auth.ts`
Gestion de l'authentification côté client.
- `setAuth(token, user)` — stocke le token dans un cookie (7 jours, secure) et l'utilisateur dans localStorage
- `getToken()` — récupère le token depuis les cookies
- `getUser()` — récupère l'utilisateur depuis localStorage
- `clearAuth()` — supprime token et utilisateur
- `isAuthenticated()` — vérifie si un token existe

#### `client/src/lib/types.ts`
Interfaces TypeScript pour tous les modèles de données.
- `Project` — projet avec id, titre, description, catégorie, localisation, année, client, image, statut
- `Service` — service avec titre, description, icône, ordre
- `TeamMember` — membre avec nom, rôle, bio, photo, email, linkedin
- `BlogPost` — article avec titre, slug, contenu, extrait, catégorie, thumbnail, auteur, publié
- `ContactMessage` — message avec nom, email, sujet, message, read_status
- `User` — utilisateur avec id, nom, email, rôle
- `AdminStats` — statistiques du dashboard
- `PaginatedResponse<T>` — réponse paginée générique

#### `client/src/lib/uploadthing.ts`
Export des composants Uploadthing.
- `UploadButton` — bouton d'upload prêt à l'emploi
- `UploadDropzone` — zone de glisser-déposer

---

## BACKEND — `server/`

### Point d'entrée

#### `server/src/index.js`
Point d'entrée du serveur Express.
- Configure tous les middlewares dans l'ordre :
  1. `compression()` — gzip/brotli des réponses
  2. `helmet()` — headers de sécurité HTTP
  3. `morgan()` — logs HTTP (désactivé en production)
  4. `cors()` — autorise localhost et les domaines `.vercel.app`
  5. `express.json()` — parsing du body JSON (limite 10mb)
  6. Rate limiting : 100 req/15min général, 10 req/15min pour `/api/auth/`
- Sert les fichiers uploadés localement via `/uploads`
- Monte toutes les routes `/api/...`
- Handler 404 et handler d'erreur global

---

### Configuration — `server/src/config/`

#### `server/src/config/cloudinary.js`
*Fichier legacy — conservé mais non utilisé.*
Configuration Cloudinary originale, remplacée par `storage.js`.

#### `server/src/config/storage.js`
Système de stockage d'images modulaire.
- **Détection automatique** : utilise Supabase Storage si `SUPABASE_URL` est configuré, sinon stockage local
- **Supabase Storage** : upload vers un bucket public, retourne l'URL publique CDN
- **Stockage local** : sauvegarde dans `public/uploads/`, accessible via `/uploads/` ou `/api-uploads/`
- Exports : `uploadProject`, `uploadService`, `uploadTeam`, `uploadBlog`, `deleteImage`
- Gestion d'erreur : si l'upload échoue, la requête continue sans image

---

### Base de Données — `server/src/db/`

#### `server/src/db/connection.js`
Pool de connexions PostgreSQL.
- Utilise `pg` (node-postgres)
- Lit les variables d'environnement : `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- Pool de 10 connexions maximum
- Teste la connexion au démarrage et affiche un message de succès ou d'erreur

#### `server/src/db/migrate.js`
Script de migration — crée toutes les tables.
- Se connecte directement à la base configurée
- Crée les tables si elles n'existent pas (`CREATE TABLE IF NOT EXISTS`) :
  - `users` — comptes administrateurs
  - `services` — services de l'entreprise
  - `projects` — projets réalisés
  - `team_members` — membres de l'équipe
  - `blog_posts` — articles du blog
  - `contact_messages` — messages du formulaire de contact
- Crée les index de performance : catégorie, statut, publié, read_status
- Crée un trigger `update_updated_at` pour les colonnes `updated_at`

#### `server/src/db/seed.js`
Script de peuplement — insère les données initiales.
- Utilise `ON CONFLICT DO NOTHING` pour éviter les doublons
- Insère :
  - 1 utilisateur admin (`admin@bkengineering.com` / `Admin@2024`)
  - 4 services (Architecture, Irrigation, Topographie, Réhabilitation)
  - 4 membres d'équipe (Jospin, Marie, Jean-Pierre, Espérance)
  - 6 projets (Centre de Santé, Irrigation Masisi, Pont Kanyabayonga, etc.)
  - 3 articles de blog (Ingénierie durable, Formation, Topographie drones)

---

### Middleware — `server/src/middleware/`

#### `server/src/middleware/auth.js`
Middleware d'authentification JWT.
- `authenticate(req, res, next)` — vérifie le token Bearer dans `Authorization`
  - Extrait le token du header
  - Vérifie avec `jwt.verify()` et `JWT_SECRET`
  - Attache `req.user` avec `{ id, email, role, name }`
  - Retourne 401 si token absent, expiré ou invalide
- `requireAdmin(req, res, next)` — vérifie que l'utilisateur a le rôle `admin`
  - Retourne 403 si le rôle n'est pas `admin`

---

### Routes API — `server/src/routes/`

#### `server/src/routes/auth.js`
Routes d'authentification (`/api/auth/`).
- `POST /login` — connexion avec email/mot de passe
  - Valide les inputs avec express-validator
  - Cherche l'utilisateur en BDD
  - Compare le mot de passe avec bcrypt
  - Génère un JWT signé avec `JWT_SECRET`
  - Retourne `{ token, user }`
- `GET /me` — récupère le profil de l'utilisateur connecté (requiert auth)
- `PUT /change-password` — change le mot de passe (requiert auth)
  - Valide l'ancien mot de passe
  - Hache le nouveau avec bcrypt (12 rounds)

#### `server/src/routes/projects.js`
Routes publiques des projets (`/api/projects/`).
- `GET /` — liste paginée avec filtres `category`, `status`, `limit`, `offset`
  - Construit la requête SQL dynamiquement
  - Retourne `{ data, total, limit, offset }`
  - Cache-Control : 1 minute
- `GET /categories` — liste des catégories distinctes (cache 5 minutes)
- `GET /:id` — détail d'un projet par ID (cache 5 minutes)

#### `server/src/routes/services.js`
Routes publiques des services (`/api/services/`).
- `GET /` — liste tous les services triés par `order_index` (cache 1 heure)
- `GET /:id` — détail d'un service (cache 1 heure)

#### `server/src/routes/blog.js`
Routes publiques du blog (`/api/blog/`).
- `GET /` — liste paginée des articles publiés avec filtre `category` (cache 1 minute)
- `GET /categories` — catégories des articles publiés (cache 5 minutes)
- `GET /:slug` — article par slug unique (cache 5 minutes)

#### `server/src/routes/team.js`
Routes publiques de l'équipe (`/api/team/`).
- `GET /` — liste tous les membres triés par `order_index` (cache 1 heure)

#### `server/src/routes/contact.js`
Route du formulaire de contact (`/api/contact/`).
- `POST /` — enregistre un message en BDD
  - Valide : nom (max 150), email, sujet (max 300), message (10-5000 chars)
  - Insère en BDD
  - Envoie une notification email (non bloquant — ne fait pas échouer la requête)

#### `server/src/routes/admin.js`
Routes admin protégées (`/api/admin/`).
- Toutes les routes nécessitent `authenticate + requireAdmin`
- **Projets** : GET liste, POST créer, PUT modifier, DELETE supprimer
- **Services** : GET liste, PUT modifier
- **Équipe** : GET liste, POST créer, PUT modifier, DELETE supprimer
- **Blog** : GET liste, POST créer (génère un slug unique), PUT modifier, DELETE supprimer
- **Messages** : GET liste (filtrable), PUT marquer lu, DELETE supprimer
- **Stats** : GET statistiques (6 compteurs en parallel avec `Promise.all`)
- Les images sont reçues en JSON (URL Uploadthing), pas en FormData

---

### Utilitaires — `server/src/utils/`

#### `server/src/utils/email.js`
Service d'envoi d'emails via Nodemailer.
- Configure le transport SMTP (Gmail par défaut)
- `sendContactNotification()` — envoie un email à l'admin quand un message est reçu
- `sendContactAutoReply()` — envoie un accusé de réception à l'expéditeur

#### `server/src/utils/logger.js`
Utilitaire de logs.
- Logger simple avec niveaux : `info`, `warn`, `error`
- Préfixe horodaté pour chaque log

#### `server/src/utils/pagination.js`
Utilitaire de pagination.
- `getPaginationParams(query)` — extrait et valide `limit` et `offset` depuis les query params

#### `server/src/utils/slugify.js`
Utilitaire de génération de slugs.
- Convertit un titre en slug URL-friendly
- Remplace les espaces par des tirets, supprime les caractères spéciaux

---

## Fichiers de Configuration Racine

#### `docker-compose.yml`
Configuration Docker pour le développement local.
- Service `postgres` : PostgreSQL 16 Alpine
  - Port : 5432
  - Base de données : `bk_engineering`
  - Volume persistant `postgres_data`
- Service `pgadmin` : interface web pour gérer la BDD
  - Port : 8080 → http://localhost:8080

#### `start-all.bat`
Script Windows pour démarrer tous les services.
- Ouvre deux fenêtres CMD :
  1. Backend Express (`npm run dev` dans `server/`)
  2. Frontend Next.js (`npm run start` dans `client/`)
- Affiche les URLs et identifiants après le démarrage

#### `.gitignore`
Fichiers exclus du dépôt Git.
- `node_modules/`, `.next/`, `dist/`
- Fichiers `.env` (secrets)
- Dossier `uploads/` (images locales)
- Fichiers OS (`.DS_Store`, `Thumbs.db`)

---

## Flux de Données

```
Navigateur
    │
    ├─► Next.js (Vercel)
    │       ├─ Pages publiques → API publiques
    │       └─ Pages admin → API admin (avec JWT)
    │
    ├─► Express.js (Render)
    │       ├─ Authentification (JWT)
    │       ├─ CRUD (PostgreSQL via pg)
    │       └─ Contact (Nodemailer)
    │
    ├─► PostgreSQL (Supabase)
    │       └─ 6 tables : users, services, projects, team_members, blog_posts, contact_messages
    │
    └─► Uploadthing
            └─ Stockage CDN des images uploadées depuis l'admin
```

---

*Document généré le 6 juin 2026*
