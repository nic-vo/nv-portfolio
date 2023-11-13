import { ImageCarousel } from '../../global';
import * as photos from './assets';

const BlockBuildersGC = () => {
	const photosArr = Object.values(photos).map(
		obj => {
			const { desc } = obj;
			const { src } = obj.photo;
			return { src, desc }
		});

	return (
		<ImageCarousel photos={photosArr} />
	);
};

export default BlockBuildersGC;
