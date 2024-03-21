import Crosses from './Crosses';

import { poppinsClass, latoClass } from '@/styles/fonts';

const Hero = () => {
	return (
		<header className='flex flex-col items-center justify-center w-full h-svh z-10'>
			<h1 className={poppinsClass + ' text-[8vmax] font-bold m-0'}>
				Nicolas Vo
			</h1>
			<h2 className={latoClass + ' text-[4vmax] font-light m-0'}>
				Front End Developer
			</h2>
			<Crosses limit={32} />
		</header>
	);
};

export default Hero;
