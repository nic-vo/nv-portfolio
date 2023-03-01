import Head from 'next/head';
import { ProjectLayout } from '../../components/global';
import { Calculator } from '../../components/fcc/Calculator';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';

const CalculatorPage = ({ layoutData, projectData }) => {
	return (<>
		<Head>
			<title>A Calculator</title>
			<meta name='description' content="A React calculator completed for freeCodeCamp's frontend certificate" />
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<Calculator />
		</ProjectLayout>
	</>);
};

export default CalculatorPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'other',
		project: 'Calculator',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Calculator'
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
