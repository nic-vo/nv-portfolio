import fs from 'fs';
import path from 'path';
import getDrumMachineProps from '../fcc/drummachine/drummachine';

export const getProjectLists = async ({ dataTypes }) => {
	const categories = await getCategories();

	const projectsPerCategory = await Promise.all(
		categories.map(async (category) => {
			const categoryProjects = await getCategoryProjects({ category });
			return categoryProjects;
		}));

	const projectsPerCategoryWithData = await Promise.all(
		projectsPerCategory.map(async (category) => {
			const categoryName = category.category;
			const projectsWithData = await Promise.all(
				category.projects.map(async (project) => {
					const projectsData = await getProjectData({
						category: categoryName,
						project,
						types: dataTypes
					});
					return projectsData;
				}));

			return {
				categoryName,
				projects: projectsWithData
			};
		}));

	return projectsPerCategoryWithData;
};

export const getCategories = async () => {
	// Returns the categories with in the pages dir
	// const projectsDir = path.join(process.cwd(), 'pages');
	// Returns the categories with in the components dir
	const projectsDir = path.join(process.cwd(), 'components');
	const categories = await fs.promises.readdir(projectsDir);
	// Only return routes that are within certain categories
	return categories.filter((item) => {
		if (item === 'other' || item === 'featured') {
			return true;
		};
		return false;
	});
};

export const getCategoryProjects = async ({ category }) => {
	// Returns the pages available for a specific category within the pages dir
	// const categoryDir = path.join(process.cwd(), 'pages', category);
	// Returns the pages available for a specific category within the components dir
	const catIndex = await fs.promises.readFile(
		path.join(process.cwd(), 'components', category, 'index.js'), 'utf-8'
	);
	const unfilteredProjects = [...catIndex.matchAll(/import { (\w+) }/g)];
	const projects = unfilteredProjects.map((matchArr) => {
		return matchArr[1];
	});
	// const projects = unfilteredProjects.filter((project) => { return project !== 'index.js' });
	// Return files with .js suffix removed
	// return { category, projects: projects.map((item) => { return item.replace('.js', ''); }) };
	// Return files (hopefully named identical to dir)
	return { category, projects };
};

export const getProjectData = async ({ category, project, types }) => {
	// Returns specified data from a JSON file related to the page
	// Init returner
	let returner = { project, category };
	// Read associated .json
	const dataPath = path.join(process.cwd(), 'data', category, 'json', `${project}.json`);
	const fileContent = await fs.promises.readFile(dataPath, 'utf-8');
	const projectData = JSON.parse(fileContent);
	await Promise.all(types.map(async (type) => {
		if (type === 'description') {
			// If description requested, parse associated .md
			const marked = require('marked');
			const dPurify = require('isomorphic-dompurify');
			const mdPath = path.join(process.cwd(),
				'data',
				category,
				'md',
				`${project}.md`);
			const mdFile = fs.readFileSync(mdPath, 'utf-8');
			returner[type] = dPurify.sanitize(
				marked.parse(mdFile), { USE_PROFILES: { html: true } }
			);
		} else if (type === 'optional') {
			if (project !== 'DrumMachine') { returner[type] = null }
			else {
				const dProps = await getDrumMachineProps();
				returner[type] = dProps;
			};
		} else {
			returner[type] = projectData[type];
		};
		return null;
	}));
	return returner;
};
