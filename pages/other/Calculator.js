import { ProjectLayout } from '../../components/global';
import { Calculator } from '../../components/fcc';

import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';

const CalculatorPage = ({ layoutData, projectData }) => {
	return (
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<Calculator />
		</ProjectLayout>
	);
};

export default CalculatorPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([
		await getProjectLists({ dataTypes: ['title'] }),
		await getVersionNumber(),
		await getProjectData({
			category: 'other',
			project: 'Calculator',
			types: ['title',
				'slugline',
				'description',
				'techs',
				'original']
		})]);

	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Calculator'
	};
	const projectData = layoutFetch[2];

	return {
		props: {
			layoutData,
			projectData
		},
		revalidate: 172800
	};
};
