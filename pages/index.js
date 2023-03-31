import Head from 'next/head';
import Footer from '../components/global/misc/Footer/Footer';
import { Hero, Nav } from '../components/homepage';

import { getProjectLists } from '../lib/props/homepage/projects';
import { getVersionNumber } from '../lib/props/homepage/homepage';

import homeLook from '../components/homepage/Homepage.module.scss';

const Home = ({ projectList, version }) => {
	return (
		<>
			<Head>
				<title>Nicolas Vo - Frontend Developer</title>
				<meta
					name='description'
					content="Nicolas Vo's personal front-end development portfolio" />
				<meta
					property='og:description'
					content="Nicolas Vo's personal front-end development portfolio" />
				<meta
					property='og:image'
					content='ogicon.png' />
					{/* IMPLEMENT TWITTER META */}
			</Head>

			<main className={homeLook.main}>
				<Hero />
				<Nav projectList={projectList} />
			</main>
			<Footer version={version} />
		</>
	);
};

export default Home;

export async function getStaticProps() {
	const projectList = await getProjectLists({
		dataTypes: [
			'title',
			'techs',
			'wip']
	});
	const version = await getVersionNumber();
	return {
		props: {
			projectList,
			version
		}
	};
};
