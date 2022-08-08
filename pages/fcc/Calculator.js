import React from 'react';
import { CalcButton } from '../../components/fcc';

import calcStyles from '../../styles/fcc/Calculator.module.css';

const chars = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]

const Calculator = () => {
	return (
		<>
			<h1>Calculator</h1>
			<div className={calcStyles.padGrid}>
				{chars.map(char => {
					return <CalcButton char={char} key={`CButton-${char}`} />
				})}
			</div>
		</>
	);
};

export default Calculator;
