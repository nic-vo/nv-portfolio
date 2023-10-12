import Link from "next/link";
import { useState, } from "react";
import { FaCaretDown } from "react-icons/fa";

import pCatNavLook from './ProjectCategoryNavItem.module.scss';

const ProjectCategoryNavItem = ({ category, dev }) => {
	const [catToggled, setCatToggled] = useState(false);

	const { categoryName, projects } = category;
	const catCased = categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase();

	const clickToggleListHandler = () => {
		setCatToggled(!catToggled);
	};

	const classer = catToggled === true ? ` ${pCatNavLook.toggled}` : '';

	return (
		<li className={pCatNavLook.liContainer}>
			{
				dev === true ?
					<button
						id='hndev'
						onClick={clickToggleListHandler}
						className={pCatNavLook.toggler}>
						{catCased}<FaCaretDown className={pCatNavLook.svg + classer} />
					</button>
					:
					<button
						onClick={clickToggleListHandler}
						className={pCatNavLook.toggler}>
						{catCased}<FaCaretDown className={pCatNavLook.svg + classer} />
					</button>
			}
			<ul className={pCatNavLook.inCatList + classer}>
				{
					projects.map((project, index) => {
						if (index === 0 && dev === true) return (
							<li
								id={dev === true && index === 0 ? 'hnlidev' : ''}
								className={pCatNavLook.li + classer}
								key={`${categoryName}-list-${project.project}`}>
								<Link href={`/${categoryName}/${project.project}`}>
									{project.title}
								</Link>
							</li>
						);
						else
							return (
								<li
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
}

export default ProjectCategoryNavItem;
