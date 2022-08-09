import { React, useRef, useState, useEffect } from 'react';
import SoundList from './soundList';

import styles from '../../../styles/fcc/DrumMachine.module.css';

const Pad = ({ char, padIndex, bank, mVolume }) => {
	const fileString = `${SoundList[bank].sounds[padIndex]}`;
	const dirString = `${bank === 2 ? "synth" : bank === 1 ? "mafia" : "flume"}`;
	const srcString = `/assets/fcc/DrumMachine/${dirString}/${fileString}.mp3`;

	// if pad is playing sound
	const [isPlaying, setIsPlaying] = useState(false);
	// holds volume for this pad's input
	const [pVolume, setPVolume] = useState(0.5);

	// ref to access audio events
	const soundRef = useRef();

	// fires whenever div clicked or keydown event in parent grid
	const playSound = () => {
		// Reset sound to time 0 and play
		soundRef.current.currentTime = 0;
		soundRef.current.play();
		// Set playing to true for styling
		setIsPlaying(true);
	}

	const onEndedHandler = () => {
		setIsPlaying(false);
	}

	const volumeOnInput = (e) => {
		setPVolume(e.value);
	}

	return (
		<div id={char} className={styles.pad} onClick={playSound}>
			<p>{char}</p><p>{pVolume.toString()}</p>
			<audio ref={soundRef} onEnded={onEndedHandler}>
				<source src={srcString} type="audio/mpeg" />
			</audio>
			<input type="range" min="0" max="1" step="0.1" value={pVolume} onInput={volumeOnInput}/>
		</div>
	);
};

export default Pad;
