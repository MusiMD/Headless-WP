// src/app/api/webhook/route.js (if using the new app directory)
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { slug } = await request.json();
        // Revalidate the page
        await revalidatePage(slug);
        return NextResponse.json({ message: `Page revalidated: ${slug}` }, { status: 200 });
    } catch (error) {
        console.error('Error revalidating page:', error);
        return NextResponse.json({ message: 'Error revalidating page' }, { status: 500 });
    }
}

// Revalidation function
async function revalidatePage(slug) {
    const response = await fetch(`https://headless-wp-fawn.vercel.app/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/slug`);
    
    if (!response.ok) {
        throw new Error(`Failed to revalidate page for slug: ${slug}`);
    }
    return response.json();
}
