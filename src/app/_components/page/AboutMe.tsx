const AboutMe = () => {
	return (
		<section className='py-48 w-11/12 lg:w-max px-8 flex flex-col justify-center lg:grid grid-cols-4 grid-rows-3 gap-8 lg:gap-y-0 lg:gap-x-8'>
			<h2 className='font-poppins font-semibold block p-4 bg-white text-black top-0 m-0 z-10 text-4xl text-center col-span-1 row-span-3 rounded-3xl w-min text-nowrap self-center'>
				About Me
			</h2>
			<p className='text-2xl font-extrabold col-span-3 col-start-2 max-w-prose'>
				Hello there! 👋
			</p>
			<p className='col-span-3 col-start-2 max-w-prose text-xl'>
				My name is Nicolas, and I&apos;m a front end developer based in southern
				California.
			</p>
			<p className='col-span-3 col-start-2 max-w-prose text-xl'>
				I design solutions with a minimialist aesthetic and maximum function for
				a seamless, comprehensive user experience. Check out my work below!
			</p>
		</section>
	);
};

export default AboutMe;
