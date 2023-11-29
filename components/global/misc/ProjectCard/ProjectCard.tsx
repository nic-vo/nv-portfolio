import { FaArrowRight } from 'react-icons/fa';

import cardLook from './ProjectCard.module.scss';
import { ProjectCardProps } from '@lib/props/types/projects';

const ProjectCard = (props: ProjectCardProps) => {
	const { categoryName, project, title, wip } = props;
	const titleCased = title.replace(/([a-z])([A-Z])/g, '$1 $2');
	return (
		<li className={cardLook.cardContainer}>
			<a href={`${categoryName}/${project}`} className={cardLook.link}>
				{titleCased}<FaArrowRight />
			</a>
			<img
				src={`thumbs/${categoryName}/${project}.png`}
				className={cardLook.imgBack}
				alt='' />
		</li>
	)
};

export default ProjectCard;
