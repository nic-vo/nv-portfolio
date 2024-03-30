'use client';

import { useState, useRef, useEffect } from 'react';
import { FaCaretLeft, FaCaretRight, FaPlus } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';

import look from './ImageCarousel.module.scss';
import globalLook from '@/styles/globalStyles.module.scss';

const ImageCarousel = (props: {
	photos: {
		image: StaticImageData;
		desc: string;
	}[];
}) => {
	const { photos } = props;
	// If this changes, load a fullscreen-esque viewer
	const [activeImage, setActiveImage] = useState<number | null>(null);

	const scrollRef = useRef<HTMLUListElement>(null);
	const viewerRef = useRef<HTMLDialogElement>(null);

	const thumbClickHandler = (index: number) => setActiveImage(index);

	// Clears active image and deactivates fullscreen viewer
	const returner = () => setActiveImage(null);

	// These next two are for within fullscreen viewer
	const decrementActiveImage = () => {
		if (activeImage === 0 || activeImage === null) return null;
		setActiveImage(activeImage - 1);
	};

	const incrementActiveImage = () => {
		if (activeImage === photos.length - 1 || activeImage === null) return null;
		setActiveImage(activeImage + 1);
	};

	useEffect(() => {
		const { current } = viewerRef;
		if (!current) return;
		if (activeImage === null) {
			current.close();
			return;
		}
		current.showModal();
	}, [activeImage]);

	const viewKeyDownHandler = (params: React.KeyboardEvent) => {
		switch (params.key) {
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
		}
	};

	const scrollerHandler = (right: boolean) => {
		if (scrollRef.current === null) return null;
		const increment = scrollRef.current.getBoundingClientRect().width * 0.6;
		const { scrollLeft } = scrollRef.current;
		const newScrollValue =
			right === false ? scrollLeft - increment : scrollLeft + increment;
		scrollRef.current.scroll({
			top: 0,
			left: newScrollValue,
			behavior: 'smooth',
		});
	};

	const classer = look.previewImg;
	activeImage && console.log(photos[activeImage]);

	return (
		<>
			<dialog
				ref={viewerRef}
				style={{ zIndex: 20 }}>
				<div
					className={look.preview}
					onKeyDown={viewKeyDownHandler}>
					<button
						className={look.buttonReturner}
						onClick={returner}>
						<FaPlus />
						<span className={globalLook.hiddenAccess}>Close viewer</span>
					</button>
					<button
						className={look.button}
						onClick={decrementActiveImage}>
						<FaCaretLeft />
						<span className={globalLook.hiddenAccess}>Previous image</span>
					</button>
					{activeImage !== null && (
						<Image
							src={photos[activeImage].image}
							alt={photos[activeImage].desc}
							sizes='100vw'
							placeholder='blur'
							className={classer}
						/>
					)}
					<button
						className={look.button}
						onClick={incrementActiveImage}>
						<FaCaretRight />
						<span className={globalLook.hiddenAccess}>Previous image</span>
					</button>
				</div>
			</dialog>
			<span className={look.instructions}>Click/tap to expand</span>
			<div className={look.container}>
				<div className={look.ringContainer}>
					<button
						className={look.button}
						onClick={() => {
							scrollerHandler(false);
						}}>
						<FaCaretLeft />
						<span className={globalLook.hiddenAccess}>Scroll left</span>
					</button>
					<ul
						className={look.ringExposed}
						tabIndex={-1}
						ref={scrollRef}>
						{photos.map((photo, index) => {
							return (
								<li
									className={look.smallThumb}
									key={`photo-${index}`}
									tabIndex={-1}>
									<button
										className={look.smallThumb}
										tabIndex={0}
										onClick={() => {
											thumbClickHandler(index);
										}}>
										<Image
											placeholder='blur'
											src={photo.image}
											alt={photo.desc}
											sizes='(max-aspect-ratio: 1) 100vw, 75vw'
											priority={index < 2}
										/>
										<span className={globalLook.hiddenAccess}>
											Toggle the large view for picture no. {index + 1}
										</span>
									</button>
								</li>
							);
						})}
					</ul>
					<button
						className={look.button}
						onClick={() => {
							scrollerHandler(true);
						}}>
						<FaCaretRight />
						<span className={globalLook.hiddenAccess}>Scroll right</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default ImageCarousel;
