import { Metadata } from 'next';

const Homepage = () => {
	return <main></main>;
};

export default Homepage;

export const metadata: Metadata = {
	title: 'Nicolas Vo | Front End Developer',
	description: "Nicolas Vo's personal front-end development portfolio",
};

export const revalidate = false;
