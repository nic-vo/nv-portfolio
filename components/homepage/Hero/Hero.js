import AboutMe from '../AboutMe/AboutMe';
import Crosses from './Crosses/Crosses';

import heroLook from './Hero.module.scss';

const Hero = () => {
	return (
		<>
			<header className={heroLook.hOne}>
				<h1 className={heroLook.name}>Nicolas Vo</h1>
				<h2 className={heroLook.title}>Frontend Developer</h2>
			</header>
			<section className={heroLook.container} id='hero'>
				<hr className={heroLook.line} />
				<AboutMe />
			</section>
			<Crosses limit={30} />
		</>
	);
}

export default Hero;
