import dynamic from 'next/dynamic';
import { memo } from 'react';

import ProjectLoader from '../ProjectLoader/ProjectLoader';
import Wip from '../../../misc/Wip/Wip';

import look from './ProjectContainer.module.scss';

const BlockBuildersGC = () => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../featured')
				.then((module) => {
					return module.BlockBuildersGC;
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		}
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped />;
};

const PortfolioSite = () => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../featured')
				.then((module) => {
					return module.PortfolioSite;
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		};
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped />;
};

const Markdown = () => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../featured')
				.then((module) => {
					return module.Markdown;
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		};
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped />;
};

const Pomodoro = () => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					return module.Pomodoro
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		};
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped />;
};

const AimTrainer = () => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					return module.AimTrainer
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		};
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped />;
};

const Calculator = () => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					return module.Calculator
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		};
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped />;
};

const DrumMachine = (optionalProps) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					return module.DrumMachine
				});
			return Returner;
		} catch {
			return <ProjectLoader failed={true} />;
		};
	}, {
		ssr: false,
		timeout: 5000,
		loading: ({ timedOut, error }) => {
			return <ProjectLoader failed={(timedOut === true || error !== null)} />;
		}
	});
	return <DynamicWrapped assetInfo={optionalProps} />;
};

const ActiveComponent = memo(({ project, onCompLoad, optionalProps }) => {
	switch (project) {
		case 'BlockBuildersGC':
			return BlockBuildersGC();
		case 'PortfolioSite':
			return PortfolioSite();
		case 'Markdown':
			return Markdown();
		case 'Pomodoro':
			return Pomodoro();
		case 'AimTrainer':
			return AimTrainer();
		case 'Calculator':
			return Calculator();
		case 'DrumMachine':
			return DrumMachine(onCompLoad, optionalProps);
		default:
			return <Wip />;
	};
}, (prevRen, nextRen) => {
	return prevRen.project === nextRen.project;
});

const ProjectContainer = ({ project, optionalProps }) => {
	return (
		<section className={look.container}>
			<ActiveComponent
				project={project}
				optionalProps={optionalProps} />
		</section >
	);
}

export default ProjectContainer;
