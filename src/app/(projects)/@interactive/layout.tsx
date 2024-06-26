import { PropsWithChildren } from 'react';

const ProjectInteractiveLayout = (props: PropsWithChildren) => {
	return (
		<div className='h-lvh w-full flex flex-col items-center justify-center gap-8'>
			{props.children}
		</div>
	);
};

export default ProjectInteractiveLayout;
