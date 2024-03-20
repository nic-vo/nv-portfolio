import { PropsWithChildren } from 'react';
import { overpassClass } from '@/styles/fonts';

import '@/styles/globals.css';

const RootLayout = (props: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body className={overpassClass}>{props.children}</body>
		</html>
	);
};

export default RootLayout;
