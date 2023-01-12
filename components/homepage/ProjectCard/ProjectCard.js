import cardLook from './ProjectCard.module.scss';

const ProjectCard = ({ title, techs, description }) => {
	return (
		<div>ProjectCard
			<h3>{title}</h3>
			<ul>
				{techs.map(tech => {
					return (
						<li>{tech}</li>
					)
				})}
			</ul>
			<p>{description}</p>
		</div>
	)
};

export default ProjectCard;
