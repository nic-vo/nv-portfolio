import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const title = 'Block Builders General Contracting, Inc.';
const description =
	'A React SPA for a small construction contracting business serving Los Angeles.';

const BlockBuildersPage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link={'https://blockbuildersgc.com'}
			techs={['React', 'CSS3', 'AWS Lambda', 'AWS API Gateway']}
			description={description}
		/>
	);
};

export default BlockBuildersPage;

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};
