import { ImageCarousel } from '../../global';
import * as photos from './assets';

const BlockBuildersGC = () => {
	const photosArr = Object.values(photos);

	return (
		<ImageCarousel photos={photosArr} />
	);
};

export default BlockBuildersGC;
