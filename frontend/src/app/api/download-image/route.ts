import { NextRequest } from 'next/server';

function safeFilename(name: string) {
    return name.replace(/[\\/\0\r\n:<>|"*?]/g, '').slice(0, 200) || 'download';
}

export async function GET(req: NextRequest) {
    const urlParam = req.nextUrl.searchParams.get('url');
    const nameParam = req.nextUrl.searchParams.get('name');
    if (!urlParam) return new Response('Missing url', { status: 400 });

    const upstream = await fetch(urlParam, { cache: 'force-cache' });
    if (!upstream.ok || !upstream.body) {
        return new Response('Failed to fetch image', { status: upstream.status || 500 });
    }

    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const filename = safeFilename(nameParam || 'image');

    return new Response(upstream.body, {
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
            'Cache-Control': 'public, max-age=31536000, immutable'
        }
    });
}
