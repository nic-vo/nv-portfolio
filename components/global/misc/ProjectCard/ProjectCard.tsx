import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import cardLook from './ProjectCard.module.scss';
import { ProjectCardProps } from '@lib/props/types/projects';

const ProjectCard = (props: ProjectCardProps) => {
	const { categoryName, project, title, wip } = props;
	const titleCased = title.replace(/([a-z])([A-Z])/g, '$1 $2');
	return (
		<li className={cardLook.cardContainer}>
			<div className={cardLook.infoContainer}>
				<h4 className={cardLook.projectTitle}>{titleCased}</h4>
				{
					wip === false &&
					<Link href={`${categoryName}/${project}`} className={cardLook.link}>
						Check it out<FaArrowRight />
					</Link>
				}
			</div>
			<img
				src={`thumbs/${categoryName}/${project}.png`}
				className={cardLook.imgBack}
				alt='' />
		</li>
	)
};

export default ProjectCard;
