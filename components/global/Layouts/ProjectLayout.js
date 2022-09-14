import Head from "next/head";

const ProjectLayout = ({ children }) => {
	return (
		<>
			<header><h1>Header</h1></header>
			<main>
				{children}
			</main>
			<footer><h1>Footer</h1></footer>
		</>
	);
};

export default ProjectLayout;
