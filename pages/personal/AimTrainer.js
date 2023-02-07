import Head from 'next/head';
import { getCategoryPages, getPageData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';
import { AimTrainerComp } from '../../components/personal';

const AimTrainer = ({ layoutData, pageData }) => {
	return (<>
		<Head>
			<title>An Aim Trainer</title>
			<meta name='description' content="An aim trainer that's really only suited for 2d games like osu!" />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutData={layoutData} pageData={pageData}>
			<AimTrainerComp />
		</ProjectLayout>
	</>);
};

export default AimTrainer;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getCategoryPages({ category: 'personal' }), await getVersionNumber(), await getPageData({
		category: 'personal',
		page: 'AimTrainer',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherPages: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'AimTrainer'
	};
	const pageData = layoutFetch[2];
	return {
		props: {
			layoutData,
			pageData
		},
		revalidate: 172800
	};
};
