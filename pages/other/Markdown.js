import Head from 'next/head';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { Markdown } from '../../components/fcc/markdown';
import { ProjectLayout } from '../../components/global';

const MarkdownPage = ({ layoutData, projectData }) => {
	return (
		<>
			<Head>
				<title>A Markdown Parser</title>
				<meta name='description' content="A React markdown previewer completed for freeCodeCamp's frontend certificate" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<ProjectLayout layoutData={layoutData} projectData={projectData}>
				<Markdown />
			</ProjectLayout>
		</>
	);
};

export default MarkdownPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'other',
		project: 'Markdown',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Markdown'
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
