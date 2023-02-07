import Head from 'next/head';
import { getCategoryPages, getPageData } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { MarkdownComp } from '../../components/fcc/markdown';
import { ProjectLayout } from '../../components/global';

const Markdown = ({ layoutData, pageData }) => {
	return (
		<>
			<Head>
				<title>A Markdown Parser</title>
				<meta name='description' content="A React markdown previewer completed for freeCodeCamp's frontend certificate" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<ProjectLayout layoutData={layoutData} pageData={pageData}>
				<MarkdownComp />
			</ProjectLayout>
		</>
	);
};

export default Markdown;

export async function getStaticProps() {
	const layoutFetch = await Promise.all([await getCategoryPages({ category: 'fcc' }), await getVersionNumber(), await getPageData({
		category: 'fcc',
		page: 'Markdown',
		types: ['title',
			'description',
			'techs',
			'original']
	})]);
	const layoutData = {
		otherPages: layoutFetch[0],
		version: layoutFetch[1],
		linkExclude: 'Markdown'
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
