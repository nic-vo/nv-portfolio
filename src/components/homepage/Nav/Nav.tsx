import { ProjectListProp } from '@lib/props/types/projects';
import { ProjectCard } from '../../global';

import homeLook from '../Homepage.module.scss';
import navLook from './Nav.module.scss';

const Nav = (props: {
	projectList: ProjectListProp[]
}) => {
	const { projectList } = props;
	return (
		<nav className={navLook.nav}>
			{projectList.map((cat) => {
				const { categoryName: catName, projects } = cat;
				return (
					<section key={`${catName}-links`}
						className={navLook.catSection}>
						<h2 className={homeLook.hTwo}>
							{catName[0].toUpperCase() + catName.slice(1)} Projects
						</h2>
						<ul className={navLook.list}>
							{projects.map((projectObj) => {
								const { title, project, wip } = projectObj;
								return (
									<ProjectCard
										categoryName={catName}
										title={title}
										project={project}
										wip={wip}
										key={`${catName}-${title}`} />
								);
							})}
						</ul>
					</section>
				);
			})}
		</nav>
	);
}

export default Nav;
