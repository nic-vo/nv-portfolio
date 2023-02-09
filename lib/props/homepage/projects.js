import fs from 'fs';
import path from 'path';

export const getProjectData = async ({ category, project, types }) => {
	// Returns specified data from a JSON file related to the page
	let returner = { project: project };
	const dataPath = path.join(process.cwd(), 'data', category, `${project}.json`);
	const fileContent = await fs.promises.readFile(dataPath, 'utf8');
	const projectData = JSON.parse(fileContent);
	types.forEach((type) => {
		returner[type] = projectData[type];
	});
	return returner;
};

export const getCategoryProjects = async ({ category }) => {
	// Returns the pages availabel for a specific category within the pages dir
	const categoryDir = path.join(process.cwd(), 'components', category);
	const projects = await fs.promises.readdir(categoryDir);
	return { category, projects: projects.filter((item) => { return item.indexOf('.js') === -1 }) };
};

export const getCategories = async () => {
	// Returns the categories with in the pages dir
	const projectsDir = path.join(process.cwd(), 'components');
	const categories = await fs.promises.readdir(projectsDir);
	// Only return routes that are within categories
	return categories.filter((item) => {
		if (item === 'fcc' || item === 'personal' || item === 'professional') {
			return true;
		}
		return false;
	});
};

export const getProjectLists = async () => {
	const categories = await getCategories();
	const projectsPerCategory = await Promise.all(categories.map(async (category) => {
		const categoryProjects = await getCategoryProjects({ category });
		return categoryProjects;
	}));
	const projectsPerCategoryWithData = await Promise.all(projectsPerCategory.map(async (category) => {
		const categoryName = category.category;
		const projectsWithData = await Promise.all(category.projects.map(async (project) => {
			const projectsData = await getProjectData({ category: category.category, project, types: ['title', 'techs'] });
			return projectsData;
		}));
		return {
			categoryName,
			projects: projectsWithData
		};
	}));
	return projectsPerCategoryWithData;
};
