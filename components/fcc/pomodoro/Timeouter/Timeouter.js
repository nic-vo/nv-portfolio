import { useState, useEffect, useRef } from 'react';

import compLook from '../PomodoroComp.module.css';
import timeLook from './Timeouter.module.css';

const Timeouter = ({ work, rest, activate, activator, workActive, workToggle }) => {

	const [loop, setLoop] = useState(null);
	const [expected, setExpected] = useState(null);
	const [currentTime, setCurrentTime] = useState(work * 60);

	const workRef = useRef();
	const restRef = useRef();
	const assetPath = '../assets/fcc/Pomodoro/';

	const playSound = (workActive) => {
		if (workActive === true) {
			workRef.current.play();
		} else {
			restRef.current.play();
		};
	};


	useEffect(() => {
		if (activate === true) {
			playSound(workActive);
			setExpected(Date.now() + 1000);
			setLoop(() => {
				const now = Date.now();
				const diff = now - now;
				return setTimeout(() => {
					setCurrentTime(currentTime - 1);
					setExpected(now + 1000);
				}, 1000 - diff);
			});
		} else {
			workRef.current.pause();
			restRef.current.pause();
			workRef.current.currentTime = 0;
			restRef.current.currentTime = 0;
			clearTimeout(loop);
			setExpected(null);
			setLoop(null);
		};
	}, [activate]);

	useEffect(() => {
		if (activate === false) { return };
		if (currentTime < 0) {
			clearTimeout(loop);
			setLoop(null);
			if (workActive === true) {
				workToggle(false);
				setCurrentTime(rest * 60);
			} else {
				workToggle(true);
				setCurrentTime(work * 60);
			};
		};
		setLoop(() => {
			const now = Date.now();
			const diff = now - expected;
			return setTimeout(() => {
				setCurrentTime(currentTime - 1);
				setExpected(now + 1000);
			}, 1000 - diff);
		});
	}, [currentTime]);

	useEffect(() => {
		if (workActive === false) { return }
		setCurrentTime(work * 60);
	}, [work]);

	useEffect(() => {
		if (workActive === true) { return }
		setCurrentTime(rest * 60);
	}, [rest]);

	const resetHandler = () => {
		if (activate === true) { return }
		setCurrentTime(work * 60);
		workToggle(true);
	};

	return (
		<div className={timeLook.timer}>
			<h2 className={timeLook.bigLabel}>{workActive ? "WORKIN'" : "RESTIN'"}</h2>
			<p className={timeLook.timeOutput}>{`${currentTime >= 600 ? Math.floor(currentTime / 60) : `0${Math.floor(currentTime / 60)}`}`}:{`${currentTime % 60 >= 10 ? currentTime % 60 : `0${currentTime % 60}`}`}</p>
			<div className={timeLook.controls}>
				<button onClick={resetHandler} className={compLook.menter} disabled={activate}>Reset</button>
				<button onClick={activator} className={compLook.menter} >Activate</button>
			</div>
			<audio src={assetPath + "work.mp3"} id='workaudio' ref={workRef} />
			<audio src={assetPath + "rest.mp3"} id='restaudio' ref={restRef} />
		</div>
	);
};

export default Timeouter;
