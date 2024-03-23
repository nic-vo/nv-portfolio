import { PropsWithChildren } from 'react';

const ProjectInteractiveLayout = (props: PropsWithChildren) => {
	return (
		<div className='flex flex-col items-center justify-center bg-white bg-opacity-10 w-full h-svh'>
			{props.children}
		</div>
	);
};

export default ProjectInteractiveLayout;
