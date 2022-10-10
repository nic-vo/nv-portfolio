import Head from 'next/head';
import { ProjectLayout } from '../../components/global';
import { CalculatorComp } from '../../components/fcc/calculator';

const Calculator = () => {
	return (<>
		<Head>
			<title>A Calculator</title>
			<meta name="description" content="A React calculator completed for freeCodeCamp's frontend certificate" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ProjectLayout>
			<CalculatorComp />
			<section>
				<p>
					Description blurb + link to codepen
				</p>
			</section>
		</ProjectLayout>
	</>);
};

export default Calculator;
