import { poppinsClass } from '@/styles/fonts';

const ProjectPageDefault = () => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center text-red-500 *:m-0'>
			<h2 className={poppinsClass.className + ' font-bold text-9xl'}>WIP</h2>
			<p className='font-light text-6xl'>
				This page hasn&apos;t been implemented yet
			</p>
		</div>
	);
};

export default ProjectPageDefault;
