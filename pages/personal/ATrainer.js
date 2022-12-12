import Head from "next/head";

import { ProjectLayout } from "../../components/global";
import { AimTrainerComp } from "../../components/personal";

const ATrainer = () => {
	return (<>
		<Head>
			<title>An Aim Trainer</title>
			<meta name="description" content="An aim trainer that's really only suited for 2d games like osu!" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ProjectLayout>
			<h1>Aim Trainer</h1>
			<AimTrainerComp />
			<section>
				<p>
					Description blurb
				</p>
			</section>
		</ProjectLayout>
	</>);
};

export default ATrainer;
