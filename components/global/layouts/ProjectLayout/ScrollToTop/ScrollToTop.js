import { useEffect, useState } from 'react';

import { FaArrowUp } from 'react-icons/fa';

import scrollLook from './ScrollToTop.module.scss';

const ScrollToTop = () => {
	const [distanceDisable, setDistanceDisable] = useState(true);
	const [scrollThrottle, setScrollThrottle] = useState(false);
	const [timeouter, setTimeouter] = useState(null);

	const handlePortScroll = () => {
		if (scrollThrottle === true) { return };
		setScrollThrottle(true);
		// Set disable if viewport is close to top
		setDistanceDisable(window.pageYOffset < 300);
		setTimeouter(() => {
			return setTimeout(() => {
				setScrollThrottle(false);
			}, 50)
		});
	};

	const returnToTopOnClick = () => {
		if (window.pageYOffset >= 300) {
			// Clear any existing timeouts and prevent scroll
			clearTimeout(timeouter);
			setScrollThrottle(true);
			// Scroll to top and disable
			setDistanceDisable(true);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			setTimeouter(() => {
				return setTimeout(() => {
					setScrollThrottle(false);
				}, 150);
			});
		};
	};

	useEffect(() => {
		const current = handlePortScroll;
		window.addEventListener('scroll', current);
		// Hopefully the closures here work for cleanup
		return () => { window.removeEventListener('scroll', current) };
	}, [scrollThrottle]);

	const classer = distanceDisable === false ? ` ${scrollLook.visible}` : '';

	return (
		<button onClick={returnToTopOnClick} className={scrollLook.scroller + classer} disabled={distanceDisable}><FaArrowUp />Return to top</button>
	);
};

export default ScrollToTop;
