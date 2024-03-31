import Crosses from './Crosses';

import { poppinsClass, latoClass } from '@/styles/fonts';
import style from './Crosses.module.scss';
import { unstable_cache } from 'next/cache';

const generateCrosses = unstable_cache(
	async (limit: number) => {
		const calculator = () => {
			// Distance from top and left
			const y = Math.random() * 0.8;
			const x = Math.random() * 0.8 + 0.1;
			return { x, y };
		};

		const initer = (() => {
			let arr = [];
			for (let i = 0; i < limit; i++) arr.push(calculator());
			return arr;
		})();

		const staticIniter = (() => {
			let arr = [];
			for (let i = 0; i < Math.floor(limit / 2); i++) arr.push(calculator());
			return arr;
		})();

		return [initer, staticIniter];
	},
	['hero-particle-coords'],
	{ revalidate: false },
);

const Hero = async () => {
	const pair = await generateCrosses(24);
	return (
		<header
			className='flex flex-col items-center justify-center w-full h-svh z-10 bg-[linear-gradient(black,transparent_80%)]'
			style={{ perspective: '400px' }}>
			<Crosses pair={pair}>
				<h1
					className={
						poppinsClass.className +
						' text-9xl font-bold m-0 ' +
						style.activate3d
					}>
					Nicolas Vo
				</h1>
				<h2
					className={
						latoClass.className + ' text-6xl font-light m-0 ' + style.activate3d
					}>
					Front End Developer
				</h2>
			</Crosses>
		</header>
	);
};

export default Hero;
