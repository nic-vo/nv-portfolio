import { cache } from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import { getProjectInfo } from '../(projects)/_components/page/parts';

const getPaths = async (segments: string[]) => {
	const fullPath = path.join(process.cwd(), ...segments);
	const root = segments[segments.length - 1] ?? 'random';
	const dirs = await fs.readdir(fullPath);
	const filtered = dirs.filter((segment) => {
		return (
			/^\(/.test(segment) === false &&
			/^\_/.test(segment) === false &&
			/^\[/.test(segment) === false &&
			/\.((png)|(webp)|(jpg)|(ico)|(tsx)|(ts)|(js)|(jsx)|(jpg)|(json)|(module\.scss))$/.test(
				segment,
			) === false
		);
	});
	const segmentsWithData = await (async () => {
		return await Promise.all([
			...filtered.map(async (segment) => {
				const data = await getProjectInfo([root, segment]);
				return { segment, data };
			}),
		]);
	})();
	return {
		root,
		pages: segmentsWithData,
	};
};

export const getFeaturedPaths = cache(
	async () => await getPaths(['src', 'app', '(projects)', 'featured']),
);
export const getOtherPaths = cache(
	async () => await getPaths(['src', 'app', '(projects)', 'other']),
);
