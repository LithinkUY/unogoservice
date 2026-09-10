import { NextRequest, NextResponse } from 'next/server';
import { loadPersistedSiteContent, savePersistedSiteContent } from '@/lib/content-store';

export async function GET() {
    const content = await loadPersistedSiteContent();
    return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        await savePersistedSiteContent(body);
        return NextResponse.json({ success: true, data: body });
    } catch {
        return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
}
