'use client';

import { createContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoAdd, IoMenu, IoHomeSharp } from 'react-icons/io5';

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

	return (
		<header
			className={`fixed flex right-0 p-0 m-0 z-50 ${toggled ? 'trnslate-x-0' : 'translate-x-80'} w-80 transition-transform bflag`}
			onBlur={blurHandler}
			aria-expanded={toggled}>
			<a
				href='/'
				className='flex items-center justify-center border border-white text-white bg-black backdrop-blur-sm rounded-md cursor-pointer transition-colors p-2 absolute translate-x-[-125%] translate-y-[150%] hover:bg-white hover:text-black focus:bg-white focus:text-black z-10 bflag'
				id='home'
				aria-label='Return home'>
				<IoHomeSharp
					className='block text-2xl'
					aria-hidden='true'
				/>
			</a>
			<button
				id='toggler'
				onClick={toggleHandler}
				className={`flex items-center justify-center border border-white ${toggled ? 'text-black' : 'text-white'} ${toggled ? 'bg-white' : 'bg-black'} backdrop-blur-sm rounded-md cursor-pointer transition-colors p-2 absolute translate-x-[-125%] translate-y-1/4 hover:bg-white hover:text-black focus:bg-white focus:text-black z-10 bflag`}
				aria-pressed={toggled}
				aria-label={`${toggled ? 'Close' : 'Open'} nav menu`}
				onFocus={() => setToggled(true)}>
				{toggled === false ? (
					<IoMenu
						className={`block ${toggled ? '-rotate-45' : 'rotate-0'} transition-all text-2xl`}
						aria-hidden='true'
					/>
				) : (
					<IoAdd
						className={`block ${toggled ? '-rotate-45' : 'rotate-0'} transition-all text-2xl`}
						aria-hidden='true'
					/>
				)}
			</button>
			<div
				onPointerDown={toggleHandler}
				className={`${toggled ? 'block' : 'hidden'} h-screen w-screen absolute bg-transparent backdrop-brightness-50 -translate-x-full`}
				aria-hidden={true}
			/>
			<nav className='flex flex-col items-center h-screen bg-white text-black w-full p-4 py-8 gap-2'>
				<h2 className='font-poppins font-bold text-3xl'>Other Projects</h2>
				<menu
					className='p-0 m-0 list-none w-full bflag'
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
