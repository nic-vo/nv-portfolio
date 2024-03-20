import {
	DrumMachineProps,
	DrumMachineSoundList,
} from "@/lib/props/types/projects";
import fs from "fs";
import path from "path";

const getBankNames = async () => {
	// return array of dirnames in public assets drummachine folder
	const targetdir = path.join(
		process.cwd(),
		"public",
		"assets",
		"fcc",
		"DrumMachine",
	);
	const banks = await (async () => {
		const jsons = await fs.promises.readdir(targetdir);
		return jsons.map((str) => str.replace(/.json$/, ""));
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
			const midStr = ["assets", "fcc", "DrumMachine"];
			const dir = path.join(process.cwd(), "public", ...midStr);
			// To a dir containing a json file that
			const target = path.join(dir, bank.concat(".json"));
			const jsonRaw = await fs.promises.readFile(target, "utf8");
			console.log(jsonRaw);
			// Is read and parsed into a JS object
			const listjson = await JSON.parse(jsonRaw);
			// Init return obj
			return Object.keys(listjson).reduce((returner, current) => {
				const baseUrl = "".concat(
					process.env.CLOUDFRONT_URL as string,
					"/DrumMachine/",
					`${bank}/`,
				);
				const fileName = listjson[current] as string;
				const fileUrl = baseUrl.concat(
					`${fileName.replaceAll(" ", "+")}`,
					".mp3",
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
