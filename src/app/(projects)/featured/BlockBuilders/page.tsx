import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'Block Builders General Contracting, Inc.';

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
};
