import Head from 'next/head';
import { getCategoryPages, getPageData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { DrumMachineComp } from '../../components/fcc/drummachine';
import { ProjectLayout } from '../../components/global';

import { getBankNames, getSoundList } from '../../lib/props/fcc/drummachine/drummachine';

const DrumMachine = ({ banks, numberOfBanks, soundList, layoutData, pageData }) => {
	return (<>
		<Head>
			<title>A Drum Machine</title>
			<meta name='description' content="A React drum machine completed for freeCodeCamp's frontend certificate" />
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<ProjectLayout layoutData={layoutData} pageData={pageData}>
			<DrumMachineComp banks={banks} numberOfBanks={numberOfBanks} soundList={soundList} />
		</ProjectLayout>
	</>);
};

export default DrumMachine;

export async function getStaticProps() {
	const allBanks = await getBankNames();
	const soundList = await getSoundList(allBanks.banks);

	const layoutFetch = await Promise.all([await getCategoryPages({ category: 'fcc' }), await getVersionNumber(), await getPageData({
		category: 'fcc',
		page: 'DrumMachine',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherPages: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Calculator'
	};
	const pageData = layoutFetch[2];
	return {
		props: {
			banks: allBanks.banks,
			numberOfBanks: allBanks.numberOfBanks,
			soundList,
			layoutData,
			pageData
		},
		revalidate: 172800
	};
};
