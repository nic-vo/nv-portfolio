import { Footer } from './_components/layout';
import {
	silkscreenClass,
	overpassClass,
	poppinsClass,
	latoClass,
	jbMonoClass,
} from '@/styles/fonts';
import Script from 'next/script';
import { sharedRobots } from '@/data/metadata';

import { PropsWithChildren } from 'react';

import '@/styles/globals.css';

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
