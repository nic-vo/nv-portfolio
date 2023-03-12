import Link from "next/link";
import { useState, } from "react";
import { FaCaretDown } from "react-icons/fa";

import pCatNavLook from './ProjectCategoryNavItem.module.scss';

const ProjectCategoryNavItem = ({ category, dev }) => {
	const [catToggled, setCatToggled] = useState(false);

	const { categoryName, projects } = category;
	const catCased = categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase();

	const toggleListHandler = () => {
		setCatToggled(!catToggled);
	};

	const classer = catToggled === true ? ` ${pCatNavLook.toggled}` : '';

	return (
		<li className={pCatNavLook.liContainer}>
			<button
				id={dev === true ? 'hndev' : ''}
				onClick={toggleListHandler}
				className={pCatNavLook.toggler}>
				<p>{catCased}</p><FaCaretDown className={pCatNavLook.svg + classer} />
			</button>
			<ul className={pCatNavLook.inCatList + classer}>
				{
					projects.map((project, index) => {
						return (
							<li
								id={dev === true && index === 0 ? 'hnlidev' : ''}
								className={pCatNavLook.li + classer}
								key={`${categoryName}-list-${project.project}`}>
								<Link href={`/${categoryName}/${project.project}`}>
									{project.title}
								</Link>
							</li>
						);
					})
				}
			</ul>
		</li>
	);
};

export default ProjectCategoryNavItem;
