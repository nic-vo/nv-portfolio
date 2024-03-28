import { DrumMachine, getDrumMachineProps } from './_components';

const DrumMachinePage = async () => {
	const assets = await getDrumMachineProps();

	return <DrumMachine assetInfo={assets} />;
};

export default DrumMachinePage;

export const metadata = {
	title: 'A Drum Machine',
};
