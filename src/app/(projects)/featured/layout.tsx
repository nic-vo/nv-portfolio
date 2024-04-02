import { PropsWithChildren } from 'react';

const OtherProjectsLayout = (props: PropsWithChildren) => {
	return <>{props.children}</>;
};

export default OtherProjectsLayout;

export const metadata = {
	title: {
		template: 'Nicolas Vo | %s',
		default: 'Nicolas Vo | Portfolio',
	},
};

export const revalidate = false;
