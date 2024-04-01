import ProjectInfo, {
	getProjectDescription,
	getProjectInfo,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const DrumMachinePage = async () => {
	const [description, info] = await Promise.all([
		getProjectDescription(__dirname),
		getProjectInfo(__dirname),
	]);
	const { title, link, techs } = info;
	if (!title || !link || !techs || !description)
		throw new Error('DrumMachine missing info');

	return (
		<ProjectInfo
			title={title}
			link={link}
			techs={techs}
			description={description}
		/>
	);
};

export default DrumMachinePage;

export async function generateMetadata() {
	const info = await getProjectInfo(__dirname);
	const { title, slugline: description } = info;
	if (!title || !description)
		throw new Error('DrumMachine metadata generation failed');
	return {
		title,
		description,
		openGraph: { ...sharedOGData, title, description },
	};
}
