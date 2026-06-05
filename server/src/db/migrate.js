require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { Client } = require('pg');

async function migrate() {
  // Se connecte directement à la base existante
  const client = new Client({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT || '5432'),
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'bkgroupe',
  });

  try {
    await client.connect();

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        email      VARCHAR(150) UNIQUE NOT NULL,
        password   VARCHAR(255) NOT NULL,
        role       VARCHAR(20) NOT NULL DEFAULT 'admin'
                     CHECK (role IN ('admin', 'editor')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id                SERIAL PRIMARY KEY,
        title             VARCHAR(200) NOT NULL,
        description       TEXT NOT NULL,
        short_description VARCHAR(500),
        image             VARCHAR(500),
        image_public_id   VARCHAR(300),
        icon              VARCHAR(100),
        order_index       INT DEFAULT 0,
        created_at        TIMESTAMPTZ DEFAULT NOW(),
        updated_at        TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id                       SERIAL PRIMARY KEY,
        title                    VARCHAR(200) NOT NULL,
        description              TEXT NOT NULL,
        category                 VARCHAR(100) NOT NULL,
        location                 VARCHAR(200),
        year                     INT,
        client                   VARCHAR(200),
        images                   JSONB,
        featured_image           VARCHAR(500),
        featured_image_public_id VARCHAR(300),
        status                   VARCHAR(20) NOT NULL DEFAULT 'completed'
                                   CHECK (status IN ('completed', 'ongoing', 'planned')),
        created_at               TIMESTAMPTZ DEFAULT NOW(),
        updated_at               TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Team members table
    await client.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id              SERIAL PRIMARY KEY,
        name            VARCHAR(150) NOT NULL,
        role            VARCHAR(200) NOT NULL,
        bio             TEXT,
        photo           VARCHAR(500),
        photo_public_id VARCHAR(300),
        email           VARCHAR(150),
        linkedin        VARCHAR(300),
        order_index     INT DEFAULT 0,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        updated_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Blog posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id                  SERIAL PRIMARY KEY,
        title               VARCHAR(300) NOT NULL,
        slug                VARCHAR(200) UNIQUE NOT NULL,
        content             TEXT NOT NULL,
        excerpt             TEXT,
        category            VARCHAR(100),
        thumbnail           VARCHAR(500),
        thumbnail_public_id VARCHAR(300),
        author              VARCHAR(150) DEFAULT 'BK Engineering',
        published           BOOLEAN DEFAULT FALSE,
        published_at        TIMESTAMPTZ,
        created_at          TIMESTAMPTZ DEFAULT NOW(),
        updated_at          TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Contact messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(150) NOT NULL,
        email       VARCHAR(150) NOT NULL,
        subject     VARCHAR(300) NOT NULL,
        message     TEXT NOT NULL,
        read_status BOOLEAN DEFAULT FALSE,
        received_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Performance indexes (IF NOT EXISTS is supported in PostgreSQL 9.5+)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_projects_category   ON projects (category)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_projects_status     ON projects (status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_contact_read        ON contact_messages (read_status)`);

    // Auto-update updated_at trigger function
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    for (const table of ['users', 'services', 'projects', 'team_members', 'blog_posts']) {
      await client.query(`
        DROP TRIGGER IF EXISTS trg_${table}_updated_at ON ${table};
        CREATE TRIGGER trg_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
      `);
    }

    console.log('✅ Database migration completed successfully');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
