import { useState, useEffect } from 'react';

import Timeouter from './Timeouter/Timeouter';

import { FaPlus, FaMinus, FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';

import pomoLook from './Pomodoro.module.scss';

const Pomodoro = () => {
	const [work, setWork] = useState(1);
	const [rest, setRest] = useState(1);
	const [activate, setActivate] = useState(false);
	const [workPhase, setWorkPhase] = useState(true);
	const [fullscreen, setFullscreen] = useState(false);


	const workIncHandler = (val = 1) => {
		if (work + val > 60) { return setWork(60) };
		setWork(prev => { return prev + val });
	};

	const workDecHandler = (val = 1) => {
		if (work - val < 1) { return setWork(1) };
		setWork(prev => { return prev - val });
	};

	const restIncHandler = (val = 1) => {
		if (rest + val > 60) { return setWork(60) };
		setRest(prev => { return prev + val });
	};

	const restDecHandler = (val = 1) => {
		if (rest - val < 1) { return setWork(1) };
		setRest(prev => { return prev - val });
	};

	const activator = () => {
		setActivate(prev => { return !prev });
	};

	const workToggle = (boo) => {
		setWorkPhase(boo);
	};

	const fullscrenHandler = () => {
		setFullscreen(!fullscreen);
	};

	useEffect(() => {
		if (fullscreen === true) {
			setTimeout(() => {
				const coord = document.getElementById('pomcon').getBoundingClientRect();
				window.scrollTo({ left: 0, top: coord.y, behavior: 'smooth' })
			}, 167);
		};
	}, [fullscreen]);

	const containerClass = `${pomoLook.container} ${fullscreen === true ? pomoLook.fullscreen : pomoLook.windowed} ${activate === false ? pomoLook.inactive : workPhase === true ? pomoLook.workin : pomoLook.restin}`

	return (
		<section id='pomcon' className={containerClass}>
			<Timeouter work={work} rest={rest} activate={activate} activator={activator} workPhase={workPhase} workToggle={workToggle} />
			<div className={pomoLook.timeControls}>
				<div className={pomoLook.controllerCategory}>
					<span>Work Time: {work}</span>
					<div className={pomoLook.counter}>
						<button onClick={() => { workIncHandler(5) }} className={pomoLook.menter} disabled={activate}><FaPlus />5</button>
						<button onClick={() => { workIncHandler() }} className={pomoLook.menter} disabled={activate}><FaPlus />1</button>
						<button onClick={() => { workDecHandler() }} className={pomoLook.menter} disabled={activate}><FaMinus />1</button>
						<button onClick={() => { workDecHandler(5) }} className={pomoLook.menter} disabled={activate}><FaMinus />5</button>
					</div>
				</div>
				<div className={pomoLook.controllerCategory}>
					<span>Rest Time: {rest}</span>
					<div className={pomoLook.counter}>
						<button onClick={() => { restIncHandler(5) }} className={pomoLook.menter} disabled={activate}><FaPlus />5</button>
						<button onClick={() => { restIncHandler() }} className={pomoLook.menter} disabled={activate}><FaPlus />1</button>
						<button onClick={() => { restDecHandler() }} className={pomoLook.menter} disabled={activate}><FaMinus />1</button>
						<button onClick={() => { restDecHandler(5) }} className={pomoLook.menter} disabled={activate}><FaMinus />5</button>
					</div>
				</div>
			</div>
			<button onClick={fullscrenHandler} className={pomoLook.fullscreener}>{fullscreen === true ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}</button>
		</section>
	);
};

export default Pomodoro;
