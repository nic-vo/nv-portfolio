import Head from 'next/head';
import { NextComponentType } from 'next';

import '../styles/globals.css';

const MyApp = (props: { Component:NextComponentType, pageProps: any }) => {
	return (
		<>
			<Head >
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<props.Component {...props.pageProps} />
		</>
	);
};

export default MyApp;
