import { ProjectLayout } from '../../components/global';
import { Markdown } from '../../components/fcc';

import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';

const MarkdownPage = ({ layoutData, projectData }) => {
	return (
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<Markdown />
		</ProjectLayout>
	);
};

export default MarkdownPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([
		await getProjectLists({ dataTypes: ['title'] }),
		await getVersionNumber(),
		await getProjectData({
			category: 'featured',
			project: 'Markdown',
			types: ['title',
				'slugline',
				'description',
				'techs',
				'original']
		})]);

	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Markdown'
	};
	const projectData = layoutFetch[2];

	return {
		props: {
			layoutData,
			projectData
		}
	};
};
