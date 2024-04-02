'use client';

import { createContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaPlus, FaBars, FaHome } from 'react-icons/fa';

import look from './Header.module.scss';

export const ToggleContext = createContext(false);

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

	const blurHandler = (e: React.FocusEvent) => {
		if (e.relatedTarget === null) return;
		const classes = new Set(e.relatedTarget.classList);
		if (!classes.has('bflag')) setToggled(false);
	};

	const classer = toggled === true ? ` ${look.toggled}` : '';

	return (
		<header
			className={look.header + classer + ' bflag'}
			onBlur={blurHandler}>
			<a
				href='/'
				className={look.homerEx + ' bflag'}
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
				className={look.toggler + classer + ' bflag'}
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
				<span className={look.hidden}>
					{toggled ? 'Close' : 'Open'} nav menu
				</span>
			</button>
			<div
				onPointerDown={toggleHandler}
				className={look.returner + classer}
			/>
			<nav
				className={look.nav + classer}
				role='navigation'>
				<h2 className={look.title}>Other Projects</h2>
				<menu
					className={look.topList + ' bflag'}
					tabIndex={-1}>
					<ToggleContext.Provider value={toggled}>
						{props.children}
					</ToggleContext.Provider>
				</menu>
			</nav>
		</header>
	);
};

export default Header;
