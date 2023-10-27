import dynamic from 'next/dynamic';
import ProjectLoader from '@components/global/layouts/ProjectLayout/ProjectLoader/ProjectLoader';

const DrumMachine = (optionalProps) => dynamic(
	async () => {
		return import('./drummachine/DrumMachine')
			.then(mod => {
				const Component = mod.default;
				return () => <Component assetInfo={optionalProps} />
			});
	}, {
	ssr: false,
	loading: ProjectLoader
});

const Calculator = dynamic(() => import('./calculator/Calculator'), {
	ssr: false,
	loading: ProjectLoader
});
const Markdown = dynamic(() => import('./markdown/Markdown'), {
	ssr: false,
	loading: ProjectLoader
});
const Pomodoro = dynamic(() => import('./pomodoro/Pomodoro'), {
	ssr: false,
	loading: ProjectLoader
});

export {
	Calculator,
	Markdown,
	DrumMachine,
	Pomodoro,
};
