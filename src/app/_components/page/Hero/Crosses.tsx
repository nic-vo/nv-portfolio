'use client';

import { useMemo, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { PropsWithChildren } from 'react';

import crossLook from './Crosses.module.scss';
import MouseRotateContext, { degrees } from './Rotators';

const Cross = (props: { coords: { x: number; y: number } }) => {
	const { x, y } = useContext(MouseRotateContext);

	const seed = useMemo(() => parseFloat(Math.random().toFixed(3)), []);
	return (
		<FaPlus
			className={`block text-2xl text-white absolute bg-transparent z-0 ${crossLook.animated}`}
			style={{
				animationDelay: `${seed * 60 - 30}s`,
				animationDuration: `${seed * 150 + 30}s`,
				rotate: `${0.5 - x} ${y - 0.5} 0 ${degrees}deg`,
				translate: `${props.coords.x * 30}svw ${props.coords.y * 20}svh`,
			}}
			aria-hidden={true}
			role='presentation'
		/>
	);
};

const StaticCross = (props: {
	coords: { x: number; y: number };
	rear: boolean;
}) => {
	const { x, y } = useContext(MouseRotateContext);

	const distance = useMemo(() => parseFloat(Math.random().toFixed(2)), []);
	const signedDistance = useMemo(
		() => (!props.rear ? 0 + distance : 0 - distance),
		[],
	);
	const seed = useMemo(() => parseFloat(Math.random().toFixed(3)), []);

	return (
		<FaPlus
			className={`absolute block text-2xl text-white bg-transparent drop-shadow ${props.rear ? 'z-0' : 'z-20'} ${crossLook.static}`}
			style={{
				animationDelay: `${seed * 60 - 30}s`,
				animationDuration: `${seed * 30 + 30}s`,
				transform: `translateZ(${Math.floor(100 * signedDistance)}px)`,
				filter: `blur(${Math.floor(distance * 5)}px) brightness(${1 - distance})`,
				rotate: `${0.5 - x} ${y - 0.5} 0 ${degrees}deg`,
				translate: `${props.coords.x * 20}svw ${props.coords.y * 15}svh`,
			}}
			aria-hidden={true}
			role='presentation'
		/>
	);
};

const Crosses = (
	props: PropsWithChildren & {
		pair: { x: number; y: number }[][];
	},
) => {
	const [initer, frontStaticIniter, rearStaticIniter] = props.pair;
	return (
		<>
			{frontStaticIniter.map((coords, index) => {
				return (
					<StaticCross
						coords={coords}
						key={'staticfront-' + index}
						rear={false}
					/>
				);
			})}
			{props.children}
			{rearStaticIniter.map((coords, index) => {
				return (
					<StaticCross
						coords={coords}
						key={'staticrear-' + index}
						rear={true}
					/>
				);
			})}
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
