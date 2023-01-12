import Head from 'next/head';
import { getProjectLists } from '../lib/props/homepage/projects';
import { getVersionNumber } from '../lib/props/homepage/homepage';

import { Hero, ProjectCard, ContactForm } from '../components/homepage';

import homeLook from '../styles/Home.module.scss';

export default function Home({ pageList, version }) {
	return (
		<div className={homeLook.container}>
			<Head>
				<title>Dive in - Nicolas Vo</title>
				<meta name="description" content="Nicolas Vo's Portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={homeLook.main}>
				<Hero />
				<nav style={{ position: 'relative', width: '100%' }}>
					{pageList.map((category) => {
						return (
							<div key={`${category.category}-links`}>
								<h2>{category.category === "fcc" ? "freeCodeCamp" : category.category}</h2>
								{category.pages.length !== 0 ?
									<ul>
										{
											category.pages.map((page) => {
												return (
													<li key={`${page}-link`} style={{ listStyle: "none" }}>
														<a href={`/${category.category}/${page}`}><p style={{ fontSize: "4rem" }}>{page.replaceAll(/([A-Z])/g, " $1")}</p>
															{/*<Image src={`/thumbs/${page}.jpg`} height="1440" width="2560" layout="intrinsic" alt=""/>*/}
															{page.rep}
														</a>
													</li>)
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

			<footer className={homeLook.footer}>
				v. {version} by nicolas vo
			</footer>
		</div>
	);
};

export async function getStaticProps() {
	const pageList = getProjectLists();
	const version = getVersionNumber().version;
	return {
		props: {
			pageList,
			version
		},
		revalidate: 3600
	};
};
