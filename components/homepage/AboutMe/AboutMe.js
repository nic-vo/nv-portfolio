import aboutLook from './AboutMe.module.scss';
import homeLook from '../Homepage.module.scss';

const AboutMe = () => {
	return (
		<section className={aboutLook.container}>
			<h2 className={homeLook.hTwo}>
				About Me
			</h2>
			<p className={aboutLook.description}>Hello there! 👋</p>
			<p className={aboutLook.description}>
				My name is Nicolas, and I&apos;m a freelance front-end developer
				based in San Diego, California.
			</p>
			<p className={aboutLook.description}>
				I design solutions with a minimialist aesthetic
				and maximum function for a seamless,
				comprehensive user experience.
				Check out my work below!
			</p>
		</section>
	);
}

export default AboutMe;
