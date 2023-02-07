import Head from 'next/head';
import Footer from '../components/global/misc/Footer/Footer';
import { getProjectLists } from '../lib/props/homepage/projects';
import { getVersionNumber } from '../lib/props/homepage/homepage';

import { Hero, ProjectCard, ContactForm } from '../components/homepage';

import homeLook from '../styles/Home.module.scss';

export default function Home({ pageList, version }) {

	return (
		<div className={homeLook.container}>
			<Head>
				<title>Dive in - Nicolas Vo</title>
				<meta name='description' content="Nicolas Vo's Portfolio" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={homeLook.main}>
				<Hero />
				<nav style={{ position: 'relative', width: '100%' }}>
					{pageList.map((category) => {
						const { categoryName, pages } = category;
						return (
							<div key={`${category.categoryName}-links`} className={homeLook.navCat}>
								<h2>{categoryName === 'fcc' ? 'freeCodeCamp' : categoryName}</h2>
								{pages.length !== 0 ?
									<ul className={homeLook.navCatList}>
										{
											pages.map((page) => {
												const { title, techs, description } = page;
												return (
													<li key={`${categoryName}-${page.title}`} className={homeLook.navCatPage}>
														<ProjectCard categoryName={categoryName} title={title} techs={techs} description={description} />

													</li>
												)
											})
										}
									</ul> : <em>There&apos;s nothing here...yet</em>
								}
							</div>
						)
					})}
				</nav>
				<ContactForm />
			</main>
			<Footer version={version} />
		</div >
	);
};

export async function getStaticProps() {
	const pageList = await getProjectLists();
	const version = await getVersionNumber();
	return {
		props: {
			pageList,
			version
		},
		revalidate: 3600
	};
};
