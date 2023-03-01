import Link from 'next/link';
import ProjectCategoryNavItem from './ProjectCategoryNavItem/ProjectCategoryNavItem';
import { useState, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';

import headerLook from './Header.module.scss';

const Header = ({ otherProjects }) => {

	const [toggled, setToggled] = useState(false);
	const toggleHandler = (e) => {
		e.preventDefault();
		setToggled(!toggled);
	};

	const categorySections = useMemo(() => {
		return otherProjects.map((category) => {
			return (
				<ProjectCategoryNavItem category={category} key={`${category.categoryName}`} />
			);
		});
	}, []);

	const classer = toggled === true ? ` ${headerLook.toggled}` : '';

	return (
		<header className={headerLook.header + classer}>
			<button onPointerDown={toggleHandler} className={headerLook.toggler + classer}><FaPlus className={headerLook.svg + classer} /></button>
			<div onPointerDown={toggleHandler} className={headerLook.returner + classer}></div>
			<nav className={headerLook.nav + classer}>
				<h2>Other Projects</h2>
				<ul className={headerLook.topList}>
					{categorySections}
				</ul>
				<Link href='/' className={headerLook.homer}>Back to home</Link>
			</nav >
		</header >
	);
};

export default Header;
