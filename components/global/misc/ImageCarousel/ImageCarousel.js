import { useState, useRef, useMemo } from 'react';

import { FaCaretLeft, FaCaretRight, FaPlus } from 'react-icons/fa';

import carouselLook from './ImageCarousel.module.scss';

const ImageCarousel = ({ photos }) => {
	const [activeImage, setActiveImage] = useState(null);

	const scrollRef = useRef();

	const thumbClickHandler = (index) => {
		setActiveImage(index);
	};

	const returner = () => {
		setActiveImage(null);
	};

	const decrementActiveImage = () => {
		if (activeImage === 0) { return; };
		setActiveImage((prev) => { return prev - 1 });
	};

	const incrementActiveImage = () => {
		if (activeImage === photos.length - 1) { return; };
		setActiveImage((prev) => { return prev + 1 });
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

	const photoElements = useMemo(() => {
		return photos.map((photo, index) => {
			const { src, desc } = photo;
			return (
				<img src={src} alt={desc} id={index === 0 ? 'devex' : ''} onClick={() => { thumbClickHandler(index) }} key={`${src}`} className={carouselLook.smallThumb} />
			);
		});
	}, [thumbClickHandler])

	const classer = carouselLook.previewImg;

	return (
		<div className={carouselLook.container}>
			{activeImage !== null &&
				(<div className={carouselLook.preview}>
					<button className={carouselLook.buttonReturner} onPointerDown={returner}><FaPlus /></button>
					<button className={carouselLook.button} onPointerDown={decrementActiveImage}><FaCaretLeft /></button>
					<img src={photos[activeImage].src} alt={photos[activeImage].desc} className={classer} />
					<button className={carouselLook.button} onPointerDown={incrementActiveImage}><FaCaretRight /></button>
				</div>)
			}
			<span className={carouselLook.instructions}>Click/tap to expand</span>
			<div className={carouselLook.ringContainer}>
				<button className={carouselLook.button} onPointerDown={() => { scrollerHandler(false) }}><FaCaretLeft /></button>
				<div className={carouselLook.ringExposed} ref={scrollRef}>{photoElements}</div>
				<button className={carouselLook.button} onPointerDown={() => { scrollerHandler(true) }}><FaCaretRight /></button>
			</div>
		</div>
	);
};

export default ImageCarousel;
