import Head from 'next/head';
import { getCategoryProjects, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { DrumMachine } from '../../components/fcc/DrumMachine/';
import { ProjectLayout } from '../../components/global';

import getDrumMachineProps from '../../lib/props/fcc/DrumMachine/DrumMachine';

const DrumMachinePage = ({ banks, numberOfBanks, soundList, layoutData, projectData }) => {
	return (<>
		<Head>
			<title>A Drum Machine</title>
			<meta name='description' content="A React drum machine completed for freeCodeCamp's frontend certificate" />
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<DrumMachine banks={banks} numberOfBanks={numberOfBanks} soundList={soundList} />
		</ProjectLayout>
	</>);
};

export default DrumMachinePage;

export async function getStaticProps() {
	const drumMachineProps = await getDrumMachineProps();
	const { banks, numberOfBanks, soundList } = drumMachineProps
	const layoutFetch = await Promise.all([await getCategoryProjects({ category: 'fcc' }), await getVersionNumber(), await getProjectData({
		category: 'fcc',
		project: 'DrumMachine',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'DrumMachine'
	};
	const projectData = layoutFetch[2];
	return {
		props: {
			banks,
			numberOfBanks,
			soundList,
			layoutData,
			projectData
		},
		revalidate: 172800
	};
};
