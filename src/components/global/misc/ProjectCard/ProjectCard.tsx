import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import { ProjectCardProps } from "@/lib/props/types/projects";

import look from "./ProjectCard.module.scss";

const ProjectCard = (props: ProjectCardProps) => {
	const { categoryName, project, title, wip } = props;
	const titleCased = title.replace(/([a-z])([A-Z])/g, "$1 $2");
	return (
		<li className={look.cardContainer}>
			<Link
				href={`${categoryName}/${project}`}
				prefetch={false}
				className={look.link}>
				<span className={look.moveable}>
					{titleCased}
					<FaArrowRight />
				</span>
				<Image
					src={`/thumbs/${categoryName}/${project}.webp`}
					alt={`Check out the ${titleCased} project!`}
					width={1920}
					height={1200}
					sizes='(max-aspect-ratio: 1) 100vw, 50vw'
					className={look.background}
				/>
			</Link>
		</li>
	);
};

export default ProjectCard;
