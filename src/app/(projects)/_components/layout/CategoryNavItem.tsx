'use client';

import { useContext, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';
import { ToggleContext } from './Header';

import look from './CategoryNavItem.module.scss';
import { latoClass } from '@/styles/fonts';

const CategoryNavItem = (props: {
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

	const classer = catToggled === true ? ` ${look.toggled}` : '';

	return (
		<li
			className='w-full bflag'
			tabIndex={-1}>
			{props.dev === true ? (
				<button
					id='hndev'
					onClick={clickToggleListHandler}
					className={
						latoClass.className +
						` transition-colors cursor-pointer flex justify-between items-center h-16 w-full p-4 text-xl font-bold border-0 border-black border-b bflag ${catToggled ? 'bg-black text-white' : 'bg-white text-black'} z-10`
					}
					aria-label={`Toggle navigation submenu for ${catCased}`}
					aria-pressed={catToggled}
					tabIndex={parentToggled ? 0 : -1}>
					{catCased}
					<FaCaretDown
						className={look.svg + classer}
						aria-hidden='true'
						role='presentation'
					/>
				</button>
			) : (
				<button
					onClick={clickToggleListHandler}
					className={
						latoClass.className +
						`${catToggled ? ` ${look.subcatToggled}` : ''}` +
						` transition-colors cursor-pointer flex justify-between items-center h-16 w-full p-4 text-xl font-bold border-0 border-black border-b bflag ${catToggled ? 'bg-black text-white' : 'bg-white text-black'} z-10`
					}
					aria-label={`Toggle navigation submenu for ${catCased}`}
					aria-pressed={catToggled}
					tabIndex={parentToggled ? 0 : -1}>
					{catCased}
					<FaCaretDown
						className={look.svg + classer}
						aria-hidden='true'
						role='presentation'
					/>
				</button>
			)}
			<menu
				className={look.inCatList + classer + ' bflag z-0'}
				tabIndex={-1}>
				{pages.map((page, index) => {
					if (index === 0 && props.dev === true)
						return (
							<li
								id={props.dev === true && index === 0 ? 'hnlidev' : ''}
								className={look.li + classer + ' bflag'}
								key={`${root}-list-${page.segment}`}
								tabIndex={-1}>
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
								className={look.li + classer + ' bflag'}
								key={`${root}-list-${page.segment}`}
								tabIndex={-1}>
								<Link
									href={`/${root}/${page.segment}`}
									prefetch={false}
									tabIndex={catToggled && parentToggled ? 0 : -1}
									className='bflag'>
									{page.title}
								</Link>
							</li>
						);
				})}
			</menu>
		</li>
	);
};

export default CategoryNavItem;