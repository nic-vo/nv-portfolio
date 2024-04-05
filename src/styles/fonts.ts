import {
	Overpass,
	Lato,
	Poppins,
	JetBrains_Mono,
	Silkscreen,
} from 'next/font/google';

export const overpassClass = Overpass({
	subsets: ['latin-ext'],
	display: 'swap',
	weight: 'variable',
	fallback: ['sans-serif'],
	variable: '--font-overpass',
});

export const poppinsClass = Poppins({
	weight: ['700'],
	subsets: ['latin-ext'],
	display: 'swap',
	fallback: ['sans-serif'],
	variable: '--font-poppins',
});

export const latoClass = Lato({
	weight: ['100', '300', '400', '700', '900'],
	display: 'swap',
	subsets: ['latin-ext'],
	fallback: ['serif'],
	variable: '--font-lato',
});

export const jbMonoClass = JetBrains_Mono({
	weight: 'variable',
	fallback: ['monospace'],
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-jbmono',
});

export const silkscreenClass = Silkscreen({
	weight: '400',
	fallback: ['monospace'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-silkscreen',
});
