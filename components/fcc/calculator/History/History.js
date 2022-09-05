import React from 'react';
import { FaUndoAlt } from 'react-icons/fa';

import histStyles from './History.module.css';

const History = ({
	history,
	pickHistory,
	clearHistory,
	oldAllowed
}) => {
	return (
		<div className={histStyles.history}>
			<button className={histStyles.clearhistory} onClick={clearHistory}>Clear History</button>
			{history.map((item, index) => {
				return (
					<div className={histStyles.historyitem} key={`his-${index}`}>
						<p>{item[0].replaceAll(/([+*/]|(?<!([+*/\-]|^))-)/g, " $1 ")} = {item[1]}</p>
						<button value={item[1]} onClick={pickHistory} disabled={!oldAllowed}><FaUndoAlt /></button>
					</div>)
			})}
		</div >
	);
};

export default History;
