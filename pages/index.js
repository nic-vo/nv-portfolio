import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectLists } from '../lib/projects';

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
				{pageList.map((category) => {
					return (
						<div key={`${category.category}-links`}>
							<h2>{category.category}</h2>
							<ul>
								{
									category.pages.map((page) => {
										return (<li key={`${page}-link`}>
											<Link href={`/${category.category}/${page}`}>
												<a>{page.replaceAll(/([A-Z])/g, " $1")}
													<Image src={`/thumbs/${page}.jpg`} height="1440" width="2560" layout="intrinsic" />
												</a>
											</Link>
										</li>)
									})
								}
							</ul>
						</div>
					)
				})}
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
		}
	}
}
