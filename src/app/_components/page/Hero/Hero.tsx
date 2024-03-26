import Crosses from './Crosses';

import { poppinsClass, latoClass } from '@/styles/fonts';

const Hero = () => {
	return (
		<header className='flex flex-col items-center justify-center w-full h-svh z-10 bg-[linear-gradient(black,transparent_80%)]'>
			<h1 className={poppinsClass.className + ' text-9xl font-bold m-0'}>
				Nicolas Vo
			</h1>
			<h2 className={latoClass.className + ' text-6xl font-light m-0'}>
				Front End Developer
			</h2>
			<Crosses limit={32} />
		</header>
	);
};

export default Hero;
