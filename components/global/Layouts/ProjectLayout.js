import projectStyles from './ProjectLayout.module.css';

const ProjectLayout = ({ children }) => {
	return (
		<>
			<header>
				<h1>Header</h1>
				<nav>
					<ul>
						<li style={{ listStyle: "none" }}>
							<a href="/" style={{ listStyle: "none" }}>Back to home</a>
						</li>
						<li style={{ listStyle: "none" }}>
							<a href="/fcc/Calculator" style={{ listStyle: "none" }} >Calculator</a>
						</li>
						<li style={{ listStyle: "none" }}>
							<a href="/fcc/DrumMachine" style={{ listStyle: "none" }} >Drum Machine</a>
						</li>
					</ul>
				</nav>
			</header>
			<main className={projectStyles.projectMain}>
				{children}
			</main>
			<footer><h1>Footer</h1></footer>
		</>
	);
};

export default ProjectLayout;
