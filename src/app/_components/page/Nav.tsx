import { getFeaturedPaths, getOtherPaths } from '../paths';
import Link from 'next/link';
import Image from 'next/image';
import * as thumbs from '@/public/thumbs';
import DefaultThumb from '@/public/thumbs/default';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { latoClass } from '@/styles/fonts';

const referenced = thumbs as Record<string, StaticImport | undefined>;

const NavLink = async (props: {
	root: string;
	page: { title: string; segment: string };
}) => {
	const { title, segment } = props.page;
	return (
		<li className='w-[40svh] h-[calc(40svh*3/4)] list-none transition-all justify-self-center bg-cover '>
			<Link
				href={`${props.root}/${segment}`}
				prefetch={false}
				className='overflow-hidden h-full w-full flex justify-center items-center bg-transparent rounded-3xl p-4 text-white font-bold text-xl shadow-none hover:shadow-white hover:shadow-[0px_0px_20px_5px] focus:shadow-white focus:shadow-[0px_0px_20px_5px] transition-all first:*:hover:translate-y-[350%] first:*:focus:translate-y-[350%] before:bg-[linear-gradient(transparent,rgba(0,0,0,0.6),rgba(0,0,0,0.8))] before:content-[""] before:transition-all before:z-10 before:h-1/3 before:w-full before:absolute before:bottom-0 before:opacity-0 before:hover:opacity-100 before:focus:opacity-100 last:*:brightness-50 last:*:hover:brightness-100 last:*:focus:brightness-100'>
				<span className='flex gap-2 transition-all z-20 drop-shadow-md border-b-2 border-white bg-transparent'>
					{title}
				</span>
				<Image
					src={referenced[segment] ?? DefaultThumb}
					alt={`Check out ${title}!`}
					sizes='(max-aspect-ratio: 1) 100vw, 50vw'
					className='absolute h-full w-auto transition-all'
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
			<section className='flex flex-col items-center mb-48 gap-8'>
				<h2 className={latoClass.className + ' text-4xl text-center font-bold'}>
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
			<section className='flex flex-col items-center mb-48'>
				<h2 className={latoClass.className + ' text-4xl text-center font-bold'}>
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
