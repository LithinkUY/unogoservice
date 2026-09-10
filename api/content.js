import fs from 'fs/promises';
import path from 'path';
import { neon } from '@neondatabase/serverless';

const DEFAULT_CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'site-content.json');

async function readDefaultContent() {
    try {
        const raw = await fs.readFile(DEFAULT_CONTENT_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return {
            company: {
                name: 'Hassle Free Home Services',
                phone: '(866) 88-HASSLE',
                phoneHref: 'tel:8668842775',
                emergency: '24/7 Emergency Dispatch',
                tagline: 'Your home, handled.',
                location: 'Serving MD, DC, VA, CT, GA, FL, IL & MA',
                footerBlurb: 'Founded in 2003, Hassle Free Home Services is the premier residential preventative maintenance and home concierge management company in the United States. Your home, handled.'
            },
            home: {
                hero: {
                    eyebrow: 'Proactive Home Care',
                    title: 'Your Home, Handled.',
                    subtitle: 'Proactive seasonal maintenance, routine handyman repairs, and full-service project management. One dedicated, background-checked W-2 technician. Zero contractor headaches.',
                    primaryCta: 'Schedule Complimentary Walkthrough',
                    secondaryCta: 'Calculate Your Plan',
                    zipPlaceholder: 'Enter your zip code (e.g. 20854, 22101, 06880)'
                }
            },
            gallery: [],
            pages: {
                services: {
                    id: 'services',
                    title: 'Our Services',
                    subtitle: 'Preventative care and project support designed for busy households.',
                    intro: 'We help homeowners stay ahead of maintenance issues through recurring visits, expert repairs, and hands-on project management.',
                    sections: []
                },
                story: {
                    id: 'story',
                    title: 'Our Story',
                    subtitle: 'A local company built around trust, care, and doing things properly.',
                    intro: 'Hassle Free began with a simple idea: homeowners deserve a reliable partner to proactively maintain and improve their homes without the stress of managing contractors.',
                    sections: []
                },
                locations: {
                    id: 'locations',
                    title: 'Locations',
                    subtitle: 'Regional service hubs with dedicated local field teams.',
                    intro: 'We serve homeowners across major metropolitan areas with local dispatch teams that understand the specific needs of each region.',
                    sections: []
                },
                faq: {
                    id: 'faq',
                    title: 'FAQs',
                    subtitle: 'Helpful answers for members and new homeowners.',
                    intro: 'From technician expectations to membership details, these answers help you understand how our service works and what to expect.',
                    sections: []
                },
                careers: {
                    id: 'careers',
                    title: 'Careers',
                    subtitle: 'Join the team that helps homeowners feel supported every day.',
                    intro: 'We seek dependable, service-minded professionals who care about doing quality work and delivering a great customer experience.',
                    sections: []
                }
            }
        };
    }
}

export default async function handler(req, res) {
    const databaseUrl = process.env.DATABASE_URL;
    const defaultContent = await readDefaultContent();

    if (req.method === 'GET') {
        if (!databaseUrl) {
            return res.status(200).json(defaultContent);
        }

        try {
            const sql = neon(databaseUrl);

            await sql`
        CREATE TABLE IF NOT EXISTS site_content (
          key TEXT PRIMARY KEY,
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

            const rows = await sql`
        SELECT content FROM site_content WHERE key = 'hasslefree-home'
      `;

            if (rows.length > 0 && rows[0]?.content) {
                return res.status(200).json(rows[0].content);
            }

            await sql`
        INSERT INTO site_content (key, content)
        VALUES ('hasslefree-home', ${JSON.stringify(defaultContent)})
        ON CONFLICT (key) DO NOTHING
      `;

            return res.status(200).json(defaultContent);
        } catch (error) {
            console.error('Failed to fetch content from database:', error);
            return res.status(200).json(defaultContent);
        }
    }

    if (req.method === 'POST') {
        if (!databaseUrl) {
            return res.status(500).json({
                success: false,
                error: 'DATABASE_URL no está configurada. Agrega la variable de entorno en Vercel para que el contenido se guarde.'
            });
        }

        try {
            const body = req.body ?? {};
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
        VALUES ('hasslefree-home', ${JSON.stringify(body)}, NOW())
        ON CONFLICT (key)
        DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      `;

            return res.status(200).json({ success: true, data: body });
        } catch (error) {
            console.error('Failed to save content to database:', error);
            return res.status(500).json({
                success: false,
                error: 'No se pudo guardar el contenido en la base de datos.'
            });
        }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
}
