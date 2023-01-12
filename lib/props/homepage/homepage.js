import fs from 'fs';
import path from 'path';

export const getVersionNumber = () => {
	const filePath = path.join(process.cwd(), "README.md");
	const text = fs.readFileSync(filePath, 'utf-8');
	return { version: text.match(/\# \d+\.\d+\.\d+/)[0].replace(/\# /, "") };
};
