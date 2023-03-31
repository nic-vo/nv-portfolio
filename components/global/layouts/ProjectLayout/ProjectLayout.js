import Footer from '../../misc/Footer/Footer';
import Header from './Header/Header';
import ProjectCategoryNavItem from './Header/ProjectCategoryNavItem/ProjectCategoryNavItem';
import ScrollToTop from './ScrollToTop/ScrollToTop';

import layoutLook from './ProjectLayout.module.scss';

const ProjectLayout = ({ children, layoutData }) => {
	const { version, otherProjects } = layoutData;

	const projectCategoryList = otherProjects.map((category, index) => {
		return (
			<ProjectCategoryNavItem
				dev={index === 0 ? true : false}
				category={category}
				key={`${category.categoryName}`} />
		);
	});

	return (
		<>
			<Header>
				{projectCategoryList}
			</Header>
			<main className={layoutLook.projectMain}>
				{children}
				<ScrollToTop />
			</main>
			<Footer version={version} />
		</>
	);
};

export default ProjectLayout;
