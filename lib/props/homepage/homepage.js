import fs from 'fs';
import path from 'path';

export const getVersionNumber = async () => {
	const filePath = path.join(process.cwd(), "README.md");
	const text = await fs.promises.readFile(filePath, 'utf-8');
	return text.match(/\# \d+\.\d+\.\d+/)[0].replace(/\# /, "");
};
