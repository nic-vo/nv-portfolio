import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectLists } from '../lib/root/projects';

import styles from '../styles/Home.module.css';

export default function Home({ pageList }) {
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
						Starting out
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
													<li key={`${page}-link`}>
															<a href={`/${category.category}/${page}`}>{page.replaceAll(/([A-Z])/g, " $1")}
																<Image src={`/thumbs/${page}.jpg`} height="1440" width="2560" layout="intrinsic" alt=""/>
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
				<section>
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
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}

export async function getStaticProps() {
	const pageList = getProjectLists();
	return {
		props: {
			pageList
		},
		revalidate: 3600
	}
}
