'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IoCube, IoPower } from 'react-icons/io5';

const MouseRotateContext = createContext<{ x: number; y: number }>({
	x: 0.5,
	y: 0.5,
});

export const degrees = 15;

export const HeaderTrackingRotate = (props: PropsWithChildren) => {
	const [deactivate, setDeactivate] = useState<boolean>(true);
	const [rateLimit, setRateLimit] = useState<boolean>(false);
	const [x, setX] = useState(0.5);
	const [y, setY] = useState(0.5);

	const mouseMoveHandler = (e: React.MouseEvent<HTMLElement>) => {
		if (rateLimit || deactivate) return;
		const { right, bottom } = e.currentTarget.getBoundingClientRect();
		setY(parseFloat((e.pageX / right).toFixed(2)));
		setX(parseFloat((e.pageY / bottom).toFixed(2)));
		setRateLimit(true);
		setTimeout(() => setRateLimit(false), Math.ceil(1000 / 40));
	};

	const disableHandler = () => {
		if (deactivate) {
			setDeactivate(false);
			return;
		}
		setX(0.5);
		setY(0.5);
		setDeactivate(true);
	};

	return (
		<header
			className='flex flex-col items-center justify-center w-full min-h-svh z-10 bg-[linear-gradient(black,transparent_80%)]'
			style={{
				perspective: '400px',
			}}
			onMouseMove={mouseMoveHandler}>
			<MouseRotateContext.Provider value={{ x, y }}>
				{props.children}
			</MouseRotateContext.Provider>
			<button
				onClick={disableHandler}
				className='absolute text-2xl w-24 bg-transparent backdrop-blur bottom-8 border-4 rounded-full outline-none border-white group/heroslide hover:bg-black focus-visible:bg-black transition-all overflow-hidden'
				role='switch'
				aria-checked={!deactivate}
				aria-label={`Press to ${deactivate ? 'turn on' : 'turn off'} the 3D effect`}>
				<span
					className={`block h-full w-min p-4 rounded-full group-focus/heroslide:bg-white group-hover/heroslide:bg-white group-focus/heroslide:text-black group-hover/heroslide:text-black transition-all ${deactivate ? 'translate-x-0' : 'translate-x-2/3'}`}>
					{deactivate ? (
						<IoPower aria-hidden={true} />
					) : (
						<IoCube aria-hidden={true} />
					)}
				</span>
			</button>
		</header>
	);
};

export const Headings = () => {
	const { x, y } = useContext(MouseRotateContext);
	return (
		<hgroup style={{ perspective: '400px' }}>
			<h1
				className='font-poppins text-6xl md:text-9xl text-center font-bold m-0 z-10 '
				style={{
					rotate: `${0.5 - x} ${y - 0.5} 0 15deg`,
				}}>
				Nicolas Vo
			</h1>
			<p
				className='font-lato text-3xl md:text-4xl text-center font-light m-0 z-10'
				style={{
					rotate: `${0.5 - x} ${y - 0.5} 0 15deg`,
				}}>
				Front End Developer
			</p>
		</hgroup>
	);
};

export default MouseRotateContext;
