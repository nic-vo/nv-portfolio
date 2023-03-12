import AboutMe from '../AboutMe/AboutMe';
import Crosses from './Crosses/Crosses';

import heroLook from './Hero.module.scss';

const Hero = () => {
	return (
		<section className={heroLook.container} id='hero'>
			<h1 className={heroLook.hOne}>
				<p className={heroLook.name}>Nicolas Vo</p>
				<p className={heroLook.title}>Front End Developer</p>
			</h1>
			<hr className={heroLook.line} />
			<AboutMe />
			<Crosses limit={50} />
		</section>
	);
};

export default Hero;
