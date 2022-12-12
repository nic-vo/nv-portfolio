import { useState } from "react";

import Field from "./Field/Field";
import Target from "./Target/Target";
import Timer from "./Timer/Timer";

const Game = ({ raiseData, }) => {
	const [activate, setActivate] = useState(false);
	const [finished, setFinished] = useState(false);
	const [hits, setHits] = useState([]);
	const [tries, setTries] = useState([]);
	const [lastHitTime, setLastHitTime] = useState(null);

	const clickHandler = (e) => {
		if (activate === false) { return };
		setTries([...tries, { time: Date.now(), x: e.clientX, y: e.clientY }]);
	};

	const activator = () => {
		setLastHitTime(Date.now());
		setActivate(!activate)
	};

	return (
		<div onClick={clickHandler} style={{ width: "100vw", height: "100vh", padding: 0, margin: 0 }}>
			<button onClick={activator}>{activate === true ? "End" : "Start"}</button>
			<Timer activate={activate} finished={finished} />
			{tries.length >= 1 &&
				(<ul>
					{
						tries.map((attempt) => {
							return (
								<li>
									Time: {attempt.time-lastHitTime} / posX: {attempt.x} / posY: {attempt.y}
								</li>
							)
						})
					}
				</ul>)
			}
		</div>
	);
};

export default Game;
