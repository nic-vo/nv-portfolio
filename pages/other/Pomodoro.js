import Head from 'next/head';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';
import { Pomodoro } from '../../components/fcc';

const PomodoroPage = ({ layoutData, projectData }) => {
	return (<>
		<Head>
			<title>A Pomodoro Timer</title>
			<meta name='description' content="A React Pomodoro Timer completed for freeCodeCamp's frontend certificate" />
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<Pomodoro />
		</ProjectLayout>
	</>);
};

export default PomodoroPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'other',
		project: 'Pomodoro',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Pomodoro'
	};
	const projectData = layoutFetch[2];
	return {
		props: {
			layoutData,
			projectData
		},
		revalidate: 172800
	};
};
