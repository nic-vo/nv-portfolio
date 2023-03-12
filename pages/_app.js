import Head from 'next/head';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head >
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
