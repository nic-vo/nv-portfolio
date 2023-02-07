import Head from 'next/head';
import { getCategoryPages, getPageData } from "../../lib/props/homepage/projects";
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';
import { PomodoroComp } from '../../components/fcc/pomodoro';

const Pomodoro = ({ layoutData, pageData }) => {
	return (<>
		<Head>
			<title>A Pomodoro Timer</title>
			<meta name="description" content="A React Pomodoro Timer completed for freeCodeCamp's frontend certificate" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ProjectLayout layoutData={layoutData} pageData={pageData}>
			<PomodoroComp />

		</ProjectLayout>
	</>);
};

export default Pomodoro;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getCategoryPages({ category: 'fcc' }), await getVersionNumber(), await getPageData({
		category: 'fcc',
		page: 'Pomodoro',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherPages: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Pomodoro'
	};
	const pageData = layoutFetch[2];
	return {
		props: {
			layoutData,
			pageData
		},
		revalidate: 172800
	};
};
