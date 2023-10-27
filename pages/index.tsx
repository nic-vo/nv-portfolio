import Head from 'next/head';
import Footer from '@components/global/misc/Footer/Footer';
import { AboutMe, Hero, Nav } from '@components/homepage';

import { getProjectLists } from '@lib/props/homepage/projects';
import { getVersionNumber } from '@lib/props/homepage/homepage';

import homeLook from '@components/homepage/Homepage.module.scss';
import { ProjectListProp } from '@lib/props/types/projects';

const Home = (props: { projectList: ProjectListProp[], version: string }) => {
	const { projectList, version } = props;
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
			</Head>

			<main className={homeLook.main}>
				<Hero />
				<AboutMe />
				<Nav projectList={projectList} />
			</main>
			<Footer version={version} />
		</>
	);
};

export default Home;

export async function getStaticProps() {
	const projectList = await getProjectLists(['title', 'wip']);
	const version = await getVersionNumber();
	return {
		props: {
			projectList,
			version
		}
	};
};
