import * as photos from "./assets";
import { ImageCarousel } from "../../global";

const BlockBuildersGC = () => {
	const photosArr = Object.keys(photos).map((photoKey) => { return photos[photoKey].src });
	return (
		<section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<ImageCarousel photos={photosArr} />
		</section>
	);
};

export default BlockBuildersGC;
