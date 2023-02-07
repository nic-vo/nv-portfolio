import fs from 'fs';
import path from 'path';

export const getPageData = async ({ category, page, types }) => {
	// Returns specified data from a JSON file related to the page
	let returner = { title: page };
	const dataPath = path.join(process.cwd(), 'data', category, `${page}.json`);
	const fileContent = await fs.promises.readFile(dataPath, 'utf8');
	const pageData = JSON.parse(fileContent);
	types.forEach((type) => {
		returner[type] = pageData[type];
	});
	return returner;
};

export const getCategoryPages = async ({ category }) => {
	// Returns the pages availabel for a specific category within the pages dir
	const categoryDir = path.join(process.cwd(), 'pages', category);
	const pages = await fs.promises.readdir(categoryDir);
	const pagesFiltered = pages.map((page) => { return page.replace(/\.js$/, '') });
	return { category, pages: pagesFiltered };
};

export const getCategories = async () => {
	// Returns the categories with in the pages dir
	const pagesDir = path.join(process.cwd(), 'pages');
	const categories = await fs.promises.readdir(pagesDir);
	// Only return routes that are within categories
	return categories.filter((item) => { return item.indexOf('.js') === -1 }).filter((item) => { return item.indexOf('api') === -1 });
};

export const getProjectLists = async () => {
	const categories = await getCategories();
	const pagesPerCategory = await Promise.all(categories.map(async (category) => {
		const categoryPages = await getCategoryPages({ category });
		return categoryPages;
	}));
	const pagesPerCategoryWithData = await Promise.all(pagesPerCategory.map(async (category) => {
		const categoryName = category.category;
		const pagesWithData = await Promise.all(category.pages.map(async (page) => {
			const pageData = await getPageData({ category: category.category, page, types: ['techs'] });
			return pageData;
		}));
		return {
			categoryName,
			pages: pagesWithData
		};
	}));
	return pagesPerCategoryWithData;
};
