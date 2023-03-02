import aboutLook from './AboutMe.module.scss';
import homeLook from '../Homepage.module.scss';

const AboutMe = () => {
	return (
		<section className={aboutLook.container}>
			<h2 className={homeLook.hTwo}>About Me</h2>
			<p className={aboutLook.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</section>
	);
};

export default AboutMe;
