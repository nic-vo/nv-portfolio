'use client';

import Link from 'next/link';

const ProjectPageError = () => {
	return (
		<section className='h-lvh w-full flex flex-col justify-center items-center text-red-500 *:m-0 gap-8'>
			<h1>
				This project description is missing or hasn&apos;t implemented yet
			</h1>
			<Link
				href='/'
				className='text-black p-4 bg-white rounded-full cursor-pointer'>
				Return home
			</Link>
		</section>
	);
};

export default ProjectPageError;
