import { promises as fs } from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';
import { DEFAULT_SITE_CONTENT } from '@/data/content';
import { SiteContent } from '@/types';

const CONTENT_FILE = path.join(process.cwd(), 'src/data/site-content.json');

async function readFileContent(): Promise<SiteContent> {
    try {
        const raw = await fs.readFile(CONTENT_FILE, 'utf-8');
        return JSON.parse(raw) as SiteContent;
    } catch {
        await fs.writeFile(CONTENT_FILE, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), 'utf-8');
        return DEFAULT_SITE_CONTENT;
    }
}

async function writeFileContent(content: SiteContent): Promise<void> {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export async function loadPersistedSiteContent(): Promise<SiteContent> {
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl) {
        try {
            const sql = neon(databaseUrl);

            await sql`
        CREATE TABLE IF NOT EXISTS site_content (
          key TEXT PRIMARY KEY,
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

            const rows = (await sql`
        SELECT content FROM site_content WHERE key = 'hasslefree-home'
      `) as Array<{ content: SiteContent }>;

            if (rows.length > 0 && rows[0]?.content) {
                return rows[0].content;
            }

            await sql`
        INSERT INTO site_content (key, content)
        VALUES ('hasslefree-home', ${JSON.stringify(DEFAULT_SITE_CONTENT)})
        ON CONFLICT (key) DO NOTHING
      `;

            return DEFAULT_SITE_CONTENT;
        } catch {
            return readFileContent();
        }
    }

    return readFileContent();
}

export async function savePersistedSiteContent(content: SiteContent): Promise<void> {
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl) {
        try {
            const sql = neon(databaseUrl);

            await sql`
        CREATE TABLE IF NOT EXISTS site_content (
          key TEXT PRIMARY KEY,
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

            await sql`
        INSERT INTO site_content (key, content, updated_at)
        VALUES ('hasslefree-home', ${JSON.stringify(content)}, NOW())
        ON CONFLICT (key)
        DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      `;
            return;
        } catch {
            // fallback to file storage if Neon is unavailable
        }
    }

    await writeFileContent(content);
}
