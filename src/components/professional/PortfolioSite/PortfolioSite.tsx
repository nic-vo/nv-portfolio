import { ImageCarousel } from "@/components/global";
import * as photos from "./assets";

const PortfolioSite = () => {
	let photosArr = Object.values(photos);

	return <ImageCarousel photos={photosArr} />;
};

export default PortfolioSite;
