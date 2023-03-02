import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import { TechBubble } from '../../global';

import cardLook from './ProjectCard.module.scss';

const ProjectCard = ({ categoryName, project, title, techs, wip }) => {
	return (
		<li className={cardLook.cardContainer}>
			<h4 className={cardLook.projectTitle}>{title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h4>
			<ul className={cardLook.techList}>
				{techs.map((tech, index) => {
					return <TechBubble key={`${categoryName}-${project}-${tech}`} tech={tech} styler={{ transitionDelay: `${index * 50}ms` }} />
				})}
			</ul>
			{wip === false && <Link href={`${categoryName}/${project}`} className={cardLook.link}>Check it out<FaArrowRight /></Link>}
			<img src={`thumbs/${categoryName}/${project}.png`} className={cardLook.imgBack} />
		</li>
	)
};

export default ProjectCard;
