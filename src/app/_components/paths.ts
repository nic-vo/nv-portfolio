import { cache } from 'react';
import { promises as fs } from 'fs';
import path from 'path';

const getPaths = async (segments: string[]) => {
	const fullPath = path.join(process.cwd(), ...segments);
	const root = segments.pop() ?? 'random';
	const [dirs, titles] = await Promise.all([
		fs.readdir(fullPath),
		await (async () => {
			const file = await fs.readFile(
				path.join(process.cwd(), 'src', 'data', 'linkTitles.json'),
				{ encoding: 'utf-8' },
			);
			return JSON.parse(file) as Record<string, Record<string, string>>;
		})(),
	]);
	const filtered = dirs.filter((segment) => {
		return (
			/^\(/.test(segment) === false &&
			/^\_/.test(segment) === false &&
			/\.((png)|(webp)|(jpg)|(ico)|(tsx)|(ts)|(js)|(jsx)|(jpg))$/.test(
				segment,
			) === false
		);
	});
	return {
		root,
		pages: filtered.map((page) => {
			return {
				segment: page,
				title: titles[root][page] ?? page,
			};
		}),
	};
};

export const getFeaturedPaths = cache(
	async () => await getPaths(['src', 'app', '(projects)', 'featured']),
);
export const getOtherPaths = cache(
	async () => await getPaths(['src', 'app', '(projects)', 'other']),
);
