import fs from 'fs/promises';
import path from 'path';

const keypadChars = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

type DrumMachineSoundList = {
	[key in (typeof keypadChars)[number]]: DrumMachineSound;
};

type DrumMachineSound = {
	name: string;
	path: string;
};

export type DrumMachineProps = {
	banks: string[];
	soundList: DrumMachineSoundList[];
};

const getBankNames = async () => {
	// return array of dirnames in public assets drummachine folder
	const targetdir = path.join(
		process.cwd(),
		'src',
		'app',
		'(projects)',
		'@interactive',
		'other',
		'DrumMachine',
		'_components',
		'assets',
	);
	const banks = await (async () => {
		const jsons = await fs.readdir(targetdir);
		return jsons
			.map((str) => str.replace(/.json$/, ''))
			.filter((name) => /\.ts$/.test(name) === false);
	})();
	return {
		banks,
		numberOfBanks: banks.length - 1,
	};
};

const getSoundList = async (allBanks: string[]) => {
	console.log(allBanks);
	// Return an array where each bank name
	const soundsWithPaths = await Promise.all(
		allBanks.map(async (bank) => {
			// Is used to construct a new dir path
			const midStr = [
				'src',
				'app',
				'(projects)',
				'@interactive',
				'other',
				'DrumMachine',
				'_components',
				'assets',
			];
			const dir = path.join(process.cwd(), ...midStr);
			// To a dir containing a json file that
			const target = path.join(dir, bank.concat('.json'));
			const jsonRaw = await fs.readFile(target, 'utf8');
			// Is read and parsed into a JS object
			const listjson = await JSON.parse(jsonRaw);
			// Init return obj
			return Object.keys(listjson).reduce((returner, current) => {
				const baseUrl = ''.concat(
					process.env.CLOUDFRONT_URL as string,
					'/DrumMachine/',
					`${bank}/`,
				);
				const fileName = listjson[current] as string;
				const fileUrl = baseUrl.concat(
					`${fileName.replaceAll(' ', '+')}`,
					'.mp3',
				);
				let newer = { ...returner };
				newer[current] = { path: fileUrl, name: fileName };
				return newer;
			}, {} as DrumMachineSoundList);
		}),
	);
	return soundsWithPaths;
};

const getDrumMachineProps = async (): Promise<DrumMachineProps> => {
	const bankList = await getBankNames();
	const { banks } = bankList;
	const soundList = await getSoundList(banks);
	return {
		banks,
		soundList,
	};
};

export default getDrumMachineProps;
