import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'MixDelta - Spotify Playlist Tool';

const MixDeltaPage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title={title}
			link={'https://mixdelta.vercel.app'}
			techs={['Next 13', 'React', 'Redux', 'Sass', 'MongoDB', 'Redis']}
			description={description}
		/>
	);
};

export default MixDeltaPage;

export const metadata = { title };
