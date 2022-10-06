import React from 'react'
import { DrumMachineComp } from '../../components/fcc/drummachine';
import { ProjectLayout } from '../../components/global';

import { getBankNames, getSoundList } from '../../lib/fcc/drummachine/drummachine';

const DrumMachine = ({ banks, numberOfBanks, soundList }) => {
	return (
		<ProjectLayout>
			<DrumMachineComp banks={banks} numberOfBanks={numberOfBanks} soundList={soundList} />
			<section>
				<p>
					Description blurb + link to codepen
				</p>
			</section>
		</ProjectLayout>
	);
};

export default DrumMachine;

export async function getStaticProps() {
	const allBanks = getBankNames();
	const soundList = getSoundList(allBanks.banks);
	return {
		props: {
			banks: allBanks.banks,
			numberOfBanks: allBanks.numberOfBanks,
			soundList
		}
	};
};
