'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { FaCube, FaPowerOff } from 'react-icons/fa';

import { poppinsClass, latoClass } from '@/styles/fonts';
import style from './Crosses.module.scss';
import global from '@/styles/globalStyles.module.scss';

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
				className='absolute text-2xl w-24 bg-transparent backdrop-blur bottom-8 border-4 rounded-full border-white group/heroslide hover:bg-black focus:bg-black transition-all overflow-hidden'>
				<span
					className={`block h-full w-min p-4 rounded-full group-focus/heroslide:bg-white group-hover/heroslide:bg-white group-focus/heroslide:text-black group-hover/heroslide:text-black transition-all ${deactivate ? 'translate-x-0' : 'translate-x-2/3'}`}>
					{deactivate ? <FaPowerOff /> : <FaCube />}
				</span>
				<span className={global.hiddenAccess}>
					{deactivate ? 'Turn on' : 'Turn off'} 3D effect
				</span>
			</button>
		</header>
	);
};

export const Headings = () => {
	const { x, y } = useContext(MouseRotateContext);
	return (
		<>
			<h1
				className={
					poppinsClass.className +
					' text-6xl lg:text-9xl text-center font-bold m-0 z-10 ' +
					style.activate3d
				}
				style={{
					rotate: `${0.5 - x} ${y - 0.5} 0 15deg`,
				}}>
				Nicolas Vo
			</h1>
			<h2
				className={
					latoClass.className +
					' text-3xl lg:text-4xl text-center font-light m-0 z-10 ' +
					style.activate3d
				}
				style={{
					rotate: `${0.5 - x} ${y - 0.5} 0 15deg`,
				}}>
				Front End Developer
			</h2>
		</>
	);
};

export default MouseRotateContext;
