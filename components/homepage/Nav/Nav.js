import ProjectCard from '../ProjectCard/ProjectCard';

import navLook from './Nav.module.scss';

const Nav = ({ projectList }) => {
	return (
		<section>
			<nav className={navLook.nav}>
				{projectList.map((category) => {
					const { categoryName, projects } = category;
					return (
						<section key={`${category.categoryName}-links`} className={navLook.catSection}>
							<h2 className={navLook.header}>{categoryName === 'fcc' ? 'freeCodeCamp' : categoryName[0].toUpperCase() + categoryName.slice(1)}</h2>
							{projects.length !== 0 ?
								<ul className={navLook.list}>
									{
										projects.map((projectObj) => {
											const { title, techs, project, wip } = projectObj;
											return (
												<ProjectCard categoryName={categoryName} title={title} project={project} techs={techs} wip={wip} key={`${categoryName}-${title}`} />
											)
										})
									}
								</ul> : <em>There&apos;s nothing here...yet</em>
							}
						</section>
					)
				})}
			</nav>
		</section>
	);
};

export default Nav;
