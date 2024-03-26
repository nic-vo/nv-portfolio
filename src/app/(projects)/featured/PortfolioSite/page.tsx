import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'My Portfolio Site, v. 1.0';

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

export const metadata = { title };
