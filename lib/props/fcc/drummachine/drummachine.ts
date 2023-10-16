import { DrumMachineProps, DrumMachineSoundList } from '@lib/props/types/projects';
import fs from 'fs';
import path from 'path';

const getBankNames = async () => {
	// return array of dirnames in public assets drummachine folder
	const targetdir = path.join(
		process.cwd(),
		'public',
		'assets',
		'fcc',
		'DrumMachine');
	const banks = await fs.promises.readdir(targetdir);
	return {
		banks,
		numberOfBanks: banks.length - 1
	};
};

const getSoundList = async (allBanks: string[]) => {
	// Return an array where each bank name
	const soundsWithPaths = await Promise.all(allBanks.map(async (bank) => {
		// Is used to construct a new dir path
		const midStr = ['assets', 'fcc', 'DrumMachine', bank];
		const dir = path.join(process.cwd(), 'public', ...midStr);
		// To a dir containing a json file that
		const target = path.join(dir, 'soundlist.json');
		const jsonRaw = await fs.promises.readFile(target, 'utf8');
		// Is read and parsed into a JS object
		const listjson = await JSON.parse(jsonRaw);
		// Init return obj
		return Object.keys(listjson).reduce(
			(returner, current) => {
				const fileName = listjson[current] as string;
				const fileWithExt = fileName.concat('mp3');
				const filePath = '/' + path.join(...midStr, fileWithExt);
				let newer = { ...returner }
				newer[current] = { path: filePath, name: listjson[current] }
				return newer;
			}, {} as DrumMachineSoundList
		);
	}));
	return soundsWithPaths;
}

const getDrumMachineProps = async (): Promise<DrumMachineProps> => {
	const bankList = await getBankNames();
	const { banks, numberOfBanks } = bankList;
	const soundList = await getSoundList(banks);
	return {
		banks,
		numberOfBanks,
		soundList
	};
};

export default getDrumMachineProps;
