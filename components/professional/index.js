import dynamic from 'next/dynamic';
import ProjectLoader from '@components/global/layouts/ProjectLayout/ProjectLoader/ProjectLoader';

const BlockBuildersGC = dynamic(() => import('./BlockBuildersGC/BlockBuildersGC'),
	{
		ssr: false,
		loading: ProjectLoader
	}
);
const PortfolioSite = dynamic(() => import('./PortfolioSite/PortfolioSite'),
	{
		ssr: false,
		loading: ProjectLoader
	}
);

export {
	BlockBuildersGC,
	PortfolioSite
}
