import { useState, useEffect, useRef } from 'react';

import compLook from '../PomodoroComp.module.scss';
import timeLook from './Timeouter.module.scss';

const Timeouter = ({ work, rest, activate, activator, skipper, workActive, workToggle }) => {

	const [loop, setLoop] = useState(null);
	const [expected, setExpected] = useState(null);
	const [currentTime, setCurrentTime] = useState(work * 60);

	const workRef = useRef();
	const restRef = useRef();
	const assetPath = '../assets/fcc/Pomodoro/';

	useEffect(() => {
		if (activate === true) {
			const now = Date.now();
			setExpected(now + 1000)
			setLoop(() => {
				return setTimeout(() => {
					setCurrentTime(currentTime - 1);
				}, 1000);
			});
		} else {
			clearTimeout(loop);
			setLoop(null);
			setExpected(null);
		};
	}, [activate]);

	useEffect(() => {
		if (activate === false) { return };
		if (currentTime === 0) {
			let newTime, newPhase;
			if (workActive === true) {
				newTime = rest * 60;
				newPhase = false;
			} else {
				newTime = work * 60;
				newPhase = true;
			};
			const now = Date.now();
			setLoop(() => {
				const now = Date.now();
				const diff = now - expected;
				console.log(`${newTime} in ${1000 - diff} ms`)
				return setTimeout(() => {
					workToggle(newPhase);
					setCurrentTime(newTime);
					setExpected(now + 1000);
				}, 1000 - diff);
			});
		} else {
			setLoop(() => {
				const now = Date.now();
				const diff = now - expected;
				return setTimeout(() => {
					setCurrentTime(currentTime - 1);
					setExpected(now + 1000);
				}, 1000 - diff);
			});
		}
	}, [currentTime]);

	useEffect(() => {
		if (workActive === false) { return };
		setCurrentTime(work * 60);
	}, [work]);

	useEffect(() => {
		if (workActive === true) { return };
		setCurrentTime(rest * 60);
	}, [rest]);

	useEffect(() => {
		if (activate === true) { return };
		if (workActive === true) {
			setCurrentTime(work * 60);
		} else {
			setCurrentTime(rest * 60);
		};
	}, [workActive]);

	useEffect(() => {
		if (activate === false) { return };
		if (workActive === true) {
			workRef.current.pause();
			workRef.current.currentTime = 0;
			workRef.current.play();
		} else {
			restRef.current.pause();
			restRef.current.currentTime = 0;
			restRef.current.play();
		};
	}, [activate, workActive])

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
				<button onClick={activator} className={compLook.menter} >{activate === true ? "Stop" : "Start"}</button>
				<button onClick={skipper} className={compLook.menter} disabled={activate} >Skip</button>
			</div>
			<audio autoPlay={false} src={assetPath + "work.mp3"} id='workaudio' ref={workRef} />
			<audio autoPlay={false} src={assetPath + "rest.mp3"} id='restaudio' ref={restRef} />
		</div>
	);
};

export default Timeouter;
