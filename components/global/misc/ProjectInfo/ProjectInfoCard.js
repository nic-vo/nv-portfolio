import TechBubble from '../TechBubble/TechBubble';

import pInfoCardLook from './ProjectInfoCard.module.scss';

const ProjectInfoCard = ({ techs, description, original }) => {

	const { type, link } = original;

	const typeDisplay = type[0].toUpperCase() + type.slice(1);

	let linkClasser;
	switch (type) {
		case 'github':
			linkClasser = pInfoCardLook.github;
			break;
		case 'codepen':
			linkClasser = pInfoCardLook.codepen;
			break;
		default:
			linkClasser = pInfoCardLook.liveLink;
			break;
	};

	return (
		<section className={pInfoCardLook.container}>
			<ul className={pInfoCardLook.techList}>
				{
					techs.map((tech) => {
						return (
							<TechBubble key={`${tech}`} tech={tech} />
						)
					})
				}
			</ul>
			<p className={pInfoCardLook.description}>{description}</p>
			<div className={pInfoCardLook.linkIntro}><p>Link to original:</p><a href={original.link} target='_blank' className={pInfoCardLook.link + ' ' + linkClasser}> {typeDisplay}</a></div>
		</section>
	);
};

export default ProjectInfoCard;
