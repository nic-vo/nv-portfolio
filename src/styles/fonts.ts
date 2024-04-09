import {
	Silkscreen,
	Overpass,
	Poppins,
	Lato,
	JetBrains_Mono,
} from 'next/font/google';

export const silkscreenClass = Silkscreen({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-silkscreen',
	fallback: ['ui-monospace', 'monospace', 'system-ui'],
	preload: true,
});

export const overpassClass = Overpass({
	subsets: ['latin-ext'],
	display: 'swap',
	variable: '--font-overpass',
	preload: true,
	fallback: ['serif', 'ui-serif', 'system-ui'],
});

export const poppinsClass = Poppins({
	weight: ['400', '600', '700'],
	subsets: ['latin-ext'],
	display: 'swap',
	variable: '--font-poppins',
	preload: true,
	fallback: ['sans-serif', 'ui-sans-serif', 'system-ui'],
});

export const latoClass = Lato({
	weight: ['300', '400', '700'],
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-lato',
	preload: true,
	fallback: ['sans-serif', 'ui-sans-serif', 'system-ui'],
});

export const jbMonoClass = JetBrains_Mono({
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-jbmono',
	preload: true,
	fallback: ['monospace', 'ui-monospace', 'system-ui'],
});
