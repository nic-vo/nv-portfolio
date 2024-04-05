'use client';

import { useState, useRef, useEffect, PropsWithChildren } from 'react';
import { FaCaretLeft, FaCaretRight, FaPlus } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';
import { HiddenButAccessible } from '@/components/global';

const CarouselButton = (
	props: PropsWithChildren & { clicker: () => void; classes?: string[] },
) => {
	const classer =
		props.classes && props.classes.length > 0 ? props.classes.join(' ') : '';
	return (
		<button
			onClick={props.clicker}
			className={`bg-black text-white p-4 rounded-full border-2 border-white hover:bg-white hover:text-black focus:bg-white focus:text-black transition-all text-xl ${classer}`}>
			{props.children}
		</button>
	);
};

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

	return (
		<>
			<dialog
				ref={viewerRef}
				className='fixed z-20 h-svh w-full max-w-[100svw] max-h-[100svh] p-0 m-0 bg-transparent backdrop-blur backdrop-brightness-50'
				onKeyDown={viewKeyDownHandler}>
				<div className='h-full w-full flex items-center justify-between bg-transparent px-8'>
					<CarouselButton
						clicker={returner}
						classes={['absolute', 'top-8', 'left-8']}>
						<FaPlus aria-hidden={true} />
						<HiddenButAccessible>Close viewer</HiddenButAccessible>
					</CarouselButton>
					<CarouselButton clicker={decrementActiveImage}>
						<FaCaretLeft aria-hidden={true} />
						<HiddenButAccessible>Previous image</HiddenButAccessible>
					</CarouselButton>
					{activeImage !== null && (
						<Image
							src={photos[activeImage].image}
							alt={photos[activeImage].desc}
							sizes='100vw'
							placeholder='blur'
							className='rounded-md w-9/12 h-auto animate-fadein'
						/>
					)}
					<CarouselButton clicker={incrementActiveImage}>
						<FaCaretRight aria-hidden={true} />
						<HiddenButAccessible>Previous image</HiddenButAccessible>
					</CarouselButton>
				</div>
			</dialog>
			<span className='font-lato font-light text-xl text-center'>
				Click/tap to expand
			</span>
			<div className='flex justify-center items-center w-4/5 h-3/4'>
				<div className='shrink flex items-center w-ful h-full gap-4 lg:h-1/2'>
					<CarouselButton clicker={() => scrollerHandler(false)}>
						<FaCaretLeft aria-hidden={true} />
						<HiddenButAccessible>Scroll left</HiddenButAccessible>
					</CarouselButton>
					<ul
						className='flex flex-col lg:flex-row h-full p-4 gap-8 items-center overflow-auto w-full thinscroll'
						tabIndex={-1}
						ref={scrollRef}>
						{photos.map((photo, index) => {
							return (
								<li
									className='shrink-0 cursor-pointer rounded-lg w-full lg:h-full lg:w-auto'
									key={`photo-${index}`}
									tabIndex={-1}>
									<button
										className='shrink-0 cursor-pointer rounded-lg w-full lg:h-full lg:w-auto'
										tabIndex={0}
										onClick={() => {
											thumbClickHandler(index);
										}}>
										<Image
											placeholder='blur'
											src={photo.image}
											alt={photo.desc}
											sizes='(aspect-ratio: 1) 100vw, 75vw'
											priority={index < 2}
											className='rounded-lg block w-full h-auto lg:h-full'
										/>
										<HiddenButAccessible>
											Toggle the large view for picture no. {index + 1}
										</HiddenButAccessible>
									</button>
								</li>
							);
						})}
					</ul>
					<CarouselButton clicker={() => scrollerHandler(true)}>
						<FaCaretRight aria-hidden={true} />
						<HiddenButAccessible>Scroll right</HiddenButAccessible>
					</CarouselButton>
				</div>
			</div>
		</>
	);
};

export default ImageCarousel;
