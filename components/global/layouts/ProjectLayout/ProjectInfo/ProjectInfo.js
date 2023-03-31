import TechBubble from '../../../misc/TechBubble/TechBubble';

import look from './ProjectInfo.module.scss';
import loadLook from '../ProjectLoad.module.scss';

const ProjectInfo = ({ title, techs, description, original }) => {
	const { type, link } = original;
	const typeDisplay = type[0].toUpperCase() + type.slice(1);

	let linkClasser;
	switch (type) {
		case 'github':
			linkClasser = look.github;
			break;
		case 'codepen':
			linkClasser = look.codepen;
			break;
		default:
			linkClasser = look.liveLink;
			break;
	};

	return (
		<>
			<h1 className={`${look.title} ${loadLook.splash}`}>{title}</h1>
			<section className={look.container}>
				<ul className={look.techList}>
					{
						techs.map((tech) => {
							return (
								<TechBubble key={`${tech}`} tech={tech} />
							);
						})
					}
				</ul>
				<hr className={look.break} />
				<section
					className={look.description}
					dangerouslySetInnerHTML={{ __html: description }} />
				<div className={look.linkIntro}>
					<p>Link to original:</p>
					<a
						href={link}
						target='_blank'
						className={look.link + ' ' + linkClasser}>
						{typeDisplay}
					</a>
				</div>
			</section>
		</>
	);
};

export default ProjectInfo;
