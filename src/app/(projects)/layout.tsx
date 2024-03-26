import {
	Header,
	ProjectCategoryNavItem,
	ScrollToTop,
} from './_components/layout';
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
				<ProjectCategoryNavItem paths={featuredPaths} />
				<ProjectCategoryNavItem paths={otherPaths} />
			</Header>
			<main className='flex flex-col items-center w-full'>
				{props.interactive}
				{props.children}
			</main>
			<ScrollToTop />
		</>
	);
};

export default ProjectRootLayout;

export const metadata = {
	title: {
		template: 'Nicolas Vo | $s',
		default: 'Nicolas Vo | Portfolio',
	},
};

export const revalidate = false;
