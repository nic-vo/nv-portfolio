import { useState, useEffect } from 'react';

import Crosses from './Crosses/Crosses';

import heroLook from './Hero.module.scss';

const Hero = () => {
	const [focus, setFocus] = useState(0);
	const [rateLimit, setRateLimit] = useState(false);

	const focusHandler = e => {
		if (rateLimit === true) {
			console.log('limit');
			return;
		};
		setFocus(parseFloat(e.target.value));
		setRateLimit(true);
		setTimeout(() => {
			setRateLimit(false)
		}, 150);
	};

	return (
		<section className={heroLook.container}>
			<h1 className={heroLook.biggest}>
				<p>Nicolas Vo</p>
				<p>Front-end Developer</p>
			</h1>
			<Crosses limit={200} focus={focus} />
			<label htmlFor="focuser" className={heroLook.focuserLabel}>Change focus:
				<input id="focuser" type='range' value={focus} onChange={focusHandler} min={1} max={7} step={1.5} />
			</label>
		</section>
	);
};

export default Hero;
