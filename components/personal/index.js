import dynamic from 'next/dynamic';
import ProjectLoader from '@components/global/layouts/ProjectLayout/ProjectLoader/ProjectLoader';
import MixDelta from './MixDelta/MixDelta'

const Collatz = dynamic(() => import('./Collatz/Collatz'), {
	ssr: false,
	loading: ProjectLoader
});
const AimTrainer = dynamic(() => import('./aimtrainer/AimTrainer'), {
	ssr: false,
	loading: ProjectLoader
});

export {
	Collatz,
	AimTrainer,
	MixDelta
};
