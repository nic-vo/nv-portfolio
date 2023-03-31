import { useState, useRef, useMemo, useEffect } from 'react';

import { FaCaretLeft, FaCaretRight, FaPlus } from 'react-icons/fa';

import look from './ImageCarousel.module.scss';

const ImageCarousel = ({ photos }) => {
	// If this changes, load a fullscreen-esque viewer
	const [activeImage, setActiveImage] = useState(null);

	const scrollRef = useRef(null);
	const viewerRef = useRef(null);

	const thumbClickHandler = (index) => {
		setActiveImage(index);
	};

	// Clears active image and deactivates fullscreen viewer
	const returner = () => {
		setActiveImage(null);
	};

	// These next two are for within fullscreen viewer
	const decrementActiveImage = () => {
		if (activeImage === 0) { return; };
		setActiveImage((prev) => { return prev - 1 });
	};

	const incrementActiveImage = () => {
		if (activeImage === photos.length - 1) { return; };
		setActiveImage((prev) => { return prev + 1 });
	};

	useEffect(() => {
		if (activeImage === null) { return };
		viewerRef.current.focus();
	}, [activeImage]);

	const viewKeyDownHandler = ({ key }) => {
		switch (key) {
			case 'ArrowLeft':
				decrementActiveImage();
				break;
			case 'ArrowRight':
				incrementActiveImage();
				break;
			case 'Escape':
				returner();
				break;
			default:
				return;
		};
	};

	const scrollerHandler = (right) => {
		const increment = scrollRef.current.getBoundingClientRect().width * 0.6;
		const { scrollLeft } = scrollRef.current;
		const newScrollValue = right === false ?
			scrollLeft - increment :
			scrollLeft + increment;
		scrollRef.current.scroll({
			top: 0, left: newScrollValue, behavior: "smooth"
		});
	};

	const photoElements = useMemo(() => {
		return photos.map((photo, index) => {
			const { src, desc } = photo;
			return (
				<img
					src={src}
					alt={desc}
					id={index === 0 ? 'devex' : ''}
					onClick={() => { thumbClickHandler(index) }}
					key={`${src}`}
					className={look.smallThumb} />
			);
		});
	}, [thumbClickHandler]);

	const classer = look.previewImg;

	return (
		<div className={look.container}>
			{
				activeImage !== null &&
				(<div className={look.preview} tabIndex='0' ref={viewerRef} onKeyDown={viewKeyDownHandler}>
					<button
						className={look.buttonReturner}
						onPointerDown={returner}>
						<FaPlus />
					</button>
					<button
						className={look.button}
						onPointerDown={decrementActiveImage}>
						<FaCaretLeft />
					</button>
					<img
						src={photos[activeImage].src}
						alt={photos[activeImage].desc}
						className={classer} />
					<button
						className={look.button}
						onPointerDown={incrementActiveImage}>
						<FaCaretRight />
					</button>
				</div>)
			}
			<span className={look.instructions}>Click/tap to expand</span>
			<div className={look.ringContainer}>
				<button
					className={look.button}
					onPointerDown={() => { scrollerHandler(false) }}>
					<FaCaretLeft />
				</button>
				<div
					className={look.ringExposed}
					ref={scrollRef}>
					{photoElements}
				</div>
				<button
					className={look.button}
					onPointerDown={() => { scrollerHandler(true) }}>
					<FaCaretRight />
				</button>
			</div>
		</div>
	);
};

export default ImageCarousel;
