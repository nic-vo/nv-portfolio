'use client';

import Link from 'next/link';

const ProjectPageError = () => {
	return (
		<div>
			<h1>
				This project description is missing or hasn&apos;t implemented yet
			</h1>
			<Link href='/'>Return home</Link>
		</div>
	);
};

export default ProjectPageError;
