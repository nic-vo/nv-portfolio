import { React, useState } from 'react';
import { Pad, ControlPanel } from '../../components/fcc/drummachine';

import machineStyles from '../../styles/fcc/DrumMachine/DrumMachine.module.css';

const chars = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

const DrumMachine = () => {

	// Keeps track of sound last played, active sound bank, master volume
	const [displaySound, setDisplaySound] = useState("");
	const [bank, setBank] = useState(0);
	const [mVolume, setMVolume] = useState(0.5);
	const [muteAll, setMuteAll] = useState(false);

	// Pulsers: when set to true, a setTimeout immediately falses them; trigger useEffects in children
	// MAY BE A PERFORMANCE HIT -- UNNECESSARY RENDERS
	const [activeKey, setActiveKey] = useState("");
	const [stopAll, setStopAll] = useState(false);


	const setDisplaySoundHandler = (sound, playing = true) => {
		// Updates displaySound based on last activated sound
		// Clears upon the last sound ending
		if (sound === displaySound) {
			if (playing === false) { setDisplaySound(""); }
		} else if (playing === true) {
			setDisplaySound(sound);
		}
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
		setActiveKey(e.key);
		// Set timeout that instantly resets the activate prop to the active key
		const pulser = setTimeout(() => {
			setActiveKey("");
		});
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

	return (
		<section className={machineStyles.drumContainer}>
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
				{chars.map((char, index) => {
					return <Pad
						char={char}
						padIndex={index}
						bank={bank}
						mVolume={mVolume}
						activate={activeKey === char ? true : false}
						stopAll={stopAll}
						muteAll={muteAll}
						setDisplaySound={setDisplaySoundHandler}
						key={`pad-${index}`}
					/>
				})}
			</div>
		</section>
	);
};

export default DrumMachine;
