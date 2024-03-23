import path from 'path';
import fs from 'fs/promises';
import { parse } from 'marked';

import { poppinsClass } from '@/styles/fonts';
import look from './ProjectInfo.module.scss';

export const getProjectDecsription = async (relativePath: string) => {
	const mdPath = path.join(relativePath, 'description.md');
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
			<h1 className={poppinsClass + ' text-6xl text-center m-4'}>{title}</h1>
			<section className='flex flex-col gap-8 w-11/12 max-w-screen-lg pb-24'>
				<section
					className={look.description}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				<section>
					<h2>The stack:</h2>
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
				<section className='flex items-center font-bold gap-4'>
					<h2>Link to original:</h2>
					<a
						href={link}
						target='_blank'
						className='block px-8 py-4 rounded-3xl bg-green-500'>
						Original / Live
					</a>
				</section>
			</section>
		</>
	);
};

export default ProjectInfo;
