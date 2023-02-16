import { useState } from "react";

import pInfoCardLook from './ProjectInfoCard.module.scss';

const ProjectInfoCard = ({ techs, description, original }) => {

	return (
		<section className={pInfoCardLook.infoContainer}>
			<p>Original: <a href={original.link} target='_blank'>{original.type === 'github' ? 'Github' : 'Codepen'}</a></p>
			<ul className={pInfoCardLook.techList}>
				{techs.map((tech) => {
					return (
						<li className={pInfoCardLook.tech} key={`${tech}`}>{tech}</li>
					)
				})}
			</ul>
			<p>{description}</p>
		</section>
	);
};

export default ProjectInfoCard;
