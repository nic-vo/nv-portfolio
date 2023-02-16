import Link from "next/link";

const ProjectCategoryNavItem = ({ category }) => {
	const { categoryName, projects } = category;
	console.log(categoryName)
	return (
		<li>
			<span>{categoryName}</span>
			<ul style={{ listStyle: 'none' }}>
				{projects.map((project) => {
					return (
						<li key={`${categoryName}-list-${project.project}`}>
							<Link href={`/${categoryName}/${project.project}`}>{project.title}</Link>
						</li>
					)
				})}
			</ul>
		</li>
	);
};

export default ProjectCategoryNavItem;
