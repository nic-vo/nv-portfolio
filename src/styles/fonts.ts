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
	variable: '--font-overpass',
});

export const poppinsClass = Poppins({
	weight: ['700'],
	subsets: ['latin-ext'],
	display: 'swap',
	variable: '--font-poppins',
});

export const latoClass = Lato({
	weight: ['100', '300', '400', '700', '900'],
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-lato',
});

export const jbMonoClass = JetBrains_Mono({
	weight: 'variable',
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-jbmono',
});

export const silkscreenClass = Silkscreen({
	weight: '400',

	subsets: ['latin'],
	display: 'swap',
	variable: '--font-silkscreen',
});
