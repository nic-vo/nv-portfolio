import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'A Drum Machine';

const DrumMachinePage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link='https://codepen.io/jungle_cone/pen/VwzVQYZ'
			techs={['React', 'CSS3']}
			description={description}
		/>
	);
};

export default DrumMachinePage;

export const metadata = { title };
