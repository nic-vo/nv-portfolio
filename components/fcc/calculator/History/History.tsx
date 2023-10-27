import { FaShare } from 'react-icons/fa';

import style from './History.module.scss';
import { MouseEventHandler } from 'react';

const History = (props: {
	history: { formula: string, result: string }[],
	pickHistory: (value: string) => void,
	clearHistory: MouseEventHandler,
	oldAllowed: boolean
}) => {
	const { history, pickHistory, clearHistory, oldAllowed } = props;
	const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		pickHistory(e.currentTarget.value)
	}

	return (
		<div className={style.container}>
			<button className={style.clearhistory}
				onClick={clearHistory}>Clear History</button>
			{
				history && (
					<ul className={style.historyList}>
						{history.map((item, index) => {
							return (
								<li className={style.historyitem} key={`his-${index}`}>
									<p>
										{item.formula.replaceAll(/([+*/]|(?<!([+*/\-]|^))-)/g, " $1 ")}
										=
										{item.result}
									</p>
									<button
										value={item.result}
										onClick={clickHandler}
										disabled={!oldAllowed}>
										<FaShare />
									</button>
								</li>
							)
						})}
					</ul>
				)
			}
		</div >
	);
};

export default History;
