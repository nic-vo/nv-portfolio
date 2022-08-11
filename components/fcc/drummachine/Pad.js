import { React, useRef, useState, useEffect } from 'react';
import soundList from './soundList';

import styles from '../../../styles/fcc/DrumMachine/Pad.module.css';

const Pad = ({ char, padIndex, bank, mVolume, setDisplaySound, activate, stopAll, muteAll }) => {
	// Build file path from props but keep filename ready
	const fileString = soundList[bank][padIndex]
	const srcString = `/assets/fcc/DrumMachine/${bank}/${fileString}.mp3`;

	// if pad is playing sound (for styling)
	const [isPlaying, setIsPlaying] = useState(false);
	// holds volume
	const [pVolume, setPVolume] = useState(0.5);
	// pad control toggle states
	const [loop, setLoop] = useState(false);
	const [muted, setMuted] = useState(false);

	// ref to access audio events
	const soundRef = useRef();

	// Sound fires whenever div clicked or keydown event in parent grid
	const playSound = () => {
		// Reset sound to time 0 and play
		soundRef.current.currentTime = 0;
		soundRef.current.play();
		// Update parent display state
		setDisplaySound(fileString, true);
		// Set playing to true for styling
		setIsPlaying(true);
	};

	const onEndedHandler = () => {
		setDisplaySound(fileString, false);
		setIsPlaying(false);
	};

	const volumeOnInputHandler = (e) => {
		setPVolume(e.target.value);
	};

	const muteOnClick = () => {
		setMuted(!muted);
		soundRef.current.muted = muted;
	};

	const stopOnClick = () => {
		soundRef.current.pause();
		soundRef.current.currentTime = 0;
	};

	const loopOnClick = () => {
		setLoop(!loop);
		soundRef.current.loop = loop;
	};

	// Update sound volume when either pad volume or master volume change
	useEffect(() => {
		soundRef.current.volume = pVolume * mVolume;
	}, [mVolume, pVolume]);

	// Play sound if activate prop is true
	useEffect(() => {
		if (activate === true) { playSound(); }
	}, [activate])

	return (
		<div className={styles.container}>
			<div className={styles.pad} onClick={playSound} >
				<p>{char.toUpperCase()}</p>
			</div>
			<div className={styles.controls}>
				<p>{pVolume.toString()}</p>
				<input type="range" min="0" max="1" step="0.05" value={pVolume} onInput={volumeOnInputHandler} />
				<button onClick={muteOnClick}>MUTE</button>
				<button onClick={stopOnClick}>STOP</button>
				<button onClick={loopOnClick}>LOOP</button>
			</div>
			<audio id={char} ref={soundRef} onEnded={onEndedHandler}>
				<source src={srcString} type="audio/mpeg" />
			</audio>
		</div>
	);
};

export default Pad;
