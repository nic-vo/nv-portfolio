import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';
import { sharedOGData } from '@/data/metadata';

const title = 'MixDelta - Spotify Playlist Tool';
const description =
	'A tool for Spotify users to make bulk comparisons and changes to their playlists.';

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

export const metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};
