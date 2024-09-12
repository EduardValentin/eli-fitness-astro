import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    const body = await request.json();
    console.log('GET', body);
    return new Response(null, { status: 201 });
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    console.log('POST', body);
    return new Response(null, { status: 201 });
};
