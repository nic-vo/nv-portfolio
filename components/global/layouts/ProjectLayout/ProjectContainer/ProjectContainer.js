import dynamic from 'next/dynamic';
import { useState, memo } from 'react';

import ProjectLoader from '../ProjectLoader/ProjectLoader';
import Wip from '../../../misc/Wip/Wip';

import look from './ProjectContainer.module.scss';
import loadLook from '../ProjectLoad.module.scss';

const BlockBuildersGC = (onCompLoad) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../featured')
				.then((module) => {
					onCompLoad();
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

const PortfolioSite = (onCompLoad) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../featured')
				.then((module) => {
					onCompLoad();
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

const Markdown = (onCompLoad) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../featured')
				.then((module) => {
					onCompLoad();
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

const Pomodoro = (onCompLoad) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					onCompLoad();
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

const AimTrainer = (onCompLoad) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					onCompLoad();
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

const Calculator = (onCompLoad) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					onCompLoad();
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

const DrumMachine = (onCompLoad, optionalProps) => {
	const DynamicWrapped = dynamic(async () => {
		try {
			const Returner = import('../../../../other')
				.then((module) => {
					onCompLoad();
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
			return BlockBuildersGC(onCompLoad);
		case 'PortfolioSite':
			return PortfolioSite(onCompLoad);
		case 'Markdown':
			return Markdown(onCompLoad);
		case 'Pomodoro':
			return Pomodoro(onCompLoad);
		case 'AimTrainer':
			return AimTrainer(onCompLoad);
		case 'Calculator':
			return Calculator(onCompLoad);
		case 'DrumMachine':
			return DrumMachine(onCompLoad, optionalProps);
		default:
			return <Wip />;
	};
}, (prevRen, nextRen) => {
	return prevRen.project === nextRen.project;
});

const ProjectContainer = ({ project, optionalProps }) => {
	const [loading, setLoading] = useState(true);

	const onCompLoad = () => {
		setLoading(false);
	};

	const classer = `${look.innerContainer} ${loading === false && look.loaded}`;

	return (
		<section className={`${look.container} ${loadLook.project}`}>
			<div className={classer}>
				<ActiveComponent
					project={project}
					onCompLoad={onCompLoad}
					optionalProps={optionalProps} />
			</div>
		</section>
	);
};

export default ProjectContainer;
