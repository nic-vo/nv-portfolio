import Crosses from './Crosses/Crosses';

import heroLook from './Hero.module.scss';

const Hero = () => {
	return (
		<header className={heroLook.hOne}>
			<h1 className={heroLook.name}>Nicolas Vo</h1>
			<h2 className={heroLook.title}>Frontend Developer</h2>
			<Crosses limit={40} />
		</header>
	);
}

export default Hero;
