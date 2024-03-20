import { Footer } from './_layoutcomponents_';
import { overpassClass } from '@/styles/fonts';

import { PropsWithChildren } from 'react';

import '@/styles/globals.css';

const RootLayout = (props: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body className={overpassClass}>
				{props.children}
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
