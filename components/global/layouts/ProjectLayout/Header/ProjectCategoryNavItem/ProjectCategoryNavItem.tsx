import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import pCatNavLook from './ProjectCategoryNavItem.module.scss';
import Link from 'next/link';

const ProjectCategoryNavItem = (props: {
	category: {
		categoryName: string,
		projects: {
			project: string,
			title: string
		}[]
	},
	dev: boolean
}) => {
	const [catToggled, setCatToggled] = useState(false);

	const { categoryName, projects } = props.category;
	const catCased = categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase();

	const clickToggleListHandler = () => {
		setCatToggled(!catToggled);
	};

	const classer = catToggled === true ? ` ${pCatNavLook.toggled}` : '';

	return (
		<li className={pCatNavLook.liContainer}>
			{
				props.dev === true ?
					<button
						id='hndev'
						onClick={clickToggleListHandler}
						className={pCatNavLook.toggler}
						aria-label={`Toggle navigation submenu for ${catCased}`}
						aria-pressed={catToggled}>
						{catCased}
						<FaCaretDown
							className={pCatNavLook.svg + classer}
							aria-hidden='true'
							role='presentation' />
					</button>
					:
					<button
						onClick={clickToggleListHandler}
						className={pCatNavLook.toggler}
						aria-label={`Toggle navigation submenu for ${catCased}`}
						aria-pressed={catToggled}>
						{catCased}
						<FaCaretDown
							className={pCatNavLook.svg + classer}
							aria-hidden='true'
							role='presentation' />
					</button>
			}
			<ul className={pCatNavLook.inCatList + classer}>
				{
					projects.map((project, index) => {
						if (index === 0 && props.dev === true) return (
							<li
								id={props.dev === true && index === 0 ? 'hnlidev' : ''}
								className={pCatNavLook.li + classer}
								key={`${categoryName}-list-${project.project}`}
								tabIndex={-1}>
								<Link href={`/${categoryName}/${project.project}`} prefetch={false}>
									{project.title}
								</Link>
							</li>
						);
						else
							return (
								<li
									className={pCatNavLook.li + classer}
									key={`${categoryName}-list-${project.project}`}
									tabIndex={-1}	>
									<Link href={`/${categoryName}/${project.project}`} prefetch={false}>
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
