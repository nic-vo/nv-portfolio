import { ImageCarousel } from '../../global';
import * as photos from './assets';

const PortfolioSite = () => {
	let photosArr = [];
	for (const [name, obj] of Object.entries(photos)) {
		const { src } = obj.photo;
		const { desc } = obj;
		photosArr.push({ src, desc });
	};

	return (
		<ImageCarousel photos={photosArr} />
	);
};

export default PortfolioSite;
