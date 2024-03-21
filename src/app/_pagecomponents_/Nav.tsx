import { getFeaturedPaths, getOtherPaths } from '@/lib/props/paths';
import Link from 'next/link';
import Image from 'next/image';

import homeLook from '../Homepage.module.scss';
import navLook from './Nav.module.scss';
import { latoClass } from '@/styles/fonts';

const NavLink = (props: { page: { title: string; segment: string } }) => {
	const { title, segment } = props.page;
	return (
		<li className='w-[40svh] h-[calc(40svh*3/4)] bg-black rounded-3xl overflow-hidden list-none transition-all justify-self-center bg-cover shadow-none hover:shadow-white hover:shadow-[0px_0px_20px_5px]'>
			<Link
				href={`featured/${segment}`}
				prefetch={false}
				className='h-full w-full flex justify-center items-center bg-transparent text-white p-4 font-bold text-xl before:content-[""] before:block before:absolute before:bottom-0 before:h-1/2 before:w-full before:z-10 before:transition-all before:opacity-0 before:bg-[linear-gradient(transparent,_black)]hover:before:opacity-100 focus:before:opacity-100 hover:first:translate-y-[600%] focus:first:translate-y-[600%] lg:hover:first:translate-y-[400%] lg:focus:first:translate-y-[400%] hover:last:brightness-100'>
				<span className='flex gap-2 transition-all z-20 drop-shadow-md border-b-2 border-white'>
					{title}
				</span>
				<Image
					src={`/thumbs/featured/${segment}.webp`}
					alt={`Check out ${title}!`}
					width={1920}
					height={1200}
					sizes='(max-aspect-ratio: 1) 100vw, 50vw'
					className='absolute h-full w-auto brightness-50 transition-all'
				/>
			</Link>
		</li>
	);
};

const Nav = async () => {
	const [featuredPaths, otherPaths] = await Promise.all([
		getFeaturedPaths(),
		getOtherPaths(),
	]);
	return (
		<nav className='w-full py-48 px-16'>
			<section className='flex flex-col items-center mb-48'>
				<h2 className={latoClass + ' text-4xl text-center'}>
					Featured Projects
				</h2>
				{featuredPaths.pages.length === 0 ? (
					<p>Nothing yet...</p>
				) : (
					<ul className='grid-cols-1 lg:grid-cols-2 items-center justify-items-center w-fit gap-8 m-8 p-0'>
						{featuredPaths.pages.map((page) => (
							<NavLink
								key={page.segment}
								page={page}
							/>
						))}
					</ul>
				)}
			</section>
			<section className='flex flex-col items-center mb-48'>
				<h2 className={latoClass + ' text-4xl text-center'}>Other Projects</h2>
				{otherPaths.pages.length === 0 ? (
					<p>Nothing yet...</p>
				) : (
					<ul className='grid-cols-1 lg:grid-cols-2 items-center justify-items-center w-fit gap-8 m-8 p-0'>
						{otherPaths.pages.map((page) => (
							<NavLink
								key={page.segment}
								page={page}
							/>
						))}
					</ul>
				)}
			</section>
		</nav>
	);
};

export default Nav;
