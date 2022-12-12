import { useState } from "react";

import Game from "./Game/Game";

const AimTrainerComp = () => {

	const [phase, setPhase] = useState('MENU');
	const [lastScore, setLastScore] = useState(null);


	const updateLastScore = (stats) => {
		const { time, accuracy, shotsFired } = stats;
		setLastScore({ time, accuracy, shotsFired });
	};

	const simulateScore = () => {
		const time = Math.floor(Math.random() * 60 + 60);
		const accuracy = Math.random() * 100;
		const shotsFired = Math.floor(2500 / accuracy);
		updateLastScore({ time, accuracy, shotsFired })
	};

	const startHandler = () => {
		setLastScore(null);
		if (phase === 'MENU') {
			setPhase('GAME');
		} else {
			setPhase('MENU');
		};
	};

	return (
		<section>
			<button onClick={startHandler}>{phase}</button>
			<button onClick={simulateScore}>SIMULATE</button>
			{phase}
			{phase === 'GAME' && (<>
				<h2>Field</h2>
				<Game />
			</>)}
			{lastScore !== null ?
				(<div>
					<p>Time: {lastScore.time} seconds</p>
					<p>Accuracy: {lastScore.accuracy.toFixed(2)}%</p>
					<p>Shots fired: {lastScore.shotsFired}</p>
				</div>)
				:
				(<p>Play a round!</p>)}
		</section>
	);
};

export default AimTrainerComp;
