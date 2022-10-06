import Head from 'next/head';

import { React, useState } from 'react';
import Pad from './Pad/Pad';
import ControlPanel from './ControlPanel/ControlPanel';

import machineStyles from './DrumMachine.module.css';

const chars = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

const DrumMachineComp = () => {

	// Keeps track of sound last played, active sound bank, master volume
	const [displaySound, setDisplaySound] = useState("");
	const [bank, setBank] = useState(0);
	const [mVolume, setMVolume] = useState(0.5);
	const [muteAll, setMuteAll] = useState(false);

	// Pulsers: when set to true, a setTimeout immediately falses them; trigger useEffects in children
	// MAY BE A PERFORMANCE HIT -- UNNECESSARY RENDERS
	const [stopAll, setStopAll] = useState(false);


	const setDisplaySoundHandler = (sound, playing = true) => {
		// Updates displaySound based on last activated sound
		// Clears upon the last sound ending
		if (playing === false && sound === displaySound) {
			setDisplaySound("")
		} else if (playing === true) {
			setDisplaySound(sound);
		};
	};

	const mVolumeHandler = (e) => {
		setMVolume(parseFloat(e.target.value));
	};

	const setBankHandler = (e) => {
		setBank(parseInt(e.target.value));
		setDisplaySound("");
	};

	// Triggers sounds
	const keyPressHandler = (e) => {
		if (chars.includes(e.key)) {
			const player = document.getElementById(e.key);
			player.currentTime = 0;
			player.play();
		};
	};

	const stopAllHandler = () => {
		setStopAll(true);
		// Same timeout pulser pattern as the above keyPressHandler
		const pulser = setTimeout(() => {
			setStopAll(false);
		});
	};

	const muteAllHandler = () => {
		setMuteAll(!muteAll);
	}

	return (<>
		<Head>
			<title>A Drum Machine</title>
			<meta name="description" content="A React drum machine completed for freeCodeCamp's frontend certificate" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<main className={machineStyles.main}>
			<section className={machineStyles.machine}>
				<ControlPanel
					displaySound={displaySound}
					mVolume={mVolume}
					bank={bank}
					muteAll={muteAll}
					mVolumeHandler={mVolumeHandler}
					setBankHandler={setBankHandler}
					stopAllHandler={stopAllHandler}
					muteAllHandler={muteAllHandler} />
				<div className={machineStyles.grid} tabIndex="0" onKeyPress={keyPressHandler}>
					{chars.map((char) => {
						return <Pad
							char={char}
							bank={bank}
							mVolume={mVolume}
							stopAll={stopAll}
							muteAll={muteAll}
							setDisplaySound={setDisplaySoundHandler}
							key={`pad-${char}`}
						/>
					})}
				</div>
			</section>
		</main>
	</>);
};

export default DrumMachineComp;
