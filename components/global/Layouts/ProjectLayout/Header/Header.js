import Link from 'next/link';
import ProjectCategoryNavItem from './ProjectCategoryNavItem/ProjectCategoryNavItem';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import headerLook from './Header.module.scss';
import pLoadingLook from '../ProjectLoad.module.scss';

const Header = ({ otherProjects, linkExclude }) => {

	const [toggled, setToggled] = useState(false);
	const toggleHandler = (e) => {
		e.preventDefault();
		setToggled(!toggled);
	};

	return (
		<header className={`${headerLook.header}${toggled === true ? ` ${headerLook.toggled}` : ''} ${pLoadingLook.header}`}>
			<button onPointerDown={toggleHandler} className={`${headerLook.toggler}${toggled === true ? ` ${headerLook.toggled}` : ''}`}><FaPlus className={`${headerLook.svg}${toggled === true ? ` ${headerLook.toggled}` : ''}`} /></button>
			<div onPointerDown={toggleHandler} className={`${headerLook.returner}${toggled === true ? ` ${headerLook.toggled}` : ''}`}></div>
			<nav className={`${headerLook.nav}${toggled === true ? ` ${headerLook.toggled}` : ''}`}>
				<ul style={{ listStyle: 'none', margin: '0' }}>
					{
						otherProjects.map((category) => {
							return (
								<ProjectCategoryNavItem category={category} key={`${category.categoryName}`} />
							)
						})
					}
				</ul>
				<Link href='/' style={{ listStyle: 'none' }}>Back to home</Link>
			</nav >
		</header >
	);
};

export default Header;
