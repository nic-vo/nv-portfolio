import fs from 'fs';
import path from 'path';

const getBankNames = async () => {
	// return array of dirnames in public assets drummachine folder
	const targetdir = path.join(process.cwd(), 'public', 'assets', 'fcc', 'DrumMachine');
	const banks = await fs.promises.readdir(targetdir);
	return {
		banks,
		numberOfBanks: banks.length - 1
	};
};

const getSoundList = async (allBanks) => {
	// Return an array where each bank name
	const soundsWithPaths = await Promise.all(allBanks.map(async (bank) => {
		// Is used to construct a new dir name
		const midStr = ['assets', 'fcc', 'DrumMachine', bank];
		const dir = path.join(process.cwd(), 'public', ...midStr);
		// Containing a json file that
		const target = path.join(dir, 'soundlist.json');
		const jsonRaw = await fs.promises.readFile(target, 'utf8');
		// Is read and parsed into a JS object
		const listjson = JSON.parse(jsonRaw);
		// Init return obj
		const returnObj = {}
		// For each key in the parsed json obj, add new property to return obj
		//
		Object.keys(listjson).forEach(char => {
			returnObj[char] = {
				name: listjson[char],
				path: '/' + path.join(...midStr, listjson[char]).replaceAll(/\\+/g, '/') + '.mp3'
			}
		});
		return returnObj;
	}));
	return soundsWithPaths
};

const getDrumMachineProps = async () => {
	const bankList = await getBankNames();
	const { banks, numberOfBanks } = bankList
	const soundList = await getSoundList(bankList.banks);
	return {
		banks,
		numberOfBanks,
		soundList
	}
}

export default getDrumMachineProps;
