import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
