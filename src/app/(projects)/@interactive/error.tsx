'use client';

import Link from 'next/link';

import { poppinsClass } from '@/styles/fonts';

const ProjectInteractiveError = (props: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<>
			<h2 className={poppinsClass.className + ' font-bold text-9xl'}>
				Something went wrong!
			</h2>
			<Link href='/'>Go back home</Link>
			<button onClick={props.reset}>Refresh?</button>
		</>
	);
};

export default ProjectInteractiveError;
