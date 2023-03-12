import Head from 'next/head';
import Footer from '../../misc/Footer/Footer';
import Header from './Header/Header';
import ProjectInfoCard from '../../misc/ProjectInfo/ProjectInfoCard';
import ScrollToTop from '../../misc/ScrollToTop/ScrollToTop';

import layoutLook from './ProjectLayout.module.scss';
import loadLook from './ProjectLoad.module.scss';

const ProjectLayout = ({ children, layoutData, projectData }) => {
	const { version, linkExclude } = layoutData;
	const { otherProjects } = layoutData;
	const { title,
		description,
		techs,
		original,
		slugline,
		project,
		category } = projectData;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={slugline} />
				<meta property='og:description' content={slugline} />
				<meta property='og:image' content={`thumbs/${category}/${project}.png`} />
			</Head>

			<Header otherProjects={otherProjects} linkExclude={linkExclude} />
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
