import path from 'path';
import fs from 'fs/promises';
import { cache } from 'react';

const getPaths = async (segments: string[]) => {
	// Gets the child dirs/paths of a path separated in string[] of segments
	const cwd = process.cwd();
	const root = segments[segments.length - 1];
	const catPath = path.join(cwd, ...segments);
	try {
		const paths = (await fs.readdir(catPath)).filter((segment) => {
			return (
				/(.ico|.png|.jpg|.tsx|.ts|.jsx|.js)$/.test(segment) === false &&
				/^(_|\(|@)/.test(segment) === false
			);
		});
		const titleJson = JSON.parse(
			await (async () =>
				await fs.readFile(path.join(cwd, 'data', 'linkTitles.json'), {
					encoding: 'utf-8',
				}))(),
		) as Record<string, Record<string, string>>;

		const pages = paths.map((page) => {
			return { segment: page, title: titleJson[root][page] ?? 'Title missing' };
		});
		return { root, pages };
	} catch {
		return { root, pages: [] };
	}
};

export const getFeaturedPaths = cache(
	async () => await getPaths(['src', 'app', '(projects)', 'featured']),
);

export const getOtherPaths = cache(
	async () => await getPaths(['src', 'app', '(projects)', 'other']),
);
