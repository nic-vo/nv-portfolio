import Head from 'next/head';
import { getCategoryPages } from '../../lib/props/homepage/projects';
import { getVersionNumber } from '../../lib/props/homepage/homepage';
import { ProjectLayout } from '../../components/global';

const BBGC = ({ layoutStuff }) => {
	return (<>
		<Head>
			<title>Block Builders General Construction</title>
			<meta name='description' content='A page summarizing my progress in developing an online presence for Block Builders General Contracting, Inc.' />
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<ProjectLayout layoutStuff={layoutStuff} linkExclude={'BlockBuildersGC'}>
			<h1>Block Builders General Contracting, Inc. Website</h1>
			<section>
				<p>
					Description blurb
				</p>
			</section>
		</ProjectLayout>
	</>)
}

export default BBGC;

export async function getStaticProps() {
	const otherPages = await getCategoryPages({ category: 'professional' });
	const version = await getVersionNumber();
	const layoutStuff = await Promise.all([otherPages, version]);
	return {
		props: {
			layoutStuff
		},
		revalidate: 172800
	};
};
