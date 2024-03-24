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

	const scrollRef = useRef<HTMLDivElement>(null);
	const viewerRef = useRef<HTMLImageElement>(null);

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
		if (activeImage === null || viewerRef.current === null) return;
		viewerRef.current.focus();
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

	return (
		<>
			{activeImage !== null && (
				<div
					className='fixed flex items-center justify-between w-full h-full top-0 left-0 z-10 backdrop-brightness-50 backdrop-blur'
					tabIndex={0}
					ref={viewerRef}
					onKeyDown={viewKeyDownHandler}>
					<button
						className={look.buttonReturner}
						onPointerDown={returner}>
						<FaPlus />
					</button>
					<button
						className={look.button}
						onPointerDown={decrementActiveImage}>
						<FaCaretLeft />
						<span className={globalLook.hiddenAccess}>Previous image</span>
					</button>
					<Image
						src={photos[activeImage].image}
						alt={photos[activeImage].desc}
						sizes='100vw'
						placeholder='blur'
						className={classer}
					/>
					<button
						className={look.button}
						onPointerDown={incrementActiveImage}>
						<FaCaretRight />
						<span className={globalLook.hiddenAccess}>Previous image</span>
					</button>
				</div>
			)}
			<span className='font-light text-2xl text-center m-4'>
				Click/tap to expand
			</span>
			<div className='flex justify-center items-center w-4/5 h-3/4 max-w-screen-xl'>
				<div className='flex items-center w-full h-full gap-4 shrink lg:h-1/2'>
					<button
						className={look.button}
						onPointerDown={() => {
							scrollerHandler(false);
						}}>
						<FaCaretLeft />
						<span className={globalLook.hiddenAccess}>Scroll left</span>
					</button>
					<div
						className='flex flex-col lg:flex-row items-center h-full overflow-auto gap-8 p-4 lg:w-full'
						ref={scrollRef}>
						{photos.map((photo, index) => {
							return (
								<div
									className={look.button}
									key={`photo-${index}`}
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
								</div>
							);
						})}
					</div>
					<button
						className='cursor-pointer bg-black text-white hover:bg-white hover:text-black focus:bg-white focus:text-black p-3 rounded-full border-2 border-white transition-colors hidden lg:block '
						onPointerDown={() => {
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
