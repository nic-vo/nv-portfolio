import Head from "next/head";

import { MarkdownComp } from "../../components/fcc/markdown";
import { ProjectLayout } from "../../components/global";

const Markdown = () => {
	return (
		<>
			<Head>
				<title>A Markdown Previewer</title>
				<meta name="description" content="A React markdown previewer completed for freeCodeCamp's frontend certificate" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ProjectLayout>
				<h1>Markdown Previewer</h1>
				<MarkdownComp />
				<section>
					<p>Description blurb + link</p>
				</section>
			</ProjectLayout>
		</>
	);
};

export default Markdown;
