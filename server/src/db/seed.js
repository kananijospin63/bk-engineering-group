require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const pool = require('./connection');

async function seed() {
  try {
    // ─── Admin ────────────────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash('Admin@2024', 12);
    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, 'admin')
       ON CONFLICT (email) DO NOTHING`,
      ['Ir. Akeem Kanani Blaise', 'admin@bkengineering.com', hashedPassword]
    );

    // ─── Services ─────────────────────────────────────────────────────────────
    const services = [
      {
        title: 'Conception Architecturale & Aménagement',
        description: "Nous offrons des services complets de conception architecturale, incluant la planification intérieure et extérieure, la modélisation 3D, et le suivi de chantier. Notre équipe crée des espaces fonctionnels et esthétiques adaptés aux besoins de chaque client.",
        short_description: "Conception architecturale complète, planification intérieure/extérieure et modélisation 3D.",
        icon: 'building',
        order_index: 1,
      },
      {
        title: "Systèmes d'Irrigation & Drainage",
        description: "Conception et installation de systèmes d'irrigation et de drainage efficaces pour l'agriculture, les zones urbaines et les infrastructures. Nous utilisons des technologies modernes pour optimiser la gestion de l'eau.",
        short_description: "Systèmes d'irrigation et drainage pour agriculture et infrastructures urbaines.",
        icon: 'droplets',
        order_index: 2,
      },
      {
        title: 'Topographie de Haute Précision',
        description: "Services de topographie utilisant des équipements de pointe (GPS différentiel, stations totales, drones) pour des relevés précis. Idéal pour les projets de construction, l'aménagement du territoire et les études géotechniques.",
        short_description: "Relevés topographiques précis avec GPS différentiel, stations totales et drones.",
        icon: 'map',
        order_index: 3,
      },
      {
        title: 'Réhabilitation & Rénovation de Bâtiments',
        description: "Expertise en réhabilitation structurelle et rénovation de bâtiments existants. Nous évaluons l'état des structures, proposons des solutions de renforcement et supervisons les travaux.",
        short_description: "Réhabilitation structurelle et rénovation complète de bâtiments existants.",
        icon: 'wrench',
        order_index: 4,
      },
    ];

    for (const s of services) {
      await pool.query(
        `INSERT INTO services (title, description, short_description, icon, order_index)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [s.title, s.description, s.short_description, s.icon, s.order_index]
      );
    }

    // ─── Équipe ───────────────────────────────────────────────────────────────
    // Supprime les anciens membres pour repartir propre
    await pool.query(`DELETE FROM team_members`);

    const team = [
      {
        name: 'Ir. Akeem Kanani Blaise',
        role: 'Gérant',
        bio: "Fondateur et Gérant de BK Engineering Group. Ingénieur multidisciplinaire avec plus de 15 ans d'expérience dans le génie civil, l'architecture et la gestion de projets d'infrastructure en RDC.",
        photo: '/images/equipes/equipe-akeem.jpeg',
        order_index: 1,
      },
      {
        name: 'Ir. Dallas',
        role: 'Directeur Technique',
        bio: "Directeur Technique de BK Engineering Group. Responsable de la supervision technique de tous les projets, il garantit la conformité aux normes d'ingénierie et la qualité des réalisations.",
        photo: '/images/equipes/equipe-dallas.jpeg',
        order_index: 2,
      },
      {
        name: 'Ir. Joachim',
        role: 'Directeur Technique',
        bio: "Directeur Technique de BK Engineering Group. Expert en conception et en planification, il pilote les études techniques et assure l'excellence opérationnelle sur les chantiers.",
        photo: '/images/equipes/equipe-joachim.jpeg',
        order_index: 3,
      },
    ];

    for (const m of team) {
      await pool.query(
        `INSERT INTO team_members (name, role, bio, photo, order_index)
         VALUES ($1, $2, $3, $4, $5)`,
        [m.name, m.role, m.bio, m.photo, m.order_index]
      );
    }

    // ─── Projets ──────────────────────────────────────────────────────────────
    // Supprime les anciens projets pour repartir propre
    await pool.query(`DELETE FROM projects`);

    const projects = [
      {
        title: 'Construction Centre de Santé de Référence',
        description: "Construction complète d'un centre de santé moderne incluant salles de consultation, bloc opératoire, maternité et pharmacie pour desservir plus de 5 000 habitants.",
        category: 'Génie Civil',
        location: 'Goma, Nord-Kivu',
        year: 2023,
        client: 'ONG Santé Plus',
        featured_image: '/images/img1.jpeg',
        status: 'completed',
      },
      {
        title: "Réseau d'Irrigation Agricole Masisi",
        description: "Conception et installation d'un réseau d'irrigation couvrant 120 hectares de terres agricoles pour améliorer la productivité et la sécurité alimentaire de la région.",
        category: 'Irrigation',
        location: 'Masisi, Nord-Kivu',
        year: 2023,
        client: 'Coopérative Agricole du Nord-Kivu',
        featured_image: '/images/img2.jpeg',
        status: 'completed',
      },
      {
        title: 'Réhabilitation Pont Routier Stratégique',
        description: "Réhabilitation structurelle d'un pont stratégique reliant deux zones rurales, renforçant les échanges commerciaux et l'accès aux services de base pour 12 000 personnes.",
        category: 'Travaux Publics',
        location: 'Kanyabayonga, Nord-Kivu',
        year: 2022,
        client: 'Gouvernement Provincial',
        featured_image: '/images/img3.jpeg',
        status: 'completed',
      },
      {
        title: 'Complexe Résidentiel Moderne',
        description: "Conception architecturale et supervision de la construction d'un complexe résidentiel de 24 logements avec espaces verts, parking souterrain et équipements communautaires.",
        category: 'Architecture',
        location: 'Goma, Nord-Kivu',
        year: 2023,
        client: 'Promoteur Immobilier KIBALI',
        featured_image: '/images/img4.jpeg',
        status: 'completed',
      },
      {
        title: 'Levé Topographique Zone Minière',
        description: "Relevés topographiques de haute précision sur une superficie de 450 hectares à l'aide de drones et GPS différentiel pour le compte d'une société minière internationale.",
        category: 'Topographie',
        location: 'Walikale, Nord-Kivu',
        year: 2024,
        client: 'Mining Resources DRC',
        featured_image: '/images/img7.jpeg',
        status: 'ongoing',
      },
    ];

    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (title, description, category, location, year, client, featured_image, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [p.title, p.description, p.category, p.location, p.year, p.client, p.featured_image, p.status]
      );
    }

    // ─── Blog ─────────────────────────────────────────────────────────────────
    await pool.query(`DELETE FROM blog_posts`);

    const posts = [
      {
        title: "L'Ingénierie Durable au Cœur du Développement Congolais",
        slug: 'ingenierie-durable-developpement-congolais',
        excerpt: "Comment BK Engineering Group intègre les principes du développement durable dans chaque projet pour construire un Congo résilient et prospère.",
        content: "<p>BK Engineering Group place la durabilité au centre de chaque projet. Nos solutions techniques s'adaptent aux réalités locales tout en respectant les standards internationaux.</p><h2>Notre Approche</h2><p>Chaque projet commence par une analyse approfondie des besoins locaux, des contraintes environnementales et des ressources disponibles. Cette approche nous permet de livrer des infrastructures qui durent et servent les communautés sur le long terme.</p>",
        category: 'Ingénierie',
        thumbnail: '/images/img5.jpeg',
        author: 'Ir. Akeem Kanani Blaise',
      },
      {
        title: 'Formation Technique : Investir dans la Jeunesse Congolaise',
        slug: 'formation-technique-jeunesse-congolaise',
        excerpt: "Notre programme de formation technique a permis à plus de 50 jeunes ingénieurs de démarrer leur carrière.",
        content: "<p>L'avenir du développement de la RDC repose sur la formation d'une nouvelle génération d'ingénieurs qualifiés. BK Engineering Group s'engage dans cette mission depuis sa création.</p><h2>Impact</h2><p>En cinq ans, nous avons formé plus de 50 jeunes professionnels, dont 80% travaillent aujourd'hui dans le secteur du génie civil en RDC.</p>",
        category: 'Formation',
        thumbnail: '/images/img6.jpeg',
        author: 'Ir. Dallas',
      },
      {
        title: 'Topographie par Drone : La Révolution des Relevés de Terrain',
        slug: 'topographie-drone-revolution-relevas-terrain',
        excerpt: "L'intégration des drones dans nos opérations topographiques a transformé notre capacité à cartographier des zones difficiles d'accès.",
        content: "<p>Les drones équipés de caméras haute résolution et de capteurs LiDAR révolutionnent la topographie moderne. Chez BK Engineering Group, nous avons intégré cette technologie dans nos opérations quotidiennes.</p><h2>Avantages</h2><p>Précision centimétrique, réduction des délais de 70%, accès aux zones difficiles — les drones transforment notre façon de travailler.</p>",
        category: 'Technologie',
        thumbnail: '/images/img7.jpeg',
        author: 'Ir. Joachim',
      },
      {
        title: 'Irrigation et Sécurité Alimentaire en Nord-Kivu',
        slug: 'irrigation-securite-alimentaire-nord-kivu',
        excerpt: "Les projets d'irrigation que nous réalisons contribuent directement à améliorer la sécurité alimentaire de milliers de familles.",
        content: "<p>Le Nord-Kivu dispose d'un potentiel agricole immense. Nos systèmes d'irrigation modernes permettent aux agriculteurs de cultiver toute l'année, indépendamment des saisons.</p>",
        category: 'Ingénierie',
        thumbnail: '/images/img8.jpeg',
        author: 'Ir. Akeem Kanani Blaise',
      },
      {
        title: "Réhabilitation d'Infrastructures : Enjeux et Méthodes",
        slug: 'rehabilitation-infrastructures-enjeux-methodes',
        excerpt: "La réhabilitation des bâtiments et infrastructures existants représente un défi technique majeur.",
        content: "<p>Réhabiliter une infrastructure existante est souvent plus complexe que construire du neuf. Notre équipe maîtrise les techniques d'évaluation structurelle et de renforcement adaptées au contexte congolais.</p>",
        category: 'Architecture',
        thumbnail: '/images/img9.jpeg',
        author: 'Ir. Dallas',
      },
      {
        title: 'Normes de Construction en RDC : État des Lieux',
        slug: 'normes-construction-rdc-etat-lieux',
        excerpt: "Un regard sur les normes de construction en vigueur en RDC et les efforts pour aligner nos pratiques sur les standards internationaux.",
        content: "<p>La RDC dispose d'un cadre réglementaire en matière de construction qui évolue progressivement. BK Engineering Group s'engage à respecter et promouvoir les meilleures pratiques du secteur.</p>",
        category: 'Actualités',
        thumbnail: '/images/img10.jpeg',
        author: 'Ir. Joachim',
      },
    ];

    for (const post of posts) {
      await pool.query(
        `INSERT INTO blog_posts (title, slug, content, excerpt, category, thumbnail, author, published, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW())
         ON CONFLICT (slug) DO NOTHING`,
        [post.title, post.slug, post.content, post.excerpt, post.category, post.thumbnail, post.author]
      );
    }

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
