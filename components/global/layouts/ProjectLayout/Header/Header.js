import { useState } from 'react';

import Link from 'next/link';
import { FaPlus, FaBars, FaHome } from 'react-icons/fa';

import headerLook from './Header.module.scss';

const Header = ({ children }) => {
	const [toggled, setToggled] = useState(false);
	const toggleHandler = () => {
		setToggled(!toggled);
	};

	const classer = toggled === true ? ` ${headerLook.toggled}` : '';

	return (
		<header className={headerLook.header + classer}>
			<div className={headerLook.floater}>
				<button
					id='toggler'
					onPointerDown={toggleHandler}
					className={headerLook.toggler + classer}>
					{
						toggled === false ?
							<FaBars className={headerLook.svg + classer} /> :
							<FaPlus className={headerLook.svg + classer} />
					}
				</button>
				<Link href='/' className={headerLook.toggler}>
					<FaHome className={headerLook.svg} />
				</Link>
			</div>
			<div onPointerDown={toggleHandler} className={headerLook.returner + classer} />
			<nav className={headerLook.nav + classer}>
				<h2 className={headerLook.title}>Other Projects</h2>
				<ul className={headerLook.topList}>
					{children}
				</ul>
				<Link href='/' className={headerLook.homer}>
					<FaHome className={headerLook.svg} />
				</Link>
			</nav >
		</header >
	);
};

export default Header;
