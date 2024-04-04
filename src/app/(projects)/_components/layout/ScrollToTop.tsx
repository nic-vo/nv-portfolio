'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaArrowUp } from 'react-icons/fa';

import scrollLook from './ScrollToTop.module.scss';

const ScrollToTop = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const location = usePathname();
	const [distanceDisable, setDistanceDisable] = useState(true);
	const [scrollThrottle, setScrollThrottle] = useState(false);
	const [timeouter, setTimeouter] = useState<null | NodeJS.Timeout>(null);

	useEffect(() => {
		window.scroll({ top: 0, left: 0 });
	}, [location]);

	useEffect(() => {
		const { current: button } = buttonRef;
		if (!button || !distanceDisable) return;
		button.blur();
	}, [distanceDisable]);

	const handlePortScroll = () => {
		if (scrollThrottle === true) {
			return;
		}
		setScrollThrottle(true);
		// Set disable if viewport is close to top
		setDistanceDisable(window.scrollY < 300);
		setTimeouter(() => {
			return setTimeout(() => {
				setScrollThrottle(false);
			}, 50);
		});
	};

	const returnToTopOnClick = () => {
		if (window.scrollY >= 300) {
			// Clear any existing timeouts and prevent scroll
			if (timeouter) clearTimeout(timeouter);
			setScrollThrottle(true);
			// Scroll to top and disable
			setDistanceDisable(true);
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
			const first = document.querySelector('a,button') as HTMLElement;
			if (first) first.focus();
			setTimeouter(() => {
				return setTimeout(() => {
					setScrollThrottle(false);
				}, 300);
			});
		}
	};

	useEffect(() => {
		const current = handlePortScroll;
		window.addEventListener('scroll', current);
		// Hopefully the closures here work for cleanup
		return () => {
			window.removeEventListener('scroll', current);
		};
	}, [scrollThrottle]);

	const classer = distanceDisable === false ? ` ${scrollLook.visible}` : '';

	return (
		<button
			onClick={returnToTopOnClick}
			className={scrollLook.scroller + classer}
			disabled={distanceDisable}
			tabIndex={distanceDisable ? -1 : 0}
			ref={buttonRef}>
			<FaArrowUp />
			Return to top
		</button>
	);
};

export default ScrollToTop;
