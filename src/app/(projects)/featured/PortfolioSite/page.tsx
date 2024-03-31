import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const title = 'My Portfolio Site, v. 2.x';
const description = 'A Next 14 endeavor';

const PortfolioSitePage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link={'https://nicvo.dev'}
			techs={['Next 14', 'React', 'TailwindCSS', 'Sass', 'Node.js']}
			description={description}
		/>
	);
};

export default PortfolioSitePage;

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};
