import { useState, useEffect, useRef } from 'react';

import pomoLook from '../Pomodoro.module.scss';
import timeLook from './Timeouter.module.scss';

// For dev purposes can be set to something other than 60 (seconds)
const MULTIPLIER = 60;

const Timeouter = ({ work, rest, activate, activator, workPhase, workToggle }) => {

	/*
		Holds a timeout ID in state so timer can be cancelled
		Each timeout decrements current timer
		Each decrement call sets a new timeout in loop
		Expected holds a value to compensate for drift due to JS single-threaded blocking
	*/

	// Init loop holder, drift compensation, timer
	const [loop, setLoop] = useState(null);
	const [expected, setExpected] = useState(null);
	const [currentTime, setCurrentTime] = useState(work * MULTIPLIER);

	// Refs for audio play
	const workRef = useRef();
	const restRef = useRef();
	const assetPath = '../assets/fcc/Pomodoro/';

	const resetHandler = () => {
		setCurrentTime(work * MULTIPLIER);
		workToggle(true);
	};

	const skipper = () => {
		let phaseChange = workPhase === true ? work : rest;
		if (activate === false) {
			setCurrentTime(phaseChange * MULTIPLIER);
		} else {
			clearTimeout(loop);
			setLoop(null);
			setExpected(Date.now() + 1000);
			setCurrentTime(phaseChange * MULTIPLIER);
		};
		workToggle(!workPhase);
	};

	const activateHandler = () => {
		if (activate === false) {
			activator();
			setExpected(Date.now() + 1000);
			setLoop(() => {
				return setTimeout(() => {
					setCurrentTime((current) => { return current - 1 })
				}, 1000);
			});
		} else {
			activator();
			clearTimeout(loop);
			setLoop(null);
			setExpected(null);
		};
	};

	useEffect(() => {
		if (activate === false) { return };
		const now = Date.now();
		const diff = now - expected;
		setExpected(now + 1000);
		if (currentTime <= 1) {
			let phaseChange = workPhase === true ? work : rest;
			setLoop(() => {
				return setTimeout(() => {
					setCurrentTime(phaseChange * MULTIPLIER);
					workToggle(!workPhase);
				}, 1000 - diff);
			});
		} else {
			setLoop(() => {
				return setTimeout(() => {
					setCurrentTime((current) => { return current - 1 });
				}, 1000 - diff);
			});
		};
	}, [currentTime]);

	// The following two hooks are for accepting timer value changes from parent
	useEffect(() => {
		if (workPhase === false || activate === false) { return };
		setCurrentTime(work * MULTIPLIER);
	}, [work]);

	useEffect(() => {
		if (workPhase === true || activate === false) { return };
		setCurrentTime(rest * MULTIPLIER);
	}, [rest]);

	// Hook to trigger sound on timer active or phase change
	useEffect(() => {
		if (activate === false) { return };
		if (workPhase === true) {
			workRef.current.pause();
			workRef.current.currentTime = 0;
			workRef.current.play();
		} else {
			restRef.current.pause();
			restRef.current.currentTime = 0;
			restRef.current.play();
		};
	}, [activate, workPhase]);

	return (
		<div className={timeLook.timer}>
			<h2 className={timeLook.bigLabel}>{workPhase ? "WORKIN'" : "RESTIN'"}</h2>
			<p className={timeLook.timeOutput}>{`${currentTime >= 600 ? Math.floor(currentTime / 60) : `0${Math.floor(currentTime / 60)}`}`}:{`${currentTime % 60 >= 10 ? currentTime % 60 : `0${currentTime % 60}`}`}</p>
			<div className={timeLook.controls}>
				<button onClick={resetHandler} className={pomoLook.menter} disabled={activate}>Reset</button>
				<button onClick={activateHandler} className={pomoLook.menter} >{activate === true ? "Stop" : "Start"}</button>
				<button onClick={skipper} className={pomoLook.menter}>Skip</button>
			</div>
			<audio autoPlay={false} src={assetPath + "work.mp3"} id='workaudio' ref={workRef} />
			<audio autoPlay={false} src={assetPath + "rest.mp3"} id='restaudio' ref={restRef} />
		</div>
	);
};

export default Timeouter;
