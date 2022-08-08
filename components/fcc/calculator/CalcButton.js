import React from 'react'

import calcStyles from '../../../styles/fcc/Calculator.module.css';

const CalcButton = ({ char }) => {
	return (
		<div id={char} className={calcStyles.pad}>
			<p>{char}</p>
		</div>
	);
};

export default CalcButton;
