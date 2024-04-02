import { Metadata } from 'next';
import { Hero, Nav, AboutMe } from './_components/page';
import { sharedOGData } from '@/data/metadata';

const title = 'Nicolas Vo | Front End Developer';
const description = "Nicolas Vo's personal front-end development portfolio";

const Homepage = () => {
	return (
		<main className='min-h-svh flex flex-col items-center w-full'>
			<Hero />
			<AboutMe />
			<Nav />
		</main>
	);
};

export default Homepage;

export const metadata: Metadata = {
	title,
	description,
	openGraph: { ...sharedOGData, title, description },
};

export const revalidate = false;
