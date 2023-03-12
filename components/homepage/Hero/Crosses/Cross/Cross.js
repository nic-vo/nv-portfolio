import { useMemo } from 'react';

import { FaPlus } from 'react-icons/fa';

import crossLook from './Cross.module.scss';

const calculator = () => {
	// Distance from top and left
	const y = Math.random() * 0.7;
	const x = Math.random() * 0.8 + 0.1;
	return { x, y };
};

const Cross = () => {

	const coords = useMemo(() => { return calculator() }, []);

	return (
		<div className={crossLook.container} style={{
			left: `${coords.x * 100}%`,
			top: `${coords.y * 100}%`,
			animationDelay: `${(Math.random().toFixed(2) * 30) - 15}s`,
			animationDuration: `${Math.random().toFixed(2) * 30 + 30}s`,
			rotate: `${Math.random() > 0.5 ? '' : '-'}${Math.random().toFixed(2) * 8}deg`
		}}>
			<FaPlus />
		</div>
	);
};

export default Cross;
