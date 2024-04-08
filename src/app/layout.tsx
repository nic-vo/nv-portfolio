import { Footer } from './_components/layout';
import { silkscreenClass } from '@/styles/fonts';
import { JetBrains_Mono, Lato, Overpass, Poppins } from 'next/font/google';
import Script from 'next/script';
import { sharedRobots } from '@/data/metadata';

import { PropsWithChildren } from 'react';

import '@/styles/globals.css';

const overpassClass = Overpass({
	subsets: ['latin-ext'],
	display: 'swap',
	variable: '--font-overpass',
	preload: true,
});

const poppinsClass = Poppins({
	weight: ['400', '700'],
	subsets: ['latin-ext'],
	display: 'swap',
	variable: '--font-poppins',
	preload: true,
});

const latoClass = Lato({
	weight: ['300', '400', '700'],
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-lato',
	preload: true,
});

const jbMonoClass = JetBrains_Mono({
	display: 'swap',
	subsets: ['latin-ext'],
	variable: '--font-jbmono',
	preload: true,
});

const reKey = process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY;

const RootLayout = (props: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body
				className={[
					overpassClass.variable,
					poppinsClass.variable,
					latoClass.variable,
					jbMonoClass.variable,
					silkscreenClass.variable,
					overpassClass.className,
					poppinsClass.className,
					latoClass.className,
					jbMonoClass.className,
					silkscreenClass.className,
					'font-overpass',
				].join(' ')}>
				<Script
					src={`https://www.google.com/recaptcha/api.js?render=${reKey}`}
					strategy='lazyOnload'
				/>
				{props.children}
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;

export const metadata = {
	metadataBase: new URL('https://nicvo.dev'),
	keywords: [
		'Front end',
		'React',
		'Next.js',
		'Full stack',
		'Developer',
		'TypeScript',
	],
	creator: 'Nicolas Vo',
	category: 'software',
	robots: sharedRobots,
};

export const revalidate = false;
