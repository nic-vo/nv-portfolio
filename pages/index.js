import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectLists } from '../lib/root/projects';
import { getVersionNumber } from '../lib/root/homepage';

import { Duckies } from '../components/homepage';

import homeLook from '../styles/Home.module.css';

export default function Home({ pageList, version }) {
	return (
		<div className={homeLook.container}>
			<Head>
				<title>Dive in - Nicolas Vo</title>
				<meta name="description" content="Nicolas Vo's Portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={homeLook.main}>
				<section className={homeLook.hero}>
					<h1 className={homeLook.biggest}>Hi, I'm Nicolas!</h1>
				</section>
				<nav style={{position: 'relative', width: '100%'}}>
					<Duckies />
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
				<section style={{ paddingTop: "25vh" }}>
					<h1>
						Contact Me
					</h1>
					<form>
						<fieldset>
							<label htmlFor='name'>
								<p>Name</p>
								<input id='name' type='text' />
							</label>
							<label htmlFor='email'>
								<p>Email</p>
								<input id='email' type='email' />
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</form>
				</section>
			</main>

			<footer className={homeLook.footer}>
				v. {version} by nicolas vo
			</footer>
		</div>
	)
}

export async function getStaticProps() {
	const pageList = getProjectLists();
	const version = getVersionNumber().version;
	return {
		props: {
			pageList,
			version
		},
		revalidate: 3600
	}
}
