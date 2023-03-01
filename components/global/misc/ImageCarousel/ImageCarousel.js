import { useState, useRef } from "react";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import carouselLook from './ImageCarousel.module.scss';

const ImageCarousel = ({ photos }) => {
	const [activeImage, setActiveImage] = useState(0);

	const scrollRef = useRef();

	const thumbClickHandler = (index) => {
		setActiveImage(index)
	};

	const scrollerHandler = (right) => {
		let newScrollValue;
		const increment = scrollRef.current.getBoundingClientRect().width * 0.6;
		const { scrollLeft } = scrollRef.current;
		if (right === false) {
			newScrollValue = scrollLeft - increment;
		} else {
			newScrollValue = scrollLeft + increment;
		};
		scrollRef.current.scroll({
			top: 0, left: newScrollValue, behavior: 'smooth'
		});
	};

	const photoElements = photos.map((photo, index) => {
		return (
			<img src={photo} alt='' className={carouselLook.smallThumb} key={`${photo}`} onPointerDown={() => {
				thumbClickHandler(index)
			}} />
		);
	});

	const classer = carouselLook.previewImg;

	return (
		<div className={carouselLook.container}>
			<div className={carouselLook.preview}>
				<img src={photos[activeImage]} alt='' className={classer} />
			</div>
			<div className={carouselLook.ring}>
				<button className={carouselLook.scroller} onPointerDown={() => { scrollerHandler(false) }}><FaCaretLeft /></button>
				<div className={carouselLook.ringExposed} ref={scrollRef}>{photoElements}</div>
				<button className={carouselLook.scroller} onPointerDown={() => { scrollerHandler(true) }}><FaCaretRight /></button>
			</div>
		</div>
	);
};

export default ImageCarousel;
