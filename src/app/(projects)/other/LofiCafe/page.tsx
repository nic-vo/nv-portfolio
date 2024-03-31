import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const title = 'A Lofi Cafe / Radio Station';
const description =
	'An early prototype for a guided meditation experience / app';

const LofiCafePage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link='https://lofi-cafe.vercel.app'
			techs={['React', 'CSS3', 'Next 13', 'Sass', 'Webhooks']}
			description={description}
		/>
	);
};

export default LofiCafePage;

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};
