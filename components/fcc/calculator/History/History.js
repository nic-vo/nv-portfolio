import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const History = ({
	history,
	pickHistory,
	clearHistory,
	oldAllowed
}) => {
	return (
		<div>
			{history.map((item, index) => { return <div key={`his-${index}`}><p>{item[0]} = {item[1]}</p><button value={item[1]} onClick={pickHistory} disabled={!oldAllowed}>Enter</button></div> })}
			<button onClick={clearHistory}>Clear History</button>
		</div >
	);
};

export default History;
