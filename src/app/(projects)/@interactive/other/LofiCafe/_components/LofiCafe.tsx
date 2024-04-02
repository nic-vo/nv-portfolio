import ImageCarousel from '../../../_components/ImageCarousel';
import * as photos from './assets';

const LofiCafe = () => {
	const photosArr = Object.values(photos);

	return <ImageCarousel photos={photosArr} />;
};

export default LofiCafe;
