import TechBubble from '../../../misc/TechBubble/TechBubble';

import look from './ProjectInfo.module.scss';

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
			<h1 className={look.title}>{title}</h1>
			<section className={look.container}>
				<section
					className={look.description}
					dangerouslySetInnerHTML={{ __html: description }} />
				<section>
					<h2>Tech used:</h2>
					<ul className={look.techList}>
						{
							techs.map((tech) => {
								return (
									<TechBubble key={`${tech}`} tech={tech} />
								);
							})
						}
					</ul>
				</section>
				<section className={look.linkIntro}>
					<h2>Link to original:</h2>
					<a
						href={link}
						target='_blank'
						className={look.link + ' ' + linkClasser}>
						{typeDisplay}
					</a>
				</section>
			</section>
		</>
	);
};

export default ProjectInfo;
