import { ProjectLayout } from '../../components/global';
import { Pomodoro } from '../../components/fcc';

import { getProjectLists, getProjectData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';

const PomodoroPage = ({ layoutData, projectData }) => {
	return (
		<ProjectLayout layoutData={layoutData} projectData={projectData}>
			<Pomodoro />
		</ProjectLayout>
	);
};

export default PomodoroPage;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([
		await getProjectLists({ dataTypes: ['title'] }),
		await getVersionNumber(),
		await getProjectData({
			category: 'other',
			project: 'Pomodoro',
			types: ['title',
				'description',
				'techs',
				'original']
		})]);

	const layoutData = {
		otherProjects: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Pomodoro'
	};
	const projectData = layoutFetch[2];

	return {
		props: {
			layoutData,
			projectData
		}
	};
};
