import Head from 'next/head';
import Footer from '../../misc/Footer/Footer';
import Header from './Header/Header';
import ProjectCategoryNavItem from './Header/ProjectCategoryNavItem/ProjectCategoryNavItem';
import ProjectInfoCard from '../../misc/ProjectInfo/ProjectInfoCard';
import ScrollToTop from '../../misc/ScrollToTop/ScrollToTop';

import layoutLook from './ProjectLayout.module.scss';
import loadLook from './ProjectLoad.module.scss';

const ProjectLayout = ({ children, layoutData, projectData }) => {
	const { version, otherProjects } = layoutData;
	const { title,
		description,
		techs,
		original,
		slugline,
		project,
		category } = projectData;

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
			<Head>
				<title>{title}</title>
				<meta name='description' content={slugline} />
				<meta property='og:description' content={slugline} />
				<meta property='og:image' content={`thumbs/${category}/${project}.png`} />
			</Head>

			<Header>
				{projectCategoryList}
			</Header>
			<main className={layoutLook.projectMain}>
				<section className={`${layoutLook.projectContainer} ${loadLook.project}`}>
					{children}
				</section>
				<h1 className={`${layoutLook.title} ${loadLook.splash}`}>{title}</h1>
				<ProjectInfoCard
					description={description}
					techs={techs}
					original={original} />
				<ScrollToTop />
			</main>
			<Footer version={version} />
		</>
	);
};

export default ProjectLayout;
