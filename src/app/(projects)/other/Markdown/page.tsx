import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const title = 'A Markdown Editor';
const description =
	'A simple React tool for editing, live previewing, and downloading Markdown files';

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

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};
