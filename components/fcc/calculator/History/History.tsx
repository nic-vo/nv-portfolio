import { FaShare } from 'react-icons/fa';

import histStyles from './History.module.scss';
import { MouseEventHandler } from 'react';

const History = (props: {
	history: { formula: string, result: string }[],
	pickHistory: MouseEventHandler,
	clearHistory: MouseEventHandler,
	oldAllowed: boolean
}) => {
	const { history, pickHistory, clearHistory, oldAllowed } = props;
	return (
		<div className={histStyles.history}>
			<button className={histStyles.clearhistory}
				onClick={clearHistory}>Clear History</button>
			{
				history.map((item, index) => {
					return (
						<div className={histStyles.historyitem} key={`his-${index}`}>
							<p>
								{item.formula.replaceAll(/([+*/]|(?<!([+*/\-]|^))-)/g, " $1 ")}
								=
								{item.result}
							</p>
							<button
								value={item.result}
								onClick={pickHistory}
								disabled={!oldAllowed}>
								<FaShare />
							</button>
						</div>
					)
				})
			}
		</div >
	);
};

export default History;
