'use client';

import Link from 'next/link';

const ProjectInteractiveError = (props: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<>
			<h2 className='font-poppins font-bold text-6xl'>Something went wrong!</h2>
			<Link
				href='/'
				className='block bg-transparent hover:bg-white focus-visible:bg-white text-white hover:text-black focus-visible:text-black p-4 font-bold text-2xl rounded-3xl border-2 border-white transition-all'>
				Go back home
			</Link>
			<button
				onClick={props.reset}
				className='block bg-transparent hover:bg-white focus-visible:bg-white text-white hover:text-black focus-visible:text-black p-4 font-bold text-2xl rounded-3xl border-2 border-white transition-all'>
				Refresh?
			</button>
		</>
	);
};

export default ProjectInteractiveError;
