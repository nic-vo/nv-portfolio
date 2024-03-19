import fs from 'fs';
import path from 'path';

export const getVersionNumber = async (): Promise<string> => {
	// Read package.json
	const filePath = path.join(process.cwd(), 'package.json');
	const text = await fs.promises.readFile(filePath, 'utf-8');
	const obj = await JSON.parse(text) as { version: string };
	return obj.version;
};
