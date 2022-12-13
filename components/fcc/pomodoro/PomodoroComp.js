import { useState, useEffect } from "react";

import Timeouter from "./Timeouter/Timeouter";

import { FaPlus, FaMinus, FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";

import compLook from './PomodoroComp.module.scss';

const PomodoroComp = () => {
	const [work, setWork] = useState(1);
	const [rest, setRest] = useState(1);
	const [activate, setActivate] = useState(false);
	const [workActive, setWorkActive] = useState(true);
	const [fullscreen, setFullscreen] = useState(false);


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

	const skipper = () => {
		setWorkActive(!workActive);
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
			console.dir(coord);
			setTimeout(() => { window.scrollTo({ left: 0, top: coord.y, behavior: "smooth" }) }, 90);
		};
	}, [fullscreen]);

	const containerClass = `${compLook.container} ${fullscreen === true ? compLook.fullscreen : compLook.windowed} ${activate === false ? compLook.inactive : workActive === true ? compLook.workin : compLook.restin}`

	return (
		<section id="pomcon" className={containerClass}>
			<Timeouter work={work} rest={rest} activate={activate} activator={activator} workActive={workActive} workToggle={workToggle} skipper={skipper} />
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
