import { Overpass, Lato, Poppins } from 'next/font/google';

export const overpassClass = Overpass({
	subsets: ['latin-ext'],
	display: 'swap',
	weight: 'variable',
	fallback: ['sans-serif'],
}).className;

export const poppinsClass = Poppins({
	weight: ['700'],
	subsets: ['latin-ext'],
	display: 'swap',
	fallback: ['sans-serif'],
});

export const latoClass = Lato({
	weight: ['100', '300', '400', '700', '900'],
	display: 'swap',
	subsets: ['latin-ext'],
	fallback: ['serif'],
});
