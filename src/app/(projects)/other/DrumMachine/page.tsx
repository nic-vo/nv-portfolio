import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const title = 'A Drum Machine';
const description =
	'A React tool allowiwng users to loop and mix audio samples';

const DrumMachinePage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link='https://codepen.io/jungle_cone/pen/VwzVQYZ'
			techs={['React', 'CSS3', 'AWS Cloudfront']}
			description={description}
		/>
	);
};

export default DrumMachinePage;

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};
