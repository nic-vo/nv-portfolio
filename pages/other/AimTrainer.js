import { ProjectLayout } from '../../components/global';
import { AimTrainer } from '../../components/personal';
import { Wip } from '../../components/global';

import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';


const AimTrainerPage = ({ layoutData, projectData }) => {
	return (
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			{/* <AimTrainer /> */}
			<Wip />
		</ProjectLayout>
	);
};

export default AimTrainerPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([
		await getProjectLists({ dataTypes: ['title'] }),
		await getVersionNumber(),
		await getProjectData({
			category: 'other',
			project: 'AimTrainer',
			types: ['title',
				'slugline',
				'description',
				'techs',
				'original']
		})]);

	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'AimTrainer'
	};
	const projectData = layoutFetch[2];

	return {
		props: {
			layoutData,
			projectData
		}
	};
};
