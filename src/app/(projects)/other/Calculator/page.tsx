import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData, sharedRobots } from '@/data/metadata';

const title = 'A Calculator';
const description =
	'A simple React / JavaScript calculator with history functionality';

const CalculatorPage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title='A Calculator'
			link={'https://codepen.io/jungle_cone/pen/VwMdemx'}
			techs={['React', 'CSS3']}
			description={description}
		/>
	);
};

export default CalculatorPage;

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
	robots: {
		...sharedRobots,
		index: false,
		googleBot: { ...sharedRobots.googleBot, index: false },
	},
};
