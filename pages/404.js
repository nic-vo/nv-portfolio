import Link from 'next/link';
import Head from 'next/head';
import { Duckies } from '../components/homepage';
import { FaArrowLeft } from 'react-icons/fa';

import fourLook from '../styles/404.module.scss';
import homeLook from '../components/homepage/Homepage.module.scss';

const custom404 = () => {
	return (
		<>
			<Head>
				<title>404 - Oops!</title>
			</Head>

			<main className={fourLook.container}>
				<h1 className={homeLook.hTwo}>404: Not Found.</h1>
				<Link href='/'><FaArrowLeft /><p>Back to home</p></Link>
				<p className={fourLook.blurb}>
					You didn&apos;t find what you were looking for,
					but you found the ducks. Say hi.
				</p>
				<Duckies />
			</main>
		</>
	);
};

export default custom404;
