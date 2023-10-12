import { useMemo } from 'react';

import { FaPlus } from 'react-icons/fa';

import crossLook from './Cross.module.scss';

const calculator = () => {
	// Distance from top and left
	const y = Math.random() * 0.8;
	const x = Math.random() * 0.8 + 0.1;
	return { x, y };
};

const Cross = () => {
	const coords = useMemo(() => { return calculator() }, []);
	const rotate = useMemo(() => {
		const sign = Math.random() > 0.5;
		const deg = Math.random().toFixed(3) * 10;
		return sign ? 0 + deg : 0 - deg;
	}, []);
	return (
		<div className={crossLook.container} style={{
			left: `${coords.x * 100}%`,
			top: `${coords.y * 100}%`,
			animationDelay: `${(Math.random().toFixed(2) * 30) - 15}s`,
			animationDuration: `${Math.random().toFixed(2) * 30 + 30}s`
		}}>
			<div
				className={crossLook.rotator}
				style={{ transform: `rotate(${rotate}deg)` }}>
				<FaPlus />
			</div>
		</div>
	)
}

export default Cross;
