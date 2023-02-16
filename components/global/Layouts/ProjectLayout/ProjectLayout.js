import Footer from '../../misc/Footer/Footer';
import Header from './Header/Header';
import ProjectInfoCard from '../../misc/ProjectInfo/ProjectInfoCard';

import pLayoutLook from './ProjectLayout.module.scss';
import pLoadingLook from './ProjectLoad.module.scss';

const ProjectLayout = ({ children, layoutData, projectData }) => {
	const { version, linkExclude } = layoutData;
	const { otherProjects } = layoutData;
	const { title, description, techs, original } = projectData;

	return (
		<>
			<Header otherProjects={otherProjects} linkExclude={linkExclude} />
			<main className={pLayoutLook.projectMain}>
				<section className={`${pLayoutLook.projectContainer} ${pLoadingLook.project}`}>{children}</section>
				<h1 className={`${pLayoutLook.title} ${pLoadingLook.splash}`}>{title}</h1>
				<ProjectInfoCard description={description} techs={techs} original={original} />
			</main>
			<Footer version={version} />
		</>
	);
};

export default ProjectLayout;
