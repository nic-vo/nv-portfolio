import Head from 'next/head';
import { getCategoryPages, getPageData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { CollatzComp } from '../../components/personal';
import { ProjectLayout } from '../../components/global';

const Collatz = ({ layoutData, pageData }) => {
	return (<>
		<Head>
			<title>A Collatz generator</title>
			<meta name='description' content="Input an int into this baby and it'll spit out how many steps it takes to reach 1 via Collatz" />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutData={layoutData} pageData={pageData}>
			<CollatzComp />
		</ProjectLayout>
	</>)
}

export default Collatz;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getCategoryPages({ category: 'fcc' }), await getVersionNumber(), await getPageData({
		category: 'fcc',
		page: 'Calculator',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherPages: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Calculator'
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
