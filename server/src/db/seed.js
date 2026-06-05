require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const pool = require('./connection');

async function seed() {
  try {
    // Admin user — ON CONFLICT DO NOTHING replaces INSERT IGNORE
    const hashedPassword = await bcrypt.hash('Admin@2024', 12);
    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, 'admin')
       ON CONFLICT (email) DO NOTHING`,
      ['Admin BK', 'admin@bkengineering.com', hashedPassword]
    );

    // Services
    const services = [
      {
        title: "Conception Architecturale & Aménagement",
        description: "Nous offrons des services complets de conception architecturale, incluant la planification intérieure et extérieure, la modélisation 3D, et le suivi de chantier. Notre équipe crée des espaces fonctionnels et esthétiques adaptés aux besoins de chaque client.",
        short_description: "Conception architecturale complète, planification intérieure/extérieure et modélisation 3D.",
        icon: 'building',
        order_index: 1,
      },
      {
        title: "Systèmes d'Irrigation & Drainage",
        description: "Conception et installation de systèmes d'irrigation et de drainage efficaces pour l'agriculture, les zones urbaines et les infrastructures. Nous utilisons des technologies modernes pour optimiser la gestion de l'eau et prévenir les inondations.",
        short_description: "Systèmes d'irrigation et drainage pour agriculture et infrastructures urbaines.",
        icon: 'droplets',
        order_index: 2,
      },
      {
        title: "Topographie de Haute Précision",
        description: "Services de topographie utilisant des équipements de pointe (GPS différentiel, stations totales, drones) pour des relevés précis. Idéal pour les projets de construction, l'aménagement du territoire et les études géotechniques.",
        short_description: "Relevés topographiques précis avec GPS différentiel, stations totales et drones.",
        icon: 'map',
        order_index: 3,
      },
      {
        title: "Réhabilitation & Rénovation de Bâtiments",
        description: "Expertise en réhabilitation structurelle et rénovation de bâtiments existants. Nous évaluons l'état des structures, proposons des solutions de renforcement et supervisons les travaux pour redonner vie à vos infrastructures.",
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

    // Team members
    const team = [
      { name: 'Ing. Bahati Kasereka', role: 'Directeur Général & Ingénieur Civil',  bio: "Fondateur de BK Engineering Group avec plus de 15 ans d'expérience en génie civil et gestion de projets d'infrastructure en RDC.", order_index: 1 },
      { name: 'Arch. Marie Zawadi',   role: 'Architecte en Chef',                   bio: "Architecte diplômée spécialisée en conception durable et architecture tropicale adaptée au contexte congolais.", order_index: 2 },
      { name: 'Ing. Jean-Pierre Muhindo', role: 'Ingénieur Topographe',             bio: "Expert en topographie de précision et systèmes d'information géographique (SIG) avec 10 ans d'expérience terrain.", order_index: 3 },
      { name: 'Ing. Esperance Nzigire',   role: 'Ingénieure en Énergie',            bio: "Spécialiste en énergies renouvelables et électrification rurale, engagée dans le développement énergétique de la région.", order_index: 4 },
    ];

    for (const m of team) {
      await pool.query(
        `INSERT INTO team_members (name, role, bio, order_index)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT DO NOTHING`,
        [m.name, m.role, m.bio, m.order_index]
      );
    }

    // Projects
    const projects = [
      { title: "Construction du Centre de Santé de Rutshuru", description: "Construction complète d'un centre de santé de 500m² incluant salles de consultation, maternité et laboratoire. Projet réalisé en partenariat avec une ONG internationale.", category: 'Génie Civil',     location: 'Rutshuru, Nord-Kivu',     year: 2023, client: 'Ministère de la Santé',        status: 'completed' },
      { title: "Système d'Irrigation Agricole de Masisi",     description: "Conception et installation d'un réseau d'irrigation couvrant 200 hectares de terres agricoles, bénéficiant à plus de 300 familles d'agriculteurs.",                          category: 'Irrigation',       location: 'Masisi, Nord-Kivu',        year: 2023, client: 'Coopérative Agricole COPAKI', status: 'completed' },
      { title: "Réhabilitation du Pont de Kanyabayonga",      description: "Réhabilitation structurelle d'un pont de 45 mètres de portée, renforcement des fondations et remplacement du tablier pour une capacité de charge accrue.",                    category: 'Travaux Publics',  location: 'Kanyabayonga, Nord-Kivu', year: 2022, client: 'Office des Routes',           status: 'completed' },
      { title: "Complexe Résidentiel Nyiragongo",             description: "Conception architecturale et supervision de la construction d'un complexe de 24 appartements modernes avec espaces verts et parking souterrain.",                             category: 'Architecture',     location: 'Goma, Nord-Kivu',         year: 2024, client: 'Promoteur Privé',            status: 'ongoing'   },
      { title: "Levé Topographique du Parc Industriel",       description: "Relevé topographique de précision sur 50 hectares pour l'implantation d'un parc industriel, incluant modélisation 3D du terrain et étude géotechnique.",                      category: 'Topographie',      location: 'Goma, Nord-Kivu',         year: 2023, client: 'Zone Économique Spéciale',   status: 'completed' },
      { title: "École Technique de Butembo",                  description: "Construction d'une école technique de 12 salles de classe avec ateliers pratiques, laboratoires informatiques et bibliothèque pour 600 élèves.",                              category: 'Génie Civil',      location: 'Butembo, Nord-Kivu',      year: 2022, client: 'Diocese de Butembo',         status: 'completed' },
    ];

    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (title, description, category, location, year, client, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [p.title, p.description, p.category, p.location, p.year, p.client, p.status]
      );
    }

    // Blog posts
    const posts = [
      {
        title: "L'Ingénierie Durable au Cœur du Développement de Goma",
        slug: 'ingenierie-durable-goma',
        content: `<p>La ville de Goma, nichée au bord du lac Kivu et aux pieds du volcan Nyiragongo, fait face à des défis uniques en matière de développement urbain.</p><h2>Les Défis Spécifiques de Goma</h2><p>La proximité du volcan Nyiragongo impose des contraintes géotechniques particulières. Les sols volcaniques, bien que fertiles, présentent des caractéristiques mécaniques qui nécessitent une expertise spécialisée pour toute construction.</p><h2>Notre Approche Durable</h2><p>L'ingénierie durable signifie concevoir des infrastructures qui résistent au temps, minimisent l'impact environnemental et servent les communautés locales sur le long terme.</p>`,
        excerpt: "Découvrez comment BK Engineering Group intègre les principes de durabilité dans ses projets à Goma, en tenant compte des défis géologiques uniques de la région.",
        category: 'Ingénierie',
        author: 'Ing. Bahati Kasereka',
      },
      {
        title: "Formation Technique : Investir dans la Jeunesse Congolaise",
        slug: 'formation-technique-jeunesse-congolaise',
        content: `<p>L'avenir du développement de la République Démocratique du Congo repose sur la formation d'une nouvelle génération d'ingénieurs et de techniciens qualifiés.</p><h2>Notre Programme de Formation</h2><p>Nous accueillons chaque année des stagiaires et jeunes diplômés dans nos équipes, leur offrant une expérience pratique sur des projets réels.</p><h2>Impact Mesurable</h2><p>En cinq ans d'activité, nous avons formé plus de 50 jeunes ingénieurs et techniciens, dont 80% ont trouvé un emploi dans le secteur de la construction en RDC.</p>`,
        excerpt: "BK Engineering Group investit dans la formation de la prochaine génération d'ingénieurs congolais à travers des programmes pratiques et du mentorat technique.",
        category: 'Formation',
        author: 'Arch. Marie Zawadi',
      },
      {
        title: "Innovations en Topographie : Le Drone au Service du Génie Civil",
        slug: 'innovations-topographie-drone-genie-civil',
        content: `<p>La révolution numérique transforme le secteur du génie civil, et la topographie n'échappe pas à cette transformation.</p><h2>Avantages des Relevés par Drone</h2><p>Les drones équipés de caméras haute résolution et de capteurs LiDAR permettent de réaliser des relevés topographiques en une fraction du temps nécessaire avec les méthodes traditionnelles.</p><h2>Applications Pratiques</h2><p>Chez BK Engineering Group, nous utilisons cette technologie pour les études de faisabilité, le suivi de chantier et la création de modèles numériques de terrain.</p>`,
        excerpt: "Comment BK Engineering Group utilise les drones et les technologies de pointe pour révolutionner les relevés topographiques en Nord-Kivu.",
        category: 'Technologie',
        author: 'Ing. Jean-Pierre Muhindo',
      },
    ];

    for (const post of posts) {
      await pool.query(
        `INSERT INTO blog_posts (title, slug, content, excerpt, category, author, published, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, TRUE, NOW())
         ON CONFLICT (slug) DO NOTHING`,
        [post.title, post.slug, post.content, post.excerpt, post.category, post.author]
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
