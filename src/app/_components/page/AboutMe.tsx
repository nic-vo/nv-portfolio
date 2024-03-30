import { poppinsClass } from '@/styles/fonts';

const AboutMe = () => {
	return (
		<section className='items-center p-48 grid grid-cols-4 gap-8'>
			<h2
				className={
					poppinsClass.className +
					' block p-4 bg-white text-black max-w-screen-sm top-0 m-0 z-10 text-4xl text-center col-span-1'
				}>
				About Me
			</h2>
			<div className='col-span-3 flex flex-col gap-4 bg-black bg-opacity-20 p-8 border-l-2 border-white w-full max-w-prose font-light *:w-full text-lg'>
				<p className='text-4xl'>Hello there! 👋</p>
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
