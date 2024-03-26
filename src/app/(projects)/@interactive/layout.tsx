import { PropsWithChildren } from 'react';

const ProjectInteractiveLayout = (props: PropsWithChildren) => {
	return (
		<div className='h-svh w-full flex items-center justify-center'>
			{props.children}
		</div>
	);
};

export default ProjectInteractiveLayout;
