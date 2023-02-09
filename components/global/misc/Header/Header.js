import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import headerLook from './Header.module.scss';

const Header = ({ otherProjects, linkExclude }) => {
	const { category, projects } = otherProjects;

	const [toggled, setToggled] = useState(false);
	const toggleHandler = (e) => {
		e.preventDefault();
		setToggled(!toggled);
	};

	return (
		<header className={`${headerLook.header}${toggled === true ? ` ${headerLook.toggled}` : ''}`}>
			<button onPointerDown={toggleHandler} className={`${headerLook.toggler}${toggled === true ? ` ${headerLook.toggled}` : ''}`}><FaPlus className={`${headerLook.svg}${toggled === true ? ` ${headerLook.toggled}` : ''}`} /></button>
			<div onPointerDown={toggleHandler} className={`${headerLook.returner}${toggled === true ? ` ${headerLook.toggled}` : ''}`}></div>
			<nav className={`${headerLook.nav}${toggled === true ? ` ${headerLook.toggled}` : ''}`}>
				<ul>
					<li style={{ listStyle: 'none' }}>
						<a href='/' style={{ listStyle: 'none' }}>Back to home</a>
					</li>
					{projects.filter((page) => { return page !== linkExclude }).map((page) => {
						return (<li style={{ listStyle: 'none' }} key={`projectPage-navListItem-${category}-${page}`}>
							<a href={`/${category}/${page}`}>{page.replace(/(\w)([A-Z])/, '$1 $2')}</a>
						</li>)
					})}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
