'use client';

import { useContext, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';

import pCatNavLook from './ProjectCategoryNavItem.module.scss';
import { latoClass } from '@/styles/fonts';
import { ToggleContext } from './Header';

const ProjectCategoryNavItem = (props: {
	paths: {
		root: string;
		pages: {
			segment: string;
			title: string;
		}[];
	};
	dev?: boolean;
}) => {
	const { root, pages } = props.paths;
	const [catToggled, setCatToggled] = useState(false);
	const parentToggled = useContext(ToggleContext);

	const catCased = root[0].toUpperCase() + root.slice(1).toLowerCase();

	const clickToggleListHandler = () => {
		setCatToggled(!catToggled);
	};

	const classer = catToggled === true ? ` ${pCatNavLook.toggled}` : '';

	return (
		<li
			className='w-full'
			tabIndex={parentToggled ? 0 : -1}>
			{props.dev === true ? (
				<button
					id='hndev'
					onClick={clickToggleListHandler}
					className={
						latoClass.className +
						' cursor-pointer flex justify-between items-center h-16 w-full p-4 text-xl font-bold bg-inherit text-inherit border-0 border-black border-b'
					}
					aria-label={`Toggle navigation submenu for ${catCased}`}
					aria-pressed={catToggled}
					tabIndex={parentToggled ? 0 : -1}>
					{catCased}
					<FaCaretDown
						className={pCatNavLook.svg + classer}
						aria-hidden='true'
						role='presentation'
					/>
				</button>
			) : (
				<button
					onClick={clickToggleListHandler}
					className={
						latoClass.className +
						' cursor-pointer flex justify-between items-center h-16 w-full p-4 text-xl font-bold bg-inherit text-inherit border-0 border-black border-b'
					}
					aria-label={`Toggle navigation submenu for ${catCased}`}
					aria-pressed={catToggled}
					tabIndex={parentToggled ? 0 : -1}>
					{catCased}
					<FaCaretDown
						className={pCatNavLook.svg + classer}
						aria-hidden='true'
						role='presentation'
					/>
				</button>
			)}
			<ul
				className={pCatNavLook.inCatList + classer}
				tabIndex={catToggled && parentToggled ? 0 : -1}>
				{pages.map((page, index) => {
					if (index === 0 && props.dev === true)
						return (
							<li
								id={props.dev === true && index === 0 ? 'hnlidev' : ''}
								className={pCatNavLook.li + classer}
								key={`${root}-list-${page.segment}`}
								tabIndex={catToggled && parentToggled ? 0 : -1}>
								<Link
									href={`/${root}/${page.segment}`}
									prefetch={false}
									tabIndex={catToggled && parentToggled ? 0 : -1}>
									{page.title}
								</Link>
							</li>
						);
					else
						return (
							<li
								className={pCatNavLook.li + classer}
								key={`${root}-list-${page.segment}`}
								tabIndex={catToggled && parentToggled ? 0 : -1}>
								<Link
									href={`/${root}/${page.segment}`}
									prefetch={false}
									tabIndex={catToggled && parentToggled ? 0 : -1}>
									{page.title}
								</Link>
							</li>
						);
				})}
			</ul>
		</li>
	);
};

export default ProjectCategoryNavItem;
