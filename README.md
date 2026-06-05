# BK Engineering Group — Full-Stack Website

A professional full-stack website for **BK Engineering Group**, a multidisciplinary engineering company based in Goma, Nord-Kivu, DRC.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MySQL |
| Auth | JWT |
| Images | Cloudinary |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
bk-engineering/
├── client/          # Next.js frontend
└── server/          # Express.js backend
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL >= 8
- Cloudinary account
- npm or yarn

---

### Backend Setup (`/server`)

1. Navigate to the server directory:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=bk_engineering
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLIENT_URL=http://localhost:3000
   ```

3. Create the MySQL database and run migrations:
   ```bash
   mysql -u root -p -e "CREATE DATABASE bk_engineering;"
   npm run migrate
   ```

4. Seed the database with initial data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`.

---

### Frontend Setup (`/client`)

1. Navigate to the client directory:
   ```bash
   cd client
   npm install
   ```

2. Create a `.env.local` file based on `.env.example`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

---

## Admin Dashboard

Access the admin panel at `/admin/login`.

Default credentials (change after first login):
- Email: `admin@bkengineering.com`
- Password: `Admin@2024`

---

## Deployment

### Backend → Render

1. Push the `/server` folder to a GitHub repo
2. Create a new Web Service on Render
3. Set environment variables in Render dashboard
4. Deploy

### Frontend → Vercel

1. Push the `/client` folder to a GitHub repo
2. Import project on Vercel
3. Set `NEXT_PUBLIC_API_URL` to your Render backend URL
4. Deploy

---

## API Endpoints

### Public
- `GET /api/projects` — List all projects
- `GET /api/projects/:id` — Single project
- `GET /api/services` — List all services
- `GET /api/blog` — List all blog posts
- `GET /api/blog/:id` — Single blog post
- `GET /api/team` — List team members
- `POST /api/contact` — Submit contact form

### Admin (JWT required)
- `POST /api/auth/login` — Admin login
- `POST /api/auth/logout` — Logout
- `CRUD /api/admin/projects` — Manage projects
- `CRUD /api/admin/blog` — Manage blog posts
- `CRUD /api/admin/services` — Manage services
- `CRUD /api/admin/team` — Manage team members
- `GET /api/admin/messages` — View contact messages
