import React from 'react';
import { ProjectLayout } from '../../components/global';
import { CalculatorComp } from '../../components/fcc/calculator';

const Calculator = () => {
	return (
		<ProjectLayout>
			<CalculatorComp />
			<section>
				<p>
					Description blurb + link to codepen
				</p>
			</section>
		</ProjectLayout>
	);
};

export default Calculator;
