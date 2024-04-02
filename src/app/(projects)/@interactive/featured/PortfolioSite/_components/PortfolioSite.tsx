import ImageCarousel from '../../../_components/ImageCarousel';
import * as photos from './assets';

const PortfolioSite = () => {
	let photosArr = Object.values(photos);

	return <ImageCarousel photos={photosArr} />;
};

export default PortfolioSite;
