import fs from 'fs';
import path from 'path';

export const getProjectLists = () => {
	const targetdir = path.join(process.cwd(), "pages");
	const categories = fs.readdirSync(targetdir)
		.filter((item) => { return item.indexOf(".js") === -1 })
		.filter((item) => { return item.indexOf("api") === -1 });
	const pages = categories.map((category) => {
		const folder = fs.readdirSync(path.join(targetdir, category));
		return {
			category,
			pages: folder.map((page) => { return page.replace(/\.js$/, "") })
		};
	});
	return pages;
};
