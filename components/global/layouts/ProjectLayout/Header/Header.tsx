import { useState } from 'react';

import { FaPlus, FaBars, FaHome } from 'react-icons/fa';

import headerLook from './Header.module.scss';

const Header = (props: { children: React.ReactNode }) => {
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
					className={headerLook.toggler + classer}
					aria-label='Toggle navigation menu'
					aria-pressed={toggled}>
					{
						toggled === false ?
							<FaBars
								className={headerLook.svg + classer}
								aria-hidden='true'
								role='presentation' /> :
							<FaPlus
								className={headerLook.svg + classer}
								aria-hidden='true'
								role='presentation' />
					}
				</button>
				<a
					href='/' className={headerLook.toggler}
					aria-label='Return home'>
					<FaHome
						className={headerLook.svg}
						aria-hidden='true'
						role='presentation' />
				</a>
			</div>
			<div
				onPointerDown={toggleHandler}
				className={headerLook.returner + classer} />
			<nav className={headerLook.nav + classer}
				aria-expanded={toggled}
				role='navigation'>
				<h2 className={headerLook.title}>Other Projects</h2>
				<ul className={headerLook.topList}>
					{props.children}
				</ul>
				<a href='/' className={headerLook.homer}>
					<FaHome className={headerLook.svg} />
				</a>
			</nav >
		</header >
	);
};

export default Header;