import fs from 'fs';
import path from 'path';
import getDrumMachineProps from '../fcc/drummachine/drummachine';

import { ProjectData, ProjectDataTypes } from '../types/projects';

export const getProjectLists = async (dataTypes: ProjectDataTypes[]) => {
	const categories = ['featured', 'other'] as [
		'other' | 'featured', 'other' | 'featured'];

	const projectsPerCategory = await Promise.all(
		categories.map(
			async category => await getCategoryProjects(category)
		));

	const projectsPerCategoryWithData = await Promise.all(
		projectsPerCategory.map(
			async category => {
				const categoryName = category.category;
				const projectsWithData = await Promise.all(
					category.projects.map(
						async project => {
							return await getProjectData({
								category: categoryName,
								project,
								types: dataTypes
							})
						}));

				return {
					categoryName,
					projects: projectsWithData
				}
			}));

	return projectsPerCategoryWithData;
}

export const getCategoryProjects = async (category: 'other' | 'featured') => {
	// Returns the pages available for a specific category within the pages dir
	// const categoryDir = path.join(process.cwd(), 'pages', category);
	// Returns the pages available for a specific category within the components dir
	const catIndex = await fs.promises.readFile(
		path.join(process.cwd(), 'components', category, 'index.js'), 'utf-8'
	);
	const exportStr = catIndex.match(/export \{[^}]*\}/);
	if (exportStr === null) throw 'Prop error: category projects';
	const projects = exportStr[0].replace('export {', '')
		.replace('}', '')
		.split(',')
		.map(str => str.trim());
	// const projects = unfilteredProjects.filter((project) => { return project !== 'index.js' });
	// Return files with .js suffix removed
	// return { category, projects: projects.map((item) => { return item.replace('.js', ''); }) };
	// Return files (hopefully named identical to dir)
	return { category, projects };
}

export const getProjectData = async (args: {
	category: 'other' | 'featured',
	project: string,
	types: ProjectDataTypes[]
}): Promise<ProjectData> => {
	// Returns specified data from a JSON file related to the page
	// Init returner
	const { category, project, types } = args;
	let returner = { project, category } as ProjectData;
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
			returner['description'] = dPurify.sanitize(
				marked.parse(mdFile), { USE_PROFILES: { html: true } }
			);
		} else if (type === 'optional') {
			if (project === 'DrumMachine') {
				returner['optional'] = await getDrumMachineProps();
			} else returner['optional'] = null;
		} else {
			returner[type] = projectData[type];
		};
		return null;
	}));
	return returner;
}
