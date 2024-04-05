import Crosses from './Crosses';
import { HeaderTrackingRotate, Headings } from './Rotators';
import { unstable_cache } from 'next/cache';

export const heroCrossesTag = 'hero-particle-coords';

const generateCrosses = unstable_cache(
	async (limit: number) => {
		const calculator = () => {
			// Distance from top and left
			const y = parseFloat(
				(() =>
					Math.random() > 0.5 ? Math.random() : 0 - Math.random())().toFixed(4),
			);
			const x = parseFloat(
				(() =>
					Math.random() > 0.5 ? Math.random() : 0 - Math.random())().toFixed(4),
			);
			return { x, y };
		};

		const initer = (() => {
			let arr = [];
			for (let i = 0; i < limit; i++) arr.push(calculator());
			return arr;
		})();

		const frontStaticIniter = (() => {
			let arr = [];
			for (let i = 0; i < Math.floor(limit / 4); i++) arr.push(calculator());
			return arr;
		})();

		const rearStaticIniter = (() => {
			let arr = [];
			for (let i = 0; i < Math.floor(limit / 4); i++) arr.push(calculator());
			return arr;
		})();

		return [initer, frontStaticIniter, rearStaticIniter];
	},
	[heroCrossesTag],
	{ revalidate: false },
);

const Hero = async () => {
	const pair = await generateCrosses(20);
	return (
		<HeaderTrackingRotate>
			<Crosses pair={pair}>
				<Headings />
			</Crosses>
		</HeaderTrackingRotate>
	);
};

const StaticHero = () => {
	return (
		<header className='flex flex-col items-center justify-center w-full min-h-svh z-10 bg-[linear-gradient(black,transparent_80%)]'>
			<h1 className='font-poppins text-6xl lg:text-9xl text-center font-bold m-0 z-10 '>
				Nicolas Vo
			</h1>
			<h2 className='font-lato text-3xl lg:text-4xl text-center font-light m-0 z-10'>
				Front End Developer
			</h2>
		</header>
	);
};

export default StaticHero;
