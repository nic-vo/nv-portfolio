import { useState, useEffect, useRef } from "react";

import { FaPlus, FaMinus, FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";

import compLook from './PomodoroComp.module.scss';
import timeLook from './Timeouter/Timeouter.module.scss';

const PomodoroComp = () => {
	const [work, setWork] = useState(1);
	const [rest, setRest] = useState(1);
	const [activate, setActivate] = useState(false);
	const [workActive, setWorkActive] = useState(true);
	const [fullscreen, setFullscreen] = useState(false);

	const [loop, setLoop] = useState(null);
	const [expected, setExpected] = useState(null);
	const [currentTime, setCurrentTime] = useState(work * 60);

	const workRef = useRef();
	const restRef = useRef();
	const assetPath = '../assets/fcc/Pomodoro/';

	useEffect(() => {
		if (activate === true) {
			setExpected(Date.now() + 1000)
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
		console.log('firing timer')
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
			setLoop(() => {
				const now = Date.now();
				const diff = now - expected;
				// console.log(`phase ${workActive ? 'work' : 'rest'} ${newTime} in ${1000 - diff} ms`)
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
				console.log(diff);
				// console.log(`phase ${workActive ? 'work' : 'rest'} ${currentTime - 1} in ${1000 - diff} ms`)
				return setTimeout(() => {
					setCurrentTime(currentTime - 1);
					setExpected(now + 1000);
				}, 1000 - diff);
			});
		}
	}, [currentTime]);

	useEffect(() => {
		if (workActive === false || activate === true) { return };
		setCurrentTime(work * 60);
	}, [work]);

	useEffect(() => {
		if (workActive === true || activate === true) { return };
		setCurrentTime(rest * 60);
	}, [rest]);

	useEffect(() => {
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

	const skipper = () => {
		clearTimeout(loop);
		setLoop(null);
		workToggle(!workActive);
		setExpected(Date.now() + 1000);
	};


	const workIncHandler = (val = 1) => {
		if (work + val > 60) { return };
		setWork(prev => { return prev + val });
	};

	const workDecHandler = (val = 1) => {
		if (work - val < 1) { return };
		setWork(prev => { return prev - val });
	};

	const restIncHandler = (val = 1) => {
		if (rest + val > 60) { return };
		setRest(prev => { return prev + val });
	};

	const restDecHandler = (val = 1) => {
		if (rest - val < 1) { return };
		setRest(prev => { return prev - val });
	};

	const activator = () => {
		setActivate(prev => { return !prev });
	};

	const workToggle = (boo) => {
		setWorkActive(boo);
	};

	const fullscrenHandler = () => {
		setFullscreen(!fullscreen);
	};

	useEffect(() => {
		if (fullscreen === true) {
			const coord = document.getElementById("pomcon").getBoundingClientRect();
			setTimeout(() => { window.scrollTo({ left: 0, top: coord.y, behavior: "smooth" }) }, 90);
		};
	}, [fullscreen]);

	const containerClass = `${compLook.container} ${fullscreen === true ? compLook.fullscreen : compLook.windowed} ${activate === false ? compLook.inactive : workActive === true ? compLook.workin : compLook.restin}`

	return (
		<section id="pomcon" className={containerClass}>
			<div className={timeLook.timer}>
			<h2 className={timeLook.bigLabel}>{workActive ? "WORKIN'" : "RESTIN'"}</h2>
			<p className={timeLook.timeOutput}>{`${currentTime >= 600 ? Math.floor(currentTime / 60) : `0${Math.floor(currentTime / 60)}`}`}:{`${currentTime % 60 >= 10 ? currentTime % 60 : `0${currentTime % 60}`}`}</p>
			<div className={timeLook.controls}>
				<button onClick={resetHandler} className={compLook.menter} disabled={activate}>Reset</button>
				<button onClick={activator} className={compLook.menter} >{activate === true ? "Stop" : "Start"}</button>
				<button onClick={skipper} className={compLook.menter} >Skip</button>
			</div>
			<audio autoPlay={false} src={assetPath + "work.mp3"} id='workaudio' ref={workRef} />
			<audio autoPlay={false} src={assetPath + "rest.mp3"} id='restaudio' ref={restRef} />
		</div>
			<div className={compLook.timeControls}>
				<div className={compLook.controllerCategory}>
					<h3>Work Time</h3>
					<div className={compLook.counter}>
						<button onClick={() => { workIncHandler(5) }} className={compLook.menter} disabled={activate}><FaPlus />5</button>
						<button onClick={() => { workIncHandler() }} className={compLook.menter} disabled={activate}><FaPlus />1</button>
						<span>{work}</span>
						<button onClick={() => { workDecHandler() }} className={compLook.menter} disabled={activate}><FaMinus />1</button>
						<button onClick={() => { workDecHandler(5) }} className={compLook.menter} disabled={activate}><FaMinus />5</button>
					</div>
				</div>
				<div className={compLook.controllerCategory}>
					<h3>Rest Time</h3>
					<div className={compLook.counter}>
						<button onClick={() => { restIncHandler(5) }} className={compLook.menter} disabled={activate}><FaPlus />5</button>
						<button onClick={() => { restIncHandler() }} className={compLook.menter} disabled={activate}><FaPlus />1</button>
						<span>{rest}</span>
						<button onClick={() => { restDecHandler() }} className={compLook.menter} disabled={activate}><FaMinus />1</button>
						<button onClick={() => { restDecHandler(5) }} className={compLook.menter} disabled={activate}><FaMinus />5</button>
					</div>
				</div>
			</div>
			<button onClick={fullscrenHandler} className={compLook.fullscreener}>{fullscreen === true ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}</button>
		</section>
	);
};

export default PomodoroComp;
