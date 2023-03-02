import Head from 'next/head';
import Footer from '../components/global/misc/Footer/Footer';
import { getProjectLists } from '../lib/props/homepage/projects';
import { getVersionNumber } from '../lib/props/homepage/homepage';

import { Hero, Nav,  AboutMe } from '../components/homepage';

import homeLook from '../styles/Home.module.scss';

export default function Home({ projectList, version }) {

	return (
		<div className={homeLook.container}>
			<Head>
				<title>Dive in - Nicolas Vo</title>
				<meta name='description' content="Nicolas Vo's Portfolio" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={homeLook.main}>
				<Hero />
				<AboutMe />
				<Nav projectList={projectList} />
				<ContactForm />
			</main>
			<Footer version={version} />
		</div >
	);
};

export async function getStaticProps() {
	const projectList = await getProjectLists({ dataTypes: ['title', 'techs', 'wip'] });
	const version = await getVersionNumber();
	return {
		props: {
			projectList,
			version
		},
		revalidate: 3600
	};
};
