import aboutLook from './AboutMe.module.scss';
import homeLook from '../Homepage.module.scss';
import { poppinsClass } from '@/styles/fonts';

const AboutMe = () => {
	const twoClasser = [homeLook.hTwo, aboutLook.heading].join(' ');
	return (
		<section className='flex flex-col items-center w-full py-48 px-16'>
			<h2
				className={
					poppinsClass +
					' block p-4 bg-white text-black rounded-3xl max-w-screen-sm top-0 m-0 z-10 text-4xl text-center'
				}>
				About Me
			</h2>
			<div className='bg-black bg-opacity-20 p-8 w-full max-w-screen-md rounded-3xl -translate-y-4 text-base font-light *:w-full lg:text-2xl'>
				<p>Hello there! 👋</p>
				<p>
					My name is Nicolas, and I&apos;m a front end developer based in
					southern California.
				</p>
				<p>
					I design solutions with a minimialist aesthetic and maximum function
					for a seamless, comprehensive user experience. Check out my work
					below!
				</p>
			</div>
		</section>
	);
};

export default AboutMe;
