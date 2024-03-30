import { FaPlus } from 'react-icons/fa';
import { PropsWithChildren } from 'react';

import crossLook from './Crosses.module.scss';

const Cross = (props: { coords: { x: number; y: number } }) => {
	const rotate = (() => {
		const sign = Math.random() > 0.5;
		const deg = parseFloat(Math.random().toFixed(3)) * 15;
		return sign ? 0 + deg : 0 - deg;
	})();
	const seed = parseFloat(Math.random().toFixed(3));
	return (
		<div
			className={'absolute w-auto h-auto bg-transparent ' + crossLook.animated}
			style={{
				left: `${props.coords.x * 100}%`,
				top: `${props.coords.y * 80}%`,
				animationDelay: `${seed * 60 - 30}s`,
				animationDuration: `${seed * 30 + 30}s`,
			}}>
			<FaPlus
				className='block text-2xl text-white'
				style={{ transform: `rotate(${rotate}deg)` }}
			/>
		</div>
	);
};

const StaticCross = (props: { coords: { x: number; y: number } }) => {
	const rotate = (() => {
		const sign = Math.random() > 0.5;
		const deg = parseFloat(Math.random().toFixed(3)) * 20;
		return sign ? 0 + deg : 0 - deg;
	})();

	const distance = parseFloat(Math.random().toFixed(2));
	const signedDistance = Math.random() > 0.5 ? 0 + distance : 0 - distance;
	const seed = parseFloat(Math.random().toFixed(3));

	return (
		<div
			className={'absolute w-auto h-auto bg-transparent ' + crossLook.static}
			style={{
				left: `${props.coords.x * 80 + 10}%`,
				top: `${props.coords.y * 30 + 30}%`,
				animationDelay: `${seed * 60 - 30}s`,
				animationDuration: `${seed * 30 + 30}s`,
				transform: `translateZ(${Math.floor(250 * signedDistance)}px)`,
				filter: `blur(${Math.floor(distance * 5)}px) brightness(${1 - distance})`,
			}}>
			<FaPlus
				className='block text-2xl text-white'
				style={{ transform: `rotate(${rotate}deg)` }}
			/>
		</div>
	);
};

const Crosses = async (
	props: PropsWithChildren & {
		pair: { x: number; y: number }[][];
	},
) => {
	const [initer, staticIniter] = props.pair;

	return (
		<>
			{staticIniter.map((coords, index) => {
				return (
					<StaticCross
						coords={coords}
						key={'static-' + index}
					/>
				);
			})}
			{props.children}
			{initer.map((coords, index) => {
				return (
					<Cross
						key={'animated-' + index}
						coords={coords}
					/>
				);
			})}
		</>
	);
};

export default Crosses;
