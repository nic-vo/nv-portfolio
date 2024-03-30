import { Header, CategoryNavItem, ScrollToTop } from './_components/layout';
import { getFeaturedPaths, getOtherPaths } from '../_components/paths';
import { PropsWithChildren } from 'react';

const ProjectRootLayout = async (
	props: PropsWithChildren & { interactive: React.ReactNode },
) => {
	const [featuredPaths, otherPaths] = await Promise.all([
		getFeaturedPaths(),
		getOtherPaths(),
	]);
	return (
		<>
			<Header>
				<CategoryNavItem paths={featuredPaths} />
				<CategoryNavItem paths={otherPaths} />
			</Header>
			<main className='flex flex-col items-center w-full gap-8'>
				{props.interactive}
				{props.children}
			</main>
			<ScrollToTop />
		</>
	);
};

export default ProjectRootLayout;
