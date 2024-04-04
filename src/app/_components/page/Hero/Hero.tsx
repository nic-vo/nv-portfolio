import Crosses from './Crosses';
import { HeaderTrackingRotate, Headings } from './Rotators';
import { unstable_cache } from 'next/cache';

export const heroCrossesTag = 'hero-particle-coords';

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

export default Hero;
