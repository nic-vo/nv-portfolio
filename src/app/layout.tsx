import { Footer } from './_components/layout';
import {
	overpassClass,
	poppinsClass,
	latoClass,
	jbMonoClass,
	silkscreenClass,
} from '@/styles/fonts';
import { sharedRobots } from '@/data/metadata';

import { PropsWithChildren } from 'react';

import '@/styles/globals.css';

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
