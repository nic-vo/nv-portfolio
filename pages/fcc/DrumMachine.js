import React from 'react'
import { DrumMachineComp } from '../../components/fcc/drummachine';
import { ProjectLayout } from '../../components/global';

const DrumMachine = () => {
	return (
		<ProjectLayout>
			<DrumMachineComp />
			<section>
				<p>
					Description blurb + link to codepen
				</p>
			</section>
		</ProjectLayout>
	);
};

export default DrumMachine;
