import { Metadata } from 'next';
import { Hero, Nav, AboutMe } from './_components/page';

const Homepage = () => {
	return (
		<main className='min-h-svh flex flex-col items-center'>
			<Hero />
			<AboutMe />
			<Nav />
		</main>
	);
};

export default Homepage;

export const metadata: Metadata = {
	title: 'Nicolas Vo | Front End Developer',
	description: "Nicolas Vo's personal front-end development portfolio",
};

export const revalidate = false;
