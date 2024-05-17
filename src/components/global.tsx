import { PropsWithChildren } from 'react';

export const SRText = (props: PropsWithChildren) => {
	return <span className='sr-only'>{props.children}</span>;
};
