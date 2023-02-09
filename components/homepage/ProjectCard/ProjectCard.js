import cardLook from './ProjectCard.module.scss';

const ProjectCard = ({ categoryName, project, title, techs }) => {
	return (
		<div className={cardLook.cardContainer}>
			<h3 className={cardLook.header}>{title.replace(/([a-z])([A-Z])/g, '$1 $2')}</h3>
			<ul className={cardLook.techList}>
				{techs.map((tech, index) => {
					return <li className={cardLook.tech} style={{ transitionDelay: `calc(${index}*50ms)` }} key={`${categoryName}-${title}-${tech}`}>{tech}</li>
				})}
			</ul>
			<a href={`${categoryName}/${project}`} className={cardLook.link} >Link / Live</a>
			<img src={`thumbs/${categoryName}/${project}.png`} className={cardLook.imgBack} />
		</div>
	)
};

export default ProjectCard;
