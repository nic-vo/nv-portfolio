import { ProjectCard } from '../../global';

import homeLook from '../Homepage.module.scss';
import navLook from './Nav.module.scss';

const Nav = ({ projectList }) => {
	return (
		<section className={navLook.container} id='projectNav'>
			<h2 className={homeLook.hTwo}>Projects</h2>
			<nav className={navLook.nav}>
				{
					projectList.map((category) => {
						const { categoryName, projects } = category;
						return (
							<section key={`${category.categoryName}-links`} className={navLook.catSection}>
								<h3 className={navLook.catHeading}>
									{categoryName[0].toUpperCase() + categoryName.slice(1)}
								</h3>
								{
									<ul className={navLook.list}>
										{
											projects.map((projectObj) => {
												const { title, techs, project, wip } = projectObj;
												return (
													<ProjectCard
														categoryName={categoryName}
														title={title}
														project={project}
														techs={techs}
														wip={wip}
														key={`${categoryName}-${title}`} />
												);
											})
										}
									</ul>
								}
							</section>
						);
					})
				}
			</nav>
		</section>
	);
};

export default Nav;
