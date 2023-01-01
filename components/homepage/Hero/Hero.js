import Crosses from './Crosses/Crosses';

import heroLook from './Hero.module.scss';

const Hero = () => {

	return (
		<section className={heroLook.container}>
			<h1>
				<p>Nicolas Vo</p>
				<p>Front-end Developer</p>
			</h1>
			<Crosses />
		</section>
	);
};

export default Hero;
