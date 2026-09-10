import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { put } from '@vercel/blob';

const uploadsDir = path.join(process.cwd(), 'uploads');

async function ensureUploadsDir() {
    await fs.mkdir(uploadsDir, { recursive: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        await ensureUploadsDir();

        const formData = await import('formidable');
        const { IncomingForm } = formData;

        const form = new IncomingForm({
            multiples: false,
            keepExtensions: true,
            uploadDir: uploadsDir,
            filename(name, ext, part, form) {
                const safeName = String(name || 'upload').replace(/\s+/g, '-').toLowerCase();
                const cleanExt = ext || '';
                return `${safeName}-${randomUUID()}${cleanExt}`;
            }
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve([fields, files]);
            });
        });

        const file = files.file || files.File || files.upload;
        const target = Array.isArray(file) ? file[0] : file;

        if (!target) {
            return res.status(400).json({ success: false, error: 'No se recibió ningún archivo.' });
        }

        const mimeType = target.mimetype || 'application/octet-stream';
        const isAllowed = mimeType.startsWith('image/') || mimeType.startsWith('video/');

        if (!isAllowed) {
            return res.status(400).json({ success: false, error: 'Solo se permiten imágenes y videos.' });
        }

        const fileBuffer = await fs.readFile(target.filepath);

        const blob = await put(`uploads/${path.basename(target.filepath)}`, fileBuffer, {
            access: 'public',
            addRandomSuffix: false,
            contentType: mimeType,
        });

        await fs.unlink(target.filepath).catch(() => { });

        return res.status(200).json({
            success: true,
            url: blob.url,
            filename: path.basename(target.filepath),
            mimeType,
            type: mimeType.startsWith('video/') ? 'video' : 'image'
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'No se pudo procesar el archivo.'
        });
    }
}
