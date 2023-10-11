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
			<AboutMe />
			<Crosses limit={20} />
		</>
	);
}

export default Hero;
