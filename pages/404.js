import Link from 'next/link';
import { Duckies } from '../components/homepage';
import { FaArrowLeft } from 'react-icons/fa';

import fourLook from '../styles/404.module.scss';
import homeLook from '../components/homepage/Homepage.module.scss';

const custom404 = () => {
	return (
		<section className={fourLook.container}>
			<h1 className={homeLook.hTwo}>404: Not Found.</h1>
			<Link href='/'><FaArrowLeft /><p>Back to home</p></Link>
			<p className={fourLook.blurb}>You didn't find what you were looking for, but you found the ducks. Say hi.</p>
			<Duckies />
		</section>
	);
};

export default custom404;
