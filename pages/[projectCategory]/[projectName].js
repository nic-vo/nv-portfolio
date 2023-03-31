import Head from 'next/head';
import { ProjectLayout, ProjectContainer, ProjectInfo } from '../../components/global/layouts';

import {
	getCategories,
	getCategoryProjects,
	getProjectData,
	getProjectLists
} from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';

const ProjectPage = ({ layoutData, projectData, optionalProps }) => {
	const { title,
		description,
		techs,
		original,
		slugline,
		project,
		category } = projectData;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={slugline} />
				<meta property='og:description' content={slugline} />
				<meta
					property='og:image'
					content={`thumbs/${category}/${project}.png`} />
			</Head>

			<ProjectLayout layoutData={layoutData} key={`${category}-${project}`}>
				<ProjectContainer project={project} optionalProps={optionalProps} />
				<ProjectInfo
					title={title}
					description={description}
					techs={techs}
					original={original} />
			</ProjectLayout>
		</>
	);
};

export default ProjectPage;

export async function getStaticProps({ params }) {
	const { projectCategory, projectName } = params;
	const layoutFetch = await Promise.all([
		await getProjectLists({ dataTypes: ['title'] }),
		await getVersionNumber(),
		await getProjectData({
			category: projectCategory,
			project: projectName,
			types: ['title',
				'slugline',
				'description',
				'techs',
				'original',
				'optional']
		})]);
	return {
		props: {
			layoutData: {
				otherProjects: layoutFetch[0],
				version: layoutFetch[1],
				linkExclude: projectName
			},
			projectData: layoutFetch[2],
			optionalProps: layoutFetch[2]['optional']
		}
	};
};

export async function getStaticPaths() {
	const categories = await getCategories();
	const projectsInCategories = await Promise.all(
		categories.map(async (category) => {
			const categoryProjects = await getCategoryProjects({ category });
			return categoryProjects;
		}));
	let paths = [];
	projectsInCategories.forEach((category) => {
		category.projects.forEach((project) => {
			paths.push({
				params:
					{ projectCategory: category.category, projectName: project }
			});
		});
	});
	return {
		paths,
		fallback: false
	};
};
