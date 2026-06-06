# Guide de Déploiement — BK Engineering Group

Ce document décrit toutes les étapes suivies pour mettre le projet en ligne.

---

## Stack Technique

| Composant | Service | URL |
|-----------|---------|-----|
| Frontend (Next.js 14) | Vercel | https://bk-engineering-nine.vercel.app |
| Backend (Express.js) | Render | *(à configurer)* |
| Base de données (PostgreSQL) | Supabase | *(à configurer)* |
| Upload d'images | Uploadthing | https://uploadthing.com |
| Code source | GitHub | https://github.com/kananijospin63/bk-engineering-group |

---

## Étape 1 — Préparation du Code Source

### 1.1 Initialisation du dépôt Git
```bash
git init
git config user.email "kananijospin63@gmail.com"
git config user.name "kananijospin63"
git add .
git commit -m "feat: BK Engineering Group — site full-stack Next.js + Express + PostgreSQL"
```

### 1.2 Création du dépôt GitHub
1. Aller sur https://github.com/new
2. Nom du dépôt : `bk-engineering-group`
3. Laisser **Public**
4. Ne pas cocher README ni .gitignore
5. Cliquer **Create repository**

### 1.3 Push vers GitHub
```bash
git remote add origin https://github.com/kananijospin63/bk-engineering-group.git
git branch -M main
git push -u origin main
```

> **Note :** Un Personal Access Token GitHub a été utilisé pour l'authentification.  
> Créer un token sur : https://github.com/settings/tokens/new (scope : `repo`)

---

## Étape 2 — Upload d'Images avec Uploadthing

Cloudinary ne fonctionnant pas facilement depuis le Burundi, **Uploadthing** a été choisi comme alternative.

### 2.1 Création du compte
1. Aller sur https://uploadthing.com
2. S'inscrire avec le compte GitHub
3. Créer une application : `bk-engineering`
4. Copier le `UPLOADTHING_TOKEN`

### 2.2 Intégration dans le projet
- Installation : `npm install uploadthing @uploadthing/react`
- Route API créée : `client/src/app/api/uploadthing/`
- Composant `ImageUpload` créé dans `client/src/components/admin/`
- Les pages admin (projets, équipe, blog, services) utilisent maintenant Uploadthing
- Le backend reçoit les URLs d'images en JSON (plus de FormData)

### 2.3 Variable d'environnement
```env
UPLOADTHING_TOKEN=eyJhcGlLZXkiOiJza19saXZlX2...
```

---

## Étape 3 — Déploiement Frontend sur Vercel

### 3.1 Import du projet
1. Aller sur https://vercel.com/new
2. Cliquer **Import Git Repository**
3. Sélectionner `kananijospin63/bk-engineering-group`

### 3.2 Configuration importante
| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `client` |
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` (auto) |
| **Output Directory** | `.next` (auto) |

### 3.3 Variables d'environnement Vercel
| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | `https://votre-backend.onrender.com/api` |
| `NEXT_PUBLIC_SITE_URL` | `https://bk-engineering-nine.vercel.app` |
| `UPLOADTHING_TOKEN` | *(token Uploadthing)* |

### 3.4 Problèmes rencontrés et solutions

| Erreur | Cause | Solution |
|--------|-------|----------|
| `404: NOT_FOUND` | Root Directory non configuré | Définir Root Directory = `client` |
| `No Next.js version detected` | `vercel.json` mal placé | Supprimer le `vercel.json` racine |
| `Secret does not exist` | `vercel.json` référençait des secrets inexistants | Supprimer `client/vercel.json` |
| `FormData not assignable to Record<string, string>` | Pages admin utilisaient FormData | Remplacer FormData par objets JSON simples |
| `Project already exists` | Nom de projet déjà utilisé | Utiliser un nom différent |

### 3.5 URL finale
**https://bk-engineering-nine.vercel.app**

---

## Étape 4 — Déploiement Backend sur Render *(à faire)*

### 4.1 Création du service
1. Aller sur https://render.com
2. **New Web Service** → connecter GitHub
3. Sélectionner `kananijospin63/bk-engineering-group`

### 4.2 Configuration
| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | `server` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/index.js` |

### 4.3 Variables d'environnement Render
```env
NODE_ENV=production
PORT=10000
DB_HOST=        # Depuis Supabase
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=    # Mot de passe Supabase
DB_NAME=postgres
JWT_SECRET=     # Chaîne aléatoire longue
JWT_EXPIRES_IN=7d
SUPABASE_URL=   # URL du projet Supabase
SUPABASE_SERVICE_KEY=  # service_role key
SUPABASE_BUCKET=bk-engineering
CLIENT_URL=https://bk-engineering-nine.vercel.app
CONTACT_EMAIL=patikanblaiskeem@gmail.com
```

### 4.4 Après le déploiement
Dans le Shell Render, exécuter :
```bash
node src/db/migrate.js
node src/db/seed.js
```

---

## Étape 5 — Base de Données Supabase *(à faire)*

### 5.1 Création du projet
1. Aller sur https://supabase.com
2. **New Project** → noter Host, Password, Database name
3. Aller dans **Settings → Database** → copier la Connection string

### 5.2 Bucket Storage pour les images
1. **Storage** → **New bucket**
2. Nom : `bk-engineering`
3. Cocher **Public bucket** ✅
4. **Settings → API** → copier `SUPABASE_URL` et `service_role` key

---

## Étape 6 — Mise à jour de `NEXT_PUBLIC_API_URL` *(à faire)*

Une fois Render déployé :
1. Aller sur Vercel → projet `bk-engineering` → **Settings → Environment Variables**
2. Modifier `NEXT_PUBLIC_API_URL` avec l'URL Render :
   ```
   https://bk-engineering-api.onrender.com/api
   ```
3. **Redeploy** le frontend

---

## Identifiants Admin (à changer en production)

| Champ | Valeur |
|-------|--------|
| Email | `admin@bkengineering.com` |
| Mot de passe | `Admin@2024` |

> ⚠️ **Changez ces identifiants immédiatement après le premier déploiement.**

---

## Commandes Utiles

```bash
# Développement local
cd server && npm run dev      # Backend sur http://localhost:5000
cd client && npm run dev      # Frontend sur http://localhost:3000

# Ou tout en une fois
./start-all.bat               # Windows

# Base de données
cd server && npm run migrate  # Créer les tables
cd server && npm run seed     # Insérer les données initiales

# Production locale
cd client && npm run build    # Compiler
cd client && npm run start    # Démarrer en mode production
```

---

*Document généré le 6 juin 2026*
