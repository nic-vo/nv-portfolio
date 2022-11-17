import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectLists } from '../lib/root/projects';
import { getVersionNumber } from '../lib/root/homepage';

import styles from '../styles/Home.module.css';

export default function Home({ pageList, version }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Dive in - Nicolas Vo</title>
				<meta name="description" content="Nicolas Vo's Portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1>Hi, you&apos;ve reached Nicolas Vo</h1>
				<section>
					<p>
						A junior web dev
					</p>
				</section>
				<nav>
					{pageList.map((category) => {
						return (
							<div key={`${category.category}-links`}>
								<h2>{category.category === "fcc" ? "freeCodeCamp" : category.category}</h2>
								{category.pages.length !== 0 ?
									<ul>
										{
											category.pages.map((page) => {
												return (
													<li key={`${page}-link`} style={{listStyle: "none"}}>
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
				<section style={{paddingTop: "25vh"}}>
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

			<footer className={styles.footer}>
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
