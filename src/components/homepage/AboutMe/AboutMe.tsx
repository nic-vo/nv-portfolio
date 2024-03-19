import aboutLook from './AboutMe.module.scss';
import homeLook from '../Homepage.module.scss';

const AboutMe = () => {
	const twoClasser = [homeLook.hTwo, aboutLook.heading].join(' ');
	return (
		<section className={aboutLook.container}>
			<h2 className={twoClasser}>
				About Me
			</h2>
			<div className={aboutLook.offsetCard}>
				<p className={aboutLook.description}>Hello there! 👋</p>
				<p className={aboutLook.description}>
					My name is Nicolas, and I&apos;m a front end developer
					based in southern California.
				</p>
				<p className={aboutLook.description}>
					I design solutions with a minimialist aesthetic
					and maximum function for a seamless,
					comprehensive user experience.
					Check out my work below!
				</p>
			</div>
		</section>
	);
}

export default AboutMe;
