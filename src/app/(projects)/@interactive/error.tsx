'use client';

import Link from 'next/link';

import { poppinsClass } from '@/styles/fonts';

const ProjectInteractiveError = (props: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center text-red-500 *:m-0'>
			<h2 className={poppinsClass + ' font-bold text-9xl'}>
				Something went wrong!
			</h2>
			<Link href='/'>Go back home</Link>
			<button onClick={props.reset}>Refresh?</button>
		</div>
	);
};

export default ProjectInteractiveError;
