import Head from 'next/head';
import { BlockBuildersGC } from '../../components/professional';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';

const BBGC = ({ layoutData, projectData }) => {
	return (<>
		<Head>
			<title>Block Builders General Construction</title>
			<meta name='description' content='A page summarizing my progress in developing an online presence for Block Builders General Contracting, Inc.' />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<BlockBuildersGC />
		</ProjectLayout>
	</>)
}

export default BBGC;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'featured',
		project: 'BlockBuildersGC',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'BlockBuildersGC'
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
