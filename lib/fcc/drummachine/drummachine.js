import fs from 'fs';
import path from 'path';

export const getBankNames = () => {
	// return array of dirnames in public assets drummachine folder
	const targetdir = path.join(process.cwd(), "public", "assets", "fcc", "DrumMachine");
	const banks = fs.readdirSync(targetdir);
	return {
		banks,
		numberOfBanks: banks.length - 1
	};
};

export const getSoundList = (allBanks) => {
	// Return an array where each bank name
	return allBanks.map(bank => {
		// Is used to construct a new dir name
		const midStr = ["assets", "fcc", "DrumMachine", bank];
		const dir = path.join(process.cwd(), "public", ...midStr);
		// Containing a json file that
		const target = path.join(dir, "soundlist.json");
		// Is read and parsed into a JS object
		const listjson = JSON.parse(fs.readFileSync(target, 'utf-8'));
		// Init return obj
		const returnObj = {}
		// For each key in the parsed json obj, add new property to return obj
		//
		Object.keys(listjson).forEach(char => {
			returnObj[char] = {
				name: listjson[char],
				path: "/" + path.join(...midStr, listjson[char]).replaceAll(/\\+/g, "/") + ".mp3"
			}
		});
		return returnObj;
	});
};
