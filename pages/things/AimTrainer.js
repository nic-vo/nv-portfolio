import Head from 'next/head';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';
import { AimTrainer } from '../../components/personal';
import { Wip } from '../../components/global';

const AimTrainerPage = ({ layoutData, projectData }) => {
	return (<>
		<Head>
			<title>An Aim Trainer</title>
			<meta name='description' content="An aim trainer that's really only suited for 2d games like osu!" />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			{/* <AimTrainer /> */}
			<Wip />
		</ProjectLayout>
	</>);
};

export default AimTrainerPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'things',
		project: 'AimTrainer',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'AimTrainer'
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
