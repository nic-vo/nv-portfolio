import aboutLook from './AboutMe.module.scss';

const AboutMe = () => {
	return (
		<section className={aboutLook.container}>
			<h3 className={aboutLook.heading}>
				Hello there! 👋
			</h3>
			<p className={aboutLook.description}>
				My name is Nicolas, and I'm a freelance front-end developer based in San Diego, California.
			</p>
			<p className={aboutLook.description}>
				I design solutions with minimialist aesthetic and maximum function for a seamless, comprehensive user experience. Check out my work below!
			</p>
		</section>

	);
};

export default AboutMe;
