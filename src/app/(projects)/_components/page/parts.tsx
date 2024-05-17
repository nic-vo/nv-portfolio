import path from 'path';
import fs from 'fs/promises';
import { parse } from 'marked';

import look from './ProjectInfo.module.scss';

export type ProjectInfo = {
	title: string;
	slugline: string;
	link: string;
	techs: string[];
};

export const getProjectDescription = async (pathSegments: string[]) => {
	const mdPath = path.join(
		process.cwd(),
		'src',
		'app',
		'(projects)',
		...pathSegments,
		'description.md',
	);
	const buffer = await fs.readFile(mdPath, { encoding: 'utf-8' });
	return await parse(buffer, { async: true });
};

export const getProjectInfo = async (
	pathSegments: string[],
): Promise<ProjectInfo> => {
	const jsonPath = path.join(
		process.cwd(),
		'src',
		'app',
		'(projects)',
		...pathSegments,
		'info.json',
	);
	const buffer = await fs.readFile(jsonPath, { encoding: 'utf-8' });
	return await JSON.parse(buffer);
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
			<h1 className='font-poppins font-bold text-6xl w-11/12 text-center max-w-prose'>
				{title}
			</h1>
			<section className='flex gap-4 w-11/12 max-w-prose'>
				<h2 className='font-poppins font-bold text-3xl shrink-0'>The stack:</h2>
				<ul className='flex flex-wrap w-11/12 max-w-screen-lg p-0 z-10 text-xl'>
					{techs.map((tech) => (
						<li
							key={tech}
							className='flex items-center p-2 m-1 h-8 rounded-md font-bold text-base text-center text-white bg-sky-800'>
							{tech}
						</li>
					))}
				</ul>
			</section>
			<section
				className={
					look.description +
					' w-11/12 max-w-prose border-t-2 border-white pb-8 *:list-disc'
				}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
			<section className='flex font-bold gap-4 w-11/12 justify-center max-w-prose pb-8 mb-16'>
				<h2 className='font-poppins text-3xl'>Link to original:</h2>
				<a
					href={link}
					target='_blank'
					className='block px-4 py-2 rounded-3xl bg-green-500 text-black outline-green-500 outline-offset-2 focus-visible:outline'>
					Original / Live
				</a>
			</section>
		</>
	);
};

export default ProjectInfo;
