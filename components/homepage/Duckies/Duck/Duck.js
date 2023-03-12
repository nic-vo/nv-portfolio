import { useState, useEffect, useRef, useMemo } from 'react';

import Calm from './goose_calm.svg';
import Angr from './goose_angr.svg';

import duckLook from './Duck.module.scss';

const Duck = ({ pX, pY, hoverToggle }) => {

	// Ref for getting size of each duck
	const flipRef = useRef();

	// Boolean to determine which direction duck faces (left/right)
	const [flip, setFlip] = useState(false);
	// Init state to determine init transform
	const [x, setX] = useState(200);
	const [y, setY] = useState(200);

	// If mouse leaves pond, randomly generate new position
	useEffect(() => {
		if (hoverToggle === false) {
			const parentRect = document.getElementById('pond').getBoundingClientRect();
			const duckRect = flipRef.current.getBoundingClientRect();
			const widthMultiplier = parentRect.width / duckRect.width;
			const heightMultiplier = parentRect.height / duckRect.height;
			const newX = Math.floor(Math.random() * 80) + 10;
			const newY = Math.floor(Math.random() * 80) + 10;
			// See if flip is necessary
			if (newX * widthMultiplier > x) {
				setFlip(true);
			} else {
				setFlip(false);
			};
			setX(newX * widthMultiplier);
			setY(newY * heightMultiplier);
		};
	}, [hoverToggle]);

	// useEffect to determine new position for a duck relative to parent position props
	useEffect(() => {
		if (hoverToggle === false) { return };

		const distGen = (parent, axis) => {

			// Get parent pond rect data to adjust duck pos since it's position: absolute (I think)
			const parentRect = document.getElementById('pond').getBoundingClientRect();
			const duckRect = flipRef.current.getBoundingClientRect();

			// Get percentage distance into parent from mouse event
			const parentPercent = axis === 'x' ? ((parent - parentRect.left) / parentRect.width) : ((parent - parentRect.top) / parentRect.height);
			// Get how many duck lengths / heights are necessary to cover entire length / height of pond
			const multiplier = axis === 'x' ? (parentRect.width / duckRect.width) : (parentRect.height / duckRect.height);
			// New percentage of duck for transform
			const randomizer = Math.random().toFixed(4) * 3;
			// Since distance is always positive, randomly controls whether duck should be on left/right or top/bottom
			const bool = Math.random();

			const prelimited = bool > 0.5 ? parentPercent * 100 + randomizer : parentPercent * 100 - randomizer;

			// If calculated distance is greater / less than upper / lower limit on pond, return the limit instead so ducks don't leave pond
			if (prelimited < 5) { return multiplier * 5 };
			if (prelimited > 95) { return multiplier * 95 };
			return (multiplier * prelimited);
		};

		setY(distGen(pY, 'y'));
		setX(distGen(pX, 'x'));
	}, [pX, pY]);

	// useEffect to determine if duck should flip or not
	useEffect(() => {
		if (hoverToggle === false) { return };
		const duckRect = flipRef.current.getBoundingClientRect();
		if (((duckRect.width / 2) + duckRect.x) < pX) {
			setFlip(true);
		} else {
			setFlip(false);
		};
	}, [pX]);

	const duckClasser = `${duckLook.empty} ${hoverToggle === true ? duckLook.eager : duckLook.sad}`;
	const translateStr = `${x}% ${y}%`;
	const animationDelayStr = useMemo(() => {
		return `${Math.random() * 1000}ms`;
	}, []);
	const rotateStr = `${flip === true ? 'rotateY(180deg)' : 'none'}`;

	return (
		<div
			ref={flipRef}
			className={duckClasser}
			style={{
				animationDelay: animationDelayStr,
				translate: translateStr,
				transform: `${flip === true ? 'rotateY(180deg)' : 'rotateY(0)'}`
			}}>
			{
				hoverToggle === true ?
					<Angr style={{ transform: rotateStr }} /> :
					<Calm style={{ transform: rotateStr }} />
			}
		</div>
	);
};

export default Duck;
