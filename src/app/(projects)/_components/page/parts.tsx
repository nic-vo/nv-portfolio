import path from 'path';
import fs from 'fs/promises';
import { parse } from 'marked';

import { poppinsClass } from '@/styles/fonts';
import look from './ProjectInfo.module.scss';

export const getProjectDescription = async (relativePath: string) => {
	const replaceWithSrc = relativePath.split('\\').slice(-4);
	const mdPath = path.join(
		process.cwd(),
		'src',
		...replaceWithSrc,
		'description.md',
	);
	const buffer = await fs.readFile(mdPath, { encoding: 'utf-8' });
	return await parse(buffer, { async: true });
};

const ProjectInfo = (props: {
	title: string;
	techs: string[];
	description: string;
	link: string;
}) => {
	const { title, description, techs, link } = props;

	return (
		<>
			<h1 className={poppinsClass.className + ' text-6xl text-center'}>
				{title}
			</h1>
			<section className='flex gap-4'>
				<h2 className={poppinsClass.className + ' text-3xl shrink-0'}>
					The stack:
				</h2>
				<ul className='flex flex-wrap w-11/12 max-w-screen-lg p-0 z-10 text-xl'>
					{techs.map((tech) => (
						<li
							key={tech}
							className='flex items-center p-2 m-1 h-8 rounded-md font-bold text-base text-center text-white bg-sky-600'>
							{tech}
						</li>
					))}
				</ul>
			</section>
			<section
				className={
					look.description + ' max-w-prose border-t-2 border-white pb-8'
				}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
			<section className='flex font-bold gap-4 w-full max-w-prose border-b-2 border-white pb-8'>
				<h2 className={poppinsClass.className + ' text-3xl'}>
					Link to original:
				</h2>
				<a
					href={link}
					target='_blank'
					className='block px-4 py-2 rounded-3xl bg-green-500'>
					Original / Live
				</a>
			</section>
		</>
	);
};

export default ProjectInfo;
