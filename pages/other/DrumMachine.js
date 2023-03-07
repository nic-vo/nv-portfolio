import Head from 'next/head';
import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { DrumMachine } from '../../components/fcc';
import { ProjectLayout } from '../../components/global';

import getDrumMachineProps from '../../lib/props/fcc/DrumMachine/DrumMachine';

const DrumMachinePage = ({ banks, numberOfBanks, soundList, layoutData, projectData }) => {
	const { slugline, title } = projectData;
	return (<>
		<Head>
			<title>{title}</title>
			<meta name='description' content={slugline} />
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
	const { banks, numberOfBanks, soundList } = drumMachineProps;
	const layoutFetch = await Promise.all([await getProjectLists({ dataTypes: ['title'] }), await getVersionNumber(), await getProjectData({
		category: 'other',
		project: 'DrumMachine',
		types: ['title',
			'slugline',
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
