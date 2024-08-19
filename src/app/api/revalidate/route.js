import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');

    // Check for secret to confirm this is a valid request
    if (secret !== '123') {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    try {
        // Revalidate the path
        await request.revalidate(path);
        return NextResponse.json({ message: `Revalidated ${path}` }, { status: 200 });
    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
