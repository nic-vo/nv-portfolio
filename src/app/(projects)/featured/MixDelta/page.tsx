import ProjectInfo, {
	getProjectDescription,
	getProjectInfo,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const path = ['featured', 'MixDelta'];

const MixDeltaPage = async () => {
	const [description, info] = await Promise.all([
		getProjectDescription(path),
		getProjectInfo(path),
	]);
	const { title, link, techs } = info;
	if (!title || !link || !techs || !description)
		throw new Error('MixDelta missing info');

	return (
		<ProjectInfo
			title={title}
			link={link}
			techs={techs}
			description={description}
		/>
	);
};

export default MixDeltaPage;

export async function generateMetadata() {
	const info = await getProjectInfo(path);
	const { title, slugline: description } = info;
	if (!title || !description)
		throw new Error('MixDelta metadata generation failed');
	return {
		title,
		description,
		openGraph: { ...sharedOGData, title, description },
	};
}
