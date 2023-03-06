import Head from 'next/head';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { Markdown } from '../../components/fcc/Markdown';
import { ProjectLayout } from '../../components/global';

const MarkdownPage = ({ layoutData, projectData }) => {

	const { title, slugline } = projectData;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={slugline} />
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
		category: 'featured',
		project: 'Markdown',
		types: ['title',
			'slugline',
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
