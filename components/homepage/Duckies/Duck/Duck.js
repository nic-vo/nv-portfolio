import { useState, useEffect, useRef } from "react";

import duckLook from './Duck.module.scss';

import Calm from './goose_calm.svg';
import Angr from './goose_angr.svg';

const Duck = ({ pX, pY, hoverToggle }) => {
	const flipRef = useRef();

	const [flip, setFlip] = useState(false);
	const [x, setX] = useState(`${Math.floor(Math.random() * 80) + 10}%`);
	const [y, setY] = useState(`${Math.floor(Math.random() * 80) + 10}%`);

	useEffect(() => {
		if (hoverToggle === false) {
			const offset = document.getElementById('pond').getBoundingClientRect();
			const newX = Math.floor(Math.random() * 80) + 10;
			const newY = Math.floor(Math.random() * 80) + 10;
			if (offset.width * (newX / 100) > x) {
				setFlip(true);
			} else {
				setFlip(false);
			};
			setX(`${newX}%`);
			setY(`${newY}%`);
		};
	}, [hoverToggle])

	useEffect(() => {
		if (hoverToggle === false) { return };
		const distGen = (parent, axis) => {
			let prelimited;
			const offset = document.getElementById('pond').getBoundingClientRect();
			const bool = Math.random();
			const position = Math.floor(Math.random() * 60);
			// return parent - offset[axis];
			if (bool > 0.5) {
				prelimited = parent + position - offset[axis];
			} else {
				prelimited = parent - position - offset[axis];
			}
			if (axis === 'x') {
				if (prelimited < (offset.width * 0.05)) { return (offset.width * 0.1) }
				if (prelimited > (offset.width * 0.95)) { return offset.width * 0.9 };
			}
			if (axis === 'y') {
				if (prelimited < (offset.height * 0.05)) { return (offset.height * 0.1) }
				if (prelimited > (offset.height * 0.95)) { return offset.height * 0.9 };
			}
			return prelimited;
		};
		setY(distGen(pY, 'y'));
		setX(distGen(pX, 'x'));
	}, [pX, pY]);

	useEffect(() => {
		if (hoverToggle === false) { return };
		const duckRect = flipRef.current.getBoundingClientRect();
		if (((duckRect.width / 2) + duckRect.x) < pX) {
			setFlip(true);
		} else {
			setFlip(false);
		};
	}, [pX]);

	return (
		<div ref={flipRef} className={`${duckLook.empty} ${hoverToggle === true ? duckLook.eager : duckLook.sad}`} style={{ top: y, left: x, animationDelay: `${Math.random() * 1000}ms`, transform: `${flip === true ? 'rotateY(180deg)' : 'none'}` }}>
			{hoverToggle === true ? <Angr /> : <Calm />}
		</div>
	);
};

export default Duck;
