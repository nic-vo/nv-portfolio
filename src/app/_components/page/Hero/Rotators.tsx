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

export const degrees = 12;

export const HeaderTrackingRotate = (props: PropsWithChildren) => {
	const [deactivate, setDeactivate] = useState<boolean>(false);
	const [rateLimit, setRateLimit] = useState<boolean>(false);
	const [x, setX] = useState(0.5);
	const [y, setY] = useState(0.5);

	const mouseMoveHandler = (e: React.MouseEvent<HTMLElement>) => {
		if (rateLimit || deactivate) return;
		const { right, bottom } = e.currentTarget.getBoundingClientRect();
		setY(parseFloat((e.pageX / right).toFixed(2)));
		setX(parseFloat((e.pageY / bottom).toFixed(2)));
		setRateLimit(true);
		setTimeout(() => setRateLimit(false), 17);
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
			className='flex flex-col items-center justify-center w-full h-svh z-10 bg-[linear-gradient(black,transparent_80%)] overflow-hidden'
			style={{
				perspective: '400px',
			}}
			onMouseMove={mouseMoveHandler}>
			<MouseRotateContext.Provider value={{ x, y }}>
				{props.children}
			</MouseRotateContext.Provider>
			<button
				onClick={disableHandler}
				className='absolute text-2xl w-24 bg-transparent backdrop-blur bottom-8 border-4 rounded-full border-white group/heroslide hover:bg-black focus:bg-black transition-all outline-none overflow-hidden'>
				<span
					className={`block h-full w-min p-4 rounded-full group-focus/heroslide:bg-white group-hover/heroslide:bg-white group-focus/heroslide:text-black group-hover/heroslide:text-black transition-all ${deactivate ? 'translate-x-2/3' : 'translate-x-0'}`}>
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
		<div
			className={style.activate3d}
			style={{
				rotate: `${0.5 - x} ${y - 0.5} 0 15deg`,
			}}>
			<h1
				className={
					poppinsClass.className +
					' text-[8svh] lg:text-[8svw] text-center font-bold m-0 ' +
					style.activate3d
				}>
				Nicolas Vo
			</h1>
			<h2
				className={
					latoClass.className +
					' text-[4svh] lg:text-[4svw] text-center font-light m-0 ' +
					style.activate3d
				}>
				Front End Developer
			</h2>
		</div>
	);
};

export default MouseRotateContext;
