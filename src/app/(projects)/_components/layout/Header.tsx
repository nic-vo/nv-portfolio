'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaPlus, FaBars, FaHome } from 'react-icons/fa';

import look from './Header.module.scss';

const Header = (props: { children: React.ReactNode }) => {
	const location = usePathname();
	const [toggled, setToggled] = useState(false);

	useEffect(() => {
		setToggled(false);
		const active = document.activeElement as HTMLElement;
		if (active) active.blur();
	}, [location]);

	const toggleHandler = () => {
		setToggled(!toggled);
	};

	const classer = toggled === true ? ` ${look.toggled}` : '';

	return (
		<header className={look.header + classer}>
			<a
				href='/'
				className={look.homerEx}
				aria-label='Return home'>
				<FaHome
					className={look.svg}
					aria-hidden='true'
					role='presentation'
				/>
				<span className={look.hidden}>Return home</span>
			</a>
			<button
				id='toggler'
				onClick={toggleHandler}
				className={look.toggler + classer}
				aria-label='Toggle navigation menu'
				aria-pressed={toggled}>
				{toggled === false ? (
					<FaBars
						className={look.svg + classer}
						aria-hidden='true'
						role='presentation'
					/>
				) : (
					<FaPlus
						className={look.svg + classer}
						aria-hidden='true'
						role='presentation'
					/>
				)}
			</button>
			<div
				onPointerDown={toggleHandler}
				className={look.returner + classer}
			/>
			<nav
				className={look.nav + classer}
				role='navigation'>
				<h2 className={look.title}>Other Projects</h2>
				<ul
					className={look.topList}
					tabIndex={toggled ? 0 : -1}>
					{props.children}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
