import Head from 'next/head';
import { getCategoryProjects, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { Collatz } from '../../components/personal';
import { ProjectLayout } from '../../components/global';

const CollatzPage = ({ layoutData, projectData }) => {
	return (<>
		<Head>
			<title>A Collatz generator</title>
			<meta name='description' content="Input an int into this baby and it'll spit out how many steps it takes to reach 1 via Collatz" />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<Collatz />
		</ProjectLayout>
	</>)
}

export default CollatzPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getCategoryProjects({ category: 'personal' }), await getVersionNumber(), await getProjectData({
		category: 'personal',
		project: 'Collatz',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Collatz'
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
