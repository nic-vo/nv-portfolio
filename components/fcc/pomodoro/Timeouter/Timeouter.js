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

	// Activate prop initiates or cancels a timeout loop
	useEffect(() => {
		if (activate === true) {
			// Set an expected time for the future timeout to compensate drift from
			setExpected(Date.now() + 1000);
			// Loop entry only decrements timer, doesn't compensate for drift yet
			setLoop(() => {
				return setTimeout(() => {
					setCurrentTime(currentTime - 1);
				}, 1000);
			});
		} else {
			// Clear any active timeouts
			clearTimeout(loop);
			setLoop(null);
			// Clear drift compensation just in case
			setExpected(null);
		};
	}, [activate]);

	/*
		The following useEffect can fire either when:
			- timer runs down and new phase begins
			- skip button manually triggers new phase
	*/
	useEffect(() => {
		if (activate === true) {
			// In case skip occurs while clock is active,
			// this is an attempt not to have concurrent timeouts
			clearTimeout(loop);
		}
		/*
			New time based on phase
			IMPORTANT: TRIGGERS A NEW LOOP
		*/
		const newTime = workPhase === true ? work * MULTIPLIER : rest * MULTIPLIER;
		setCurrentTime(newTime);
		// New expected for the above loop trigger
		setExpected(Date.now() + 1000);
	}, [workPhase]);

	// Main loop useEffect
	useEffect(() => {
		if (activate === false) { return };
		if (currentTime === 0) {
			// Triggers a non-drifted, perfctly timed phase change when the timer reaches 0
			const newTime = workPhase === true ? work * MULTIPLIER : rest * MULTIPLIER;
			const now = Date.now();
			const diff = now - expected;
			setLoop(() => {
				return setTimeout(() => {
					workToggle(!workPhase);
					setCurrentTime(newTime);
					setExpected(now + 1000);
				}, 1000 - diff);
			});
		} else {
			// All other times
			const now = Date.now();
			/*
				Following line accounts for skip button click while timer active
				Must account for the expected drift value not resetting on click
				Might cause issues when calculating new offset timeout value
			*/
			const diff = now - expected > 0 ? now - expected : 0;
			// console.log(`${currentTime - 1} in ${1000 - diff} ms`)
			setLoop(() => {
				return setTimeout(() => {
					setCurrentTime(currentTime - 1);
					setExpected(now + 1000);
				}, 1000 - diff);
			});
		};
	}, [currentTime]);

	// The following two hooks are for accepting timer value changes from parent
	useEffect(() => {
		if (workPhase === false) { return };
		setCurrentTime(work * MULTIPLIER);
	}, [work]);

	useEffect(() => {
		if (workPhase === true) { return };
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
	}, [activate, workPhase])

	const resetHandler = () => {
		setCurrentTime(work * MULTIPLIER);
		workToggle(true);
	};

	const skipper = () => {
		workToggle(!workPhase);
	};

	return (
		<div className={timeLook.timer}>
			<h2 className={timeLook.bigLabel}>{workPhase ? "WORKIN'" : "RESTIN'"}</h2>
			<p className={timeLook.timeOutput}>{`${currentTime >= 600 ? Math.floor(currentTime / 60) : `0${Math.floor(currentTime / 60)}`}`}:{`${currentTime % 60 >= 10 ? currentTime % 60 : `0${currentTime % 60}`}`}</p>
			<div className={timeLook.controls}>
				<button onClick={resetHandler} className={pomoLook.menter} disabled={activate}>Reset</button>
				<button onClick={activator} className={pomoLook.menter} >{activate === true ? "Stop" : "Start"}</button>
				<button onClick={skipper} className={pomoLook.menter}>Skip</button>
			</div>
			<audio autoPlay={false} src={assetPath + "work.mp3"} id='workaudio' ref={workRef} />
			<audio autoPlay={false} src={assetPath + "rest.mp3"} id='restaudio' ref={restRef} />
		</div>
	);
};

export default Timeouter;
