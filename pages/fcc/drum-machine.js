import { React, useState } from 'react';
import { Pad } from '../../components/fcc';

import styles from '../../styles/fcc/DrumMachine.module.css';



const chars = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]

const DrumMachine = () => {
	/*
			Keeps track of sound last played, active sound bank, master volume,
	*/
	const [displaySound, setDisplaySound] = useState("");
	const [activeKey, setActiveKey] = useState("test")
	const [bankIndex, setBankIndex] = useState(0);
	const [mVolume, setMVolume] = useState(1);

	// bank name / dir based on bankIndex
	const bank = `${bankIndex === 2 ? "Synths @100 BPM" : bankIndex === 1 ? "Hip Hop @186 BPM" : "FlumeSounds"}`

	const setDisplaySoundHandler = (sound, playing = true) => {
		// Updates displaySound based on last activated sound
		// Clears upon the last sound ending
		if (sound === displaySound) {
			if (playing === false) { setDisplaySound(""); }
		} else if (playing === true) {
			setDisplaySound(sound);
		}
	};

	const mVolumeonInputHandler = (e) => {
		setMVolume(e.target.value);
	};

	const keyPressHandler = (e) => {
		setActiveKey(e.key);
		// Set timeout that instantly resets the activate prop to the active key
		const pulser = setTimeout(() => {
			setActiveKey("");
		});
	}

	return (
		<>
			<h1>Drum Machine</h1>
			<input type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeonInputHandler} />
			<p>Active sound: {displaySound}</p>
			<div className={styles.grid} tabIndex="0" onKeyPress={keyPressHandler}>
				{chars.map((char, index) => {
					return <Pad
						char={char}
						padIndex={index}
						bank={bank}
						mVolume={mVolume}
						activate={activeKey === char ? true : false}
						setDisplaySound={setDisplaySoundHandler}
						key={`pad-${index}`}
					/>
				})}
			</div>
		</>
	);
};

export default DrumMachine;
