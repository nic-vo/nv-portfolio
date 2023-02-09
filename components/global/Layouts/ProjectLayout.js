import Footer from '../misc/Footer/Footer';
import Header from '../misc/Header/Header';
import ProjectInfoCard from '../misc/ProjectInfo/ProjectInfoCard';

import projectLayoutLook from './ProjectLayout.module.scss';

const ProjectLayout = ({ children, layoutData, projectData }) => {
	const { version, linkExclude } = layoutData;
	const { otherProjects } = layoutData;
	const { title, description, techs, original } = projectData;
	return (
		<>
			<Header otherProjects={otherProjects} linkExclude={linkExclude} />
			<main className={pLayoutLook.projectMain}>
				<h1 className={pLayoutLook.title}>{title}</h1>
				<ProjectInfoCard description={description} techs={techs} original={original} />
				{children}
			</main>
			<Footer version={version} />
		</>
	);
};

export default ProjectLayout;
