import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const sql = neon('postgresql://neondb_owner:npg_Xo2rfLKC1Vsa@ep-orange-math-b4kcdvlt-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
    
    // Crear la tabla si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS cms_config (
        id TEXT PRIMARY KEY,
        config JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    if (req.method === 'GET') {
      const result = await sql`SELECT config FROM cms_config WHERE id = 'main' LIMIT 1`;
      if (result.length > 0) {
        return res.status(200).json({ success: true, config: result[0].config });
      } else {
        return res.status(200).json({ success: true, config: null });
      }
    } 
    
    if (req.method === 'POST') {
      const { config } = req.body;
      if (!config) {
        return res.status(400).json({ success: false, error: 'Config missing' });
      }
      
      await sql`
        INSERT INTO cms_config (id, config, updated_at) 
        VALUES ('main', ${config}::jsonb, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config, updated_at = CURRENT_TIMESTAMP
      `;
      
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Neon DB Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
