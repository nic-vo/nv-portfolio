import { Footer } from './_components/layout';
import { overpassClass } from '@/styles/fonts';
import { sharedRobots } from '@/data/metadata';

import { PropsWithChildren } from 'react';

import '@/styles/globals.css';

const RootLayout = (props: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body className={overpassClass.className}>
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
