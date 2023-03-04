import Head from 'next/head';
import { PortfolioSite } from '../../components/professional';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';

const BBGC = ({ layoutData, projectData }) => {
	const { slugline, title } = projectData;
	return (<>
		<Head>
			<title>{title}</title>
			<meta name='description' content={slugline} />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<PortfolioSite />
		</ProjectLayout>
	</>)
}

export default BBGC;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'featured',
		project: 'PortfolioSite',
		types: ['title',
			'slugline',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'PortfolioSite'
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