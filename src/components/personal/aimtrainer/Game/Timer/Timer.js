import { useState, useEffect } from "react";

const Timer = ({ activate, finished, timeElapsed, failer }) => {
	const [loop, setLoop] = useState(null);
	const [expected, setExpected] = useState(null);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {

	}, [finished]);

	useEffect(() => {
		if (activate === false) {
			clearTimeout(loop);
			setLoop(null);
			setExpected(null);
			setCurrentTime(0);
			return;
		};
		setExpected(Date.now() + 100);
		setLoop(() => {
			const now = Date.now();
			const diff = now - now;
			return setTimeout(() => {
				setCurrentTime(1);
				setExpected(now + 100);
			}, 100 - diff);
		})
	}, [activate, loop]);

	useEffect(() => {
		if (activate === false) { return };
		if (currentTime === 6000) {
			// failer();
			return;
		}
		setLoop(() => {
			const now = Date.now();
			const diff = now - expected;
			return setTimeout(() => {
				setCurrentTime(currentTime + 1);
				setExpected(now + 100);
			}, 100 - diff);
		});
	}, [currentTime, activate]);

	const seconds = Math.floor(currentTime / 10);
	const minutes = Math.floor(currentTime / 600);

	return (
		<div>
			{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:{currentTime % 10}0
		</div>
	);
};

export default Timer;
