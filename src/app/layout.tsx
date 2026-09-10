import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hassle Free Home Services',
    description: 'Home management, preventative maintenance, and concierge services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
