import Crosses from './Crosses/Crosses';

import heroLook from './Hero.module.scss';

const Hero = () => {

	return (
		<section className={heroLook.container}>
			<h1 className={heroLook.hOne}>
				<p className={heroLook.name}>Nicolas Vo</p>
				<p className={heroLook.title}>Frontend Developer</p>
			</h1>
			<Crosses limit={50} />
		</section>
	);
};

export default Hero;
