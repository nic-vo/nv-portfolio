import { useState } from "react";

import pInfoCardLook from './ProjectInfoCard.module.scss';

const ProjectInfoCard = ({ techs, description, original }) => {
	const [toggled, setToggled] = useState(false);

	return (
		<section className={pInfoCardLook.info}>
			<ul>
				{techs.map((tech) => {
					return (
						<li key={`${tech}`}>{tech}</li>
					)
				})}
			</ul>
			<p>{description}</p>
			<p>Original: <a href={original.link}>{original.type === 'github' ? 'Github' : 'Codepen'}</a></p>
		</section>
	);
};

export default ProjectInfoCard;
