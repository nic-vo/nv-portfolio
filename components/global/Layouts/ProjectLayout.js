import Footer from '../misc/Footer/Footer';

import projectLayoutLook from './ProjectLayout.module.scss';

const ProjectLayout = ({ children, layoutData, projectData }) => {
	const { version, linkExclude } = layoutData;
	const { otherProjects } = layoutData;
	const { title, description, techs, original } = projectData;
	return (
		<>
			<header>
				<nav>
					<ul>
						<li style={{ listStyle: 'none' }}>
							<a href='/' style={{ listStyle: 'none' }}>Back to home</a>
						</li>
						{pages.filter((page) => { return page !== linkExclude }).map((page) => {
							return (<li style={{ listStyle: 'none' }} key={`projectPage-navListItem-${category}-${page}`}>
								<a href={`/${category}/${page}`}>{page.replace(/(\w)([A-Z])/, '$1 $2')}</a>
							</li>)
						})}
					</ul>
				</nav>
			</header>
			<main className={projectLayoutLook.projectMain}>
				<h1>{title}</h1>
				{children}
				<section>
					<ul>
						{techs.map((tech) => {
							return (
								<li key={`${tech}`}>{tech}</li>
							)
						})}
					</ul>
					<p>{description}</p>
					<p>Original: <a href={original.link}>{original.type === 'github' ? 'Github' : 'Codepen'}</a></p>
				</section>
			</main>
			<Footer version={version} />
		</>
	);
};

export default ProjectLayout;
