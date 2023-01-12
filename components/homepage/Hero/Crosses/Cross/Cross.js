import { useState, useEffect } from 'react';

import { FaPlus } from 'react-icons/fa';

import crossLook from './Cross.module.scss';

const calculator = () => {
	const whichSide = Math.random() > 0.5 ? true : false;
	const y = Math.random() * 0.8;
	const yDist = Math.abs(y - 0.5);
	const xCurve = Math.random() * Math.pow(yDist, 2) + 0.1;
	const xShifted = Math.random() * 0.05;
	const x = yDist > 0.35 ? Math.random() * 0.8 + 0.1 : whichSide === true ? 1 - xCurve : xCurve;
	return { x, y };
};

const Cross = ({ recalculate }) => {
	const [coords, setCoords] = useState(calculator());

	const [zFactor, setZFactor] = useState(Math.random());

	useEffect(() => {
		setCoords(calculator());
	}, [recalculate]);

	return (
		<div className={crossLook.container} style={{
			left: `${coords.x * 100}%`,
			top: `${coords.y * 100}%`,
			filter: `blur(${zFactor * 20}px)`
		}}>
			<FaPlus />
		</div>
	);
};

export default Cross;
