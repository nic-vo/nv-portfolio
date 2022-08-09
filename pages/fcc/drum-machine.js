import { React, useState } from 'react';
import { Pad } from '../../components/fcc';

import styles from '../../styles/fcc/DrumMachine.module.css';



const chars = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]

const Drumpad = () => {
	/*
			Keeps track of sound last played, active sound bank, master volume,
	*/
	const [activeSound, setActiveSound] = useState("");
	const [activeBank, setActiveBank] = useState(0);
	const [mVolume, setMVolume] = useState(1);

	const setActiveSoundHandler = (sound) => {
		setActiveSound(sound);
	};

	return (
		<>
			<h1>Drum Machine</h1>
			<div className={styles.padGrid} tabIndex={0}>
				{chars.map((char, index) => {
					return <Pad
						char={char}
						padIndex={index}
						bank={activeBank}
						setActiveSound={setActiveSoundHandler}
						key={`pad-${index}`}
					/>
				})}
			</div>
		</>
	);
};

export default Drumpad;
