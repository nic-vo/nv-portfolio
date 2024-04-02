import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function OPTIONS(
	request: NextRequest,
	{ params: { homeprop } }: { params: { homeprop: string } },
) {
	// Check IP, origin, route
	const requestHeaders = new Headers(request.headers);
	const origin = requestHeaders.get('origin');
	const {
		HOMEPAGE_PROP_SAFE_ORIGIN: allowOrigin,
		NEXT_PUBLIC_HOMEPAGE_PROP_URL: obfus,
		HOOK_IP: allowIP,
	} = process.env;
	if (
		!allowIP ||
		request.ip !== allowIP ||
		!homeprop ||
		!obfus ||
		homeprop !== obfus ||
		!allowOrigin ||
		allowOrigin !== origin
	)
		return new Response('Server error', {
			status: 500,
		});
	return new Response('', {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': allowOrigin,
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Authorization',
		},
	});
}

export async function POST(
	request: NextRequest,
	{ params: { homeprop } }: { params: { homeprop: string } },
) {
	// Check IP, origin, route, auth header
	const requestHeaders = new Headers(request.headers);
	const origin = requestHeaders.get('origin');
	const authorization = requestHeaders.get('authorization')?.split(' ')[1];
	const {
		HOMEPAGE_PROP_SAFE_ORIGIN: allowOrigin,
		NEXT_PUBLIC_HOMEPAGE_PROP_URL: obfus,
		HOOK_IP: allowIP,
		NEXT_PUBLIC_HOMEPAGE_PROP_SECRET: secret,
	} = process.env;

	if (
		process.env.NODE_ENV !== 'development' &&
		(!allowIP ||
			request.ip !== allowIP ||
			!homeprop ||
			!obfus ||
			homeprop !== obfus ||
			!allowOrigin ||
			allowOrigin !== origin ||
			!authorization ||
			authorization !== secret)
	)
		return new Response('Server error', {
			status: 500,
		});

	await new Promise((r) => setTimeout(r, 3000));

	try {
		revalidateTag('hero-particle-coords');
	} catch {
		return new Response('Error revalidating', { status: 500 });
	}
	return new Response('Revalidated', { status: 201 });
}

export const dynamic = 'force-dynamic';
