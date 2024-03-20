import Footer from '../../../../app/_components_/Footer/Footer';
import Header from './Header/Header';
import ProjectCategoryNavItem from './Header/ProjectCategoryNavItem/ProjectCategoryNavItem';
import ScrollToTop from './ScrollToTop/ScrollToTop';

import layoutLook from './ProjectLayout.module.scss';
import { LayoutData } from '@/lib/props/types/projects';

const ProjectLayout = (props: {
	children: React.ReactNode;
	layoutData: LayoutData;
}) => {
	const { version, otherProjects } = props.layoutData;

	const projectCategoryList = otherProjects.map((category, index) => {
		return (
			<ProjectCategoryNavItem
				dev={index === 0 ? true : false}
				category={category}
				key={`${category.categoryName}`}
			/>
		);
	});

	return (
		<>
			<Header>{projectCategoryList}</Header>
			<main className={layoutLook.projectMain}>{props.children}</main>
			<ScrollToTop />
			<Footer version={version} />
		</>
	);
};

export default ProjectLayout;
