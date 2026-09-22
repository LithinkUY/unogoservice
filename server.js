import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = neon('postgresql://neondb_owner:npg_Xo2rfLKC1Vsa@ep-orange-math-b4kcdvlt-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

const app = express();
const PORT = Number(process.env.PORT || 3001);
const uploadsDir = path.join(__dirname, 'public', 'uploads');
const distDir = path.join(__dirname, 'dist');

await fs.mkdir(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        try {
            await fs.mkdir(uploadsDir, { recursive: true });
            cb(null, uploadsDir);
        } catch (error) {
            cb(error, uploadsDir);
        }
    },
    filename: (_req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, '-').toLowerCase();
        const ext = path.extname(safeName);
        const base = path.basename(safeName, ext);
        const unique = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        cb(null, `${base}-${unique}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    fileFilter: (_req, file, cb) => {
        const allowed = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');
        if (!allowed) {
            return cb(new Error('Solo se permiten imágenes y videos.'));
        }
        cb(null, true);
    }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, message: 'backend-active' });
});

// Neon DB Routes for local backend
app.get('/api/config', async (req, res) => {
    try {
        await sql`CREATE TABLE IF NOT EXISTS cms_config (id TEXT PRIMARY KEY, config JSONB NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        const result = await sql`SELECT config FROM cms_config WHERE id = 'main' LIMIT 1`;
        if (result.length > 0) {
            return res.status(200).json({ success: true, config: result[0].config });
        }
        return res.status(200).json({ success: true, config: null });
    } catch (e) {
        console.error('Neon DB Error:', e);
        return res.status(500).json({ success: false, error: e.message });
    }
});

app.post('/api/config', async (req, res) => {
    try {
        const { config } = req.body;
        if (!config) return res.status(400).json({ success: false, error: 'Config missing' });
        await sql`CREATE TABLE IF NOT EXISTS cms_config (id TEXT PRIMARY KEY, config JSONB NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`
            INSERT INTO cms_config (id, config, updated_at) 
            VALUES ('main', ${config}::jsonb, CURRENT_TIMESTAMP)
            ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config, updated_at = CURRENT_TIMESTAMP
        `;
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error('Neon DB Error:', e);
        return res.status(500).json({ success: false, error: e.message });
    }
});

app.post('/api/upload', (req, res, next) => {
    upload.single('file')(req, res, (error) => {
        if (error) {
            return next(error);
        }

        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No se recibió ningún archivo.' });
        }

        const isVideo = req.file.mimetype.startsWith('video/');
        const publicUrl = `${process.env.PUBLIC_URL || 'http://localhost:3001'}/uploads/${req.file.filename}`;

        res.json({
            success: true,
            url: publicUrl,
            filename: req.file.filename,
            mimeType: req.file.mimetype,
            type: isVideo ? 'video' : 'image'
        });
    });
});

app.use('/uploads', express.static(uploadsDir));

app.use(express.static(distDir));

app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
        return next();
    }

    const indexPath = path.join(distDir, 'index.html');
    res.sendFile(indexPath, (error) => {
        if (error) {
            console.error('Error serving frontend:', error);
            res.status(500).json({ success: false, error: 'Unable to serve frontend bundle.' });
        }
    });
});

app.use((error, _req, res, _next) => {
    console.error('Upload error:', error);
    res.status(400).json({
        success: false,
        error: error.message || 'No se pudo procesar el archivo.'
    });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
