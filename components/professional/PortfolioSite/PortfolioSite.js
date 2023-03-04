import * as photos from "./assets";
import { ImageCarousel } from "../../global";

const PortfolioSite = () => {
	const photosArr = Object.keys(photos).map((photoKey) => {
		const { src } = photos[photoKey].photo;
		const { desc } = photos[photoKey];
		return { src, desc }
	});
	return (
		<ImageCarousel photos={photosArr} />
	);
};

export default PortfolioSite;
