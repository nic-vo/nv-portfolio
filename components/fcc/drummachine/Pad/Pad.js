import { React, useRef, useState, useEffect } from 'react';
import { FaVolumeMute, FaVolumeUp, FaStop, FaUndoAlt } from 'react-icons/fa';

import soundList from '../soundList';

import machineStyles from '../../../../styles/fcc/DrumMachine/DrumMachine.module.css';
import padStyles from './Pad.module.css';

const bankNames = ["FlumeSounds", "Hip Hop @186 BPM", "Synths @100 BPM"];

const Pad = ({ char, padIndex, bank, mVolume, setDisplaySound, activate, stopAll, muteAll }) => {
	// Build file path from props but keep filename ready
	const fileString = soundList[bank][padIndex]
	const srcString = `/assets/fcc/DrumMachine/${bankNames[bank]}/${fileString}.mp3`;

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
		setPVolume(parseFloat(e.target.value));
	};

	const muteOnClick = () => {
		// Mute button changes state and set soundRef to state
		if (muteAll === false) {
			setMuted(!muted);
			soundRef.current.muted = !muted;
		}
	};

	const stopOnClick = () => {
		// Stops sound
		soundRef.current.pause();
		soundRef.current.currentTime = 0;
	};

	const loopOnClick = () => {
		// Loop button changes state sets soundRef to state
		setLoop(!loop);
		soundRef.current.loop = !loop;
	};

	// Update sound volume when either pad volume or master volume change
	useEffect(() => {
		soundRef.current.volume = pVolume * mVolume;
	}, [mVolume, pVolume]);

	// Play sound if activate prop is true
	useEffect(() => {
		if (activate === true) { playSound(); };
	}, [activate]);

	// Triggers is master stop in control panel is clicked
	useEffect(() => {
		if (stopAll === true) {
			stopOnClick();
			onEndedHandler();
		};
	}, [stopAll]);

	useEffect(() => {
		setMuted(muteAll);
		soundRef.current.muted = muteAll;
	}, [muteAll]);

	// Stop sound and update src on bank prop change
	useEffect(() => {
		stopOnClick();
		soundRef.current.src = srcString;
	}, [bank]);

	return (
		<div className={padStyles.container}>
			<div className={padStyles.pad} onClick={playSound} >
				<p>{char.toUpperCase()}</p>
			</div>
			<input type="range" min="0" max="1" step="0.05" value={pVolume} onInput={volumeOnInputHandler} />
			<div className={padStyles.buttons}>
				<button onClick={muteOnClick} className={`${machineStyles.button} ${muted ? machineStyles.muteon : machineStyles.mute}`}>{muted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
				<button onClick={stopOnClick} className={`${machineStyles.button} ${machineStyles.stop}`}><FaStop /></button>
				<button onClick={loopOnClick} className={`${machineStyles.button} ${loop ? machineStyles.loopon : machineStyles.loop}`}><FaUndoAlt /></button>
			</div>
			<audio ref={soundRef} onEnded={onEndedHandler} />
		</div>
	);
};

export default Pad;