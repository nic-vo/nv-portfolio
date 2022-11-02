import Head from "next/head";

import { CollatzComp } from "../../components/personal";
import { ProjectLayout } from "../../components/global";

const Collatz = () => {
	return (<>
		<Head>
			<title>A Collatz generator</title>
			<meta name="description" content="Input an int into this baby and it'll spit out how many steps it takes to reach 1 via Collatz" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ProjectLayout>
			<h1>Collatz Generator</h1>
			<CollatzComp />
			<section>
				<p>
					Description blurb
				</p>
			</section>
		</ProjectLayout>
	</>)
}

export default Collatz;
