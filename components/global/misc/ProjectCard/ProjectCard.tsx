import { FaArrowRight } from 'react-icons/fa';

import { ProjectCardProps } from '@lib/props/types/projects';

import look from './ProjectCard.module.scss';

const ProjectCard = (props: ProjectCardProps) => {
	const { categoryName, project, title, wip } = props;
	const titleCased = title.replace(/([a-z])([A-Z])/g, '$1 $2');
	return (
		<li className={look.cardContainer}
			style={{
				backgroundImage:
					`url('thumbs/${categoryName}/${project}.png')`
			}}>
			<a
				href={`${categoryName}/${project}`}
				className={look.link}
			>
				<span className={look.moveable}>{titleCased}<FaArrowRight /></span>
			</a>
		</li>
	)
};

export default ProjectCard;
