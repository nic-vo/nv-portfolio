import Head from 'next/head';
import { ProjectLayout } from '../../components/global';
import { CalculatorComp } from '../../components/fcc/calculator';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { getCategoryPages, getPageData } from '../../lib/props/homepage/projects';

const Calculator = ({ layoutData, pageData }) => {
	return (<>
		<Head>
			<title>A Calculator</title>
			<meta name='description' content="A React calculator completed for freeCodeCamp's frontend certificate" />
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<ProjectLayout layoutData={layoutData} pageData={pageData}>
			<CalculatorComp />
		</ProjectLayout>
	</>);
};

export default Calculator;

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
