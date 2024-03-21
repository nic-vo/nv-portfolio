import Header from '@/components/global/layouts/ProjectLayout/Header/Header';
import ScrollToTop from '@/components/global/layouts/ProjectLayout/ScrollToTop/ScrollToTop';
import { getFeaturedPaths, getOtherPaths } from '@/lib/props/paths';
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
				<>{/* TODO: Fetch list of available projects */}</>
			</Header>
			<main>
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
