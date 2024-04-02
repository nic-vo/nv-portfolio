import Link from 'next/link';
import Image from 'next/image';
import * as thumbs from '@/public/thumbs';
import DefaultThumb from '@/public/thumbs/default';
import { getFeaturedPaths, getOtherPaths } from '../paths';
import { ProjectInfo } from '@/app/(projects)/_components/page/parts';
import { FaArrowRight } from 'react-icons/fa';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { poppinsClass } from '@/styles/fonts';

const referenced = thumbs as Record<string, StaticImport | undefined>;

const NavLink = async (props: {
	root: string;
	page: { segment: string; data: ProjectInfo };
}) => {
	const {
		data: { title, slugline },
		segment,
	} = props.page;
	return (
		<li className='list-none transition-all justify-self-center bg-cover '>
			<Link
				href={`${props.root}/${segment}`}
				prefetch={false}
				className='overflow-hidden w-96 h-96 flex flex-col gap-8 justify-center items-center bg-transparent rounded-3xl p-8 text-white font-bold text-lg shadow-none border-8 border-slate-800 hover:border-white focus:border-white hover:shadow-white hover:shadow-[0px_0px_20px_5px] focus:shadow-white focus:shadow-[0px_0px_20px_5px] transition-all before:bg-[linear-gradient(transparent,rgba(0,0,0,0.6),rgba(0,0,0,0.8))] before:content-[""] before:transition-all before:z-10 before:h-2/5 before:w-full before:absolute before:bottom-0 before:opacity-100 before:hover:opacity-0 before:focus:opacity-0 group/navlink'>
				<span className='z-20 drop-shadow-md border-b-2 border-white bg-transparent transition-all translate-y-52 group-hover/navlink:translate-y-0 group-focus/navlink:translate-y-0 font-bold text-xl'>
					{title}
				</span>
				<span className='z-20 drop-shadow-md bg-transparent transition-all opacity-0 group-hover/navlink:opacity-100 group-focus/navlink:opacity-100 font-extralight'>
					{slugline}
				</span>
				<span className='z-20 drop-shadow-md bg-transparent transition-all opacity-0 group-hover/navlink:opacity-100 group-focus/navlink:opacity-100 flex items-center gap-2 *:block border-b-2 text-center font-extralight border-white'>
					Details <FaArrowRight />
				</span>
				<Image
					src={referenced[segment] ?? DefaultThumb}
					alt={`Check out ${title}!`}
					sizes='(max-aspect-ratio: 1) 100vw, 50vw'
					className='absolute h-full w-auto transition-all max-w-none group-hover/navlink:brightness-[0.15] group-focus/navlink:brightness-[0.15]'
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
		<nav className='w-10/12'>
			<section className='flex flex-col w-full items-center mb-48 gap-8'>
				<h2
					className={
						poppinsClass.className +
						' block p-4 bg-white text-black top-0 m-0 z-10 text-4xl text-center rounded-3xl'
					}>
					Featured Projects
				</h2>
				{featuredPaths.pages.length === 0 ? (
					<p>Nothing yet...</p>
				) : (
					<ul className='grid grid-cols-1 lg:grid-cols-2 gap-12 p-0'>
						{featuredPaths.pages.map((page) => (
							<NavLink
								key={page.segment}
								root='featured'
								page={page}
							/>
						))}
					</ul>
				)}
			</section>
			<section className='flex flex-col items-center mb-48 gap-8'>
				<h2
					className={
						poppinsClass.className +
						' block p-4 bg-white text-black top-0 m-0 z-10 text-4xl text-center rounded-3xl'
					}>
					Other Projects
				</h2>
				{otherPaths.pages.length === 0 ? (
					<p>Nothing yet...</p>
				) : (
					<ul className='grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 p-0'>
						{otherPaths.pages.map((page) => (
							<NavLink
								root='other'
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
