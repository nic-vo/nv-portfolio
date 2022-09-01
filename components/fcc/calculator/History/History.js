import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import calcStyles from '../../../../styles/fcc/Calculator/Calculator.module.css';

const History = ({
	history,
	pickHistory,
	clearHistory,
	oldAllowed
}) => {
	return (
		<div className={calcStyles.history}>
			{history.map((item, index) => {
				return (
					<div className={calcStyles.historyitem} key={`his-${index}`}>
						<p>{item[0]} = {item[1]}</p>
						<button value={item[1]} onClick={pickHistory} disabled={!oldAllowed}>Enter</button>
					</div>)
			})}
			<button onClick={clearHistory}>Clear History</button>
		</div >
	);
};

export default History;
