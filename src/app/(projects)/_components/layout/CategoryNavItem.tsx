'use client';

import { useContext, useState } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import Link from 'next/link';
import { ToggleContext } from './Header';
import { ProjectInfo } from '../page/parts';

const CategoryNavItem = (props: {
	paths: {
		root: string;
		pages: { segment: string; data: ProjectInfo }[];
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

	return (
		<li
			className='w-full bflag'
			tabIndex={-1}>
			<div>
				<button
					onClick={clickToggleListHandler}
					className={`font-lato transition-colors cursor-pointer flex justify-between items-center h-16 w-full p-4 text-xl font-bold border-b border-black bflag ${catToggled ? 'bg-black text-white' : 'bg-white text-black'} z-10 outline-black focus-visible:outline`}
					aria-label={`${catToggled ? 'Close' : 'Open'} navigation submenu for ${catCased}`}
					aria-pressed={catToggled && !parentToggled}
					tabIndex={parentToggled ? 0 : -1}>
					{catCased}
					<IoCaretDown
						className={`block text-2xl transition-all ${catToggled ? 'rotate-180' : ''}`}
						aria-hidden='true'
					/>
				</button>
				<menu
					className={`${catToggled ? 'flex' : 'hidden'} flex-col relative m-0 p-0 list-none py-4 gap-4 z-0 border-b border-black bflag`}
					tabIndex={-1}
					aria-expanded={catToggled && !parentToggled}>
					{pages.map((page) => {
						const { segment, data } = page;
						const { title } = data;
						return (
							<li
								className='relative overflow-x-hidden w-full transition-all bflag'
								key={`${root}-list-${segment}`}
								tabIndex={-1}>
								<Link
									href={`/${root}/${segment}`}
									prefetch={false}
									tabIndex={catToggled && parentToggled ? 0 : -1}
									className='flex items-center p-2 h-12 translate-x-4 text-black bg-white font-light transition-all focus-visible:bg-black focus-visible:text-white hover:bg-black hover:text-white focus-visible:translate-x-0 hover:translate-x-0 rounded-md bflag outline-none'>
									{title}
								</Link>
							</li>
						);
					})}
				</menu>
			</div>
		</li>
	);
};

export default CategoryNavItem;
