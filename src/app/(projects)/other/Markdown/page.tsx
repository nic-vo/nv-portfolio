import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'A Markdown Editor';

const MarkdownPage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link='https://codepen.io/jungle_cone/pen/mdMpGvY'
			techs={['React', 'CSS3']}
			description={description}
		/>
	);
};

export default MarkdownPage;

export const metadata = { title };
