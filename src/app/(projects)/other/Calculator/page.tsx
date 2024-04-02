import ProjectInfo, {
	getProjectDescription,
	getProjectInfo,
} from '../../_components/page/parts';
import { sharedOGData, sharedRobots } from '@/data/metadata';

const path = ['other', 'Calculator'];

const CalculatorPage = async () => {
	const [description, info] = await Promise.all([
		getProjectDescription(path),
		getProjectInfo(path),
	]);
	const { title, link, techs } = info;
	if (!title || !link || !techs || !description)
		throw new Error('Calculator missing info');

	return (
		<ProjectInfo
			title={title}
			link={link}
			techs={techs}
			description={description}
		/>
	);
};

export default CalculatorPage;

export async function generateMetadata() {
	const info = await getProjectInfo(path);
	const { title, slugline: description } = info;
	if (!title || !description)
		throw new Error('Calculator metadata generation failed');
	return {
		title,
		description,
		openGraph: { ...sharedOGData, title, description },
		robots: {
			...sharedRobots,
			index: false,
			googleBot: { ...sharedRobots.googleBot, index: false },
		},
	};
}
