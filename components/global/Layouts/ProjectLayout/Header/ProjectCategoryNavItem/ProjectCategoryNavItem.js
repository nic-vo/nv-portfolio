import Link from "next/link";
import { useState, } from "react";
import { FaCaretDown } from "react-icons/fa";

import pCatNavLook from './ProjectCategoryNavItem.module.scss';

const ProjectCategoryNavItem = ({ category }) => {
	const { categoryName, projects } = category;
	const [catToggled, setCatToggled] = useState(false);

	const categoryDisplay = categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase();

	const toggleListHandler = () => {
		setCatToggled(!catToggled);
	};

	const classer = catToggled === true ? ` ${pCatNavLook.toggled}` : '';

	return (
		<li className={pCatNavLook.liContainer}>
			<button onClick={toggleListHandler} className={pCatNavLook.toggler}><p>{categoryDisplay}</p><FaCaretDown className={pCatNavLook.svg + classer} /></button>
			<ul className={pCatNavLook.inCatList + classer}>
				{projects.map((project) => {
					return (
						<li className={pCatNavLook.li + classer} key={`${categoryName}-list-${project.project}`}>
							<Link href={`/${categoryName}/${project.project}`}>{project.title}</Link>
						</li>
					);
				})}
			</ul>
		</li>
	);
};

export default ProjectCategoryNavItem;
