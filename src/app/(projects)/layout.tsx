import Header from '@/components/global/layouts/ProjectLayout/Header/Header';
import ProjectCategoryNavItem from '@/components/global/layouts/ProjectLayout/Header/ProjectCategoryNavItem/ProjectCategoryNavItem';
import ScrollToTop from '@/components/global/layouts/ProjectLayout/ScrollToTop/ScrollToTop';
import { getFeaturedPaths, getOtherPaths } from '@/lib/props/paths';
import { PropsWithChildren } from 'react';

const ProjectRootLayout = async (
	props: PropsWithChildren & { description: React.ReactNode },
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
				{props.children}
				{props.description}
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