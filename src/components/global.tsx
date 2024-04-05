import { PropsWithChildren } from 'react';

export const HiddenButAccessible = (props: PropsWithChildren) => {
	return (
		<span className='block w-0 h-0 overflow-hidden absolute'>
			{props.children}
		</span>
	);
};
