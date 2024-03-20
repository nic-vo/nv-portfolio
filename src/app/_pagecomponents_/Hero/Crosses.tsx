import { FaPlus } from 'react-icons/fa';
import crossLook from './Crosses.module.scss';

const calculator = () => {
	// Distance from top and left
	const y = Math.random() * 0.8;
	const x = Math.random() * 0.8 + 0.1;
	return { x, y };
};

const Cross = (props: { coords: { x: number; y: number } }) => {
	const rotate = (() => {
		const sign = Math.random() > 0.5;
		const deg = parseFloat(Math.random().toFixed(3)) * 10;
		return sign ? 0 + deg : 0 - deg;
	})();
	return (
		<div
			className={'absolute w-auto h-auto bg-transparent ' + crossLook.container}
			style={{
				left: `${props.coords.x * 100}%`,
				top: `${props.coords.y * 100}%`,
				animationDelay: `${parseFloat(Math.random().toFixed(2)) * 30 - 15}s`,
				animationDuration: `${parseFloat(Math.random().toFixed(2)) * 30 + 30}s`,
			}}>
			<div
				className='w-full h-full'
				style={{ transform: `rotate(${rotate}deg)` }}>
				<FaPlus />
			</div>
		</div>
	);
};

const Crosses = ({ limit }: { limit: number }) => {
	const initer = (() => {
		let arr = [];
		for (let i = 0; i < limit; i++) arr.push(calculator());
		return arr;
	})();

	return (
		<div
			className='absolute h-svh w-full overflow-hidden z-0'
			style={{ perspective: '400px' }}>
			{initer.map((coords, index) => {
				return (
					<Cross
						key={`cross-${index}`}
						coords={coords}
					/>
				);
			})}
		</div>
	);
};

export default Crosses;
