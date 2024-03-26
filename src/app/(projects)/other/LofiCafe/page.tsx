import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'A Lofi Cafe / Radio Station';

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

export const metadata = { title };
